const Event = require('../../models/Event');
const Booking = require('../../models/Booking');
const { getUser, getEvent } = require('./common');

module.exports = {
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
