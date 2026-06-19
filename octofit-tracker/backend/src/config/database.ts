import mongoose from 'mongoose';

/**
 * MongoDB Database Configuration
 * 
 * Connects to MongoDB instance and configures Mongoose for the Octofit Tracker application.
 * Database: octofit_db
 * Default connection: mongodb://localhost:27017/octofit_db
 */

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 1,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
};

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
    
    // Connect to MongoDB with Mongoose
    await mongoose.connect(mongoUri, mongooseOptions);
    
    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: octofit_db`);
    console.log(`🔗 Connection URI: ${mongoUri.replace(/mongodb:\/\/.*@/, 'mongodb://***@')}`);
    
    // Handle connection events
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });
    
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
    });
    
    return mongoose.connection;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

/**
 * Gracefully close MongoDB connection
 */
const closeDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('✓ MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

export { connectDB, closeDB };
export default connectDB;

