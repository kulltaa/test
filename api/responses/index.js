const fs = require('fs');
const path = require('path');

const responses = [];

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => {
    const response = require(path.join(__dirname, file)); // eslint-disable-line

    responses.push(response);
  });

module.exports = responses;
