/* const http = require('http');
const ss = require('./staticServer.js');
const path = require('path');

http.createServer((req, res) => {
  ss.staticServer(req, res, path.join(__dirname, 'www'));
}).listen(3000, () => {
  console.log("服务running");
}) */

//------------get参数
/* const http = require('http');
const ss = require('./staticServer.js');
const path = require('path');
const url = require('url');

http.createServer((req, res) => {
  let urlObj = url.parse(req.url, true);
  res.end(urlObj.query.username + '-' + urlObj.query.pass);
}).listen(3000, () => {
  console.log("服务running");
}) */

//测试：http://127.0.0.1:3000/index.html?username=hym&pass=123


//--------------post参数
/* const querystring = require('querystring');
let param = 'foo=bar&abc=xyz&abc=123';
let obj = querystring.parse(param);
console.log(obj);
// {
//   foo: 'bar',
//   abc: ['xyz', '123']
// }

let str = querystring.stringify(obj);
console.log(str);
// foo=bar&abc=xyz&abc=123 */

/* const http = require('http');
const querystring = require('querystring');
http.createServer((req, res) => {
  if (req.url.startsWith('/login')) {
    let allData = '';
    req.on('data', (chunk) => {
      allData += chunk;    //将接受的数据拼接完整
    });

    req.on('end', () => {
      console.log(allData);
      let obj = querystring.parse(allData);
      res.end(obj.username + "-" + obj.pass);
    })
  }
}).listen(3000, () => {
  console.log("服务running···");
})

//测试：使用chrome插件postman模拟发送post请求,参数格式选择www-form-urlencoded */

/* const http = require('http');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const virtualData = require('./virtualData/search.json');
const template = require('art-template');

http.createServer((req, res) => {
  //查询入口 /query
  if (req.url.startsWith('/query') && req.method == 'GET') {
    fs.readFile(path.join(__dirname, 'www/view', 'query.tpl'), 'utf8', (err, content) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain;charset=utf8'
        });
        res.end("500服务器错误！")
      }

      res.end(content);
    })
  } else if (req.url.startsWith('/result')) {
    let allData = '';
    req.on('data', (chunk) => {
      allData += chunk;
    });

    req.on('end', () => {
      let obj = querystring.parse(allData);
      let result = virtualData[obj.key];
      // fs.readFile(path.join(__dirname, 'www/view', 'result.tpl'), 'utf8', (err, content) => {
      //   if (err) {
      //     res.writeHead(500, {
      //       'Content-Type': 'text/plain;charset=utf8'
      //     });
      //     res.end("500服务器错误！")
      //   }

      //   //进行数据渲染
      //   content = content.replace('$$english$$', result.english);
      //   content = content.replace('$$chinese$$', result.chinese);
      //   content = content.replace('$$application$$', result.application);


      // })
      //或者使用模板引擎art-template
        let html = template(path.join(__dirname, 'www/view', 'result.art'), result)
        res.end(html);
    })
  }
}).listen(3000, () => {
  console.log("服务running···")
})
 */


/* const http = require('http');
const querystring = require('querystring');
const ss = require('./staticServer.js');
const url = require('url');

http.createServer((req, res) => {
  //启动静态资源服务

  if (req.url.startsWith('/www')) {
    ss.staticServer(req, res, __dirname);
  }

  //启动动态服务
  if (req.url.startsWith('/login')) {
    res.writeHead(500, {
      'Content-Type': 'text/plain;charset=utf8'
    });
    //get请求处理
    if (req.method == 'GET') {
      let param = url.parse(req.url, true).query;
      if (param.username == 'admin' && param.pass == 'root') {
        res.end('Get登录成功');
      } else {
        res.end('Get登录失败');
      }
    }
    //post请求处理
    if (req.method == 'POST') {
      let allData = '';
      req.on('data', (chunk) => {
        allData += chunk;
      });

      req.on('end', () => {
        let obj = querystring.parse(allData);

        if (obj.username == 'admin' && obj.pass == 'root') {
          res.end('Post登录成功');
        } else {
          res.end('Post登录失败');
        }
      });
    }
  }
}).listen(3000, () => {
  console.log("服务running···")
})  */


const http = require('http');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const virtualData = require('./virtualData/search.json');
const template = require('art-template');

http.createServer((req, res) => {
  //查询入口 /query
  if (req.url.startsWith('/query') && req.method == 'GET') {
    fs.readFile(path.join(__dirname, 'www/view', 'query.tpl'), 'utf8', (err, content) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain;charset=utf8'
        });
        res.end("500服务器错误！")
      }

      res.end(content);
    })
  } else if (req.url.startsWith('/result') && req.method == 'POST') {
    let allData = '';
    req.on('data', (chunk) => {
      allData += chunk;
    });

    req.on('end', () => {
      let obj = querystring.parse(allData);   //post参数解析
      let result = virtualData.list[obj.key];
      let html = template(path.join(__dirname, 'www/view', 'result.art'), result)
      res.end(html);
    })
  } else if (req.url.startsWith('/allResult') && req.method == 'GET') {
    let result = virtualData;
    let html = template(path.join(__dirname, 'www/view', 'allResult.art'), result);
    res.end(html);
  }
}).listen(3000, () => {
  console.log("服务running···")
})