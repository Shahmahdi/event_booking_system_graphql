const Event = require('../../models/Event');
const Booking = require('../../models/Booking');
const { getUser, getEvent } = require('./common');

module.exports = {
  bookings: async req => {
    try {
      if (!req.isAuth) {
        throw new Error('User is not authorized.');
      }
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
  bookEvent: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('User is not authorized.');
      }
      const userId = req.userId;
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
  cancelBooking: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('User is not authorized.');
      }
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
