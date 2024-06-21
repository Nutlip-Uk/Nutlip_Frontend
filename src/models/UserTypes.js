import mongoose from "mongoose";

const userTypeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: [
      "property_seeker",
      "Real_estate_agent",
      "Mortgage_broker",
      "Conveyancer",
      "private_seller",
      "guest",
    ],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
});

const UserType =
  mongoose.models?.UserTypes || mongoose.model("UserTypes", userTypeSchema);

export default UserType;
