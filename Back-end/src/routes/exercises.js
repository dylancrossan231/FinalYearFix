const router = require("express").Router();
const verify = require("./verifyToken");
const Exercise = require("../models/Exercises");


router.get("/", verify, async (req, res) => {
  Exercise.find(function (err, exercises) {
    if (err) res.send(err);

    res.json(exercises);
  });
});


router.post("/create", verify, async (req, res) => {

  //new workout
  const exercise = new Exercise({
    exercise_name: req.body.exercise_name,
    instructions: req.body.instructions,
    exercise_type: req.body.exercise_type,
  });

  try {
    const saveExercise = await exercise.save();
    res.send(req.body);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

