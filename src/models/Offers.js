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
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  offerCheckedDate: { type: Date },
});

const Offer = mongoose.models?.Offers || mongoose.model("Offers", offerSchema);

// Function to update the offer status
const acceptOffer = async (offerId) => {
  try {
    const updatedOffer = await Offer.findOneAndUpdate(
      { _id: offerId },
      { status: "accepted", offerCheckedDate: Date.now() },
      { new: true }
    );
    console.log("Offer accepted:", updatedOffer);
  } catch (err) {
    console.error("Error accepting offer:", err);
  }
};

export default Offer;
export { acceptOffer };
