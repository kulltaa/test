const UserController = require('../controllers/user');

module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: UserController.all
  },
  {
    method: 'POST',
    path: '/users',
    handler: UserController.create
  }
];
