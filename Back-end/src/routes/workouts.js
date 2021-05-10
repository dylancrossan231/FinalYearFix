const router = require("express").Router();
const verify = require("./verifyToken");
const Workout = require("../models/Workouts");
const User = require("../models/User");
const Exercises = require("../models/Exercises");
const WorkoutExercises = require("../models/Workout_Exercise");



router.post("/create", verify, async (req, res) => {
  //declaring our variables and setting them to the request body objects
  let workoutbody = req.body.workoutObject;
  let workoutExercises = req.body.workoutObject.workoutExercises;
  let workoutName = workoutbody.workout.workout_name;

  //Check if the workout Name exists
  const checkWorkoutname = await Workout.findOne({
    workout_name: workoutName,
  });
  if (checkWorkoutname) {
    return res.status(400).send("Workout Name Already exists");
  }

  //New workout object created to be sent to the database
  const workout = new Workout({
    workout_name: workoutbody.workout.workout_name,
    user: req.user._id,
  });

  //Request to save workout to the database and also save the workout to the users workouts
  try {
    const saveWorkout = await workout.save(function (err) {
      if (err) return console.log(err);
      let user = User.findById(req.user._id)
        .exec()
        .then(function (user) {
          if (user.workouts) {
            user.workouts.push(workout);
          } else {
            user.workouts = workout;
          }
          user.save();
        })
        .catch((err) => console.log(err));
    });

    //Saving all of the exercises and sets in the workoutExercises array to the Workout_exercise
    //table in the database we loop through each element in the array and save one by one
    workoutExercises.forEach((workoutExercise) => {
      console.log(workoutExercise.exercise);
      if (workoutExercise.exercise) {
        workout.exercises.push(workoutExercise.exercise);
      }
      new WorkoutExercises(workoutExercise).save();
    });
    console.log(req.body);
    res.send(req.body);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", verify, async (req, res) => {
  Workout.find(function (err, workouts) {
    if (err) res.send(err);

    res.json(workouts);
  });
});

router.delete("/:id", verify, (req, res, next) => {
  Workout.deleteOne({
    _id: req.params.id,
  })
    .then(() => {
      res.status(200).json({
        workout: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
router.put("/update/:id", verify, async (req, res) => {
  const checkWorkoutname = await Workout.findOne({
    workoutName: req.body.workout_name,
  });
  if (checkWorkoutname)
    return res.status(400).send("Workout Name Already exists");

  Workout.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  )
    .then(() => {
      res.status(200).json({
        workout: "Workout Updated",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
module.exports = router;
