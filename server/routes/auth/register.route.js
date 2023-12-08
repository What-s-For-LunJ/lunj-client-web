const express = require("express");
const bcrypt = require("bcrypt");
const { User, UserValidator } = require("../../models/user.model");
const Joi = require("joi");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = UserValidator.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the email is already registered
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("User with that email already registered.");

    // Check if the username already exists
    user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("Username already exists.");

    // Create a new user
    user = new User(req.body);

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
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
