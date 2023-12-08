const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

// define schema
const userSchema = new mongoose.Schema({
  username: { type: String, minlength: 2, maxlength: 255, required: true },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  password: { type: String, minlength: 5, maxlength: 1024, required: true },
  role: {
    type: String,
    enum: ["client", "vendor", "rider", "admin"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  profilePicture: { type: String },
  phoneNumber: { type: String },
  socialMedia: { type: Object },
  clientDetails: {
    deliveryAddress: { type: String },
    paymentInfo: { type: Object },
    subscriptionPlan: { type: String },
    deliverySchedule: [{ dayOfWeek: String, timeOfDay: String }],
  },
  vendorDetails: {
    businessName: { type: String },
    menu: [{ itemName: String, itemPrice: Number }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  riderDetails: {
    vehicleType: { type: String },
    availability: [{ dayOfWeek: String, timeSlot: String }],
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    config.get("jwtPrivateKey")
  );
  return token;
};

// create a model & collection
const User = mongoose.model("User", userSchema);

const userValidationSchema = Joi.object({
  username: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(5).max(255).email().required(),
  password: Joi.string().min(5).max(255).alphanum().required(),
  role: Joi.string().valid("client", "vendor", "rider", "admin").required(),
  // Client-specific fields validation
  deliveryAddress: Joi.when("role", {
    is: "client",
    then: Joi.string().required(),
    otherwise: Joi.string(),
  }),
  paymentInfo: Joi.when("role", {
    is: "client",
    then: Joi.object().required(),
    otherwise: Joi.object(),
  }),
  subscriptionPlan: Joi.when("role", {
    is: "client",
    then: Joi.string().required(),
    otherwise: Joi.string(),
  }),
  deliverySchedule: Joi.when("role", {
    is: "client",
    then: Joi.array()
      .items(
        Joi.object({
          dayOfMonth: Joi.number().integer().min(1).max(31),
          timeOfDay: Joi.string(),
        })
      )
      .required(),
    otherwise: Joi.array().items(
      Joi.object({
        dayOfWeek: Joi.string(),
        timeOfDay: Joi.string(),
      })
    ),
  }),
  // Vendor-specific fields validation
  businessName: Joi.when("role", {
    is: "vendor",
    then: Joi.string().required(),
    otherwise: Joi.string(),
  }),
  menu: Joi.when("role", {
    is: "vendor",
    then: Joi.array()
      .items(
        Joi.object({
          itemName: Joi.string(),
          itemPrice: Joi.number(),
        })
      )
      .required(),
    otherwise: Joi.array().items(
      Joi.object({
        itemName: Joi.string(),
        itemPrice: Joi.number(),
      })
    ),
  }),
  // Rider-specific fields validation
  vehicleType: Joi.when("role", {
    is: "rider",
    then: Joi.string().required(),
    otherwise: Joi.string(),
  }),
  availability: Joi.when("role", {
    is: "rider",
    then: Joi.array()
      .items(
        Joi.object({
          dayOfWeek: Joi.string(),
          timeSlot: Joi.string(),
        })
      )
      .required(),
    otherwise: Joi.array().items(
      Joi.object({
        dayOfWeek: Joi.string(),
        timeSlot: Joi.string(),
      })
    ),
  }),
  // Shared fields validation
  isActive: Joi.boolean(),
  profilePicture: Joi.string(),
  phoneNumber: Joi.string(),
  socialMedia: Joi.object(),
});

exports.User = User;
exports.UserValidator = userValidationSchema;
