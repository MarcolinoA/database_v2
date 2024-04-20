import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		schedule: {
			type: String,
			required: true,
		},
		status: {
			type: Boolean,
			required: true
		},
	},
	{
		timestamps: true,
	}
)

export const Schedule = mongoose.model("Schedule", scheduleSchema);