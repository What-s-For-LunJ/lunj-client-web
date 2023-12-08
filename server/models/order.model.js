const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  riderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      itemName: { type: String, required: true },
      itemPrice: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "dispatched", "delivered"],
    default: "pending",
  },
  orderType: {
    type: String,
    enum: ["pickup", "delivery"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

const orderValidationSchema = Joi.object({
  clientId: Joi.string().required(),
  vendorId: Joi.string().required(),
  riderId: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object({
        itemName: Joi.string().required(),
        itemPrice: Joi.number().required(),
        quantity: Joi.number().integer().min(1).default(1),
      })
    )
    .required(),
  totalAmount: Joi.number().required(),
  status: Joi.string().valid("pending", "confirmed", "dispatched", "delivered"),
  orderType: Joi.string().valid("pickup", "delivery").required(),
});

module.exports = {
  Order,
  OrderValidator: orderValidationSchema,
};
