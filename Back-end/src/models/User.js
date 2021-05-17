const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  password: {
    type: String,
    required: "Password is required",
    min: 6,
    max: 1024,
  },
  workouts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Workouts",
    },
  ],
  weights: [
    {
      type: Schema.Types.ObjectId,
      ref: "Weights",
    },
  ],
  sleeps: [
    {
      type: Schema.Types.ObjectId,
      ref: "Sleeps",
    },
  ],
  nutritions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Nutrition",
    },
  ],
  // first_name: {
  //   type: String,
  //   trim: true,
  //   unique: "Email already exists",
  //   required: "First Name is required",
  // },
  // username: {
  //   type: String,
  //   trim: true,
  //   unique: "Email already exists",
  //   required: "First Name is required",
  // },
  // last_name: {
  //   type: String,
  //   trim: true,
  //   required: "Last Name is required",
  // },
  // weight: {
  //   type: Number,
  //   trim: true,
  // },
  // height: {
  //   type: Number,
  //   trim: true,
  // },
  // D_O_B: {
  //   type: Date,
  //   required: true,
  //   trim: true,
  // },
  // gender: {
  //   type: String,
  //   trim: true,
  //   enum: ["Male", "Female", "Other"],
  // },
  // created_date: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model("User", UserSchema);
