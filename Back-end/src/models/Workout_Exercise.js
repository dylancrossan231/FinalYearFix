const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Workout_Exercise = new mongoose.Schema({
  sets: [
    {
      weight: {
        type: Number,
      },
      rep: {
        type: Number,
      },
    },
  ],
  exercise: {
    type: Schema.Types.ObjectId,
    ref: "Exercises",
  },
  workout: {
    type: Schema.Types.ObjectId,
    ref: "Workouts",
  },
});

module.exports = mongoose.model("Workout_Exercise", Workout_Exercise);
