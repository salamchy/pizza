import Reservation from "../models/reservation.model.js";

/**
 * @desc Create a new reservation
 * @route POST /api/reservations/create-reservation
 * @access Private (User)
 */
export const createReservation = async (req, res) => {
  try {
    const { name, email, phone, person, date } = req.body;
    const userId = req.user.id; // Get user ID from token

    if (!name || !email || !phone || !person || !date) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const reservation = new Reservation({
      user: userId,
      name,
      email,
      phone,
      person,
      date,
      status: "Pending",
    });

    await reservation.save();
    return res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      reservation,
    });
  } catch (error) {
    console.error("Create Reservation Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * @desc Get a single reservation by user ID
 * @route GET /api/reservations/user-reservation
 * @access Private (User)
 */
export const getUserReservation = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from token
    const reservation = await Reservation.findOne({ user: userId });

    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found" });
    }

    return res.status(200).json({ success: true, reservation });
  } catch (error) {
    console.error("Get User Reservation Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * @desc Get all reservations (Admin)
 * @route GET /api/reservations/all-reservations
 * @access Private (Admin)
 */
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    return res.status(200).json({ success: true, reservations });
  } catch (error) {
    console.error("Get All Reservations Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * @desc Update reservation status (Admin)
 * @route PUT /api/reservations/update-reservation/:id
 * @access Private (Admin)
 */
export const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Confirmed"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found" });
    }

    reservation.status = status;
    await reservation.save();

    return res.status(200).json({
      success: true,
      message: "Reservation status updated successfully",
      reservation,
    });
  } catch (error) {
    console.error("Update Reservation Status Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
