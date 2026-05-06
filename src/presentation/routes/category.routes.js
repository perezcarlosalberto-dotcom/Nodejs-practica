import { Router } from 'express';
import CategoryController from '../controllers/category.controller.js';
import CategoryService from '../../application/use-cases/category.service.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import CategoryMongoRepository from '../../infra/database/mongo/category.mongo.repository.js';

const categoryMongoRepository = new CategoryMongoRepository();
const categoryService = new CategoryService(categoryMongoRepository);
const categoryController = new CategoryController(categoryService);

const router = Router();

router.post('/', authMiddleware, roleMiddleware(['admin', 'user']), categoryController.createCategory);
router.get('/', authMiddleware, roleMiddleware(['admin', 'user']), categoryController.getCategoryByUserId);

export default router;