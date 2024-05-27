/* Model for exercise API */
import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
