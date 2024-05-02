import mongoose from "mongoose";

const privateListingSchema = new mongoose.Schema({
  Amount: {
    type: Number,
    required: true,
  },
  minimum_offer: {
    type: Number,
    required: true,
  },
  Currency: {
    type: String,
    required: true,
    //todo add other currency
    enum: ["USD", "EUR", "GBP"],
  },
  Title: {
    type: String,
    required: true,
  },
  purpose: {
    type: [String],
    enum: ["For_Rent", "For_Sale", "short_list"],
    required: true,
  },
  typeOfProperty: {
    type: [String],
    enum: [
      "co-working_space",
      "commercial_property",
      "flat/apartment",
      "House",
      "land",
    ],
    required: true,
  },
  subTypeOfProperty: {
    type: [String],
    required: false,
  },
  bedrooms: {
    type: [String],
    required: true,
  },
  bathrooms: {
    type: [String],
    required: true,
  },
  Toilets: {
    type: [String],
    required: true,
  },
  stateOfProperty: {
    type: String,
    required: true,
  },
  size: {
    type: [Number],
    required: true,
  },
  year_built: {
    type: Number,
    required: true,
  },
  Appliances: {
    type: [String],
    enum: [
      "Boiler",
      "Washing_machine",
      "Dishwasher",
      "Gas/Electric_cooker",
      "Air_Conditioner",
      "Ovens",
      "MicroWave",
      "Others",
    ],
    required: true,
  },
  Basement: {
    type: [string],
    enum: ["yes", "no"],
  },
  Floor_covering: {
    type: [string],
    enum: [
      "Laminate",
      "Vinyl",
      "Carpet",
      "Hardwood_flooring",
      "Stone_flooring",
      "Cork",
      "Other",
    ],
  },
  Utility_types: {
    type: [string],
    enum: ["Electricity", "Heating", "Water"],
  },
  Heating_type: {
    type: [string],
    enum: [
      "Boilers",
      "Furnaces",
      "Heat_Pumps",
      "Gas_fired_space-heaters",
      "Electric_heaters",
      "Wood_burning_and_pellet_stoves",
      "fireplace",
    ],
  },
  heating_unit: {
    type: [String],
    enum: [
      "Gas",
      "Electricity",
      "Solar",
      "LPG",
      "Air_source_heat_pumps",
      "Biomass",
    ],
  },
  description: {
    type: String,
    required: true,
  },
  Video_link: {
    type: String,
    required: true,
  },
  Video_tour_link: {
    type: String,
    required: true,
  },
  add_features: {
    type: String,
    required: true,
  },
  floor_plan: {
    type: String,
  },
  upload_pictures: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isSold: {
    type: Boolean,
    default: false,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  date_updated: {
    type: Date,
    default: null,
  },
});

export const PrivateListing =
  mongoose.models?.PrivateListing ||
  mongoose.model("PrivateListing", privateListingSchema);
