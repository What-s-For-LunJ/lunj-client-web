const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dietaryPreferences: {
    type: [String],
    enum: ["Vegetarian", "Vegan", "Gluten-Free", "Halal", "Kosher", "None"],
  },
  cuisinePreferences: {
    type: [String],
    enum: ["Italian", "Chinese", "Indian", "Mexican", "Thai", "American"],
  },
});

const Preference = mongoose.model("Preference", preferenceSchema);

module.exports = Preference;
