import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // Check for token in cookies and headers
    const token =
      req.cookies?.authToken || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      console.log("No token found in request");
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      console.log("Invalid token");
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = { id: decoded.id, isAdmin: decoded.isAdmin };
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
