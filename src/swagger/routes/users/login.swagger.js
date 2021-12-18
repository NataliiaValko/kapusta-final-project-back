const { userLoginResponseSchema } = require('../../schemas');

const login = {
  '/users/login': {
    post: {
      tags: ['Users'],
      summary: 'Login user into the application',
      description: 'This can only be done by user with verified email.',
      operationId: 'login',
      produces: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'body',
          description: 'Valid user registration body object',
          required: true,
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'Valid email with min 2 domains',
                example: 'john.doe@gmail.com',
              },
              password: {
                type: 'string',
                description:
                  'Valid password length: 8-12, must contain  lowerCase: 1,  upperCase: 1, numeric: 1, symbol: 1,',
                example: 'Hello123-',
              },
            },
            xml: {
              name: 'User',
            },
          },
        },
      ],
      responses: {
        200: {
          description: 'Successful user login',
          content: {
            'application/json': {
              schema: {
                ...userLoginResponseSchema,
              },
            },
          },
        },
        400: {
          description: 'Email or password is wrong',
          content: {
            'application/json': {
              schema: {
                example: {
                  message: 'Email or password is wrong',
                  status: 'Error',
                  code: '400',
                },
              },
            },
          },
        },
        403: {
          description: 'Email is not verified',
          content: {
            'application/json': {
              schema: {
                example: {
                  message: 'User email is not verified',
                  status: 'Error',
                  code: '403',
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { login };
