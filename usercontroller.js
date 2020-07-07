const User = require("./models/usermodel");

exports.savedata = async (req, res, next) => {
  try {
    //google data;
    if (req.user.sub) {
      var idd = req.user.sub;
      var email = req.user.email;
      var photo = req.user.picture;
      //facebook data
    } else {
      var idd = req.user._json.id;
      var email = req.user._json.email;
      var photo = req.user.photos[0].value;
    }
    // const id;
    const dd = await User.findOne({ G_F_id: idd });
    if (dd) {
      // const filter = { G_F_id: idd };
      // const update = { picture: photo };
      // await User.findOneAndUpdate(filter, update, { new: true });
      return next();
    } else {
      const data = await User.create({
        G_F_id: idd,
        email: email,
        name: req.user.displayName,
        provider: req.user.provider,
        picture: photo,
        cart: {
          items: []
        }
      });

      next();
    }
  } catch (err) {
    console.log(err.message);
  }
};
