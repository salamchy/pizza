import MenuModel from "../models/menu.model.js";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";

//create menu items
export const createMenuItems = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    if (
      !["dessert", "pizza", "burger", "salad", "noodles"].includes(category)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid category. Must be one of: dessert, pizza, burger, salad, noodles",
      });
    }

    let imageUrl = null;
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "menu-items",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      imageUrl = result.secure_url;
    }

    const newMenuItem = new MenuModel({
      name,
      price,
      description,
      category,
      stock,
      imageUrl,
    });

    await newMenuItem.save();
    res.status(201).json({
      success: true,
      data: newMenuItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all menu items with search
export const getAllMenuItems = async (req, res) => {
  try {
    const { name, minPrice, maxPrice, category } = req.query;

    let filter = {};

    if (name) filter.name = { $regex: name, $options: "i" }; // i case insensitive
    if (
      category &&
      ["dessert", "pizza", "burger", "salad", "noodles"].includes(category)
    ) {
      filter.category = category;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const menuItems = await MenuModel.find(filter).sort({ price: -1 });
    res.status(200).json({
      success: true,
      data: menuItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get Single Menu Item by ID
export const getSingleMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuModel.findById(req.params.id);
    if (!menuItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Update Menu Item
export const updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuModel.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Prepare an object for updated fields
    const updatedFields = {};

    // Update fields based on the request body (which might come from FormData)
    if (req.body.name) updatedFields.name = req.body.name;
    if (req.body.price) updatedFields.price = parseFloat(req.body.price); // Ensure price is a number
    if (req.body.description) updatedFields.description = req.body.description;
    if (req.body.category) updatedFields.category = req.body.category;
    if (req.body.stock) updatedFields.stock = parseInt(req.body.stock); // Ensure stock is an integer

    // Handle image upload if a new image is provided
    let imageUrl = menuItem.imageUrl; // Default to existing image URL
    if (req.file) {
      // Delete the existing image from Cloudinary if it exists
      if (imageUrl) {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`menu-items/${publicId}`);
      }

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "menu-items", resource_type: "auto" }, // Ensure this matches your setup
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      imageUrl = uploadResult.secure_url;
      updatedFields.imageUrl = imageUrl; // Update the image URL
    }

    // Update the menu item in the database
    const updatedItem = await MenuModel.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not updated" });
    }

    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    console.error("Error updating menu item:", error);
    if (error.name === "ValidationError") {
      return res.status(422).json({
        success: false,
        message: "Validation Error",
        errors: error.errors,
      });
    }
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the menu item",
    });
  }
};

//  Delete Menu Item
export const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuModel.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    // Delete the image from Cloudinary if it exists
    if (menuItem.imageUrl) {
      const publicId = menuItem.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`menu-items/${publicId}`);
    }

    res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Get All Menu Items for Admin
export const getAllMenuItemsForAdmin = async (req, res) => {
  try {
    const menuItems = await MenuModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//users
export const getAllMenuItemsForUser = async (req, res) => {
  try {
    const results = {};

    // Fetch all menu items without pagination
    results.menuItems = await MenuModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: results.menuItems.length,
      data: results.menuItems,
    });
  } catch (error) {
    console.error("Error in getAllMenuItemsForUser:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
