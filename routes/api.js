const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

/* router.put("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}); */

 router.put("/api/workouts/:id", (req, res) => {
  console.log(req.body);
  Workout.findOneAndUpdate({_id:req.params.id} ,{$push:{exercises: [ {
       "type": req.body.type,
      "name": req.body.name,
      "weight": req.body.weight,
      "sets": req.body.sets,
      "reps": req.body.reps,
      "duration": req.body.duration,
      "distance": req.body.distance
      } ]
    }
    },{
      new : true
    }
  )
    .then(dbWorkout => {
      console.log("dbwork"+dbWorkout);
      res.json(dbWorkout)
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});  

// Used by api.js to add an exercise to a workout
/*     router.put("/api/workouts/:id", ({body, params}, res) => {
        // console.log(body, params)
        const workoutId = params.id;
        let savedExercises = [];

        // gets all the currently saved exercises in the current workout
        db.Workout.find({_id: workoutId})
            .then(dbWorkout => {
                // console.log(dbWorkout)
                savedExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                let allExercises = [...savedExercises, body]
                console.log(allExercises)
                updateWorkout(allExercises)
            })
            .catch(err => {
                res.json(err);
            });

        function updateWorkout(exercises){
            db.Workout.findByIdAndUpdate(workoutId, {exercises: exercises}, function(err, doc){
            if(err){
                console.log(err)
            }

            })
        }
            
    })  */



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
