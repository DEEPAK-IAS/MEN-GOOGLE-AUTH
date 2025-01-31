const passport = require("passport");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
require("dotenv").config();
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const newUser =  await new User({
      ObjectId: profile.id,
      username: profile.displayName,
      email: profile.emails[0].value, // Assuming email exists
      password: bcryptjs.hashSync(Math.random().toString(36).slice(-8) + Math.random().toString(36).toUpperCase().slice(-4),10),
      avatar: profile.photos[0].value,
    }).save();
    return done(null, newUser);
  }
));


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;