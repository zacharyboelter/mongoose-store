
// ===========================================================
// DEPENDENCIES
// ===========================================================
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/products.js')
// ===========================================================
// MIDDLEWARE
// ===========================================================

//Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));

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
// ROUTES 
// ===========================================================
// //index, create, show routes and pages maybe css for tuesday

// ===========================================================
// INDEX - display all products
// ===========================================================


// ===========================================================
// NEW - display form to add a new book
// ===========================================================



// ===========================================================
// DELETE - delete a single book
// ===========================================================



// ===========================================================
// UPDATE - update a single book
// ===========================================================



// ===========================================================
// CREATE - create a new book
// ===========================================================



// ===========================================================
// EDIT - display form to update a book
// ===========================================================



// ===========================================================
// SHOW - display a single book
// ===========================================================




// ===========================================================
// ANYONE LISTENING
// ===========================================================
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));