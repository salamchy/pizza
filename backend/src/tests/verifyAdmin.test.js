import request from "supertest";
import app from "../app.js"; // Assuming app.js exports the Express app
import User from "../models/user.models.js";
import mongoose from "mongoose";

describe("Verify Admin Middleware", () => {
  let adminUser;
  let nonAdminUser;

  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create test users
    adminUser = await User.create({
      userName: "adminUser",
      email: "admin@example.com",
      password: "password123",
      isAdmin: true,
    });

    nonAdminUser = await User.create({
      userName: "nonAdminUser",
      email: "user@example.com",
      password: "password123",
      isAdmin: false,
    });
  });

  afterAll(async () => {
    // Clean up the test database
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should allow admin user to access protected route", async () => {
    const response = await request(app)
      .post("/carousel")
      .set("Authorization", `Bearer ${adminUser._id}`) // Simulate admin token
      .send({ image: "testImage.jpg" });

    expect(response.status).toBe(200);
  });

  it("should deny non-admin user access to protected route", async () => {
    const response = await request(app)
      .post("/carousel")
      .set("Authorization", `Bearer ${nonAdminUser._id}`) // Simulate non-admin token
      .send({ image: "testImage.jpg" });

    expect(response.status).toBe(403);
  });
});
