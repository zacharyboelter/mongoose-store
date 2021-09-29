
// ===========================================================
// DEPENDENCIES
// ===========================================================
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/products.js');
const methodOverride = require('method-override');

// ===========================================================
// MIDDLEWARE
// ===========================================================

//Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//add custom css
app.use(express.static('public'));

// ===========================================================
// SEED DATA 
// ===========================================================
// app.get('/products/seed', (req, res) => {
//     Product.create(
//         [
//             {
//                 name: 'Beans',
//                 description: 'A small pile of beans. Buy more beans for a big pile of beans.',
//                 img: 'https://imgur.com/LEHS8h3.png',
//                 price: 5,
//                 qty: 99
//             }, {
//                 name: 'Bones',
//                 description: 'It\'s just a bag of bones.',
//                 img: 'https://imgur.com/dalOqwk.png',
//                 price: 25,
//                 qty: 0
//             }, {
//                 name: 'Bins',
//                 description: 'A stack of colorful bins for your beans and bones.',
//                 img: 'https://imgur.com/ptWDPO1.png',
//                 price: 7000,
//                 qty: 1
//             }
//         ]
//         ,
//         (error, data) => {
//             res.redirect('/products');
//         }
//     );
// });
// ===========================================================
// ROUTES 
// ===========================================================
// //index, create, show routes and pages maybe css for tuesday

// ===========================================================
// INDEX - display all products
// ===========================================================
app.get('/products', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});

// ===========================================================
// NEW - display form to add a new product
// ===========================================================
app.get('/products/new', (req, res) => {
    res.render('new.ejs');
});



// ===========================================================
// DELETE - delete a single product
// ===========================================================
app.delete('/products/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/products');
    });
});



// ===========================================================
// UPDATE - update a single product
// ===========================================================



// ===========================================================
// CREATE - create a new product
// ===========================================================
app.post('/products', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products');
    });
});
// ===========================================================
// EDIT - display form to update a product
// ===========================================================



// ===========================================================
// SHOW - display a single product
// ===========================================================

app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
});



// ===========================================================
// ANYONE LISTENING
// ===========================================================
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));