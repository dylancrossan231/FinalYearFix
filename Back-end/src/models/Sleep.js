const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sleepSchema = new mongoose.Schema({
  hours: {
    type: Number,
    required: "Hours of sleep is required",
  },
  minutes: {
    type: Number,
    required: "Minutes of sleep is required",
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

module.exports = mongoose.model("Sleeps", sleepSchema);
