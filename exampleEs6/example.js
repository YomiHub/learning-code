/* let str = String.fromCodePoint(0x20BB7);
let len = str.length;
console.log(str.charCodeAt(0)) 

console.log('hym'.padStart(4, "123"));*/

//var全局作用域，在循环中全局变量只有一个，所以输出结果为10
/* var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  }
}

a[6](); */

//let 是块级作用域，可以保存每一个i值,输出结果为6
/* var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  }
}

a[6](); */


//for循环中设置循环变量的那部分与循环体内部不是同一个作用域，如下输出的三次是'hym'
for (let i = 0; i < 3; i++) {
  let i = 'hym';
  console.log(i);
}
