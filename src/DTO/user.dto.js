const getUserInfoWithId = ({ user }) => {
  const { _id, email, fullName, avatar, balance, settings, securityIssue, phoneVerified, permissions, invitedFriends } =
    user;
  return {
    user: {
      _id,
      email,
      fullName,
      avatar,
      balance,
      settings,
      securityIssue,
      phoneVerified,
      permissions,
      invitedFriends,
    },
  };
};

const getUserInfoWithToken = ({ user, tokens }) => {
  const { email, fullName, avatar, balance, settings, securityIssue, phoneVerified, permissions, invitedFriends } =
    user;
  const { accessToken } = tokens;
  return {
    user: { email, fullName, avatar, balance, settings, securityIssue, phoneVerified, permissions, invitedFriends },
    accessToken,
  };
};

const getUserSimpleInfo = ({ user }) => {
  const {
    email,
    phone,
    fullName,
    avatar,
    balance,
    settings,
    securityIssue,
    phoneVerified,
    permissions,
    invitedFriends,
  } = user;
  return {
    user: {
      email,
      phone,
      fullName,
      avatar,
      balance,
      settings,
      securityIssue,
      phoneVerified,
      permissions,
      invitedFriends,
    },
  };
};

const getUserRegistrationData = (user) => {
  const { email, password } = user;
  const firstName = user?.firstName || null;
  const lastName = user?.lastName || null;

  return {
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
  };
};

const getUserSettings = ({ user: { settings } }) => ({ settings });

// TODO: rewrite parameters
const getUserPermissions = ({ permissions }) => ({ permissions });

const getUserAvatar = ({ avatar }) => ({ avatar });

const getUserName = ({ fullName }) => ({ fullName });

const getUserSecurityIssue = ({ securityIssue }) => ({ securityIssue });

const getUserInvitedFriends = ({ invitedFriends }) => ({ invitedFriends });

module.exports = {
  getUserInfoWithId,
  getUserInfoWithToken,
  getUserSettings,
  getUserPermissions,
  getUserAvatar,
  getUserName,
  getUserInvitedFriends,
  getUserSecurityIssue,
  getUserSimpleInfo,
  getUserRegistrationData,
};
