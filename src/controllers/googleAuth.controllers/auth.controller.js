const { User } = require('../../model');
const TokenService = require('../../services/token.service');

const auth = async (req, res, next) => {
  const user = req.user._json;
  const { email, given_name, family_name, picture } = user;
  const searchedUser = await User.findOne({ email });
  const tokens = TokenService.generateTokens(email);
  const { refreshToken, accessToken } = tokens;

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
      password: null,
    });
    await newUser.save();
  }
  return res.redirect(
    `http://localhost:3000?accessToken=${accessToken}&refreshToken${refreshToken}`
  );
  // res.status(200).json({
  //   message: 'success',
  //   data: {
  //     email,
  //     fullName: {
  //       firstName: given_name,
  //       lastName: family_name,
  //     },
  //   },
  //   accessToken,
  //   refreshToken,
  // });
};
module.exports = auth;
