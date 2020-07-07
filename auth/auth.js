const User = require("../models/usermodel");

exports.isloggedin = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/google");
};

exports.getuser = async (req, res, next) => {
    try {
        if (req.user.sub) {
            var idd = req.user.sub; //facebook data
        } else {
            var idd = req.user._json.id;
        }
        const data = await User.findOne({ G_F_id: idd });
        res.locals.user = data;
        next();
    } catch (err) {
        console.log(err.message);
    }
};