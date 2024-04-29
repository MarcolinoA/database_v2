/*
import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
    series: {
			type: String,
			required: true,
		},
    rep: {
			type: String,
			required: true,
		},
		break: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export const Schedule = mongoose.model("Schedule", scheduleSchema);
*/

import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['In corso', 'Completata', 'Sospesa'],
    default: 'In corso',
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;