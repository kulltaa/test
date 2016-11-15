module.exports = {
  all(request, reply) {
    reply('users all');
  },

  create(request, reply) {
    const User = request.getDb('condo').getModel('User');

    return User.create({
      email: 'test@mail.com',
      username: '12345',
      password: 'pass'
    })
    .then(() => {
      reply('success');
    })
    .catch((error) => {
      reply(error);
    });
  }
};
