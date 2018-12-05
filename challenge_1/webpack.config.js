const path = require('path');

module.exports = {
  entry: [
    '@babel/polyfill', // to allow async/await
    path.resolve(__dirname, 'client/src/index.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: [/\.(js|jsx)$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
          },
        },
      },
    ],
  },
};
