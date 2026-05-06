import CategoryModel from './category.model.js';

export default class CategoryMongoRepository {
  async save(category) {
    const newCategory = new CategoryModel(category);
    return await newCategory.save();
  }

  async findByUserId(userId) {
    return await CategoryModel.find({ userId });
  }
}