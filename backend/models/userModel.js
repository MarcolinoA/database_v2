/*

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
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: "ScheduleInfo" }],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
*/

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    required: true,
  },
  gender: {
    type: String,
    enum: ['M', 'F', 'Altro'],
    default: 'Altro',
  },
});

const User = mongoose.model('User', userSchema);

export default User;
