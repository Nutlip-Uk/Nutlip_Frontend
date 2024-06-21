const mongoose = require("mongoose");

const TransactionContents = new mongoose.Schema({
  transaction_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  proof_of_funds: {
    type: String,
  },
  proof_of_funds_date: {
    type: Date,
  },
  confirm_proof_of_funds: {
    type: Boolean,
    default: false,
  },
  confirm_proof_of_funds_date: {
    type: Date,
  },
  contract_upload: {
    type: String,
  },
  contract_upload_date: {
    type: Date,
  },
  payment_of_nutlip_commision: {
    type: Boolean,
  },
  payment_of_nutlip_commision_date: {
    type: Date,
  },
  proof_of_funds_10: {
    type: String,
  },
  proof_of_funds_10_date: {
    type: Date,
  },
  completion_date: {
    type: Number, // Assuming completionDate is stored as Unix timestamp
  },
  completion_date_date: {
    type: Date,
  },
  agreeded_on_completion_date_buyer: {
    type: Boolean,
    default: false,
  },
  agreeded_on_completion_date_buyer_date: {
    type: Date,
  },
  agreeded_on_completion_date_seller: {
    type: Boolean,
    default: false,
  },
  agreeded_on_completion_date_seller_date: {
    type: Date,
  },
  confirm_proof_of_funds_10: {
    type: Boolean,
  },
  confirm_proof_of_funds_10_date: {
    type: Date,
  },
  proof_of_funds_90: {
    type: String,
  },
  proof_of_funds_90_date: {
    type: Date,
  },
  confirm_proof_of_funds_90: {
    type: Boolean,
  },
  confirm_proof_of_funds_90_date: {
    type: Date,
  },
  legal_title_document: {
    type: String,
  },
  legal_title_document_date: {
    type: Date,
  },
  researched: {
    type: Boolean,
  },
  researched_date: {
    type: Date,
  },
  convenyancer_buyer: {
    type: mongoose.Schema.Types.ObjectId,
  },
  convenyancer_buyer_date: {
    type: Date,
  },
  convenyancer_seller: {
    type: mongoose.Schema.Types.ObjectId,
  },
  convenyancer_seller_date: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const transactionContents =
  mongoose.models?.TransactionContents ||
  mongoose.model("TransactionContents", TransactionContents);

module.exports = transactionContents;
