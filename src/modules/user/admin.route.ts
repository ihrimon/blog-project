import express from 'express';
import isAuth from '../../middlewares/isAuth';
import { blockUserByAdmin, deleteBlogByAdmin } from '../blog/blog.controller';
const router = express.Router();

// router for block user
router.patch('/users/:userId/block', isAuth('admin'), blockUserByAdmin);
// router for delete blog
router.delete('/blogs/:id', isAuth('admin'), deleteBlogByAdmin);

export const AdminRoutes = router;
