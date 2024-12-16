const express = require("express");
const session = require("express-session");
const mongodb = require("./db");
const authRoute = require("./routes/auth.route");
const googleRoute = require("./routes/google.route")
const passport = require("./config/google.config")
require("dotenv").config();
const app = express();

mongodb.connect();


app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: false }     
}));
app.use(passport.initialize());
app.use(passport.session());


app.use("/api/v1/auth",authRoute);
app.use("/google",googleRoute);

app.get("/",(req, res) => {
  res.end("<a href='/google'>welcome</a>")
})




app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; 
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message
  });
})

const PORT = process.env.PROT || 3000
app.listen(PORT, () => console.log(`server running on port no ${PORT}`));