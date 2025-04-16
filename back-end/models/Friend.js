import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    required: true
  },
  firstJoined: {
    type: String,
    required: true
  }
});

const Friend = mongoose.model('Friend', friendSchema);

export default Friend;
