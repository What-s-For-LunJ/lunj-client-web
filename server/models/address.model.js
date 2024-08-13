const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  label: {
    type: String,
    enum: ["primary", "home", "office"],
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
    maxlength: 255,
  },
  addressLine2: {
    type: String,
    maxlength: 255,
  },
  city: {
    type: String,
    required: true,
    maxlength: 100,
  },
  postalCode: {
    type: String,
    required: true,
    maxlength: 20,
  },
  country: {
    type: String,
    required: true,
    maxlength: 100,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
