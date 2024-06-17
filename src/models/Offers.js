const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
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
