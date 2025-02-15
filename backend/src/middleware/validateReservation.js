import { body, validationResult } from "express-validator";

// Validation rules for reservation form
export const validateReservation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").isMobilePhone().withMessage("Valid phone number is required"),
  body("person")
    .isInt({ min: 1 })
    .withMessage("Number of persons must be at least 1"),
  body("date").isISO8601().withMessage("Valid date is required"),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
