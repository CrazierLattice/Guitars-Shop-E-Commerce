import express from 'express';
import { insert_categories_toDB } from '../dbsetup/categories_insert.js';
import { insert_guitars_toDB } from '../dbsetup/guitars_insert.js';
import categoryModel from '../models/category.model.js';
import guitarModel from '../models/guitar.model.js';
import { insertAdmin, userModel } from '../models/user.model.js';

const seedRoute = express.Router();

seedRoute.get('/', async (req, res) => {
  await categoryModel.deleteMany();
  await guitarModel.deleteMany();
  await userModel.deleteMany();

  await insertAdmin();
  await insert_categories_toDB();
  await insert_guitars_toDB();

  res.send('Success');
});

export default seedRoute;
