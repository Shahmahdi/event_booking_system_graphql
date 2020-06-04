const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  date: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('Event', EventSchema);