import express from 'express';
import { userModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const registerRoute = express.Router();

//Validate ID and Email existance
registerRoute.post('/validate', async (req, res) => {
  const { email, ID } = req.body;
  if (!ID || !email)
    return res.status(403).json({ error: true, message: 'Missing some info' });
  console.log(ID.toString().length);
  if (ID.toString().length != 9)
    return res
      .status(403)
      .json({ error: true, message: 'ID Must contain 9 letters' });
  await userModel
    .findOne({ ID })
    .then(async (existingUserByID) => {
      if (existingUserByID)
        return res
          .status(403)
          .json({ error: true, message: 'ID already taken' });
      await userModel
        .findOne({ email })
        .then((existingUserByEmail) => {
          if (existingUserByEmail)
            return res
              .status(403)
              .json({ error: true, message: 'Email already taken' });
        })
        .catch((err) => {
          console.log(err);
        });
      return res
        .status(201)
        .json({ error: false, message: 'Continue to step 2' });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ error: true, message: 'ID Must contain numbers only' });
    });
});

//Register route
registerRoute.post('/', async (req, res) => {
  try {
    const { first_name, last_name, ID, city, street, email, password } =
      req.body;
    if (
      !first_name ||
      !last_name ||
      !ID ||
      !city ||
      !street ||
      !email ||
      !password
    )
      return res
        .status(403)
        .json({ error: true, message: 'Missing some info' });
    const hashedPassword = bcrypt.hashSync(password, 10);
    let registeredUser = new userModel({
      first_name,
      last_name,
      ID,
      city,
      street,
      email,
      password: hashedPassword,
    });
    registeredUser = await registeredUser.save();
    return res.status(201).json({ error: false, registeredUser });
  } catch (error) {
    console.log(error);
  }
});

export default registerRoute;
