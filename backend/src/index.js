import dotenv from "dotenv";
import connectDB from "../database/index.js";
import { app } from "./app.js";

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB()
  .then(() => {
    // Define the port to run the server on, either from the environment variables or default to 4000
    const PORT = process.env.PORT || 4000;

    // Start the server and listen on the specified port
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  })
  .catch((err) => {
    // Log an error message if the database connection fails
    console.log("MONGO DB connection failed !!!", err);
  });
