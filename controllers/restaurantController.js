const Restaurant = require("../models/restaurant");

// POST: Add a new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    // Check if the restaurant already exists (based on name and address, or any unique field like restaurant_id)
    const existing = await Restaurant.findOne({
      name: req.body.name,
      "address.street": req.body.address?.street,
    });

    if (existing) {
      return res.status(409).json({ message: "Restaurant already exists.", data:  existing});
    }

    const newRestaurant = new Restaurant(req.body);
    const saved = await newRestaurant.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to add restaurant", error: err });
  }
};


// GET: List restaurants with optional borough filter and pagination
exports.getRestaurants = async (req, res) => {
  const { page = 1, perPage = 10, borough } = req.query;
  const query = borough ? { borough } : {};

  try {
    const restaurants = await Restaurant.find(query)
      .sort({ restaurant_id: 1 })
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch restaurants", error: err });
  }
};

// GET: Get restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant) res.json(restaurant);
    else res.status(404).json({ message: "Restaurant not found" });
  } catch (err) {
    res.status(500).json({ message: "Error fetching restaurant", error: err });
  }
};

// PUT: Update restaurant by ID
exports.updateRestaurant = async (req, res) => {
  try {
    const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updated) res.json(updated);
    else res.status(404).json({ message: "Restaurant not found" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update", error: err });
  }
};

// DELETE: Delete restaurant by ID
exports.deleteRestaurant = async (req, res) => {
  try {
    const result = await Restaurant.findByIdAndDelete(req.params.id);
    if (result) res.status(204).send();
    else res.status(404).json({ message: "Restaurant not found" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete", error: err });
  }
};
