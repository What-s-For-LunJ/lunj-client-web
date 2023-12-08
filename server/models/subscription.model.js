const Joi = require("joi");
const mongoose = require("mongoose");

// Define schema
const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["weekly", "monthly", "specificDates"],
    required: true,
  },
  specificDates: [
    {
      dayOfWeek: String, // For weekly subscriptions
      dayOfMonth: Number, // For monthly subscriptions
      date: Date, // For specific dates subscriptions
    },
  ],
  deliveryType: {
    type: String,
    enum: ["delivery", "pickup"],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model & collection
const Subscription = mongoose.model("Subscription", subscriptionSchema);

// Validation schema
const subscriptionValidationSchema = Joi.object({
  userId: Joi.string().required(),
  type: Joi.string().valid("weekly", "monthly", "specificDates").required(),
  specificDates: Joi.when("type", {
    is: "specificDates",
    then: Joi.array()
      .items(
        Joi.object({
          dayOfWeek: Joi.string(), // For weekly subscriptions
          dayOfMonth: Joi.number(), // For monthly subscriptions
          date: Joi.date(), // For specific dates subscriptions
        })
      )
      .required(),
    otherwise: Joi.forbidden(),
  }),
  deliveryType: Joi.string().valid("delivery", "pickup").required(),
  isActive: Joi.boolean(),
});

exports.Subscription = Subscription;
exports.SubscriptionValidator = subscriptionValidationSchema;
