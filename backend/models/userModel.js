import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		index: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		surname: {
			type: String,
			required: true,
		},
		birth: {
			type: String,
			required: true
		},
		gender: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true,
	}
)

export const User = mongoose.model("User", userSchema);