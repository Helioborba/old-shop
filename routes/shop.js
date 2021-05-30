// Imports
const express = require('express');
const shopController = require('../controllers/shop')

// Main router
const router = express.Router();


router.get('/', (shopController.getIndex));

router.get('/products', (shopController.getProducts));

router.get('/products/:productId', (shopController.getProduct));

router.get('/cart', (shopController.getCart));

router.post('/cart', (shopController.postCart));

router.get('/orders', (shopController.getOrders));

router.get('/checkout', (shopController.getCheckout));

router.get('/temp', (shopController.getTemp)); // test

// Exports
module.exports = router;