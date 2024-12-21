import catchAsync from '../../utils/catchAsync';
import User from './user.model';
import { statusCodes } from 'http-status-kit';
import bcrypt from 'bcryptjs';
import sendResponse from '../../utils/sendResponse';
import config from '../../config';
import jwt from 'jsonwebtoken';
import CustomError from '../../utils/CustomError';

// Registger a new user
export const registerUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new CustomError(
      'Conflict error',
      statusCodes.CONFLICT,
      'User already exists!'
    );
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_round)
  );

  const newUser = await User.create({ name, email, password: hashedPassword });

  const result = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  };

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: statusCodes.CREATED,
    data: result,
  });
});

// Login a registered user
export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

   if (!email || !password) {
     throw new CustomError(
       'Email and password are required!',
       statusCodes.UNAUTHORIZED,
       'Invalid credentials',
     );
   }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(
      'Not Found',
      statusCodes.NOT_FOUND,
      'User not found!'
    );
  }

  const isPasswordMatch = await bcrypt.compare(
    password as string,
    user?.password as string
  );
  if (!isPasswordMatch) {
    throw new CustomError(
      'Wrong email or password',
      statusCodes.BAD_REQUEST,
      'Incorrect email or password!'
    );
  }
  const jwtPayload = {
    userId: user?._id,
    email: user?.email,
    role: user?.role,
  };

  // generate jwt token
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in as string,
  });

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: statusCodes.OK,
    data: {
      token,
    },
  });
});

// logout a user
export const logout = catchAsync(async (req, res) => {
  res
    .clearCookie('token', {
      maxAge: 0,
      secure: config.NODE_ENV === 'production',
      sameSite: config.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    .json({
      success: true,
      message: 'Logged out successfully.',
    });
});
