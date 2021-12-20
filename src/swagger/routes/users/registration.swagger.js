module.exports = {
  '/users/registration': {
    post: {
      tags: ['Users'],
      summary: 'Register new user',
      description: 'This can only be done by not already registered user.',
      operationId: 'registration',
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
        201: {
          description: 'Successful user registration',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'success',
                  },
                  data: {
                    type: 'object',
                    example: {
                      email: 'john.doe@gmail.com',
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'User with same email already exists.',
          content: {
            'application/json': {
              schema: {
                example: {
                  message: 'User with same email already exists.',
                  status: 'Error',
                  code: '400',
                },
              },
            },
          },
        },
        500: {
          description: 'Internal server error.',
          schema: {
            example: {
              message: 'Internal server error.',
              status: 'Error',
              code: '500',
            },
          },
        },
      },
    },
  },
};
