import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFoundError';
import { AuthRoutes } from './modules/user/auth.route';
import { AdminRoutes } from './modules/user/admin.route';
import { BlogRoutes } from './modules/blog/blog.route';

// create 'Blog' application
const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());

// application route
app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/blogs', BlogRoutes);

// all application error handling
app.use(globalErrorHandler);

// handle not found error
app.use(notFound);

export default app;
