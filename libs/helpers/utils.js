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
  }
};
