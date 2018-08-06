/**
 * 这个应该是把公共的部分提供给webpack.dev.config.js和webpack.prod.config.js使用
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: '[hash][name].bundle.js'
  },
  resolve: {
    // 会对未加后缀的引入文件名去分别依次加上这几个后缀在工程中搜寻
    extensions: ['.js', '.json', '.jsx'],
    // 给常用路径取个别名吧
    alias: {
      src: path.join(__dirname, '../src'),
      images: path.join(__dirname, '../src/images'),
      less: path.join(__dirname, '../src/style/less')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        enforce: 'pre',
        use: [
          'eslint-loader'
        ]
      }, {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: [
          'babel-loader'
        ]
      }, {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        ]
      }, {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'less-loader'
          }
        ]
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]2.[ext]',
              outputpath: 'img/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 其实我觉得删除这种粗活用rimraf 也可以搞定 写在脚本里哈哈
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'HMR',
      filename: path.join(__dirname, '../dist/index.html'),
      // 根据我们本地的index.html生成服务器--服务器在内存上啊喂 --上的index.html
      template: path.join(__dirname, '../src/template/index.html')
    })
  ]
}
