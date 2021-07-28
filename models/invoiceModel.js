const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    invoiceDate: {
      type: String,
      required: true,
    },
    duaDate: {
      type: String,
    },
    delivaryDate: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      default: [],
    },
    total: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("invoice", invoiceSchema);
