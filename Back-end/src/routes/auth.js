const router = require("express").Router();
const User = require("../models/User");
const Joi = require("@hapi/joi");
const { registerValidation, loginValidation } = require("../../validation");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const verify = require("./verifyToken");

dotenv.config();

router.post("/register", async (req, res) => {
  //vallidation needs to be fixed
  // const {error} = registerValidation(req.body)

  // if(error) return res.status(400).send(error.details[0].message)
  //check if user exists
  const checkEmail = await User.findOne({ email: req.body.email });
  if (checkEmail) return res.status(400).send("Email Already exists");

  //HASH password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //new user
  const user = new User({
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(req.body);
  } catch (err) {
    res.status(400).send(err);
  }
});

//login
router.post("/login", async (req, res) => {
  //vallidation needs to be fixed
  // const {error} = loginValidation(req.body);
  // if(error) return res.status(400).send(error.details[0].message);

  //check if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesnt exist");
  //if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  //Create and assign token to user
  const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET);
  res.header("auth-token", token).json({ token: token, user_id: user._id });
});

router.get("/", verify, async (req, res) => {
  User.find()
    .populate("workouts")
    .exec(function (err, users) {
      if (err) res.send(err);

      res.json(users);
    });
});

module.exports = router;
