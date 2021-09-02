const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'app.js'
  },
  resolve:{
    extensions:['.js','.ts','.tsx']
  },
  module:{
    rules:[
      {
        test:/\.tsx?$/i,
        use:[{
          loader:'ts-loader'
        }],
        exclude:/node_modules/
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({ //创建一个在内存生成html页面的插件
      template:'./src/tpl/index.html',//指定模板页面，将来会根据指定的页面路径去生成内存的页面
      filename:'index.html'  //指定生成页面的名称
    })
  ]
};