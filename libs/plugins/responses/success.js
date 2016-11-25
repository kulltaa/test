module.exports = {
  method: 'success',

  /**
   * Method handler for success response
   *
   * @param {Object} data
   * @return Hapi.Response
   */
  handler(data = {}) {
    const res = this.response(data);
    res.statusCode = 200;

    return res;
  }
};
