const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/user.model");
const asyncMiddleware = require("../../middleware/async.middleware");
const Joi = require("joi");
const { registerLimiter } = require("../../middleware/rateLimiter.middleware");

const router = express.Router();

router.post(
  "/",
  registerLimiter,
  asyncMiddleware(async (req, res) => {
    // Validate the request body
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check for existing user by email
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(400).send("Email is already registered.");

    // Create a new user
    const user = new User(req.body);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save the user to the database
    await user.save();

    // Generate and send the authentication token
    const token = user.generateAuthToken();
    res.json({
      token,
      _id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });
  })
);

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    phoneNumber: Joi.string().min(10).max(15).required(),
    password: Joi.string().min(5).max(255).required(),
    role: Joi.string().valid("client", "vendor", "rider", "admin").required(),
  });

  return schema.validate(user);
};

module.exports = router;
