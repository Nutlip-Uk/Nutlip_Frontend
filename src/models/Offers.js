const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  offerPrice: {
    type: Number,
    required: true,
  },
  // ...
  apartmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Apartments",
  },
  date: { type: Date, required: true, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  FullName: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Interested: {
    type: Boolean,
    required: true,
  },
  PriceOffer: {
    type: Number,
    required: true,
  },
  NutlipCommission: {
    type: Number,
    required: true,
  },
  receivedPayment: {
    type: Number,
    required: true,
  },
  PaymentType: {
    type: String,
    required: true,
  },
  cryptoType: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  transaction_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  offerCheckedDate: { type: Date },
});

const Offer = mongoose.models?.Offers || mongoose.model("Offers", offerSchema);

export default Offer;
