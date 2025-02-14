const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userDocs = require('./userDocs');

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Authentication API',
      version: '1.0.0',
      description: 'API documentation for sign-up, login, and user update features',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // Base URL of your API
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Informational only
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['../routes/*.js'], // Path to your route files
};

const swaggerDocs = {
  ...swaggerJsDoc(swaggerOptions),
};

module.exports = swaggerDocs;
