var path       = require('path');
require('dotenv')

var settings = {
  path       : path.normalize(path.join(__dirname, '..')),
  port       : process.env.NODE_PORT || 4040};

module.exports = settings;
