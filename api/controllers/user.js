const utils = require('../../libs/helpers/utils');
const generateAccessToken = require('../../libs/helpers/accessToken');

module.exports = {
  create(request, reply) {
    const User = request.getDb('condo').getModel('User');

    return User.create({
      email: 'test@mail.com',
      username: 'bao',
      password: '123'
    })
    .then(() => {
      reply('success');
    })
    .catch((error) => {
      reply(error);
    });
  },

  login(request, reply) {
    const User = request.getDb('condo').getModel('User');
    const UserAccessToken = request.getDb('condo').getModel('UserAccessToken');

    const { username, password } = request.payload;

    return User.findOne({
      where: {
        username,
        password
      }
    }).then((user) => {
      if (!user) {
        return reply('not found');
      }

      const token = generateAccessToken();

      return UserAccessToken.create({
        access_token: token.value,
        access_token_expired_at: token.expired,
        user_id: user.id
      })
      .then(() => reply('success'))
      .catch(error => reply(error));
    })
    .catch((error) => {
      console.log(error);
      reply(error);
    });
  },

  all(request, reply) {
    const User = request.getDb('condo').getModel('User');

    return User.findAll()
      .then((users) => {
        reply(users);
      })
      .catch((error) => {
        reply(error);
      });
  }
};
