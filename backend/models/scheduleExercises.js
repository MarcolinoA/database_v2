import mongoose from "mongoose";

const scheduleExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: false,
  },
  rep: {
    type: String,
    required: false,
  },
  series: {
    type: String,
    required: false,
  },
});

const ScheduleExercise = mongoose.model('ScheduleExercise', scheduleExerciseSchema);

export default ScheduleExercise;
