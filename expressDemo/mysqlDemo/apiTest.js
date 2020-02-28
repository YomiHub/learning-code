/*node后台接口开发*/

const express = require('express');
const db = require('./connectDB.js');
const app = express();


//json 接口
/* app.get('/query', (req, res) => {
  let sql = 'select * from book';
  db.base(sql, null, (result) => {
    res.json(result); //访问127.0.0.1:3000/query  返回json格式的数据
  })
}) */

//jsonp接口，将返回的json数据通过参数的形式返回，默认回调函数callback
//app.set('jsonp callback name', 'cb');  设置callback的名称为cb
/* app.get('/query', (req, res) => {
  let sql = 'select * from book';
  db.base(sql, null, (result) => {
    res.jsonp(result);
    //访问127.0.0.1:3000/query?callback=fun  json数据作为fun函数的参数返回，请求参数callback名称错误则按json格式的数据返回
  })
}) */


//resful接口
app.get('/books', (req, res) => {
  let sql = 'select * from book';
  db.base(sql, null, (result) => {
    res.json(result);
    //访问127.0.0.1:3000/query?callback=fun  json数据作为fun函数的参数返回，请求参数callback名称错误则按json格式的数据返回
  })
})

//带参的情况 http://localhost:3000/books/book/1
app.get('/books/book/:id', (req, res) => {
  let id = req.params.id;
  let sql = 'select * from book where id=?';
  let data = [id];
  db.base(sql, data, (result) => {
    res.json(result[0]);
  })
})

app.listen(3000, () => {
  console.log('服务启动');
})