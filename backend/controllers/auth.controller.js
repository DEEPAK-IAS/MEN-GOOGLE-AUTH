const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");
const errorHandler = require("../utils/errorHandler");
const sendOTPEmail = require("../config/nodeMailer.config.js");
const {generateOTP} = require("../utils/generateOTP");

async function signUP(req, res, next) {
  try {
    const { username, email, password, avatar } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await new User({
      username: username,
      email: email,
      password: hashedPassword,
      avatar: avatar,
    }).save();
    const { password: _, ...rest } = newUser._doc;
    res.status(200).json({
      success: true,
      data: {
        user: rest,
      },
    });
  } catch (err) {
    if (err.message.includes("duplicate key"))
      return next(errorHandler(409, "duplicate key"));
    next(err);
  }
}

async function signIn(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return next(errorHandler(404, "user not found..."));
    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) return next(errorHandler(401, "Unauthorized..."));
    const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
    const { password: _, ...rest } = user._doc;
    res
      .status(200)
      .cookie("access_token", access_token)
      .cookie("user_info", JSON.stringify(rest))
      .json({
        success: true,
      });
  } catch (err) {
    next(err);
  }
}

async function signOut(req, res, next) {
  try {
    if (!req.session) {
      console.error("Session not found.");
      return res.status(400).send("No session found.");
    }
    req.session.destroy(function (err) {
      res.status(200).clearCookie("access_token", "user_info").json({
        success: true,
        message: "your session has expire",
      });
    });
  } catch (err) {
    next(err);
  }
}

function isLoggedIn(req, res, next) {
  req.user ? next() : req.sendStatus(401);
}

async function googleSignin(req, res, next) {
  try {
    const access_token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET_KEY
    );
    const { password: _, ...userInfo } = req.user;
    res
      .status(200)
      .cookie("access_token", access_token)
      .cookie("user_info", JSON.stringify(userInfo))
      .redirect("/");
  } catch(err) {
    next(err);
  }
}

async function resetPassword(req, res, next) {
  try {
    const {email} = req.body;
    if (!email) return next(errorHandler(400, "email is required"));
    
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "user not found"));

    const OTP = generateOTP();
    req.session.otp = OTP;

    sendOTPEmail(email, OTP);
    res.status(200).json({
      success: true,
      message: "OTP has been sent successfully to email",
    }); 
  } catch (err) {
    next(err);
  }
}


async function verifyOTP(req, res, next) {
  const {otp, password, email} = req.body;
  const user = await User.findOne({email});
  if(!user) return next(errorHandler(404, "user not found..."));
  if(otp != req.session.otp) return next(errorHandler(401, "Unauthorized.."));


  const newPassword = bcryptjs.hashSync(password, 10);
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfully"
  });

}


module.exports = {
  signUP,
  signIn,
  signOut,
  isLoggedIn,
  googleSignin,
  resetPassword, 
  verifyOTP
};
