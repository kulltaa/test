module.exports = {
  method: 'badRequest',

  /**
   * Method handler for not found response
   *
   * @return {Hapi.Response}
   */
  handler(data = {}) {
    this.request.server.log('badRequest', 'Sending 400 response', data);

    const res = this.response();
    res.statusCode = 400;

    return res;
  }
};
