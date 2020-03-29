const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

//使用Node中的模块操作，向外暴露了一个配置对象，直接运行命令webpack运行该文件
module.exports = {
  mode: 'development',  // webpack 使用相应环境
  devtool: 'source-map', //cheap-module-eval-source-map 生产环境使用 none 或者是 source-map
  entry: path.join(__dirname, './src/main.js'),   //指定webpack打包的文件
  output: {
    path: path.join(__dirname, './dist'),  //指定输出文件的目录
    filename: 'bundle.js'  //指定输出文件的名称
  },
  devServer: {
    open: true,
    port: 3000,
    contentBase: 'src',
    hot: true
    /*  //解决跨域问题 
    proxyTable: {
      //用于调用的接口域名与端口
      target: 'http://127.0.0.1:3000/api'
      pathRewrite: {
        '^api': '/'  //替换api为/，在axios调用时直接使用./api相对路径
      }
    } */
  },
  plugins: [  //配置插件的节点
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({  //创建一个在内存生成html页面的插件
      //指定模板页面，将来会根据指定的页面路径去生成内存的页面
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'  //指定生成页面的名称
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },  //配置处理.css文件的第三方loader
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=102400 &name=[hash]-[name]' },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },  //bootstrap.css中引入字体文件的处理
      { test: /\.js$/, use: 'babel-loader', exclude: path.join(__dirname, './node_modules') },  //使用exclude避免对node_modules中的js进行编译
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  },
  resolve: {
    alias: {
      //配置当导入的包名是以vue结尾的时候，就使用该路径的包
      'vue$': 'vue/dist/vue.esm.js'// 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  }
}