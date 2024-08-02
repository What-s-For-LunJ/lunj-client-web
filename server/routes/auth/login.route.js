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
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
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
