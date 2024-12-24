const express = require("express");
const verifiToken = require("../utils/verifyToken");
const {getUsers, updateUser, deleteUser} = require("../controllers/user.controller")

const router = express.Router();


router.patch("/:id", verifiToken, updateUser)
      .delete("/:id", verifiToken, deleteUser)
      .get("/all", getUsers);



module.exports = router;