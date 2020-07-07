const Product = require('../models/product');
const Order = require('../models/order');
const order = require('../models/order');

exports.getLanding = (req, res, next) => {
    console.log(res.locals.user);
    Product.find()
        .then(products => {
            res.render('./shop/landing',
                {
                    prods: products,
                    path: '/products'
                });
        })
        .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    res.locals.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(data => {
            const products = data.cart.items;
            console.log(products);
            res.render('shop/cart', {
                path: '/cart',
                products: products
            });
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return res.locals.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        });
};

exports.cartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    res.locals.user
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.getCheckout = async (req, res, next) => {
    try {
        const data = await res.locals.user
            .populate('cart.items.productId')
            .execPopulate();
        const products = data.cart.items;
        let total = 0;
        products.forEach(p => {
            total += p.quantity * p.productId.price;
        });
        res.render('shop/checkout', {
            path: '/checkout',
            products: products,
            totalSum: total
        });
    } catch (error) {
        console.log(error);
    }
};

exports.postOrder = async (req, res, next) => {
    try {
        const data = await res.locals.user.populate('cart.items.productId').execPopulate();

        const products = data.cart.items.map(i => {
            return { quantity: i.quantity, product: { ...i.productId._doc } }
        })

        const done = await Order.create({
            products: products,
            userId: res.locals.user._id
        })

        await res.locals.user.clearCart();

        res.redirect("/orders");
    } catch (error) {
        console.log(error);
    }
}

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ 'userId': res.locals.user._id });
        console.log(orders);

        res.render('shop/orders', {
            path: '/orders',
            orders: orders
        });
    } catch (err) {
        console.log(err);
    }

};
