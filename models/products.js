const mongoose = require('mongoose');
const { stringify } = require('querystring');

// template for data
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    price: { type: Number, required: true },
    qty: { type: Number, required: true }
});

// Set the whole schema to var named 'Product'
const Product = mongoose.model('Product', productSchema);

// export to allow us to use Product var elsewhere in app
module.exports = Product;