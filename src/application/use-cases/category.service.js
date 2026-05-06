import CategoryEntity from "../../domain/entities/category.entity.js";

export default class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async createCategory(category) {
    if (!category.name) { throw new Error('Name is required') };

    const newCategory = new CategoryEntity(category.id, category.name, category.userId);

    return await this.categoryRepository.save(newCategory);
  }

  async getCategoryByUserId(userId) {
    return await this.categoryRepository.findByUserId(userId);
  }
}