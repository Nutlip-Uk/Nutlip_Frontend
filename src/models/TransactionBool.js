const mongoose = require("mongoose");

const TransactionBool = new mongoose.Schema({
  transaction_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  first: {
    type: Boolean,
    default: false,
  },
  second: {
    type: Boolean,
    default: false,
  },
  third: {
    type: Boolean,
    default: false,
  },
  fourth: {
    type: Boolean,
    default: false,
  },
  fifth: {
    type: Boolean,
    default: false,
  },
  sixth: {
    type: Boolean,
    default: false,
  },
  seventh: {
    type: Boolean,
    default: false,
  },
  eight: {
    type: Boolean,
    default: false,
  },
  nine: {
    type: Boolean,
    default: false,
  },
  ten: {
    type: Boolean,
    default: false,
  },
  eleven: {
    type: Boolean,
    default: false,
  },
  twelve: {
    type: Boolean,
    default: false,
  },
  thirteen: {
    type: Boolean,
    default: false,
  },
  fourteen: {
    type: Boolean,
    default: false,
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

const transactionBool =
  mongoose.models?.TransactionBool ||
  mongoose.model("TransactionBool", TransactionBool);

export default transactionBool;
