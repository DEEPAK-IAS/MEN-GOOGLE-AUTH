const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const mongodb = require("./db");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const googleRoute = require("./routes/google.route")
const passport = require("./config/google.config")
const pageRoute = require("./routes/page.route");
require("dotenv").config();
const app = express();

mongodb.connect();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false, 
  saveUninitialized: true,
  cookie: { 
    secure: false  
  },     
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client", "dist")));
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/user",userRoute);
app.use("/google",googleRoute);
app.use("/", pageRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; 
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message
  });
})

const PORT = process.env.PROT || 3000;
app.listen(PORT, () => console.log(`server running on port no ${PORT}`));