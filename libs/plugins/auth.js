const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const files = fs.readdirSync(path.join(__dirname, 'auth'))
  .filter(file => file.indexOf('.') !== 0);

const registerAuth = function registerAuth(server, file) {
  return new Promise((resolve, reject) => {
    const auth = require(path.join(__dirname, 'auth', file)); // eslint-disable-line

    server.register(auth.plugin, (error) => {
      if (error) {
        return reject(error);
      }

      server.auth.strategy(auth.name, auth.scheme, auth.options);

      return resolve();
    });
  });
};

exports.register = function register(server, options, next) {
  Promise.each(files, file => registerAuth(server, file))
    .then(() => {
      next();

      return Promise.resolve();
    })
    .catch((error) => {
      next(error);

      return Promise.resolve();
    });
};

exports.register.attributes = {
  name: 'Auth',
  version: '0.0.1',
  multiple: false
};
