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
