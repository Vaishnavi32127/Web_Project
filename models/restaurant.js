const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  date: Date,
  grade: String,
  score: Number,
});

const restaurantSchema = new mongoose.Schema({
  address: {
    building: String,
    coord: [Number],
    street: String,
    zipcode: String,
  },
  borough: String,
  cuisine: String,
  grades: [gradeSchema],
  name: String,
  restaurant_id: String,
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
