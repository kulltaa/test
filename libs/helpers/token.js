const crypto = require('crypto');
const moment = require('moment');
const utils = require('./utils');

const ACCESS_TOKEN_LIFE_TIME = utils.getEnv('ACCESS_TOKEN_LIFE_TIME');

/**
 * Generate access token
 *
 * @return Object
 */
module.exports = function generateAccessToken() {
  try {
    const buff = crypto.randomBytes(256);
    const tokenValue = crypto.createHash('sha1').update(buff).digest('hex');
    const tokenExpired = moment().utc().add(ACCESS_TOKEN_LIFE_TIME, 'days').toDate();

    return {
      value: tokenValue,
      expired: tokenExpired
    };
  } catch (e) {
    throw e;
  }
};
