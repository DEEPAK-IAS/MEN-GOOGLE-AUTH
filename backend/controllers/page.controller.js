const fs = require("fs");
const path = require("path");

const indexHTML = fs.readFileSync(path.join(__dirname,"../../client/dist/home.html"),"utf-8");
const signUpHTML = fs.readFileSync(path.join(__dirname,"../../client/dist/signup.html"),"utf-8");
const signInHTML = fs.readFileSync(path.join(__dirname,"../../client/dist/signin.html"),"utf-8");
const profileHTML = fs.readFileSync(path.join(__dirname,"../../client/dist/profile.html"),"utf-8");
const resetPasswordHTML = fs.readFileSync(path.join(__dirname,"../../client/dist/resetPassword.html"),"utf-8");

function indexPage(req, res) {
  res.end(indexHTML)
}

function signUpPage(req, res) {
  res.end(signUpHTML);
}

function signInPage(req, res) {
  res.end(signInHTML);
}

function profilePage(req, res) {
  res.end(profileHTML);
}

function resetPasswordPage(req, res) {
  res.end(resetPasswordHTML);
}

module.exports = {
  indexPage,
  signInPage,
  signUpPage,
  profilePage,
  resetPasswordPage
}