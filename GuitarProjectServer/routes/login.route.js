import express from 'express';
import dotenv from 'dotenv';
import { userModel } from '../models/user.model.js';
import guitarModel from '../models/guitar.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import orderModel from '../models/order.model.js';
dotenv.config();
const loginRoute = express.Router();
//Login route
loginRoute.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(405)
        .send({ error: true, message: 'Please fill all the required fields.' });
    let user = await userModel.find(
      { email: username },
      { __v: false, id: false }
    );
    if (!user.length)
      return res
        .status(404)
        .send({ error: true, message: 'Wrong username or password' });
    const verifiedPassword = await bcrypt.compare(password, user[0].password);
    if (!verifiedPassword)
      return res
        .status(404)
        .send({ error: true, message: 'Wrong username or password' });
    //If verifeiedPassword - generate an access token and returns it to the client with the user data without the password

    user = await userModel.find(
      { email: username },
      { __v: false, password: false }
    );
    const token = jwt.sign({ user }, process.env.SECRET_CODE, {
      expiresIn: '1d',
    });
    res.json({ error: false, user, token });
  } catch (error) {
    console.log(error);
  }
});

//Disable or enable access to website when clicking on "Starting Shopping"
loginRoute.post('/handle-access/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findOne({ _id: userId });
    user.has_access = !user.has_access;
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

//Decode existing token and grant access to the website while refreshing
loginRoute.get('/refresh/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const data = jwt.decode(token);
    res.json({ error: false, data });
  } catch (error) {
    console.log(error);
  }
});

//Get amount of products and orders created in the store
loginRoute.get('/store-data', async (req, res) => {
  try {
    const guitars = await guitarModel.find();
    const orders = await orderModel.find();
    res.json({ error: false, guitars: guitars.length, orders: orders.length });
  } catch (error) {
    console.log(error);
  }
});

export default loginRoute;
