const { Router } = require('express');
const controller = require('../controller/controller')

const router = Router();
const swaggerUI = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const https = require('https');
const http = require('http');
const client = https;
// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "ERP API",
//             version: "1.0.0",
//             description: "AN ERP API"
//         },
//         servers: [
//             {
//                 url: "http://"
//             },
//         ],
//     },
//     apis: ["./routes/index.js"]
// };


// Rutas

// Main landing page

router.get('/', controller.getIndex);

//const swaggerSpec = swaggerJsdoc(options);
// router.get('/', function (req, res) {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(swaggerSpec);
//   });
  
   //router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

   
// router.get('/',(req,res)=>{
//     res.render('index')
// })

// admin Dashboard
router.get('/admin', controller.adminDashboard);
router.get('/v2/users', [
   controller.getProducts
]);
// Home - Obtiene todos los productos
//router.get('/', controller.getProducts);

// // Agregar Producto
// router.post('/addProduct', controller.addProduct);

// // Eliminar Producto
// router.get('/delete/:id' , controller.deleteProduct);

// // Editar Producto
// router.get('/update/:id',controller.editProduct);
// router.post('/update/:id',controller.updateProduct);

module.exports = router;

