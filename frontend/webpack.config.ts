import path from 'path';

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  target: 'web',
  devServer: {
    port: '9500',
    static: ['./public'],
    hot: true,
    liveReload: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js'], // NOTE: .js needed for some dependency loading
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        loader: 'css-loader',
      },
      {
        test: /\.svg$/,
        type: 'asset/inline'
      },
    ],
  },
};
