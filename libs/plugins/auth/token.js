const AuthBearer = require('hapi-auth-bearer-token');

const validate = function validate(token, callback) {
  const request = this;
  const User = request.getDb('condo').getModel('User');
  const UserAccessToken = request.getDb('condo').getModel('UserAccessToken');

  UserAccessToken
    .findOne({
      where: { access_token: token },
      include: [{ model: User, required: true }]
    })
    .then((result) => {
      if (!result) {
        callback(null, false);

        return Promise.resolve();
      }

      callback(null, true, result.User);

      return Promise.resolve();
    })
    .catch((error) => {
      request.log('error', error);

      callback(null, false);

      return Promise.resolve();
    });
};

module.exports = {
  name: 'simple',
  scheme: 'bearer-access-token',
  plugin: AuthBearer,
  options: {
    validateFunc: validate
  }
};
