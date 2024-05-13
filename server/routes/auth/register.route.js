const express = require("express");
const bcrypt = require("bcrypt");
const { User, UserValidator } = require("../../models/user.model");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const asyncMiddleware = require("../../middleware/async.middleware");

const router = express.Router();

// Helmet for basic security
router.use(helmet());

// Rate limiting to prevent brute force on registration
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    "Too many accounts created from this IP, please try again after an hour",
});

router.post(
  "/",
  createAccountLimiter,
  asyncMiddleware(async (req, res) => {
    // Validate the request body
    const { error } = UserValidator.validate(req.body);
    if (error) return res.status(400).send("Invalid user data.");

    // Check for existing user by email or username
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (existingUser)
      return res.status(400).send("Email or username already registered.");

    // Create a new user
    const user = new User(req.body);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save the user to the database
    await user.save();

    // Generate and send the authentication token
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  })
);

module.exports = router;
