//Imports
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { ConnectToDb } from './dbsetup/dbconfig.js';
import loginRoute from './routes/login.route.js';
import registerRoute from './routes/register.route.js';
import guitarsRoute from './routes/guitars.route.js';
import cartRoute from './routes/cart.route.js';
import orderRoute from './routes/order.route.js';
import adminRoute from './routes/admin.route.js';
import seedRoute from './routes/seed.route.js';
const app = express();
dotenv.config();
//Setup and middlewares
app.use(cors());
ConnectToDb();
const port = process.env.port || 5000;

app.use(express.json());
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/guitars', guitarsRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);
app.use('/admin', adminRoute);
app.use('/seed', seedRoute);
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/GuiltarProjectClient/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname + '/GuitarProjectClient/dist/index.html'));
});

// app.get("/", async (req, res) => {
//   await guitarModel
//     .find()
//     .then((products) => {
//       res.status(200).json({ error: false, products });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
app.listen(port, () => console.log(`Running on port ${port} `));
