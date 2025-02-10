import { verifyToken } from "./verifyToken.js";
import User from "../models/user.models.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    // First, verify the token
    const tokenResult = await verifyToken(req, res, next);
    if (!tokenResult) return;

    // Check if the user is an admin
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
