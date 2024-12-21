import express from 'express';
import isAuth from '../../middlewares/isAuth';
import isValidate from '../../middlewares/isValidate';
import { createBlogValidation, updateBlogValidation } from './blog.validation';
import {
  createBlogByUser,
  deleteBlogByUser,
  getAllBlogs,
  updatedBlogByUser,
} from './blog.controller';

const router = express.Router();

// router for new blog creation
router.post(
  '/',
  isAuth('user'),
  isValidate(createBlogValidation),
  createBlogByUser
);
// public route for all blog
router.get('/', getAllBlogs);
// update blog using user role
router.patch(
  '/:id',
  isAuth('user'),
  isValidate(updateBlogValidation),
  updatedBlogByUser
);
router.delete('/:id', isAuth('user'), deleteBlogByUser);

export const BlogRoutes = router;
