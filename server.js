// imports
const express = require("express");
const cors = require("cors");

// Controllers
const errorController = require('./controllers/error');

// Utilidades
const path = require('path')

// Rotas
const adminData = require('./routes/admin');
const shop = require('./routes/shop');

// Express stuff
const app = express();
app.use(express.urlencoded({extended: true})); //body-parser is depracated, use this instead!
app.use(express.static(path.join(__dirname,'public')));

// CORS
app.use(cors());

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Pages
app.use('/admin', adminData.routes);
app.use(shop);
app.use(errorController.page404);

// Server Connections
const port = process.env.PORT || 9000; // server port
app.listen(port);

