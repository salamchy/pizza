import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Create an instance of an Express application
const app = express();

// Enable CORS with specific options
// - origin: allows requests from the specified origin, which is set via environment variable
// - credentials: allows cookies to be included in cross-origin requests
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Parse incoming JSON requests with a body size limit of 16kb
app.use(express.json({ limit: "16kb" }));

// Parse incoming URL-encoded data with a body size limit of 16kb
// - extended: true allows for rich objects and arrays to be encoded into the URL-encoded format
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse cookies from incoming requests and populate req.cookies
app.use(cookieParser());

//import routes
import userRouter from "./routes/user.routes.js";
import carouselsRouter from "./routes/carousel.routes.js";

//routes declaration
app.use("/api/users", userRouter);
app.use("/api/carousels", carouselsRouter);

export { app };
