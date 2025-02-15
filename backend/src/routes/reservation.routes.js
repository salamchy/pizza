import express from "express";
import {
  createReservation,
  getUserReservation,
  getAllReservations,
  updateReservationStatus,
} from "../controllers/reservation.controllers.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { validateReservation } from "../middleware/validateReservation.js";

const router = express.Router();

// User: Create a reservation (Token required)
router.post(
  "/create-reservation",
  verifyToken,
  validateReservation,
  createReservation
);

// User: Get their reservation (Token required)
router.get("/user-reservation", verifyToken, getUserReservation);

// Admin: Get all reservations (Token + Admin access required)
router.get("/all-reservations", verifyToken, verifyAdmin, getAllReservations);

// Admin: Update reservation status (Token + Admin access required)
router.put(
  "/update-reservation/:id",
  verifyToken,
  verifyAdmin,
  updateReservationStatus
);

export default router;
