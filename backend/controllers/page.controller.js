const fs = require("fs");
const path = require("path");

const headerHTML = fs.readFileSync(path.join(__dirname, "../../client/dist/header.component.html"),"utf-8");
const indexHTML = fs.readFileSync(path.join(__dirname,"../../client/dist/home.html"),"utf-8");
const signUpHTML = fs.readFileSync(path.join(__dirname,"../../client/dist/signup.html"),"utf-8");
const signInHTML = fs.readFileSync(path.join(__dirname,"../../client/dist/signin.html"),"utf-8");

function indexPage(req, res) {
  res.end(indexHTML.replace("{{HEADER}}", headerHTML))
}

function signUpPage(req, res) {
  res.end(signUpHTML.replace("{{HEADER}}", headerHTML));
}

function signInPage(req, res) {
  res.end(signInHTML.replace("{{HEADER}}", headerHTML));
}


module.exports = {
  indexPage,
  signInPage,
  signUpPage
}