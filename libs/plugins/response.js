const responses = require('../../api/responses');

exports.register = function registerResponse(server, options, next) {
  responses.forEach(res => server.decorate('reply', res.method, res.handler));

  next();
};

exports.register.attributes = {
  name: 'response',
  version: '0.0.1',
  multiple: false
};
