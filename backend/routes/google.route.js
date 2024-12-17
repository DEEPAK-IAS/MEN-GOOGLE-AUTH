const express = require('express');
const passport = require('../config/google.config'); // Adjust path as needed

const router = express.Router();

// Middleware to check if user is logged in



router.get("/", passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get("/callback",
  passport.authenticate('google', {
    successRedirect: '/api/v1/auth/google',
    failureRedirect: '/api/v1/auth/failure' 
  })
);

router.get("/logout", (req, res) => {
  if (!req.session) {
    console.error('Session not found.');
    return res.status(400).send('No session found.');
  }
  req.session.destroy(function(err) {
    console.log("destroy")
    res.clearCookie("connect.sid");
    console.log(req.session);
    // res.redirect("/");
  })
});


module.exports = router;