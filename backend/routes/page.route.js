const express = require("express");
const router = express.Router();
const {indexPage, signInPage, signUpPage} = require("../controllers/page.controller");


router.get("/", indexPage)
      .get("/signin", signInPage)
      .get("/signup", signUpPage)


module.exports = router;

