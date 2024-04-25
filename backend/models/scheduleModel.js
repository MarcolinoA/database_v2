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
		schedule: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true
		},
	},
	{
		timestamps: true,
	}
)

export const Schedule = mongoose.model("Schedule", scheduleSchema);