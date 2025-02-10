import { body } from "express-validator";

export const validateRegistration = [
  body("userName")
    .isLength({ min: 3 })
    .notEmpty()
    .withMessage("Username is required"),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one digit.")
    .notEmpty()
    .withMessage("Password is required."),
];
