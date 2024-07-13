import mongoose from "mongoose";

const userTypeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: [
      "property_seeker",
      "Real_estate_agent",
      "Mortgage_broker",
      "Conveyancer",
      "private_seller",
      "property_buyer",
    ],
    required: true,
  },
});

const UserType =
  mongoose.models.UserType || mongoose.model("UserType", userTypeSchema);

export default UserType;
