import mongoose from 'mongoose';
import { insertAdmin } from '../models/user.model.js';
import { insert_categories_toDB } from './categories_insert.js';
import { insert_guitars_toDB } from './guitars_insert.js';
import dotenv from 'dotenv';
dotenv.config();
export const ConnectToDb = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Connected to mongo.');
  } catch (error) {
    console.log(error);
  }
};
export const insert_data_to_db = async () => {
  await insertAdmin();
  await insert_categories_toDB();
  await insert_guitars_toDB();
};
