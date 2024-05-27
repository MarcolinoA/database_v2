/* Model for user API */
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
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
