const { sql, poolPromise } = require('../database/db')
var https = require('https');
var http = require('http');
let client = https;

const fs = require('fs');
//var rawdata = fs.readFileSync('src/query/queries.json');
const path = require("path");
const rawdata = fs.readFileSync(path.resolve(__dirname, "../query/queries.json"));
var queries = JSON.parse(rawdata);
//const app = express();
//app.use(express.json());

class MainController {

// langing page
  async getIndex(req, res) {
    try {

      res.render('login');
     
     // res.render('index');
      //res.render('admin/dashboard');
    
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

// Admin Dashboard
  async adminDashboard(req, res) {
    try {

     // res.render('login');
     
     // res.render('index');
      res.render('admin/dashboard');
    
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  
  // app.get('/api/books', (req,res)=> {
  //   res.send(books);
  //   });
  // Get all products - Obtener todos los productos
  async getProducts(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request()
        .query(queries.getAllData);
      const products = result.recordset;
      console.log(products);
      //res.render('index', { products: products });
      res.send(products);
      console.log(products);
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

}

const controller = new MainController()
module.exports = controller;