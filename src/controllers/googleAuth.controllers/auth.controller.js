const { User } = require('../../model');
const TokenService = require('../../services/token.service');

const auth = async (req, res, next) => {
  const user = req.user._json;
  const { email, given_name, family_name, picture } = user;
  const searchedUser = await User.findOne({ email });
  const tokens = TokenService.generateTokens(email);
  const { refreshToken } = tokens;

  if (searchedUser) {
    const { fullName, avatar } = searchedUser;
    if (fullName.firstName === null) {
      searchedUser.fullName.firstName = given_name;
    }
    if (fullName.lastName === null) {
      searchedUser.fullName.lastName = family_name;
    }
    if (avatar === null) {
      searchedUser.avatar = picture;
    }
    searchedUser.refreshToken = refreshToken;
    await searchedUser.save();
  }
  if (!searchedUser) {
    const newUser = new User({
      email,
      avatar: picture,
      fullName: {
        firstName: given_name,
        lastName: family_name,
      },
      emailVerified: true,
      refreshToken,
      passwordAvailability: false,
    });
    console.log(newUser);
    await newUser.save();
  }
  res.status(200).json({
    message: 'seccess',
    data: {
      email,
      fullName: {
        firstName: given_name,
        lastName: family_name,
      },
    },
    refreshToken,
  });
};
module.exports = auth;
