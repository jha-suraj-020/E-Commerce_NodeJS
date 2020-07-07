const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('./shop/add-product', {
        path: '/admin/add-product'
    });
};

exports.postAddProduct = (req, res, next) => {
    console.log(res.locals.user);
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        rating: req.body.rating,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        userData: res.locals.user
    });
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('/products');
        })
        .catch(err => {
            console.log(err);
        });
};