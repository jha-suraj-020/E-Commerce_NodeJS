const User = require("../models/usermodel");
const Product = require("../models/product");

exports.getuserdata = async (req, res, next) => {
  try {
    const user = await User.find().select('-cart -__v');
    res.status(200).json({
      result: user.length,
      data: user,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getproduct = async (req, res, next) => {
  try {
    const data = await Product.find();
    res.status(200).json({
      result: data.length,
      data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.cartdata = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    res.status(200).json({
      data: user.cart,
    });
  } catch (err) {
    console.log(err.message);
  }
};
