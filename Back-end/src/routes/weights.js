const router = require("express").Router();
const verify = require("./verifyToken");
const Weight = require("../models/Weights");

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

  });

  try {
    const saveWeight = await weight.save();
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

router.put("/update/:id", verify, async (req, res) => {
  Weight.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  )
    .then(() => {
      res.status(200).json({
        workout: "Weight Updated",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
module.exports = router;
