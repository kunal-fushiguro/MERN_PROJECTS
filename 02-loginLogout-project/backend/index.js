import express from "express";
import dotenv from "dotenv";
// import cors from "cors"
import { router } from "./routes/authRouter.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
// app.use(cors({
//     credentials:true,
//     origin:"http://localhost:5173",
// }))

// some middlewares
app.use(express.json());
app.use("/", router);
// app.get("/",(req,res)=>{
//     res.send("<h1>HOMEPAGE<h1/>")
// })

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DataBase Connected ......");
    app.listen(process.env.PORT, () => {
      console.log("Server Started On PORT : " + process.env.PORT);
    });
  })
  .catch((e) => {
    console.log("Database is Not Connected");
    console.log(e);
  });
