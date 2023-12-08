const express = require("express");
const bcrypt = require("bcrypt");
const { User, UserValidator } = require("../models/user.model");
const Joi = require("joi");

const router = express.Router();

router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    // Check if the password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

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

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).alphanum().required(),
  });

  return schema.validate(user);
};

module.exports = router;
