const express = require("express");
const { signUP,signIn,signOut } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup",signUP)
      .post("/signin",signIn)
      .get("/signout",signOut)



module.exports = router;
