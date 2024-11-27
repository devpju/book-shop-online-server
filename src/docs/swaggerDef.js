import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { env } from '~/config/environment';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API for Book Store'
  },
  servers: [
    {
      url: `http://${env.HOST}:${env.SERVER_PORT}`,
      description: 'Development Server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{ bearerAuth: [] }]
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/**/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
