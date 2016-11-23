module.exports = {
  method: 'success',
  handler(data) {
    const res = this.response(data);
    res.statusCode = 200;

    return res;
  }
};
