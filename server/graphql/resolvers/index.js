const bcrypt = require('bcrypt');
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

module.exports = {
  events: () => {
    return Event.find()
      .then(events =>
        events.map(event => ({
          ...event._doc,
          creator: getUser.bind(this, event.creator)
        }))
      )
      .catch(e => console.log(e));
  },
  createEvent: async args => {
    try {
      const userId = '5eda0309d8e28408c07c3a08';
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found.');
      }
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: userId
      });
      const createdEvent = await event.save();
      user.createdEvents.push(createdEvent);
      await user.save();
      return createdEvent;
    } catch (error) {
      console.log('Error in create event: ', error);
      throw error;
    }
  },
  createUser: async args => {
    try {
      const user = await User.findOne({ email: args.userInput.email });
      if (user) {
        throw new Error('User already exists.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      return newUser.save();
    } catch (error) {
      throw error;
    }
  }
};
