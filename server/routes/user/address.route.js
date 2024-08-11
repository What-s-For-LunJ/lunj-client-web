const express = require("express");
const authMiddleware = require("../../middleware/auth.middleware");
const Address = require("../../models/address.model");
const asyncMiddleware = require("../../middleware/async.middleware");
const Joi = require("joi");

const router = express.Router();

// Add a new address
router.post(
  "/",
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    const { error } = validateAddress(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Check if the address already exists for the user
    const existingAddress = await Address.findOne({
      user: req.user._id,
      label: req.body.label,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2 || "",
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
    });

    if (existingAddress) {
      return res.status(400).json({ error: "This address already exists." });
    }

    const address = new Address({ ...req.body, user: req.user._id });
    await address.save();

    res.status(201).json(address);
  })
);

// Get all addresses for the authenticated user
router.get(
  "/",
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    const addresses = await Address.find({ user: req.user._id });
    res.json(addresses);
  })
);

// Update an address
router.put(
  "/:id",
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    const { error } = validateAddress(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Check if the updated address would duplicate another existing address
    const duplicateAddress = await Address.findOne({
      user: req.user._id,
      label: req.body.label,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2 || "",
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
      _id: { $ne: req.params.id },
    });

    if (duplicateAddress) {
      return res
        .status(400)
        .json({
          error: "This address would duplicate another existing address.",
        });
    }

    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!address) return res.status(404).json({ error: "Address not found." });

    res.json(address);
  })
);

// Delete an address
router.delete(
  "/:id",
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    const deleteResult = await Address.deleteOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (deleteResult.deletedCount === 1) {
      res.json({ message: "Address deleted successfully." });
    } else {
      res.status(404).json({
        error: "Address not found or you don't have permission to delete it.",
      });
    }
  })
);

// Validate address input
const validateAddress = (address) => {
  const schema = Joi.object({
    label: Joi.string().valid("primary", "home", "office").required(),
    addressLine1: Joi.string().max(255).required(),
    addressLine2: Joi.string().max(255).allow(""),
    city: Joi.string().max(100).required(),
    postalCode: Joi.string().max(20).required(),
    country: Joi.string().max(100).required(),
  });

  return schema.validate(address);
};

module.exports = router;
