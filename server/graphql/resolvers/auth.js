const bcrypt = require('bcrypt');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
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
  login: async args => {
    const user = await User.findOne({ email: args.email });
    if (!user) {
      throw new Error("User doesn't exist.");
    }
    const isSamePassword = await bcrypt.compare(args.password, user.password);
    if (!isSamePassword) {
      throw new Error('Password is incorrect.');
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_LOGIN_SECRET,
      { expiresIn: '1h' }
    );
    return {
      userId: user._id,
      token,
      tokenExpiration: 1
    };
  }
};
