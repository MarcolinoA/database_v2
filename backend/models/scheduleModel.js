import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema(
	{
		ID: {
			type: String,
			required: true,
		},
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
		img: {
			type: String,
			required: true
		},
	},
	{
		timestamps: true,
	}
)

export const Schedule = mongoose.model("Schedule", scheduleSchema);