const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");
const Nutrition = require("../models/Nutrition");
router.get("/", verify, (req, res) => {
  Nutrition.find(function (err, nutritions) {
    if (err) res.send(err);

    res.json(nutritions);
  });
});
router.post("/create", verify, async (req, res) => {
  console.log(req.body.protein, req.body.carbohydrate,req.body.fats, req.body.calories, req.user._id);
  //new workout
  const nutrition = new Nutrition({
    protein: req.body.protein,
    carbohydrate: req.body.carbohydrate,
    fats: req.body.fats,
    calories: req.body.calories,
    user: req.user._id,
  });

  try {
    const saveNutrition = await nutrition.save(function (err) {
      if (err) return console.log(err);
      let user = User.findById(req.user._id)
        .exec()
        .then(function (user) {
          if (user.nutritions) {
            user.nutritions.push(nutrition);
          } else {
            user.nutritions = nutrition;
          }

          user.save();
        })
        .catch((err) => console.log(err));
    });
    res.send(req.body);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", verify, (req, res, next) => {
  Nutrition.deleteOne({
    _id: req.params.id,
  })
    .then(() => {
      res.status(200).json({
        nutrition: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
router.put("/update/:id", verify, async (req, res, next) => {
  try {
    const nutrition = await Nutrition.findById(req.params.id).exec();

    if (nutrition === null) {
      res.status(404).json({
        success: false,
        message: "Nutrition not found",
      });
    } else {
      nutrition.protein = req.body.protein;
      nutrition.carbohydrate = req.body.carbohydrate;
      nutrition.fats = req.body.fats;
      nutrition.calories = req.body.calories;
      nutrition.save();
      res.status(200).json(nutrition);
      console.log(nutrition);
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
module.exports = router;
