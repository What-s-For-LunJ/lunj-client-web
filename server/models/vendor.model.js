const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  businessName: String,
  businessAddress: String,
  menu: [
    {
      itemName: String,
      itemPrice: Number,
    },
  ],
  ordersReceived: [
    {
      orderId: mongoose.Schema.Types.ObjectId,
      orderDate: Date,
      status: String,
    },
  ],
  promos: [
    {
      promoId: mongoose.Schema.Types.ObjectId,
      description: String,
      expirationDate: Date,
    },
  ],
});

const Vendor = mongoose.model("Vendor", vendorSchema);

exports.Vendor = Vendor;
