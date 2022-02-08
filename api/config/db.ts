import dotenv from 'dotenv';
import mongoose from 'mongoose';
import clc from 'cli-color';

dotenv.config();
const connectDB = async (): Promise<void> => {
  try {
    const uri: string = process.env.MONGO_URI as string;
    const conn: any = await mongoose.connect(uri);
    console.log(
      clc.blue.bgWhite.underline(`MongoDB Connected: ${conn.connection.host}`)
    );
  } catch (error) {
    console.error(clc.red.bold(`Error: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;
