import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { router } from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// giving access to dotenv file
config();

// config express
const app = express();
app.use(cookieParser());
app.use(express.json());
// Using Routers in middlewares
app.use("/api", router);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// connecting mongodb
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected To Databse");
    app.listen(process.env.PORT, () => {
      console.log("Server Started On PORT : " + process.env.PORT);
    });
  })
  .catch((e) => {
    console.log(e);
  });
