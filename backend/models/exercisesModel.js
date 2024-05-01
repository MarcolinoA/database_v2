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
  image: {
    type: String,
    required: true,
  }
  /*
  rep: {
    type: Number,
    required: true,
  },
  series: {
    type: Number,
    required: true,
  },
  break: {
    type: Number,
    required: true,
  },
  */
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
