const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
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

    res.status(200).cookie("user_auth_access_token", access_token, {httpOnly: true}).json({
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
    res.status(200).clearCookie("user_auth_access_token").json({
      success: true,
      message: "User has been logged out"
    });
  } catch(err) {
    next(err);
  }
}

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}


async function googleSignin(req, res, next) {
  try {
    console.log(req.session);
    res.status(200).json({
      name: req.user.displayName,
        data: req.user
    })
  } catch(err) {
    next(err);
  }
}

// router.get("/protected", isLoggedIn, (req, res) => {
//   // console.log(req.user);
//   // res.send(`Hello, ${req.user.displayName}`);
//   console.log(req.session);
//   res.status(200).json({
//     name: req.user.displayName,
//     data: req.user
//   })
// });


module.exports = {
  signUP,
  signIn,
  signOut,
  isLoggedIn,
  googleSignin,
}