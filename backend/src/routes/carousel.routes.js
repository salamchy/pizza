import express from "express";
import {
  addCarouselImage,
  deleteCarouselImage,
  getCarouselImages,
} from "../controllers/carousel.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post(
  "/upload-image",

  verifyToken,
  upload.single("image"),
  verifyAdmin,
  addCarouselImage
);
router.delete("/carousel/:id", verifyToken, verifyAdmin, deleteCarouselImage);
router.get("/get-image", getCarouselImages);

export default router;
