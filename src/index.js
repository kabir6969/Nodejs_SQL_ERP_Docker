const app = require('./app');
const dotenv = require('dotenv')
const path = require('path');
const url = require('url');

app.listen(app.get('port'));
//app.listen(app.get(process.env.PORT)); 
console.log(`server on port ${process.env.GOOGLE_CLIENT_ID}`, app.get('port'), `${process.env.PORT}`);
//console.log(require("dotenv").config('D:\\KABIR-Projects\\ERP\\.env'))
