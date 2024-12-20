const express = require('express');
const passport = require('../config/google.config'); // Adjust path as needed

const router = express.Router();

router.get("/", passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get("/callback",
  passport.authenticate('google', {
    successRedirect: '/api/v1/auth/google',
    // successRedirect: "/",
    failureRedirect: '/api/v1/auth/failure' 
  })
);

module.exports = router;
