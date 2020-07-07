const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');
const auth = require('../auth/auth');

router.get('/products', auth.isloggedin, auth.getuser, shopController.getLanding);

router.post('/cart', auth.isloggedin, auth.getuser, shopController.postCart);

router.get('/cart', auth.isloggedin, auth.getuser, shopController.getCart);

router.post('/cart-delete-item', auth.isloggedin, auth.getuser, shopController.cartDeleteProduct);

router.post('/create-order', auth.isloggedin, auth.getuser, shopController.postOrder);

router.get('/orders', auth.isloggedin, auth.getuser, shopController.getOrders);

router.get('/checkout', auth.isloggedin, auth.getuser, shopController.getCheckout);

module.exports = router;
