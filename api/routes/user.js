const UserController = require('../controllers/User');

module.exports = [
  {
    method: 'POST',
    path: '/users',
    handler: UserController.create
  },
  {
    method: 'POST',
    path: '/users/login',
    handler: UserController.login
  },
  {
    method: 'GET',
    path: '/users',
    handler: UserController.all,
    config: {
      auth: 'simple'
    }
  }
];
