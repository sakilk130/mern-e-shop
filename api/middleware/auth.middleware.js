import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import expressAsyncHandler from 'express-async-handler';

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'secret');
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
});

const admin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('You are not authorized to perform this action');
  }
};

export { protect, admin };
