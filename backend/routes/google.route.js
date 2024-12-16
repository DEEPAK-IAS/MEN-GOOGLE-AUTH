const express = require('express');
const passport = require('../config/google.config'); // Adjust path as needed

const router = express.Router();

// Middleware to check if user is logged in

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get("/", passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get("/callback",
  passport.authenticate('google', {
    successRedirect: '/google/protected',
    // failureRedirect: '/auth/failure' 
  })
);

// Protected route
router.get("/protected", isLoggedIn, (req, res) => {
  console.log(req.user);
  res.send(`Hello, ${req.user.displayName}`);
});

module.exports = router;
