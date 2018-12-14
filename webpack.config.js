const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./js/clear-ui.js'],
  output: {
    filename: 'js/clear-ui.js',
    path: path.resolve(__dirname, 'dist')
  }
};
