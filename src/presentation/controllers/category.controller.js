export default class CategoryController {
  constructor(categoryService) {
    this.categoryService = categoryService;
  }

  createCategory = async (req, res) => {
    try {
      const category = await this.categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ status: 'ERROR', message: error.message });
    }
  };

  getCategoryByUserId = async (req, res) => {
    try {
      const userId = req.query.userId;
      if (!userId) {
        return res.status(400).json({
          status: 'ERROR',
          message: 'userId es requerido (query ?userId=...)',
        });
      }
      const categories = await this.categoryService.getCategoryByUserId(userId);
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ status: 'ERROR', message: error.message });
    }
  };
}