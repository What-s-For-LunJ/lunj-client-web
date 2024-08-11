const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/user.model");
const asyncMiddleware = require("../../middleware/async.middleware");
const Joi = require("joi");

const router = express.Router();

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    // Validate the request body
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password." });

    // Check if the password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ error: "Invalid email or password." });

    // Generate the authentication token
    const token = user.generateAuthToken();

    // Send the authentication token in the response body
    res.json({
      token,
    });
  })
);

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
};

module.exports = router;
