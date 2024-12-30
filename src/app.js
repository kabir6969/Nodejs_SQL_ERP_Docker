const express = require('express');
const dotenv = require('dotenv')
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const passport = require('passport')
const session = require('express-session')
const swaggerUI = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerDocument = require('./api_docs/swagger.json')
const cors = require('cors');
const fs = require('fs');
const app = express();
//const mime = require('mime');
const mime = require('mime-types');
var https = require('https');
var http = require('http');
//const swaggerUI = require('swagger-ui-express')
//const swaggerJsdoc = require('swagger-jsdoc')
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ERP API",
            version: "1.0.0",
            description: "AN ERP API"
        },
        servers: [
            {
                url: "http://localhost:3000"
            },
        ],
    },
    apis: ["./routes/*.js"]
};
const swaggerSpec = swaggerJsdoc(options);
//const swaggerDocument = swaggerJsdoc(options);

// Load Config
dotenv.config({path : './config/config.env'})

// passport config

require('./config/passport')(passport)


// settings
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.set('port', process.env.PORT || 3000);



//https setup

// var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
// var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
// privateKey = fs.readFileSync(path.resolve('dist/ssl/keys/server.key')),
// certificate = fs.readFileSync(path.resolve('dist/ssl/keys/server.crt'))
// var credentials = {key: privateKey, cert: certificate};



// your express configuration here

// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

// httpServer.listen(8080);
// httpsServer.listen(8443);
// var httpsOptions = {
//     key: fs.readFileSync('path/to/server-key.pem'),
//     cert: fs.readFileSync('path/to/server-crt.pem')
// };

// var requestListener = function (req, res) {
//   res.writeHead(200);
//   res.end("hello world\n");
// }

// http.createServer(requestListener).listen(8888);

// http.createServer(function (req, res) {
//     fs.readFile('demofile1.html', function(err, data) {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       return res.end();
//     });
//   }).listen(3000);
//https.createServer(httpsOptions, requestListener).listen(4433);

// Handlebars

// app.set('views', [path.join(__dirname, 'views'),
// path.join(__dirname, 'views/admin/'), 
// path.join(__dirname, 'views/users/')]);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}))


// Session // Make sure use of session must be above passport midleware

app.use(session({
    secret: 'keyboard cat',
    resave: false,// Save when is nothing modified session data 
    saveUninitialized: false, // Don't create seassion insted something stored
   // cookie: { secure: true } //This is work without HTTPS

  }))

// Passport Mideleware
app.use(passport.initialize())
app.use(passport.session())


// create a write stream (in append mode)
//var accessLogStream = fs.readFileSync(path.resolve(__dirname, "/logs/access.log")); // for live server 
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })
//var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log.txt'), { flags: 'a' })

app.set('view engine', '.hbs');
//app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //para formularios html
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

// routes
app.use(require('./routes/index'));
app.use('/auth', require('./routes/auth'));

// No route found error handler
app.use((req, res, next) => {
    const error = new Error('Not Found.');
    error.status = 404;
    next(error);
});


// static files
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use('/public', express.static(path.join(__dirname, 'public/css')));
// app.use('/public', express.static(path.join(__dirname, 'public/js')));


 //app.use(express.static('public'));
// app.use(express.static('public/css'));
// app.use(express.static('public/js'));
// app.use(function (req, res, next) {
//     var fileName = req.url.split("/").pop();
//     var mimeType = mime.getType(fileName);
//     res.setHeader("Content-Type", mimeType);
//     next();
// });

// app.use(function (req, res, next) {
//     var fileName = req.url.split("/").pop();
//     var mimeType = mime.lookup(fileName);
//     res.setHeader("Content-Type", mimeType);
//     next();
// });

// app.use(express.static('public', {
//     setHeaders: function (res, path, stat) {
//         if (path.endsWith('.css')) {
//             res.set('Content-Type', 'text/css');
//         }
//     }
// }));


module.exports = app;


