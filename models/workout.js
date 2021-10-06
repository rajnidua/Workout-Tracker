const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: { type: String, default: "", trim: true },
      name: { type: String, default: "", trim: true },
      duration: { type: number, required: "Enter a duration" },
      weight: { type: number, required: "Enter a weight" },
      reps: { type: number, required: "Enter a reps" },
      sets: { type: number, required: "Enter a sets" },
    },
  ],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
