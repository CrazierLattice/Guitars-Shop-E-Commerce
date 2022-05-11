import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'user' },
    cart_id: { type: Schema.Types.ObjectId, ref: 'cart' },
    total_price: { type: Number, required: true },
    delivery_city: { type: String, required: true },
    delivery_street: { type: String, required: true },
    delivery_date: { type: String, required: true },
    card_digits: { type: Number, minlength: 4, maxlength: 4, required: true },
    date_created: { type: Date, required: true, default: Date.now },
  },
  { versionKey: false }
);

const orderModel = model('order', orderSchema);
export default orderModel;
