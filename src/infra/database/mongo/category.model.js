import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: false },
}, { timestamps: true });

const CategoryModel = model('Category', categorySchema);

export default CategoryModel;