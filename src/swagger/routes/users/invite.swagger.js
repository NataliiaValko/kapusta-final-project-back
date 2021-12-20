const { userInvitationRequest } = require('../../schemas');

const invite = {
  '/users/invite': {
    post: {
      tags: ['Users'],
      summary: 'Invite friend to join application',
      description: 'User can invite friend to this Application. Friend will receive invitation email with link.',
      operationId: 'invite',
      produces: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'body',
          description: 'Valid invitation body object',
          required: true,
          schema: {
            ...userInvitationRequest,
          },
        },
      ],
      responses: {
        201: {
          description: 'Successful friend invitation',
          schema: {
            example: {
              message: 'Invitation successful.',
            },
          },
        },
        400: {
          description: 'Some body errors (no friendEmail or friendName).',
          schema: {
            example: {
              message: 'friendEmail/friendName is required.',
              status: 'Error',
              code: '400',
            },
          },
        },
      },
    },
  },
};

module.exports = { invite };
