import express, { json } from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import router from "./routes/bookRoutes.js";
import cors from "cors"

config()

const app = express();

app.use(cors());
app.use(express.json());


app.use('/books',router);


// app.use(cors({
//     origin:"http://localhost:5173/",
//     methods:['GET','PUT','POST','DELETE'],
// }))


app.get("/", (req, res) => {
  // console.log(req);
  return res.status(234).send("<h1>HomePage</h1>");
});




mongoose
.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Connected To DataBase.");
    app.listen(process.env.PORT || 7000, () => {
      console.log(`Server Started On PORT : ${process.env.PORT || 7000}`);
    });

  })
  .catch((e) => {
    console.log(e.message);
    console.log("Not Connected To DataBase.");
  });
  
