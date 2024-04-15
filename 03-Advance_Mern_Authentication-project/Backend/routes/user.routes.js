import { Router } from "express";
import cors from "cors";
import {
  userSignUp,
  userSignIn,
  verifyUser,
  getUser,
} from "../controllers/user.controller.js";

const router = Router();
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", (req, res, next) => {
  res.send("<h1> This Is API HomePage </h1>");
});

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.get("/user", verifyUser, getUser);
export { router };
