const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const nutritionSchema = new mongoose.Schema({
  protein: {
    type: Number,
    required: "Protein amount is required",
  },
  carbohydrate: {
    type: Number,
    required: "Carbohydrate amount is required",
  },
  fats: {
    type: Number,
    required: "Minutes of sleep is required",
  },
  calories: {
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

module.exports = mongoose.model("Nutrition", nutritionSchema);
