const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExercisesSchema = new mongoose.Schema({
  exercise_name: {
    type: String,
    unique: "Workout Name Already Exists",
    required: "Workout Name is required",
  },

  instructions: {
    type: String,
    required:"instructions are required"
  },
  exercise_type: {
    type: String,
    trim: true,
    enum: ["Chest", "Back", "Legs"],
    required: "exercise type is required"
  },
});

module.exports = mongoose.model('Exercises', ExercisesSchema)