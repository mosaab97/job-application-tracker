/**
 * Swagger documentation for user-related APIs
 */
const userDocs = {
    '/users/signup': {
      post: {
        summary: 'Sign up a new user',
        description: 'Create a new user with a name, email, and password.',
        tags: ['Users'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'User created successfully' },
          400: { description: 'Email already in use' },
        },
      },
    },
    '/users/login': {
      post: {
        summary: 'Log in a user',
        description: 'Authenticate a user and return a JWT token.',
        tags: ['Users'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Login successful' },
          401: { description: 'Invalid email or password' },
        },
      },
    },
    '/users/update': {
      put: {
        summary: 'Update user details',
        description: 'Update a user\'s name and email. Requires authentication.',
        tags: ['Users'],
        security: [{ barer: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email'],
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'User updated successfully' },
          401: { description: 'Unauthorized (no token provided)' },
          403: { description: 'Invalid or expired token' },
        },
      },
    },
  };
  
  module.exports = userDocs;
  