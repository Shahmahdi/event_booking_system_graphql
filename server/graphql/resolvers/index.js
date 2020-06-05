const bcrypt = require('bcrypt');
const Event = require('../../models/Event');
const User = require('../../models/User');
const Booking = require('../../models/Booking');

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
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => ({
        ...booking._doc,
        event: getEvent.bind(this, booking.event),
        user: getUser.bind(this, booking.user),
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString()
      }));
    } catch (error) {
      throw error;
    }
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
      return {
        ...createdEvent._doc,
        creator: getUser.bind(this, userId)
      };
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
  },
  bookEvent: async args => {
    try {
      const userId = '5eda0309d8e28408c07c3a08';
      const fetchedEvent = await Event.findById(args.eventId);
      const booking = new Booking({
        event: fetchedEvent,
        user: userId
      });
      const newBooking = await booking.save();
      return {
        ...newBooking._doc,
        event: getEvent.bind(this, booking.event),
        user: getUser.bind(this, booking.user),
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString()
      };
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = {
        ...booking.event._doc,
        creator: getUser.bind(this, booking.event._doc.creator)
      };
      await Booking.findByIdAndDelete(args.bookingId);
      return event;
    } catch (error) {
      throw error;
    }
  }
};
