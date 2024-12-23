const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");
const errorHandler = require("../utils/errorHandler")



async function signUP(req,res,next) {
  try {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = await new User({
      username: username,
      email: email,
      password: hashedPassword,
    }).save();
    const {password:_,...rest} = newUser._doc;
    res.status(200).json({
      success: true,
      data: {
        user: rest,
      }
    });
  } catch(err) {
    if(err.message.includes("duplicate key"))
      return next(errorHandler(409,"duplicate key"))
    next(err);
  }
}



async function signIn(req, res, next) {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user) return next(errorHandler(404,"user not found..."));
    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if(!isValidPassword) return next(errorHandler(401,"Unauthorized..."));
    const access_token = jwt.sign({id: user.id},process.env.JWT_SECRET_KEY);
    const {password:_, ...rest} = user._doc;
    res.cookie("access_token",req.user,{httpOnly: true}).status(200).json({
      success: true,
      data: {
        user: rest
      }
    });
  } catch(err) {
    next(err);
  }
}



async function signOut(req, res, next) {
  try {
    if (!req.session) {
      console.error('Session not found.');
      return res.status(400).send('No session found.');
    }
    req.session.destroy(function(err) {
      res.status(200).clearCookie("access_token").json({
        success: true,
        message: "your session has expire"
      })
    })
  } catch(err) {
    next(err);
  }
}



function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}



async function googleSignin(req, res, next) {
  const access_token = jwt.sign({id: req.user._id},process.env.JWT_SECRET_KEY);
  res.cookie("access_token",access_token,{httpOnly: true}).redirect("/");
}

 

module.exports = {
  signUP,
  signIn,
  signOut,
  isLoggedIn,
  googleSignin,
}