import { Router } from "express";
import { codeRun } from "../codeexcution/code.js";
import {
  userLogin,
  userRegister,
  saveCode,
  getCode,
} from "../controllers/user.js";

const routes = Router();
routes.post("/run", codeRun);
routes.post("/register", userRegister);
routes.post("/login", userLogin);
routes.post("/save", saveCode);
routes.post("/getcode", getCode);

export { routes };
