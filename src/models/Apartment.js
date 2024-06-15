import mongoose from "mongoose";

const ApartmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Title: {
    type: String,
    // required: true,
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
  // rating: {
  //   type: Number,
  //   min: 0.0,
  //   max: 5.0,
  // },
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
    // required: true,
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
  Toilets: {
    type: Number,
    required: true,
  },
  LivingRoom: {
    type: Number,
    required: true,
  },
  size: {
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
  isAccepted: {
    type: Boolean,
    default: false,
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
ApartmentSchema.pre("save", function (next) {
  if (this.isNew) {
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 48);
    this.justAddedExpiration = expirationTime;
  }
  next();
});

// Reset the justAdded field to false if the justAddedExpiration time has passed
ApartmentSchema.pre("findOne", function (next) {
  this.populate("justAddedExpiration");
  next();
});

ApartmentSchema.pre(/^find/, function (next) {
  this.find({ justAddedExpiration: { $lte: new Date() } }).updateMany({
    justAdded: false,
  });
  next();
});

const Apartment =
  mongoose.models?.Apartments || mongoose.model("Apartments", ApartmentSchema);
module.exports = Apartment;
