const router = require("express").Router();
const verify = require("./verifyToken");
const Weight = require("../models/Weights");
const User = require("../models/User");
router.get("/", verify, (req, res) => {
  Weight.find(function (err, weights) {
    if (err) res.send(err);

    res.json(weights);
  });
});
router.post("/create", verify, async (req, res) => {
  //new workout
  const weight = new Weight({
    weight: req.body.weight,
    user: req.user._id,
  });

  try {
    const saveweight = await weight.save(function (err) {
      if (err) return console.log(err);
      let user = User.findById(req.user._id)
        .exec()
        .then(function (user) {
          if (user.weights) {
            user.weights.push(weight);
          } else {
            user.weights = weight;
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
  Weight.deleteOne({
    _id: req.params.id,
  })
    .then(() => {
      res.status(200).json({
        weight: "Deleted!",
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
    const weight = await Weight.findById(req.params.id).exec();

    if (weight === null) {
      res.status(404).json({
        success: false,
        message: "Weight not found",
      });
    } else {
      weight.weight = req.body.weight;
      weight.save();
      res.status(200).json(weight);
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
module.exports = router;
