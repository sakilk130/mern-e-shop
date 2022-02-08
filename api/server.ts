import express, { Application, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import clc from 'cli-color';

import connectDB from './config/db';
import { errorHandler, notFound } from './middleware/error.middleware';
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';
import orderRoutes from './routes/order.routes';
import uploadRoutes from './routes/upload.routes';

dotenv.config();
connectDB();
const dirname = path.resolve();
const app: Application = express();
const PORT: string | number = process.env.PORT || 8000;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes);

app.get('/api/config/paypal', ({}, res: Response) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use('/uploads', express.static(path.join(dirname, '/uploads')));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '/client/build')));
  app.get('*', ({}, res: Response) =>
    res.sendFile(path.resolve(dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', ({}, res: Response) => {
    res.send('API is running...');
  });
}
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    clc.yellow.bold(
      `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
});
