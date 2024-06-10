import mongoose from "mongoose";

const PrivateListingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  StreetAddress: {
    type: String,
    required: true,
  },
  PostalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  YearBuilt: {
    type: Number,
    required: true,
  },
  Title: {
    type: String,
  },
  Appliances: {
    type: String,
    enum: [
      "Air_conditioner",
      "washing_machine",
      "Dishwasher",
      "Gas/Electric_cooker",
      "Refrigerator",
      "Oven",
      "Microwave",
      "Other",
    ],
  },
  Basement: {
    type: String,
    enum: ["Yes", "No"],
  },
  FloorCovering: {
    type: String,
    enum: [
      "Laminate",
      "Vinyl",
      "Tile",
      "Carpet",
      "Hardwood_Flooring",
      "Stone_Flooring",
      "Cork",
      "Other",
    ],
  },
  Utility_types: {
    type: String,
    enum: ["Electricity", "Water", "Heating"],
  },
  Heating_types: {
    type: String,
    enum: [
      "Boilers",
      "Furnaces",
      "Heat_pumps",
      "Gas_fired_spaced_heaters",
      "Electric_heater",
      "Fireplaces",
      "wood_burning_and_pellet_stoves",
    ],
  },
  Heating_fuel: {
    type: String,
    enum: [
      "Oil",
      "Solar",
      "Electricity",
      "LPG",
      "Air_source_heat_pumps",
      "Biomass",
    ],
  },
  purpose: {
    type: String,
    enum: ["For_Rent", "For_Buy"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    // required: true,
  },

  images: [String], // Still allows an empty array for no images
  address: {
    type: String,
    // required: true,
  },
  Landmark: {
    type: String,
    // required: true,
  },
  Radius: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
    required: true,
  },
  typeOfProperty: {
    type: String,
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
    type: String,
    enum: ["new_property", "retirement_home", "auction", "shared_ownership"],
    // default: [],
    required: false,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  Rooms: {
    type: Number,
    required: true,
  },
  Toilets: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  LivingRoom: {
    type: Number,
    required: true,
  },
  stateOfProperty: {
    type: String,
    enum: ["sold_stc", "under_offer"],
    required: true,
  },
  // name: String, // Optional String remains
  description: {
    type: String,
    // required: true,
  },
  Amount: {
    type: Number,
    // required: true,
  },
  Minimum_offer: {
    type: Number,
    // required: true,
  },
  Currency: {
    type: String,
    required: true,
    //todo add other currency
    enum: ["USD", "EUR", "GBP"],
    // default: ["USD"],
  },
  Add_features: {
    type: String,
    enum: ["Elevator", "Stairs"],
    required: true,
  },
  video_link: {
    type: String,
  },
  virtual_tour_link: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: Number,
    required: false,
  },
  Preferred_email_address: {
    type: String,
    required: false,
  },
  PCM: {
    type: Integer,
  },
  PCW: {
    type: Integer,
  },
  justAddedExpiration: {
    type: Boolean,
    default: true,
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

// Set the justAddedExpiration field to 48 hours from the current time
PrivateListingSchema.pre("save", function (next) {
  if (this.isNew) {
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 48);
    this.justAddedExpiration = expirationTime;
  }
  next();
});

// Reset the justAdded field to false if the justAddedExpiration time has passed
PrivateListingSchema.pre("findOne", function (next) {
  this.populate("justAddedExpiration");
  next();
});

PrivateListingSchema.pre(/^find/, function (next) {
  this.find({ justAddedExpiration: { $lte: new Date() } }).updateMany({
    justAdded: false,
  });
  next();
});

const PrivateListing =
  mongoose.models?.PrivateListings ||
  mongoose.model("PrivateListings", PrivateListingSchema);
module.exports = PrivateListing;
