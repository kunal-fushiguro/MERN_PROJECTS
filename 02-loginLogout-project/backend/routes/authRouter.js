import { Router } from "express";
import {
  test,
  registerUser,
  loginUser,
} from "../controllers/authController.js";
import cors from "cors";

const router = Router();

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", test);

router.post("/register", registerUser);
router.post("/login", loginUser);

export { router };
