const mongoose = require("mongoose");

const offerTransactionSchema = new mongoose.Schema({
  offerId: {
    type: mongoose.Schema.ObjectId,
    ref: "Offer",
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  ApartmentId: {
    type: mongoose.Schema.ObjectId,
    ref: "Apartment",
    required: true,
  },
  transactionCurrentStage: {
    type: Number,
    default: 1,
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
