const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");
const Sleep = require("../models/Sleep");
router.get("/", verify, (req, res) => {
  Sleep.find(function (err, sleeps) {
    if (err) res.send(err);

    res.json(sleeps);
  });
});
router.post("/create", verify, async (req, res) => {
  //new workout
  const sleep = new Sleep({
    hours: req.body.hours,
    user: req.user._id,
  });

  try {
    const saveSleep = await sleep.save(function (err) {
      if (err) return console.log(err);
      let user = User.findById(req.user._id)
        .exec()
        .then(function (user) {
          if (user.sleeps) {
            user.sleeps.push(sleep);
          } else {
            user.sleeps = sleep;
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
  Sleep.deleteOne({
    _id: req.params.id,
  })
    .then(() => {
      res.status(200).json({
        sleep: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

router.put("/update/:id", verify, async (req, res, next) => {
  Sleep.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  )
    .then(() => {
      res.status(200).json({
        sleep: "Sleep Updated",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
module.exports = router;
