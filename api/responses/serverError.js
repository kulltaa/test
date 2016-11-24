const utils = require('../../libs/helpers/utils');

module.exports = {
  method: 'serverError',

  /**
   * Method handler for server error response
   *
   * @param {Object} data
   * @return {Hapi.Response}
   */
  handler(data) {
    if (data) {
      this.request.server.log('error', 'Sending 500 response', data);
    } else {
      this.request.server.log('error', 'Sending empty 500 response');
    }

    let res;

    if (utils.env() === 'production') {
      res = this.response();
    } else {
      res = this.response(data);
    }

    res.statusCode = 500;

    return res;
  }
};
