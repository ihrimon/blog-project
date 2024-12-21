import mongoose from 'mongoose';
import app from './app';
import config from './config';
import CustomError from './utils/CustomError';

// connect to the database with mongoose
const main = async () => {
  try {
    // connecting mongoDB database
    await mongoose.connect(config.database_uri as string);

    // server listen
    app.listen(config.port, () => {
      console.log(`Server is running on port at ${config.port}`);
    });
  } catch (error) {
    throw new CustomError('Server Error', 500, 'Server Error')
  }
};

// function calling
main();
