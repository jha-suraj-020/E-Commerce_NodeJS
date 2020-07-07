const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("./passport-setup");
const bodyParser = require("body-parser");
const usercontroller = require("./usercontroller");
const User = require("./models/usermodel");
const auth = require("./auth/auth");
app.use(cors());
app.set('view engine', 'ejs');

app.use(bodyParser.json());
const DB =
  "mongodb+srv://admin-suraj:itsgabru@clustermine-vrxpf.mongodb.net/testit?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database is connected!!");
  });

app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", apiroutes);

//routes
const shopRoutes = require("./routes/shop.js");
const adminRoutes = require("./routes/admin.js");


app.get("/failure", (req, res) => {
  res.send("failed");
});
app.get("/", auth.isloggedin, usercontroller.savedata, auth.getuser, (req, res) => {
  // res.send(`login as ${req.user.displayName}`);
  res.redirect("/products");
  //console.log(req.isAuthenticated());
});
app.get("/success", (req, res) => {
  res.redirect("/");
});
app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  })
);

app.get("/facebook", passport.authenticate("facebook"));

app.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  })
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

//using routes
app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000, () => console.log("app is running on port 3000"));
