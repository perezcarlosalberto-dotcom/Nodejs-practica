import { Router } from 'express';
import NoteController from '../controllers/note.controller.js';
import NoteService from '../../application/use-cases/note.service.js';
import upload from '../middlewares/upload.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

import NoteMongoRepository from '../../infra/database/mongo/note.mongo.repository.js';
// import NoteMySQLRepository from '../../infra/database/mysql/note.mysql.repository.js';

const noteMongoRepository = new NoteMongoRepository();
// const noteMySQLRepository = new NoteMySQLRepository();

const noteService = new NoteService(noteMongoRepository);
const noteController = new NoteController(noteService);

const router = Router();
 router.get('/public/:id', noteController.getPublicNoteById);

/**
 * @swagger
 * /notes:
 *   post:
 *     tags: [Notas]
 *     summary: Crear una nota
 *     description: multipart/form-data. Requiere Bearer token.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *               isPrivate: { type: string, example: "false" }
 *               userId: { type: string }
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Nota creada
 *       400:
 *         description: Error de validacion
 *       401:
 *         description: Sin token o token invalido
 */
router.post('/', authMiddleware, roleMiddleware(['admin', 'user']), upload.single('image'), noteController.createNote);

/**
 * @swagger
 * /notes:
 *   get:
 *     tags: [Notas]
 *     summary: Listar notas de un usuario
 *     description: Requiere Bearer token. Filtra por userId en query.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *         description: Id del usuario (Mongo ObjectId como string)
 *     responses:
 *       200:
 *         description: Lista de notas
 *       400:
 *         description: Falta userId u otro error
 *       401:
 *         description: Sin token o token invalido
 */
router.get('/', authMiddleware, roleMiddleware(['admin', 'user']), noteController.getNoteByUserId);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     tags: [Notas]
 *     summary: Obtener una nota por id
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Nota encontrada
 *       401:
 *         description: Sin token o token invalido
 */
router.get('/:id', authMiddleware, roleMiddleware(['admin', 'user']), noteController.getNoteById);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     tags: [Notas]
 *     summary: Actualizar una nota
 *     description: multipart/form-data. Requiere Bearer token y rol admin.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *               isPrivate: { type: string }
 *               userId: { type: string }
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Nota actualizada
 *       401:
 *         description: Sin token o token invalido
 *       403:
 *         description: Solo administradores pueden actualizar notas
 */
router.put('/:id', authMiddleware, roleMiddleware(['admin']), upload.single('image'), noteController.updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     tags: [Notas]
 *     summary: Eliminar una nota
 *     description: Solo administradores. Requiere Bearer token.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Eliminada (sin cuerpo)
 *       401:
 *         description: Sin token o token invalido
 *       403:
 *         description: Solo administradores pueden eliminar notas
 */
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), noteController.deleteNote);


export default router;
