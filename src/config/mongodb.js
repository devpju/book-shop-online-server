import mongoose from 'mongoose';
import { env } from './environment';

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_DB_URI);
    console.log('🎯 MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

export const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Lỗi khi đóng kết nối MongoDB', error);
  }
};
