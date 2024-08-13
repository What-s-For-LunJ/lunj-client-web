const express = require("express");
const authMiddleware = require("../../middleware/auth.middleware");
const Preference = require("../../models/preference.model");
const asyncMiddleware = require("../../middleware/async.middleware");
const Joi = require("joi");

const router = express.Router();

// Add or update preferences
router.post(
  "/",
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    const { error } = validatePreference(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Find the user's existing preference
    let preference = await Preference.findOne({ user: req.user._id });

    if (preference) {
      // Update existing preference
      preference = await Preference.findOneAndUpdate(
        { user: req.user._id },
        req.body,
        { new: true }
      );
    } else {
      // Create new preference
      preference = new Preference({ ...req.body, user: req.user._id });
      await preference.save();
    }

    res.status(200).json(preference);
  })
);

// Get user's preferences
router.get(
  "/",
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    const preference = await Preference.findOne({ user: req.user._id });
    if (!preference)
      return res.status(404).json({ error: "Preferences not found." });
    res.json(preference);
  })
);

// Update preferences
router.put(
  "/",
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    const { error } = validatePreference(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Ensure the user has an existing preference
    const preference = await Preference.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true }
    );

    if (!preference)
      return res.status(404).json({ error: "Preferences not found." });

    res.status(200).json(preference);
  })
);

// Delete user's preferences
router.delete(
  "/",
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    const preference = await Preference.findOneAndDelete({
      user: req.user._id,
    });

    if (!preference)
      return res.status(404).json({ error: "Preferences not found." });

    res.json({ message: "Preferences deleted successfully." });
  })
);

// Validation function
const validatePreference = (preference) => {
  const schema = Joi.object({
    dietaryPreferences: Joi.array()
      .items(
        Joi.string().valid(
          "Vegetarian",
          "Vegan",
          "Gluten-Free",
          "Halal",
          "Kosher",
          "Any"
        )
      )
      .unique(),
    cuisinePreferences: Joi.array()
      .items(
        Joi.string().valid(
          "Italian",
          "Chinese",
          "Indian",
          "Mexican",
          "Thai",
          "American",
          "Any"
        )
      )
      .unique(),
  });

  return schema.validate(preference);
};

module.exports = router;
