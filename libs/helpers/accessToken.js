const crypto = require('crypto');
const moment = require('moment');
const utils = require('./utils');

const ACCESS_TOKEN_LIFE_TIME = utils.getEnv('ACCESS_TOKEN_LIFE_TIME');

module.exports = function generateAccessToken() {
  try {
    const buff = crypto.randomBytes(256);
    const token = crypto.createHash('sha1').update(buff).digest('hex');
    const expired = moment().add(ACCESS_TOKEN_LIFE_TIME, 'days');

    return {
      value: token,
      expired
    };
  } catch (e) {
    throw e;
  }
};
