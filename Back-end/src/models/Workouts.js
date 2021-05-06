const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WorkoutsSchema = new mongoose.Schema({
  workout_name: {
    type: String,
    unique: "Workout Name Already Exists",
    required: "Workout Name is required",
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },

  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Workout_Exercise",
    },
  ],
});

module.exports = mongoose.model('Workouts', WorkoutsSchema)