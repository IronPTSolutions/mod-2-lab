
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Name is required.'],
    },
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
    avatar

  },
 
);

module.exports = model('User', userSchema);
