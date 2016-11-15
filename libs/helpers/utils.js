module.exports = {
  getEnv(key, defaultValue) {
    if (!key) {
      throw new Error('Key is required');
    }

    return process.env[key] || defaultValue;
  }
};
