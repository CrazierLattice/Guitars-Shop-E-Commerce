import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const guitarSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    price: { type: String, required: true },
    picture: { type: String, required: true },
  },
  { versionKey: false }
);

const guitarModel = model('guitar', guitarSchema);
export default guitarModel;
