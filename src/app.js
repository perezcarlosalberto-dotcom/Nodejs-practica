import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';
import { loggerMiddleware } from './presentation/middlewares/logger.middleware.js';
import noteRoutes from './presentation/routes/note.routes.js';
import connectDB from './infra/database/mongo/connection.js';
// import { connectMySQL } from './infra/database/mysql/connection.js';
import authRoutes from './presentation/routes/auth.routes.js';
import { setupSwagger } from './infra/config/swagger.config.js';
import categoryRoutes from './presentation/routes/category.routes.js';


await connectDB();
// await connectMySQL();

// create express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(loggerMiddleware);
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/notes', noteRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoryRoutes);



setupSwagger(app);

app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API activa' });
});

// middleware for errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'ERROR', message: 'Internal Server Error' });
});

export default app;