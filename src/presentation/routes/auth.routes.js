import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import AuthService from '../../application/use-cases/auth.service.js';
import UserMongoRepository from '../../infra/database/mongo/user.mongo.repository.js';

const userMongoRepository = new UserMongoRepository();
const authService = new AuthService(userMongoRepository);
const authController = new AuthController(authService);

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registrar un usuario nuevo
 *     description: Crea una cuenta. No requiere token (ruta publica).
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, example: "Ana Lopez" }
 *               email: { type: string, example: "ana@ejemplo.com" }
 *               password: { type: string, example: "miPassword123" }
 *               role: { type: string, enum: [admin, user], example: "user" }
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Error de validacion o email ya en uso
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesion
 *     description: Devuelve un JWT si el email y la contrasena son correctos.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "ana@ejemplo.com" }
 *               password: { type: string, example: "miPassword123" }
 *     responses:
 *       200:
 *         description: OK — incluye el token en el cuerpo JSON
 *       400:
 *         description: Faltan email o contrasena
 */
router.post('/login', authController.login);

export default router;
