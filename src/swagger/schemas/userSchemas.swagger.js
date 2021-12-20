const userLoginResponseSchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      example: 'success',
    },
    data: {
      type: 'object',
      example: {
        user: {
          email: 'john.doe@gmail.com',
          fullName: {
            firstName: null,
            lastName: null,
          },
          phone: 'null',
          avatar: null,
          settings: {
            language: 'en',
            theme: 'light',
            currency: 'UAH',
          },
          securityIssue: false,
          permissions: 'user',
        },
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....',
      },
    },
  },
};

const userUpdateRequestSchema = {
  type: 'object',
  properties: {
    fullName: {
      type: 'object',
      example: {
        firstName: 'Bill',
        lastName: 'Gates',
      },
    },
    phone: {
      type: 'string',
      example: '123333333',
    },
    avatar: {
      type: 'string',
      example: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org',
    },
    settings: {
      type: 'object',
      example: {
        language: 'en',
        theme: 'dark',
        currency: 'USD',
      },
    },
  },
};

const userInvitationRequest = {
  type: 'object',
  properties: {
    friendEmail: {
      type: 'string',
      description: 'Valid friend`s email with min 2 domains',
      example: 'denis.bestmentor@gmail.com',
    },
    friendName: {
      type: 'string',
      description: 'Valid friend name',
      example: 'Denis Hvorostyaniy',
    },
  },
};

module.exports = { userLoginResponseSchema, userUpdateRequestSchema, userInvitationRequest };
