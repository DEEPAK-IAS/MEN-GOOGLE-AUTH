const bcryptjs = require("bcryptjs");
const errHandler = require("../utils/errorHandler");
const User = require("../models/user.model");
const upload = require("../config/multer.config.js");



async function getSingleUser(req, res, next) {
  try {
    const id = req.params.id;
    const user = await User.find({_id: id});
    if(!user) next(errHandler(404, "user not found"));
    const {password:_, ...rest} = user;
    res.status(200).json({
      success: true,
      data: {
        user: user
      }
    });

  } catch(err) {
    next(err);
  }
}


async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    const extractUsers = [];
    for(let user of users) {
      const {password:_, ...extractUser} = user._doc;
      extractUsers.push(extractUser);
    }
    res.status(200).json({
      success: true,
      userCount: extractUsers.length,
      data: {
        users: extractUsers
      }
    });
  } catch(err) {
    next(err);
  }
}



async function updateUser(req, res, next) {
  if(req.verifyUserId != req.params.id) next(errHandler(401, "Unauthorized"));
  if(req.body.id || req.body._id) next(errHandler(400, "cannot update id"));

  try {
    const userToUpdate = await User.findById(req.params.id);
    if (!userToUpdate) return next(errorHandler(404, "User not found"));
    if (req.body.password) req.body.password = bcryptjs.hashSync(req.body.password, 10);

    const updatedUser = await User.findByIdAndUpdate({_id: req.params.id}, {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar
    }, {new: true});

    const { password:_, ...rest } = updatedUser._doc;
    res.status(200).json({
      success: true,
      data: {
        user: rest
      }
    });
  } catch(err) {
    next(err);
  }
}



async function deleteUser(req, res, next) {
  if (req.verifiedUserId != req.params.id) return next(errorHandler(401, "Unauthorized"));
  
  try {
    const { email, password } = req.body;
    const userToDelete = await User.findOne({email: email});
    if (!userToDelete) return next(errorHandler(404, "User not found"));
    const isValidPassword = bcryptjs.compareSync(password, userToDelete.password);
    if (!isValidPassword) return next(errorHandler(401, "Unauthorized"));

    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({});
  } catch(err) {
    next(err);
  }
}


async function uploadAvatar(req, res, next) {
  upload(req, res, (err) => {
    if (err) return next(errHandler(500, err.message));
    if (req.file == undefined) return next(errHandler(400, "No File Selected"));
    const { originalname, filename} = req.file;
    const downloadURL = `/api/v1/user/avatar/${filename.split("-")[0]}`;
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file: {
        originalname: originalname,
        downloadURL: downloadURL
      }
    });
  });
} 


module.exports = {
  updateUser,
  deleteUser,
  getUsers,
  getSingleUser,
  uploadAvatar
};