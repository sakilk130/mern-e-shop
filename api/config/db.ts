import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';

dotenv.config();
const connectDB = async (): Promise<void> => {
  try {
    const uri: string = process.env.MONGO_URI as string;
    const conn: any = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
