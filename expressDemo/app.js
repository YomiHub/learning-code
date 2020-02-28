/* const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser'); */

//静态托管文件
/* app.use('/static', express.static(path.join(__dirname, 'public'))); //第一个参数可以指定虚拟目录
app.listen(3000, () => {
  console.log('running');
}); */

/* app.get('/', function (req, res) {
  res.send('get');
})

app.post('/', function (req, res) {
  res.send('post');
})

app.delete('/user', function (req, res) {
  res.send('delete');
})

app.put('/user', function (req, res) {
  res.send('put')
}) */

/* app.use('/user', (req, res, next) => {
  console.log('request type:', req.method);
  next();
})

app.use('/user', (req, res, next) => {
  console.log('time:', Date.now());
  next('route');
}, (req, res) => {
  res.send("使用next('route')会跳转到下一个路由，不会执行该next");
})

app.get('/user', (req, res, next) => {
  res.send('next将控制权传递给该中间件功能');  //测试：访问http://127.0.0.1:3000/user
}) */

/* const router = express.Router();

router.use((req, res, next) => {
  console.log('time:', Date.now());
  next();
})

router.use('/user', (req, res, next) => {
  console.log('request url', req.originalUrl);
  next();
})

router.get('/user', (req, res, next) => {
  res.send('res.render用来渲染模板文件,send()只能用一次，和end一样')
})

app.use('/', router);
 */
/* app.get("/", function (req, res, next) {
  fs.readFile("/file-does-not-exist", function (err, data) {
    if (err) {
      next(err); // Pass errors to Express.
    }
    else {
      res.send(data);
    }
  });
}); */

/* app.get('/', (req, res, next) => {
  setTimeout(function () {
    try {
      throw new Error('broken');
    } catch (err) {
      next(err);
    }
  }, 1000)
}) */

/* app.get('/', (req, res, next) => {
  Promise.resolve().then(function () {
    throw new Error("BROKEN");
  }).catch(next); // Errors will be passed to Express.
})

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('someting broke!')
})

 */

/* //挂载内置中间件
app.use(express.static(path.join(__dirname, 'public')))

//挂载参数处理中间件body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json  当客户端传递的数据为Json时
app.use(bodyParser.json());

app.get('/login', (req, res) => {
  console.log(req.query);
  res.send('get提交可以用query获取参数');
})

//使用中间件之后不需要进行对象转换，方便参数处理
app.post('/login', (req, res) => {
  let data = req.body;
  console.log(data);
  if (data.username == 'hym' && data.pass == "hym") {
    res.send('success')
  } else {
    res.send('failure')
  }
})
 */


/* const express = require('express');
const path = require('path');
const template = require('art-template');
const app = express();

//设置模板路径
app.set('views', path.join(__dirname, './views'));

//设置模板后缀为art，与app.engine相对应
app.set('view engine', 'art');
app.engine('art', require('express-art-template'));   //express兼容art-template引擎
app.get('/list', (req, res) => {
  let data = {
    title: '水果',
    list: [
      '苹果',
      '猕猴桃',
      '圣女果'
    ]
  };
  res.render('list', data);  //指定文件名称，渲染数据
})

//测试：访问http://localhost:3000/list
app.listen(3000, () => {
  console.log("running");
}) */

//封装天气查询模块
const http = require('http');

//http://www.weather.com.cn/data/sk/101010100.html
exports.queryWeather = (cityCode, callback) => {
  let options = {
    protocol: 'http:',
    hostname: 'www.weather.com.cn',
    port: '80',
    path: '/data/sk/' + cityCode + '.html',
    method: 'get'
  };

  let req = http.request(options, (res) => {
    let info = '';
    res.on('data', (chunk) => {
      info += chunk;
    })

    res.on('end', () => {
      info = JSON.parse(info);
      callback(info);
    })
  })

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.end();
}





