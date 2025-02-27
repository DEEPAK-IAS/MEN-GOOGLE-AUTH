const express = require("express");
const router = express.Router();
const {indexPage, signInPage, signUpPage, profilePage, resetPasswordPage} = require("../controllers/page.controller");


router.get("/", indexPage)
      .get("/signin", signInPage)
      .get("/signup", signUpPage)
      .get("/profile", profilePage)
      .get("/reset-password", resetPasswordPage);


module.exports = router;

