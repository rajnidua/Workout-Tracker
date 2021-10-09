const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  /* id: {
    type: String,
  }, */
  exercises: [
    {
      type: { type: String, default: "", trim: true },
      name: { type: String, default: "", trim: true },
      weight: { type: Number, required: "Enter a weight" },
      sets: { type: Number, required: "Enter a sets" },
      reps: { type: Number, required: "Enter a reps" },
      duration: { type: Number, required: "Enter a duration" },
      distance: {type: Number}
    },
  ],
});



const Workout = mongoose.model("Workout", workoutSchema);


/*var userid = new ObjectID("537ec520e98bcb378e811d54");

console.log( userid );

Workout.aggregate([
  { "$match": { "_id": mongojs.ObjectId } },
  { "$unwind": "$friends" },
  { "$match": { "friends.status": 0 } }],
  function( err, data ) {

    if ( err )
      throw err;

    console.log( JSON.stringify( data, undefined, 2 ) );

  }
  */



module.exports = Workout;
