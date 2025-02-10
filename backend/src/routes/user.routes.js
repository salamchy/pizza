import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { validateRegistration } from "../middleware/registerValidator.js";
import { validateLogin } from "../middleware/loginValidator.js";
import { errorValidation } from "../middleware/errorValidation.js";

const router = express.Router();

// User registration route
router
  .route("/register")
  .post(validateRegistration, errorValidation, registerUser);

// User login route
router.route("/login").post(validateLogin, errorValidation, loginUser);

// User logout route
router.route("/logout").post(verifyToken, logoutUser);

export default router;
