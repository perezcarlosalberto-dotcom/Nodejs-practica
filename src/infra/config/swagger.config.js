import path from 'path';
import { fileURLToPath } from 'url';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Notas Personales',
            version: '1.0.0',
            description: 'Documentación de ejemplo para gestionar notas y usuarios.',
        },
        servers: [
            { url: 'http://localhost:3000/api/v1', description: 'Servidor local' },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Token JWT devuelto por POST /auth/login (pegar sin la palabra Bearer en algunos clientes).',
                },
            },
        },
        tags: [
            { name: 'Auth', description: 'Registro e inicio de sesion' },
            { name: 'Notas', description: 'CRUD de notas (requiere JWT)' },
        ],
    },
    apis: [path.join(__dirname, '../../presentation/routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Documentacion Swagger: http://localhost:3000/api-docs');
};
