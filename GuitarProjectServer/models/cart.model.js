import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    buying_user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    date_created: { type: Date, default: Date.now, required: true },
    is_active: { type: Boolean, default: true },
  },
  { versionKey: false }
);

const cartModel = model('cart', cartSchema);

export default cartModel;
