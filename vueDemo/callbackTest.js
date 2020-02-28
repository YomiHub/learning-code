const fs = require('fs');
const path = require('path');

//callback有两个参数，第一个是失败的结果，第二个是成功的结果，且成功时参数一位null，失败时参数二维undefined
function readFileByPath (path, callback) {
  fs.readFile(path, 'utf-8', (error, dataStr) => {
    if (error) return callback(error);  //注意这里使用return是在失败时不再执行下面的代码
    callback(null, dataStr);
  })
}

readFileByPath(path.join(__dirname, './testPromie.txt'), (error, dataStr) => {
  if (error) return console.log(error.message)
  console.log(dataStr);
})