const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");

// Main user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    index: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    index: true,
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  role: {
    type: String,
    required: true,
    enum: ["client", "vendor", "rider", "admin"],
  },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  profilePicture: { type: String },
  phoneNumber: { type: String, required: true },
  socialMediaHandles: { type: Map, of: String },
  details: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function (v) {
        return v && Object.keys(v).length > 0;
      },
      message: "Details based on role are required.",
    },
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

// Enhancing the Joi validation
const userValidationSchema = Joi.object({
  username: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(5).max(255).email().required(),
  password: Joi.string().min(5).max(255).alphanum().required(),
  role: Joi.string().valid("client", "vendor", "rider", "admin").required(),
  isActive: Joi.boolean(),
  profilePicture: Joi.string(),
  phoneNumber: Joi.string().required(),
  socialMediaHandles: Joi.object().pattern(/^/, Joi.string()),
  details: Joi.object().required(), // Validate based on role within application logic as needed
});

exports.User = User;
exports.UserValidator = userValidationSchema;
