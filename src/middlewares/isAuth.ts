import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import CustomError from '../utils/CustomError';
import catchAsync from '../utils/catchAsync';
import { statusCodes } from 'http-status-kit';
import User from '../modules/user/user.model';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const USER_ROLE = {
  user: 'user',
  admin: 'admin',
} as const;

type TUserRole = keyof typeof USER_ROLE;

const isAuth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // checking if the token is missing
    if (!token) {
      throw new CustomError(
        'Unauthorized access',
        statusCodes.UNAUTHORIZED,
        'You are not authorized!'
      );
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, email } = decoded;

    if (requiredRole && !requiredRole.includes(role)) {
      throw new CustomError(
        'Unauthorized access',
        statusCodes.UNAUTHORIZED,
        'You are not authorized!'
      );
    }

    // checking if the user is exist
    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError(
        'Not Found',
        statusCodes.NOT_FOUND,
        'User not found!'
      );
    }

    req.user = decoded;

    next();
  });
};

export default isAuth;
