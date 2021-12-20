const { userLoginResponseSchema, userUpdateRequestSchema } = require('../../schemas');

const update = {
  '/users/update': {
    patch: {
      tags: ['Users'],
      summary: 'Update user information',
      description: 'This can only be done by logged in user.',
      operationId: 'update',
      produces: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'body',
          description: 'Valid user update body object',
          required: true,
          schema: {
            ...userUpdateRequestSchema,
          },
        },
      ],
      responses: {
        200: {
          description: 'Successful user update',
          content: {
            'application/json': {
              schema: {
                ...userLoginResponseSchema,
              },
            },
          },
        },
        400: {
          description: 'Some body validation errors / Updating of user balance not allowed',
          content: {
            'application/json': {
              schema: {
                example: {
                  message: 'User balance is already setted',
                  status: 'Error',
                  code: '400',
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { update };
