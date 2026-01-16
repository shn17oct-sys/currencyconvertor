const mongoose = require("mongoose");

const convertSchema = new mongoose.Schema(
  {
    fromCurrency: String,
    toCurrency: String,
    fromValue: Number,
    toValue: Number,
    exchangeRate: Number
  },
  { timestamps: true }
);

// 👇 forces collection name = converts
module.exports = mongoose.model("Convert", convertSchema, "converts");
