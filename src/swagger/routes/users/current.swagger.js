const current = {
  '/users/current': {
    get: {
      tags: ['Users'],
      summary: 'Get current user info',
      description: 'This can only be done by not already logged in user.',
      operationId: 'current',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          description: 'Bearer e123sdfgsdfqwe123edw34dfs...',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        200: {
          description: 'Successful request to get user info ',
          schema: {
            $ref: '#/components/schemas/UserLoginResponse',
          },
        },
        401: {
          description: 'Unauthorized error.',
          schema: {
            example: {
              message: 'Unauthorized: TokenExpiredError: jwt expired.',
              status: 'Error',
              code: '401',
            },
          },
        },
      },
    },
  },
};

module.exports = { current };
