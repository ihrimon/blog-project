import express from 'express';
import { loginUser, registerUser, logout } from './user.controller';
import isValidate from '../../middlewares/isValidate';
import {
  createUserSchemaValidation,
  loginUserValidation,
} from './user.validation';

const router = express.Router();

// route for user register
router.post('/register', isValidate(createUserSchemaValidation), registerUser);
// route for user login
router.post('/login', loginUser);
// route for user logout
router.get('/logout', logout);

export const AuthRoutes = router;
