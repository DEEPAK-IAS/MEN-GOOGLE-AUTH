const express = require('express');
const passport = require('../config/google.config');

const router = express.Router();

router.get("/", passport.authenticate('google', { scope: ['email', 'profile'] }))
      .get("/callback",passport.authenticate('google', {
          successRedirect: '/api/v1/auth/google',
          failureRedirect: '/' 
      }));

module.exports = router;
