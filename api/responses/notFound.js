module.exports = {
  method: 'notFound',

  /**
   * Method handler for not found response
   *
   * @return {Hapi.Response}
   */
  handler() {
    const res = this.response();
    res.statusCode = 404;

    return res;
  }
};
