import jwt from 'jsonwebtoken';
import User from '../models/User';
import expressAsyncHandler from 'express-async-handler';
import { NextFunction, Response } from 'express';

const protect = expressAsyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded: any = jwt.verify(token, 'secret');
        req.user = await User.findById(decoded.id).select('-password');
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Unauthorized, token failed');
      }
    }
    if (!token) {
      res.status(401);
      throw new Error('You are not logged in!');
    }
  }
);

const admin = (req: any, res: Response, next: NextFunction) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('You are not authorized to perform this action');
  }
};

export { protect, admin };
