const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./connectDB.js')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public')));

app.post('/login', (req, res) => {
  let param = req.body;
  let sql = 'select count(*) as total from user where username=? and password=?';
  let data = [param.username, param.password];

  db.base(sql, data, (results) => {
    if (results[0].total == 1) {
      res.send('登录成功');
    } else {
      res.send('登录失败');
    }
  })
})

app.listen(3000, () => {
  console.log('running');
})
