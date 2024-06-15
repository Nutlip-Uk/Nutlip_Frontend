const mongoose = require("mongoose");

const offerTransactionSchema = new mongoose.Schema({
  offerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offer",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ApartmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const OfferTransaction =
  mongoose.models?.OfferTransactions ||
  mongoose.model("OfferTransactions", offerTransactionSchema);

export default OfferTransaction;
