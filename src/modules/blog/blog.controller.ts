import { statusCodes } from 'http-status-kit';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import User from '../user/user.model';
import Blog from './blog.model';
import { FilterQuery } from 'mongoose';
import CustomError from '../../utils/CustomError';

// create a blog by user role
export const createBlogByUser = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { title, content } = req.body;

  const author = await User.findOne({ email });

  const blog = await Blog.create({
    title,
    content,
    author: author?._id,
  });

  const result = {
    _id: blog._id,
    title: blog.title,
    content: blog.content,
    author: {
      _id: author?._id,
      name: author?.name,
      email: author?.email,
    },
  };

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: statusCodes.CREATED,
    data: result,
  });
});

// get all blog by query parameter
export const getAllBlogs = catchAsync(async (req, res) => {
  const { search, sortBy, sortOrder, filter } = req.query;

  const query: FilterQuery<any> = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }
  if (filter) {
    query._id = filter;
  }

  const sortOrderValue = sortOrder === 'asc' ? 1 : -1;

  const blog = await Blog.find(query)
    .populate({
      path: 'author',
      select: '_id name email',
    })
    .sort({
      [sortBy as string]: sortOrderValue,
    });

  const result = blog.map((key) => ({
    _id: key._id,
    title: key.title,
    content: key.content,
    author: key.author,
  }));

  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: statusCodes.OK,
    data: result,
  });
});

// update blog by user role
export const updatedBlogByUser = catchAsync(async (req, res) => {
  const { email } = req.user;
  const author = await User.findOne({ email });
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  const result = {
    _id: blog?._id,
    title: blog?.title,
    content: blog?.content,
    author: {
      _id: author?._id,
      name: author?.name,
      email: author?.email,
    },
  };

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: statusCodes.OK,
    data: result,
  });
});

// delete blog by user role
export const deleteBlogByUser = catchAsync(async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: 200,
  });
});

// user block by admin role
export const blockUserByAdmin = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (user?.isBlocked) {
    throw new CustomError(
      'Blocked user',
      statusCodes.CONFLICT,
      'This user already blocked!'
    );
  }

  // status change by its id
  await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });

  res.json({
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
  });
});

// delele blog by admin role
export const deleteBlogByAdmin = catchAsync(async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: 200,
  });
});
