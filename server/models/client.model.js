const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  deliveryAddress: String,
  paymentInfo: mongoose.Schema.Types.Mixed, // Consider encrypting sensitive data
  subscriptionPlan: String,
  deliverySchedule: [
    {
      dayOfWeek: String,
      timeOfDay: String,
    },
  ],
  orderHistory: [
    {
      orderId: mongoose.Schema.Types.ObjectId,
      orderDate: Date,
      status: String,
    },
  ],
  vouchers: [
    {
      voucherId: mongoose.Schema.Types.ObjectId,
      applied: Boolean,
      expirationDate: Date,
    },
  ],
});

const Client = mongoose.model("Client", clientSchema);

exports.Client = Client;
