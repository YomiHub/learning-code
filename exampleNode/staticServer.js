const fs = require('fs');
const path = require('path');
const mime = require('./lib/mime.json');  //用于通过文件后缀设置响应头
exports.staticServer = (req, res, rootpath) => {
  fs.readFile(path.join(rootpath, req.url), (err, fileContent) => {
    if (err) {
      //第一个参数为响应状态码
      res.writeHead(404, {
        'Content-Type': 'text/plain;charset=utf8'//设置响应类型和编码，解决乱码
      })
      res.end("404页面找不到了");//终止响应，不可以多次写入
    } else {
      let dtype = "text/html";  //设置默认类型
      let ext = path.extname(req.url);
      if (mime[ext]) {
        dtype = mime[ext];  //通过文件后缀获取对应类型
      }

      if (dtype.startsWith('text')) {
        dtype += ';charset=utf8';  //响应内容为文本的时候设置编码
      }
      res.writeHead(200, {
        'Content-Type': dtype
      })
      res.end(fileContent);
    }
  })
}