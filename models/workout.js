const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  id: {
    type: String,
  },
  exercises: [
    {
      type: { type: String, default: "", trim: true },
      name: { type: String, default: "", trim: true },
      duration: { type: Number, required: "Enter a duration" },
      weight: { type: Number, required: "Enter a weight" },
      reps: { type: Number, required: "Enter a reps" },
      sets: { type: Number, required: "Enter a sets" },
    },
  ],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
