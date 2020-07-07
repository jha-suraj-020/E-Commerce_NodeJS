const express = require('express');
const router = express.Router();

const apiController=require('../controllers/apiController')

//router.get('/products', auth.isloggedin, auth.getuser, shopController.getLanding);

// router.get('/cart', auth.isloggedin, auth.getuser, shopController.getCart);

router.get("/userdata",apiController.getuserdata);
router.get("/productdata",apiController.getproduct);
router.get("/productdata/:id",apiController.cartdata);
module.exports = router;