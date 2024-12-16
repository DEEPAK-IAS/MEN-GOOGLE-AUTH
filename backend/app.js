const express = require("express");
const session = require("express-session");
const mongodb = require("./db");
const authRoute = require("./routes/auth.route");
const passport = require("./config/googleAuth")
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

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get("/" , (req,res) => {
  res.send('<a href="/auth/google">Authenticate with google</a>');
})


app.get("/auth/google", passport.authenticate('google',{ scope: ['email', 'profile']}));

app.get("/google/callback",
  passport.authenticate('google',{
    successRedirect: '/protected',
    // failureRedirect: '/auth/failure'
  })
)


// app.get("/auth/failure", (req,res) => {
//   res.send("something went wrong");
// })
app.get("/protected", isLoggedIn, (req,res) => {
  console.log(req.user);
  res.send(`Hello, ${req.user}`);
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