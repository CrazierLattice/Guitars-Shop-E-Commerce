import express from 'express';
import verifyUserToken from '../middlewares/user.middleware.js';
import cartModel from '../models/cart.model.js';
import cartDetailModel from '../models/cart_detail.model.js';
import guitarModel from '../models/guitar.model.js';

const cartRoute = express.Router();
//Create a new cart, or return existing one.

cartRoute.post('/newcart/:userId', verifyUserToken, async (req, res) => {
  try {
    const { userId } = req.params;
    let cart = await cartModel.findOne({
      buying_user: userId,
      is_active: true,
    });
    if (!cart) {
      cart = await new cartModel({
        buying_user: userId,
      }).save();
      return res.status(201).json({ error: false, cart });
    } else {
      return res.json({ error: false, cart });
    }
  } catch (error) {
    console.log(error);
  }
});

//Get existing active cart data
cartRoute.post('/existing-cart/:userId', verifyUserToken, async (req, res) => {
  const { userId } = req.params;
  await cartModel
    .findOne({
      buying_user: userId,
      is_active: true,
    })
    .then((cart) => {
      return res.json({ error: false, cart });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Add product to cart
cartRoute.post('/add/:userId/:productId', verifyUserToken, async (req, res) => {
  let totalPrice = 0;
  const { userId, productId } = req.params;
  const { amount } = req.body;
  if (!amount.length || amount <= 0)
    return res
      .status(403)
      .json({ error: true, message: 'Please enter a valid amount' });
  const product = await guitarModel.findOne({ _id: productId });
  const activeCart = await cartModel.findOne({
    buying_user: userId,
    is_active: true,
  });
  if (activeCart) {
    const existingProductInCart = await cartDetailModel.find({
      cartID: activeCart._id,
      guitar: productId,
    });
    if (existingProductInCart.length) {
      const newAmount =
        parseInt(existingProductInCart[0].amount) + parseInt(amount);
      const newPrice = product.price * newAmount;
      await cartDetailModel.findOneAndUpdate(
        { cartID: activeCart._id, guitar: productId },
        { amount: newAmount, price: newPrice }
      );
      //Return back the udpated cart
      await cartDetailModel
        .find({
          cartID: activeCart._id,
        })
        .populate('guitar')
        .then((updatedCart) => {
          updatedCart.forEach((product) => {
            totalPrice += parseInt(product.price);
          });
          res
            .status(201)
            .json({ error: false, cartDetails: updatedCart, totalPrice });
        })
        .catch((err) => res.status(403).json({ error: true, err }));
    } else {
      // create  a new product in that  cart
      const cartDetails = await addNewProductToCart(
        productId,
        amount,
        product.price,
        activeCart._id
      );
      await cartDetailModel
        .find({
          cartID: activeCart._id,
        })
        .then((products) => {
          products.forEach((product) => {
            totalPrice += parseInt(product.price);
          });
        });
      res.status(201).json({ error: false, cartDetails, totalPrice });
    }
  }
});

//Delete product from cart
cartRoute.delete(
  '/delete/:userId/:productId',
  verifyUserToken,
  async (req, res) => {
    let totalPrice = 0;
    const { userId, productId } = req.params;
    const product = await guitarModel.findOne({ _id: productId });
    const activeCart = await cartModel.findOne({
      buying_user: userId,
      is_active: true,
    });
    if (activeCart) {
      //Find and delete
      await cartDetailModel.findOneAndDelete({
        guitar: product._id,
        cartID: activeCart._id,
      });
      //Return the new updated cart
      await cartDetailModel
        .find({
          cartID: activeCart._id,
        })
        .populate('guitar')
        .then(async (cart) => {
          cart.forEach((product) => {
            totalPrice += parseInt(product.price);
          });
          if (!cart.length) {
            await cartModel.findOneAndUpdate(
              { _id: activeCart._id },
              { is_active: false }
            );
          }
          res.status(201).json({ error: false, cart, totalPrice });
        })
        .catch((err) => console.log(err));
    } else {
      return res
        .status(404)
        .json({ error: true, message: 'No active cart found.' });
    }
  }
);

//Delete all products from cart.
cartRoute.delete('/delete-all/:cart', verifyUserToken, async (req, res) => {
  const { cart } = req.params;
  await cartDetailModel
    .deleteMany({ cartID: cart })
    .then(async () => {
      await cartDetailModel
        .find({ cartID: cart })
        .then(async (cartDetail) => {
          await cartModel
            .findOneAndUpdate({ _id: cart }, { is_active: false })
            .then(() => {
              res
                .status(201)
                .json({ error: false, cart: cartDetail, totalPrice: 0 });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get products in cart
cartRoute.get('/products/:userId', verifyUserToken, async (req, res) => {
  //Get the user's cart ID by the user id
  let totalPrice = 0;
  const { userId } = req.params;
  try {
    const cart = await cartModel.findOne({
      buying_user: userId,
      is_active: true,
    });
    if (cart) {
      await cartDetailModel
        .find({ cartID: cart._id })
        .populate({ path: 'guitar', select: 'name picture _id' })
        .select('-cartID')
        .then((products) => {
          products.forEach((product) => {
            totalPrice += parseInt(product.price);
          });
          res.json({ products, totalPrice });
        });
    }
  } catch (error) {
    console.log(error);
  }
});

const addNewProductToCart = async (productId, amount, price, cartID) => {
  await new cartDetailModel({
    guitar: productId,
    amount,
    price: price * amount,
    cartID,
  }).save();
  return await cartDetailModel.find({ cartID }).populate('guitar');
};

export default cartRoute;
