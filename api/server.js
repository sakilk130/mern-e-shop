import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';
import productRoutes from './routes/product.routes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
