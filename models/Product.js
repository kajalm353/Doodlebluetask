/**
 * This is the product model.
 * Creating schema for product
 *
 * @class product 
 */
var mongoose = require('mongoose')

var productSchema = new mongoose.Schema(
  {
    UserId:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    Name : { type: String},
    Price: { type: Number},
    productImageUrl: {type: String},
    createdOn: {type: Date, default: new Date()},
    updatedOn: {type: Date},
  })


var collectionName = 'products';
var Products = mongoose.model('products', productSchema, collectionName);

module.exports = Products;