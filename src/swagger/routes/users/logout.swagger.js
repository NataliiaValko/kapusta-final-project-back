const logout = {
  '/users/logout': {
    post: {
      tags: ['Users'],
      summary: 'Logout current logged in user',
      description: 'Logout current logged in user',
      operationId: 'logout',
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
        204: {
          description: 'Successful logout',
        },
        400: {
          description: 'Error in access token in header',
          schema: {
            example: {
              message: 'Bad request',
              status: 'Error',
              code: '400',
            },
          },
        },
        404: {
          description: 'User not found',
          schema: {
            example: {
              message: 'User not found',
              status: 'Error',
              code: '404',
            },
          },
        },
      },
    },
  },
};

module.exports = { logout };
