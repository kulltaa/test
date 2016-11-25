const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const files = fs.readdirSync(path.join(__dirname, 'orms'))
  .filter(file => file.indexOf('.') !== 0);

/**
 * Register db plugin by file
 *
 * @param {Hapi.Server} server
 * @param {String} file
 * @return {Promise}
 */
const registerDbByFile = function registerDbByFile(server, file) {
  return new Promise((resolve, reject) => {
    const db = require(path.join(__dirname, 'orms', file)); // eslint-disable-line

    server.register(db, (error) => {
      if (error) {
        return reject(error);
      }

      return resolve();
    });
  });
};

exports.register = function registerDb(server, options, next) {
  Promise.map(files, file => registerDbByFile(server, file))
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
  name: 'db',
  version: '0.0.1',
  multiple: false
};
