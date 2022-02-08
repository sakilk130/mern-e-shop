import dotenv from 'dotenv';
import clc from 'cli-color';

import users from './data/users';
import products from './data/products';
import User from './models/User';
import Product from './models/Product';
import Order from './models/Order';
import connectDB from './config/db';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });
    await Product.insertMany(sampleProducts);
    console.log(clc.bgBlue.bold('Data Imported!'));
  } catch (error) {
    console.log(clc.red.bold(`${error}`));
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(clc.red.bold.bgWhite('Data Destroyed!'));
  } catch (error) {
    console.log(clc.red.bold(`${error}`));
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
