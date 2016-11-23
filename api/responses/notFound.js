module.exports = {
  method: 'notFound',
  handler() {
    const res = this.response();
    res.statusCode = 404;

    return res;
  }
};
