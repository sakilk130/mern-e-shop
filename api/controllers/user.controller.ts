import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken';
import { Request, Response } from 'express';
import { IUser } from '../types/User';
import { ObjectId } from 'mongoose';

// @desc Auth user & get token
// @desc route POST /api/users/login
// @access Public
const authUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user: any = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  }
);

// @desc Register a new user
// @desc route POST /api/users
// @access Public
const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = req.body;

    const userExists:
      | (IUser & {
          _id: ObjectId;
        })
      | null = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if (!user) {
      res.status(400);
      throw new Error('Invalid user data');
    }
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }
);

// @desc Get user profile
// @desc route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(
  async (req: any, res: Response): Promise<void> => {
    const user:
      | (IUser & {
          _id: ObjectId;
        })
      | null = await User.findById(req.user._id).select('-password');
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
);

// @desc Update user profile
// @desc route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(
  async (req: any, res: Response): Promise<void> => {
    const user:
      | (IUser & {
          _id: ObjectId;
        })
      | null = await User.findById(req.user._id).select('-password');
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      req.password = req.body.password;
    }
    const updatedUser: IUser & {
      _id: ObjectId;
    } = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  }
);

// @desc Get all users
// @desc route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async ({}, res: Response): Promise<void> => {
  const users: (IUser & {
    _id: ObjectId;
  })[] = await User.find().select('-password');
  res.json(users);
});

// @desc Delete user
// @desc route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user:
      | (IUser & {
          _id: ObjectId;
        })
      | null = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    await user.remove();
    res.json({
      message: 'User removed',
    });
  }
);

// @desc Get user by id
// @desc route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res): Promise<any> => {
  const user:
    | (IUser & {
        _id: ObjectId;
      })
    | null = await User.findById(req.params.id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

// @desc Update user by id
// @desc route PUT /api/users/:id
// @access Private/Admin
const updateUserById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user:
      | (IUser & {
          _id: ObjectId;
        })
      | null = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser: IUser & {
      _id: ObjectId;
    } = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  }
);

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
};
