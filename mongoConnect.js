const mongoose = require('mongoose');
const { connect } = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const mongoURI = process.env.MONGO_URI; // Replace with your MongoDB URI

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;
