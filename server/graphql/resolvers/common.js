const Event = require('../../models/Event');
const User = require('../../models/User');

const getEvents = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(currentEvent => ({
      ...currentEvent._doc,
      creator: getUser.bind(this, currentEvent.creator)
    }));
  } catch (error) {
    throw error;
  }
};

const getEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return {
      ...event._doc,
      creator: getUser.bind(this, event.creator)
    };
  } catch (error) {
    throw error;
  }
};

const getUser = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvents: getEvents.bind(this, user._doc.createdEvents)
    };
  } catch (error) {
    throw error;
  }
};

exports.getUser = getUser;
exports.getEvent = getEvent;
exports.getEvents = getEvents;