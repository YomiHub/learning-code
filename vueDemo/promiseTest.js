const fs = require('fs');
const path = require('path');

function getFileByPath (fpath) {
  //new实例中的resolve和reject是形参，需要在then()方法中定义实参
  return new Promise(function (resolve, reject) {
    fs.readFile(path.join(__dirname, fpath), 'utf-8', (err, dataStr) => {
      if (err) return reject(err);
      resolve(dataStr);
    })
  })
}

/* getFileByPath('./testPromise.txt').then(function (data) {
  console.log(data);
}, function (err) {
  console.log(err.message);
}) */

//通过.then方法返回新的promise对象，实现顺序读取多个文件
getFileByPath('./testPromise1.txt').then(function (data) {
  //then中可以只指定成功的回调
  console.log(data);
  return getFileByPath('./testPromise2.txt');  //返回新的promise对象
}).then(function (data) {
  console.log(data);
}).catch(function (err) {  //只要有任何promise执行失败，则立即终止promise的执行并进入catch，处理抛出的错误
  console.log('抛出错误，不执行后续promise' + err.message);
})