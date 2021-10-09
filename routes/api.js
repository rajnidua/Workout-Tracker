const router = require("express").Router();
const Workout = require("../models/workout.js");


 
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([{
        
        $addFields: {
            totalDuration: {$sum: "$exercises.duration"}
        }
    },
    {
        // sort ascending
        $sort: {day: 1}
    }])
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    })
    
});




router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});



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









router.post("/api/workouts/bulk", ({ body }, res) => {
  Workout.insertMany(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});




 router.delete("/api/workouts/", (req, res) => {
         Workout.deleteMany({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });



    
    

//fully working code that returns id and total duration
/*  router.get("/api/workouts/range",(req, res) =>{
   Workout.aggregate([
  { $unwind : '$exercises' },
  { $group : { _id : '$_id', totalDuration : { $sum : '$exercises.duration' } } },
  { $sort : { day : -1 } }
]) .then(dbWorkout => {
    res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    }) 

});  */

//fully working code using project
 router.get("/api/workouts/range",(req, res) =>{
   Workout.aggregate([
  
  { $project : {  
    "day":1,
    "exercises.type":1,
    "exercises.weight":1,
    "exercises.duration":1,

    totalDuration : { $sum : '$exercises.duration' } } },
  { $sort : { day : 1 } }
]) .then(dbWorkout => {
    res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    }) 

});  




 








 


 


 
    



module.exports = router;
