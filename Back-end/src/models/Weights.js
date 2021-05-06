const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const weightsSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: "Weight amount is required",
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Weights", weightsSchema);
