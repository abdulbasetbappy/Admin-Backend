const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const limiter = require("express-rate-limit");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const xssClean = require("xss-clean");
const createError = require("http-errors");
const { userRouter } = require("./routers/userRouter");
const { seedRouter } = require("./routers/seedRouter");
const { errroRsponse } = require("./controllers/responseController");
const app = express();



//Middileware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(xssClean())
app.use(passport.initialize());


//Limiter
app.use(
    limiter({
      windowMs: 15 * 60 * 1000,
      max: 100,
    })
);

//Route
app.use("/api/users",userRouter);
app.use("/api/seed", seedRouter);

app.get('/',(req, res)=>{
    res.send('Welcome to home')
})


//Client Error Handling
app.use((req, res, next)=>{
    next(createError(404, 'Route Not Found'))
})
//Server Error Handling
app.use((err, req, res, next)=>{
    return errroRsponse(res, {
        statusCode: err.status, 
        message: err.message
    })
})
module.exports = app;


