import express from 'express';
import fs from 'fs';
import verifyUserToken from '../middlewares/user.middleware.js';
import cartModel from '../models/cart.model.js';
import cartDetailModel from '../models/cart_detail.model.js';
import orderModel from '../models/order.model.js';
import path from 'path';

const orderRoute = express.Router();

//Create new order
orderRoute.post(
  '/purchase/:user_id/:cartID',
  verifyUserToken,
  async (req, res) => {
    const { user_id, cartID } = req.params;
    console.log('?');
    let totalPrice = 0;
    let invalidDate = false;
    let cartProducts;
    let { delivery_city, delivery_street, delivery_date, credit_card } =
      req.body;
    credit_card = credit_card.slice(8, 12);
    console.log(`credit_card`, credit_card);
    if (!delivery_city || !delivery_street || !delivery_date || !credit_card)
      return res
        .status(500)
        .json({ error: true, message: 'Missing some info' });
    console.log(typeof delivery_date);
    const d = new Date(delivery_date);
    let validMonth = d.getMonth() + 1;
    delivery_date = `${d.getDate()}/${validMonth}/${d.getFullYear()}`;
    let todayDate = new Date();
    let todayMonth = todayDate.getMonth + 1;
    todayDate = `${todayDate.getDate()}/${validMonth}/${todayDate.getFullYear()}`;
    console.log(todayDate);
    if (delivery_date < todayDate)
      return res
        .status(403)
        .json({ error: true, message: 'Please enter a valid date' });
    //Check if there's no more then 3 orders in the given date
    await orderModel
      .find({ delivery_date })
      .then((orders) => {
        if (orders.length >= 3) {
          invalidDate = true;
        }
      })
      .catch((err) => console.log(err));
    if (invalidDate) {
      return res.status(403).json({
        error: true,
        message: 'Too many orders on that date, please choose another date.',
      });
    } else {
      await cartDetailModel
        .find({
          cartID,
        })
        .populate('guitar')
        .then((products) => {
          products.forEach((product) => {
            totalPrice += parseInt(product.price);
            cartProducts = products;
          });
        })
        .catch((err) => console.log(err));

      //Create a new order model
      const newOrder = await new orderModel({
        user_id,
        cart_id: cartID,
        total_price: totalPrice,
        delivery_city,
        delivery_street,
        delivery_date: delivery_date,
        card_digits: credit_card,
      }).save();

      //Turn the new order's cart  not active.

      await cartModel.findOneAndUpdate({ _id: cartID }, { is_active: false });
      console.log(cartProducts, newOrder);
      await createOrderFile(cartProducts, newOrder);
      res.json({ cartProducts, newOrder });
    }
  }
);

//Get the latest order / latest active cart
orderRoute.get(
  '/latest-action/:buying_user',
  verifyUserToken,
  async (req, res) => {
    //Find if there's an active cart for that user
    const { buying_user } = req.params;
    try {
      const activeCart = await cartModel.findOne({
        buying_user,
        is_active: true,
      });
      if (activeCart) {
        let date = new Date(activeCart.date_created);
        //d = 2021-02-10T20:38:11.805Z
        date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        //date = 10/02/2021

        return res.json({
          type: 'cart',
          message: `You have an active cart from ${date}`,
        });
      }
      //Find the latest completed order for that user
      const latestOrder = await orderModel.findOne(
        { user_id: buying_user },
        {},
        { sort: { date_created: -1 } }
      );
      console.log(latestOrder);
      if (!latestOrder) {
        return res.send({
          type: 'none',
          message:
            'Click on Continue Shopping in order to create your first order in our store!',
        });
      } else {
        let date = new Date(latestOrder.date_created);
        //d = 2021-02-10T20:38:11.805Z
        date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        //date = 10/02/2021
        return res.json({
          type: 'order',
          message: `Your last order was made on ${date}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const createOrderFile = async (cartProducts, orderData) => {
  fs.writeFileSync(
    `${path.resolve()}/order.text`,
    `
============================================ \n
  ORDER RECEPTION \n
  `
  );
  for (const key in cartProducts) {
    if (cartProducts.hasOwnProperty.call(cartProducts, key)) {
      const product = cartProducts[key];
      fs.appendFileSync(
        `${path.resolve()}/order.text`,
        `
============================================
    Product Name - ${product.guitar.name} \n
    Product Price - ${product.guitar.price} \n
    Amount - ${product.amount} \n
    Total Price - ${product.price} \n
     
    `
      );
    }
  }

  fs.appendFileSync(
    `${path.resolve()}/order.text`,
    `
============================================  
  Order Created At - ${orderData.date_created} \n
  Delivery City - ${orderData.delivery_city} \n
  Delivery Street - ${orderData.delivery_street} \n
  Delivery Date - ${orderData.delivery_date} \n
  Total to pay - ${orderData.total_price} \n

  Thank you for your order.
  `
  );
};

orderRoute.get('/reception', verifyUserToken, async (req, res) => {
  const file = `${path.resolve()}/order.text`;
  res.download(file);
});

export default orderRoute;
