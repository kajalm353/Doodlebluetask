const express = require('express');
// const app = express();
const bodyParser = require('body-parser');

const users = require('../routes/Users');
const product = require('../routes/Product')
const order = require('../routes/Order')

const cors = require('../middleware/cors')


module.exports = function (app) {

  app.use(cors)


  app.use(bodyParser({
    limit: '50mb'
  }));


  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/products',product)
  app.use('/api/orders', order)

};