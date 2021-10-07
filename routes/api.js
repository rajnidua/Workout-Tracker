const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        type: req.body.type,
        name: req.body.name,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets,
        duration: req.body.duration,
      },
    }
  )

    .then((dbWorkout) => {
      res.status(200).json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

/* 
router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(req.params.id, {
    bodyData: req.body,
  })

    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
 */
//res.send("found and updated");

router.post("/api/workouts/bulk", ({ body }, res) => {
  Workout.insertMany(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
