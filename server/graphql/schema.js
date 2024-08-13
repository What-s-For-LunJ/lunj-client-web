const { buildSchema } = require("graphql");
const Preference = require("../models/preference.model");
const Address = require("../models/address.model");

const schema = buildSchema(`
  type Preference {
    dietaryPreferences: [String]
    cuisinePreferences: [String]
  }

  type Address {
    id: ID!
    label: String!
    addressLine1: String!
    addressLine2: String
    city: String!
    postalCode: String!
    country: String!
  }

  type Query {
    preferences: Preference
    addresses: [Address]
  }
`);

const root = {
  preferences: async (args, req) => {
    const userId = req.user._id;
    const preference = await Preference.findOne({ user: userId });
    return preference || null;
  },
  addresses: async (args, req) => {
    const userId = req.user._id;
    const addresses = await Address.find({ user: userId });
    return addresses;
  },
};

module.exports = { schema, root };
