import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API системы работы с обращениями',
    version: '1.0.0',
    description: 'Документация API для системы работы с обращениями',
  },
  servers: [
    {
      url: 'http://localhost:3000'
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/controllers/cases/*']
};

const swaggerSpec = swaggerJSDoc(options);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
