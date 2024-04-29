/*
import mongoose from "mongoose";

const exercisesSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		group: {
			type: String,
			required: true,
		},
    desc: {
      type: String,
      required: true
    },
		img: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export const Exercises = mongoose.model("Exercises", exercisesSchema);
*/

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
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
