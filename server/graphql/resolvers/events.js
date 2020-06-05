const Event = require('../../models/Event');
const User = require('../../models/User');
const { getUser } = require('./common');

module.exports = {
  events: () => {
    return Event.find()
      .then(events =>
        events.map(event => ({
          ...event._doc,
          creator: getUser.bind(this, event.creator)
        }))
      )
      .catch(e => {
        throw e;
      });
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
  }
};
