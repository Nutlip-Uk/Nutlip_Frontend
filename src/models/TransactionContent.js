const mongoose = require("mongoose");

const TransactionContents = new mongoose.Schema({
  funds_verification: {
    type: String,
  },
  //   ....
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const transactionContents =
  mongoose.models?.TransactionContents ||
  mongoose.model("TransactionContents", TransactionContents);

export default transactionContents;
