import mongoose from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new mongoose.Schema<TBlog>(
  {
      title: {
      type: String,
      required: true,
    },
      content: {
      type: String,
      required: true,
    },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model<TBlog>('Blog', blogSchema);
export default Blog;
