const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../../models/user.model");
const Joi = require("joi");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const asyncMiddleware = require("../../middleware/async.middleware");

const router = express.Router();

// Security enhancements with helmet
router.use(helmet());

// Rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 login requests per `window` per 15 minutes
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
});

router.post(
  "/",
  loginLimiter,
  asyncMiddleware(async (req, res) => {
    // Validate the request body
    const { error } = validateUser(req.body);
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
  })
);

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).alphanum().required(),
  });

  return schema.validate(user);
};

module.exports = router;
