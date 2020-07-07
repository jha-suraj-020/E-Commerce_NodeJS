const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
const adminController = require('../controllers/admin');
const auth = require('../auth/auth');

router.get('/admin/add-product', auth.isloggedin, auth.getuser, adminController.getAddProduct);

router.post('/admin/add-product', auth.isloggedin, auth.getuser, adminController.postAddProduct);

module.exports = router;