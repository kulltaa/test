module.exports = {

  /**
   * Get environment variable by key
   *
   * @param key
   * @param defaultValue
   * @return Object
   */
  getEnv(key, defaultValue = '') {
    if (!key) {
      throw new Error('Key is required');
    }

    return process.env[key] || defaultValue;
  },

  /**
   * Get current NODE_ENV value
   *
   * @return string
   */
  env() {
    return this.getEnv('NODE_ENV');
  }
};
