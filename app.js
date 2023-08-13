import express from 'express';
import cors from 'cors'
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import session from "express-session";
import "dotenv/config";
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";


// mongoose.connect("mongodb://localhost:27017/tuiter");
mongoose.connect("mongodb://127.0.0.1:27017/tuiter");


const app = express()
app.use(
  cors({
    credentials: true,
    // origin: "http://localhost:3000",
    origin: process.env.FRONTEND_URL
  })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));


// const sessionOptions = {
//   secret: "any string",
//   resave: false,
//   saveUninitialized: false,
// };

app.use(express.json());
TuitsController(app);
HelloController(app)
UserController(app)
AuthController(app);
app.listen(process.env.PORT || 4000);
// app.listen(4000);