/******************************************************************
 * ITE5315 – Project
 * I declare that this assignment is my own work in accordance with Humber Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 * Name: ___________________
 * Student ID: _______________
 * Date: ____________________
 ******************************************************************/

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/restaurants", restaurantRoutes);

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
