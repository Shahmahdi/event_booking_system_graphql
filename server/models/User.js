const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  createdEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }]
});

module.exports = mongoose.model('User', UserSchema);
