const mongoose = require("mongoose");
const Joi = require("joi");

const catalogueSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemName: { type: String, required: true },
  itemPrice: { type: Number, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Catalogue = mongoose.model("Catalogue", catalogueSchema);

const catalogueValidationSchema = Joi.object({
  vendorId: Joi.string().required(),
  itemName: Joi.string().required(),
  itemPrice: Joi.number().required(),
  description: Joi.string(),
});

module.exports = {
  Catalogue,
  CatalogueValidator: catalogueValidationSchema,
};
