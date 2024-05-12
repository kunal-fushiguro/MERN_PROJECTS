import express from "express";
import { dbConnect } from "./db/db.js";
import { config } from "dotenv";
import { routes } from "./routes/routes.js";
import cors from "cors";

config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/", routes);

dbConnect(app);
