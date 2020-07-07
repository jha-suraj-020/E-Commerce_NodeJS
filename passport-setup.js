const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//here we will be having all req.user
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "727680756119-liihjtrk6po8ruea1q7e9bd1t0uo92tr.apps.googleusercontent.com",
      clientSecret: "O9kaibMPaEirgspPSse3w2lS",
      callbackURL: "http://127.0.0.1:3000/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "716699175538673",
      clientSecret: "bc47790c13f37f3f918b4b1bbcf85c6a",
      callbackURL: "http://localhost:3000/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
