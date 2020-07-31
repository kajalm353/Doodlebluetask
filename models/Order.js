/**
 * This is the order model.
 * Creating schema for order
 *
 * @class order 
 */
var mongoose = require('mongoose')

var orderSchema = new mongoose.Schema(
    {
        productId:{type: mongoose.Schema.Types.ObjectId, ref: 'product'},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
        Quantity: { type: Number, default: 1 },
        createdOn: {type: Date, default: new Date()},
        updatedOn: {type: Date},
    })


var collectionName = 'orders';
var orders = mongoose.model('orders', orderSchema, collectionName);

module.exports = orders;