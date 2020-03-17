
/* -------------------------let和const命令------------------------------- */
//?1.var全局作用域，在循环中全局变量只有一个，所以输出结果为10
/* var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  }
}

a[6](); */

//?2.let 是块级作用域，可以保存每一个i值,输出结果为6
/* var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  }
}
a[6](); */


//?3.for循环中设置循环变量的那部分与循环体内部不是同一个作用域，如下输出的三次是'hym'
/* for (let i = 0; i < 3; i++) {
  let i = 'hym';
  console.log(i);
} */


//?4.不存在变量提升，要在声明之后使用，否则会报错
/* console.log(a);  //ReferenceError: Cannot access 'a' before initialization
let a = 3;

console.log(typeof a)  //ReferenceError: Cannot access 'a' before initialization
let a = 'hym';
*/

//?5.第一个参数默认值为另一个还未声明的参数，报错（参数位置互换，正常运行）
/* function bar (x = y, y = 2) {
  return [x, y];
}

bar(); // 报错 */

//?6.同一作用域下不允许重复声明
/* function same (a) {
  let a = 3;//SyntaxError: Identifier 'a' has already been declared
  console.log(a); /
} */

//?7.允许块级作用域任意嵌套
/* {
  var a = 1;
  console.log(a);
} */

//?8.在块级作用域下声明函数不同环境下表现不一样，应该避免在块级作用域内声明函数。
//确实需要也应该写成函数表达式，而不是函数声明
/* function f () {
  console.log("outside function")
}

(function () {
  let fn = function f () {
    console.log("inside function")
  }
  fn();  //输出inside function
}())
 */

//?9.const常量一旦声明就必须初始化，且值不能修改
/* const a;  //SyntaxError: Missing initializer in const declaration
a = 1;
console.log(a);
 */

//?10.只能保证指针指向地址不变
/* const person = {
  name: 'hym'
}
person.age = 16;  //运行正常

person = 'hym';  //指向另一个地址时报错：TypeError: Assignment to constant variable. */

/* const a = Object.freeze({ name: 'hym' });
a.age = 16;
console.log(a.age)  //undefined  在strict模式下会报错 */


//?11.声明变量的六种方法：var、function、let、const、class、import
//   let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。
/* var a = 1;
console.log(global.a)  //在浏览器中使用window.a
console.log(this.a) */

//?12.在所有情况下获取顶层对象的方法
/* var getGlobal = function () {
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw new Error('unable to locate global object');
}

console.log(getGlobal()) */


/* ----------------------------------解构赋值----------------------------------------- */
//?1.右边不是可遍历的结构时会报错
/* let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {}; */

//?2.Set结构也可以使用数组的解构赋值
/* let [x, y, z] = new Set(['a', 'b', 'c']);
console.log(x);  //a */

//?3.解构赋值可以指定默认值，只有对应位置上的值严格等于undefined的时候才会使用默认值
/* let [x = "a", y] = [undefined, 'b'];
let [z = 1, w = z] = [2, 3];  //默认值还可以引用其它 已经声明 的变量
console.log(x); //a
console.log(w); //3 */

//?4.对象解构赋值可以不按顺序排列，而是取决于属性是否同名
/* let { name = 'hym', age } = { name: 'hjx', age: 16 };
console.log(name); */

//?5.对象解构可以方便的将现有对象方法赋值给变量
/* let { log, sin, cos } = Math;//将Math对象对应的方法赋值给变量
console.log(sin((Math.PI * 30) / 180)) */

//?6.对于属性名和变量名不同的情况：先找到同名的属性，然后赋值给对应的变量
/* let { name: n, age: a } = { name: 'hym', age: 16 };  //name和age是匹配模式
console.log(n, a)  //hym 16 */

//?7.对象解构赋值可以取到继承的属性
/* let obj1 = {};
let obj2 = { name: 'hym', age: 20 };
Object.setPrototypeOf(obj1, obj2);  //obj1的原型对象是obj2
let { name } = obj1;
console.log(name);  //hym */

//?8.对已经声明的变量用于解构赋值，需要加大括号，避免解析成代码块
/* let a;
//{ x }={ x: 1 }; SyntaxError: Unexpected token =
({ x } = { x: 1 })
console.log(x);  //1 */

//?9.等号右边为数值或布尔值，则会先转换为对象；对于null和undefined不能转成对象，会报错
/* let { toString: s } = 123;
console.log(s);  //[Function: toString]
console.log(s === Number.prototype.toString);  //true */

//?10.函数参数也可以解构赋值
/* function fn ([x, y]) {
  return x + y;
}

console.log(fn([3, 4]));  //7 */

//?11.只有在赋值语句的非模式部分才可以使用圆括号({ p: (d) } = {});，不能在结构赋值放圆括号的情况如下：
/*
//*(1)变量声明语句
let [(a)] =[1];

//*(2)函数参数
function fn ([(x)]) { return x; }

//*(3)赋值语句
({ p: a }) = { p: 1 }; */

//?12.（1）解构赋值用于交换变量的值、（2）方便取出返回数组或者对象中的值、
//（3）方便将参数名与变量名对应、（4）提取JSON数据、（5）方便设置参数默认值


/* ----------------------------------字符串扩展---------------------------------------------- */
//?1.字符串遍历for···of,可以识别大于0xFFFF的码点
/* for (let codepoint of "hym") {
  console.log(codepoint)
} */


//?2.改造JSON.stringify():遇到单个码点或不存在配对形式时，返回转义字符串
//非配对""\\udf06\\ud834""，在node v12.10.0下返回"\udf06\ud834"
/* console.log(JSON.stringify('\uDF06\uD834'))   */

//?3.模板字符串（空格与换行都会被保留，可以使用trim()去掉），变量写在${}之中
/* function calculate (a, b) {
  console.log(`${a + b}`)  //*可以使用javascipt表达式  打印3
  return `<p>${a}+${b}</p>`
}
console.log(calculate(1, 2));  //<p>1+2</p>
console.log(`${calculate(3, 4)}`)  //*可以在${}中调用函数  <p>3+4</p> */

//?4.在模板字符串中可以使用<%...%>放置 JavaScript 代码
/* let template = `<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>`;

//*结合正则实现模板字符串的编译
function compile (template) {
  const evalExpr = /<%=(.+?)%>/g;
  const expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  let script =
    `(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }

    ${ template}

    return output;
  })`;

  return script;
}

let parse = eval(compile(template));
console.log(parse({ supplies: ["broom", "mop", "cleaner"] }))

//   <ul>
//     <li>broom</li>
//     <li>mop</li>
//     <li>cleaner</li>
//   </ul> */

//?5.标签模板***模板字符串紧跟在函数后面，函数将被调用处理该模板字符串

/* ---------------------------------字符串新增方法----------------------------------------------- */

//?1.fromCodePoint从 Unicode 码点返回对应字符,可以识别大于0xFFFF的字符，弥补了String.fromCharCode()方法的不足。
/* let str = String.fromCodePoint(0x20BB7);
let len = str.length;

//*能够正确处理 4 个字节储存的字符，返回一个字符的码点
console.log(str.charCodeAt(0))

console.log('hym'.padStart(4, "123"));*/

//?2.String.raw() 返回斜杠都可以被转义的字符串，常用于模板字符串处理
/* console.log(String.raw`hi\\n`)  //对转义字符进行二次转义(打印显示转义后的字符)  hi\\n

console.log(String.raw`hi\\n` === 'hi\\\\n')  //true */

//?3.实例方法codePointAt() 正确返回四个字节的字符 对比下charAt()不能返回完整字符、charCodeAt()只能分别返回前后两个字节
/* console.log('𠮷'.charCodeAt(0))  //55362 注意不是吉，而是四个字节的字符
console.log('𠮷'.codePointAt(0)) //134071
//*通过该方法就可以判断一个字符码点是否大于0xFFFF，即是两个字节还是四个字节组成 */

//?4.normolize()将字符的不同表示方法统一为同样形式，称Unicode正规化
/* console.log('\u004F\u030C'.normalize()) //Ǒ
console.log('\u01D1' === '\u004F\u030C')  //false 在正规化之前无法识别这两个不同表示方法的字符相同
console.log('\u01D1'.normalize() === '\u004F\u030C'.normalize())  //true */

//?5.实例方法 includs()是否包含字符串、startsWidth()是否在原字符串头部、endsWidth()是否在字符串尾部
/* let str = 'hello world'
console.log(str.includes('llo', 3));  //false 检查第n个到结尾
console.log(str.startsWith('ell', 1));  //true 检查第n个到结尾
console.log(str.endsWith('lo', 5));  //true 检查前n个 */

//?6.实例方法 repeat()  重复字符，参数为小数会向下取整，NaN则转为0，负数或Infinity会报错
/* console.log('hym'.repeat(3));  // hymhymhym */

//?7.实例方法 padStart()、padEnd() 不够字符长则在字符前或后补齐，参数1为长度、参数2为用于补齐的字符;默认使用空格补齐
/* let str = 'ym'.padStart(3, 'h'); //* hym  (1)补全字符或数值指定位数
console.log(str);

console.log('03-06'.padStart(10, 'YYYY-MM-DD')) //*YYYY-03-06  (2)用于提示字符串格式
*/

//?8.实例方法 trimStart()、trimEnd()  用于消除头部和尾部的空格，返回新字符，不会改变原字符
/* let s = ' hym '
let changeS = s.trimStart();
console.log(s); // hym 原字符不会改变
console.log(changeS); //hym */

//?9.实例方法 matchAll() 返回一个正则表达在当前字符的所有匹配，可参考链接(https://es6.ruanyifeng.com/#docs/regex)
//*字符串对象可使用正则的方法：match()、replace()、search()、split()


/* ---------------------------------数值新增方法----------------------------------------------- */
//?1.新增二进制（0b或0B）和八进制(0o或0O)前缀
/* console.log(0b111110111 === 503) // true
console.log(0o767 === 503) // true */


//?2.改进方法Number.isFinite()、Number.isNaN()；传统全局方法isFinite()和isNaN()先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效
/* console.log(Number.isFinite(Infinity));  //false  用于判断是否为有限数值
console.log(Number.isNaN(NaN));  //true  用于判断是否为NaN */

//?3.Number.parseFloat()、Number.parseInt();将传统的全局方法移到Number对象上，减少全局方法
/* Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true */

//?4.Number.isInteger()判断是否为整数，当存储二进制位超过53位（小数点后15个十进制位）会丢失精度，导致误判；非数值返回false
/* console.log(Number.isInteger(1.00)) //true  小数和整数同样的存储方法，被视为同一个数 */

//?5.Number.EPSILON是一个大于1的极小的常量，相当于1.00···1，小数点后51个连续的零，用于设置一个误差范围
//误差检查函数，误差在2的-50次方
/* function errorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

console.log(0.1 + 0.2 == 0.3);  //false
console.log(0.1 + 0.2 === 0.3);  //false
console.log(errorMargin(0.1 + 0.2, 0.3));  //true */

//?6.Number.IsSafeInteger() 在JS中能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），该方法用于判断一个整数是否在安全范围
//方法的实现： 跟安全整数的两个边界值比较一下
/* Number.isSafeInteger = function (n) {
  return (typeof n === 'number' &&
    Math.round(n) === n &&
    Number.MIN_SAFE_INTEGER <= n &&
    n <= Number.MAX_SAFE_INTEGER);
} */

//?7.Math对象上新增了17个与数学相关的方法 
/* console.log(Math.trunc(1.33));  //1 保留整数，去除小数部分；对于非数字则转为数值后计算；空值与无法截取则返回NaN
console.log(Math.sign(-0)); //-0 用于判断正（+1）、负（-1）还是零（+0、-0）
console.log(Math.cbrt(8));  //2 用于计算一个数的立方根
console.log(Math.clz32(0));  //32 转为32位无符号整型，返回有多少个前导0
console.log(Math.imul(0x7fffffff, 0x7fffffff));  //1 返回两个数以32位带符号形式相乘的结果，对于很大数相乘返回正确的低位数结果
console.log(Math.fround(1.125));  //1.125 返回32位 单精度浮点数；主要用于将64位双精度浮点数转为32位单精度浮点数
console.log(Math.hypot(3, 4));  //5 返回所有参数的平方 和 的平方根


// 新增四个对数方法
console.log(Math.expm1(1))  //1.718281828459045 （不是L是数字1）返回e^x - 1，即Math.exp(x) - 1
console.log(Math.log1p(0))  //0 返回1+x的自然对数，x小于-1返回NaN
console.log(Math.log10(99))  //1.99563519459755 返回以10为底的x的对数
console.log(Math.log2(4))  // 2 返回以2为底的x的对数

//新增6个双曲线函数

//新增指数运算符 ** （右结合运算符，连用时从右边开始计算）在V8中与Math.pow()运算结果有细微差异
console.log(2 ** 2 ** 3)  //256 相当于2**(2**3) */


//?8.新增BigInt数据类型;解决的问题：在JS中所有数字都是表示为64位浮点数，大于等于2的1024次方的数无法表示，返回Infinity
/* console.log(2172141653 * 15346349309);  //33334444555566670000 丢失精度
console.log(2172141653n * 15346349309n); //33334444555566667777n  BigInt类型需要在数字后面添加n，同样可以表示各个进制
console.log(typeof (123n));  //bigint */

//?9.BigInt对象,可以将其他类型的数值转为BigInt,与Number类似； 不可以使用New运算符；
//继承了Object的toString、valueOf;Number的toLocaleSrting
/* BigInt(false) // 0n   undefined、null、不能转换为数值的字符串作为参数都会报错 */


/* ---------------------------------函数的扩展----------------------------------------------- */
//?1.函数参数默认值（可以结合解构赋值一起使用），参数变量是默认声明的，使用参数默认值时，不能有同名参数，会报错
/* function fn (x = 0, y = 1) {
  console.log(x + y);  //不传参数时，使用默认参数 1
}

function fn2 ({ x, y = 1 }) {  //传递参数为对象，解构赋值
  console.log(x, y);
}

fn();
fn2({ x: 0 });  // 0 1 */

//?2.一般默认参数都是尾参数，否则无法只省略该参数

//?3.函数的length属性，返回没有默认值的参数个数，设置默认值的参数length属性失真
/* console.log((function (x, y = 1) { }).length);  //1  同样的rest参数也不计入length属性 */

//?4.设置默认值的参数，在函数声明初始化时就会形成单独的作用域，等到初始化结束时，作用域消失
/* let x = 0;

fucntion fn(y = x){
  console.log(y);  //0  调用函数时 y=x形成单独作用域，此时x没有定义，指向全局变量 （let声明存在暂时性死区，不允许x=x）
} */

//?5.利用参数默认值，设置参数不可省略 (将默认值设置为抛出错误的函数，当缺省时执行函数)

/* function throwIfMissing () {
  throw new Error('Missing parameter');
}

function fn (x = throwIfMissing()) {
  return x;
}
 */

//?6.rest参数   ...变量名，获取函数的多余参数放入到变量数组中，就可以不使用arguments对象:Array.prototype.slice.call(arguments).sort();
/* function fn (x, ...values) {
  for (var val of values) {
    console.log(x);
    console.log(val);  //2 3
  }
}

fn(1, 2, 3); */


//?7.严格模式 ，从ES5开始允许在函数内使用'use strict'设置为严格模式，在es6中只要参数使用了解构赋值、默认参数、扩展运算符就不能显示设置严格模式

/* const doSomething = (...a) => {
  'use strict'; // 报错
}; */

//?8.函数的name属性，返回该函数的函数名（使用fn.bind({}).name返回的值会带有bound）
/* var f = function fn () {
  return 'f';
}
console.log(f.name);  //fn  在ES6中可以返回具名函数实际名
 */

//?9.箭头函数 => this指向是定义时所在的对象，且不可以改变；不能当作构造函数；不可以使用arguments对象；不可以使用yield;不适用于定义对象方法，以及需要动态this的时候
/* var people = name => ({ name: 'hym', age: 18 })  //返回对象要在对象外加大括号
console.log(people());  //{ name: 'hym', age: 18 } */

//?10.目前只有Safari支持的 尾调用优化 且只在严格模式开启（即只保留内层函数的调用帧，不需要保留外层函数的调用帧），尾调用指的是在函数最后一步是调用另一个函数
/* function fn1 () {
  return fn2();   //最后一步，且不带操作，例如fn2()+1 调用后进行操作不属于尾调用
} */

//?11.尾递归 尾调自身，称为尾递归（对尾递归只存在一个调用帧，不存在栈溢出错误,节省内存）；用到的内部变量改写成函数的参数可实现尾递归
/* function Fibonacci (n, ac1 = 1, ac2 = 1) {
  if (n <= 1) return ac2;
  return Fibonacci(n - 1, ac2, ac1 + ac2);
}

console.log(Fibonacci(100));  //573147844013817200000 */

//?12.尾调递归优化的实现，将递归函数改写为每一步返回一个函数

//蹦床函数可以将递归执行变为循环执行
/* function trampoline (f) {
  while (f && f instanceof Function) {  //执行后返回的是函数，就继续执行函数
    f = f();
  }
  return f;  //改为每步返回一个函数
} */

//?13 ES2017允许 函数参数的尾逗号，允许函数在定义或调用时在函数参数尾部添加逗号
/* function clownsEverywhere (
  param1,
  param2,
) { //code
} */


//?14 ES2019修改了Function.property.toString()，以前会省略注释与空格，ES2019要求返回完全一样的源代码
/* console.log(clownsEverywhere.toString()) */


//?15.catch命令参数省略，以前明确规定catch后面要跟参数接收try抛出的错误对象，在ES2019允许省略这个可能用不上的参数
/* try {
  throw Error('error');
} catch{
  console.log('这是无参catch')
} */


/* ---------------------------------数组新增方法----------------------------------------------- */
//?1.扩展运算符，...[x,y]将数组转为用逗号分隔的参数，相当于rest参数的逆运算，主要用于函数调用 （通过扩展运算符数组就可以方便使用Math.max()）
/* function fn (x, y) {
  return x + y;
}
console.log(fn(...[1, 2]));  //3 */

//?2.扩展运算符的应用
/* //（1）复制数组
const a1 = [1, 2, 3]
const a2 = [...a1]
console.log(a2);

//（2）合并数组，浅拷贝
const arr = [...a1, ...a2]

//（3）与解构赋值结合，用于生成数组、数组赋值（只能放在参数最后一位）
const [a, ...arr1] = [1, 2, 3, 4];
console.log(a);  //1
console.log(arr1);  //[ 2, 3, 4 ]

//（4）将字符串转为数组，可以用于正确识别四个字节的Unicode字符  [...str].length
console.log([...'hym']);  //[ 'h', 'y', 'm' ]

//（5）任何实现了Iterator接口的对象都可以使用扩展运算符转为真正的数组
// let nodelist = document.querySelectorAll('div');
// let arr2 = [...nodelist];

//（6）Set、Map、Generator函数
const go = function* () {
  yield 1;
  yield 2;
};
console.log([...go()]);  //[ 1, 2 ]

let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr3 = [...map.keys()];
console.log(map.keys())  //[Map Iterator] { 1, 2, 3 }
console.log(arr3)  // [1, 2, 3] */

//?3.Array.from()任何有length属性的对象，都可以通过Array.from方法转为数组
/* const arr = Array.from({ length: 2 }, () => 'jack')  //第三个参数用于绑定this
console.log(arr);// ['jack', 'jack'] */

//?4.Array.Of() Array.of用于将一组值，转换为数组；总是返回参数值组成的数组。如果没有参数，就返回一个空数组，解决Array()或new Array()参数不同导致的重载
/* console.log(Array.of());
console.log(new Boolean()); */

//?5.实例方法copyWithin(target开始替换位置,start开始读取位置,end)，在数组内部将指定位置的成员复制到其他位置，返回当前数组
/* console.log([1, 2, 3, 4, 5].copyWithin(0, 3));  //[ 4, 5, 3, 4, 5 ] */

//?6.实例方法find(),用于查找第一个符合条件的成员；参数为一个回调函数，数组成员依次执行该函数，直到找到第一个符合条件的返回
/* console.log([1, 2, 3, 4].find((item, index, arr) => {
  return item > 3;  //4 符合条件时返回
})) */

//?7.实例方法findIndex()，使用与find类似，用于返回符合条件成员的位置，和find方法一样可以接受第二个参数用于指定回调函数的this指向(不能使用箭头函数)
/* let person = { age: 12 };
let fn = function (item) {
  return item > this.age;
}
let res = [13, 12, 3, 14].find(fn, person)

console.log(res); */

//?8.实例方法fill()，使用给定值填充数组，第一个参数用于填充，第二第三个元素用于指定起始位置和结束位置
/* let arr = new Array(3).fill(1);
console.log(arr);  //[ 1, 1, 1 ] */

//?9.数组实例方法：entries()键值对遍历、keys()键名遍历、values()键值遍历 用于遍历数组并返回遍历器对象（可使用for···of遍历，或者遍历器对象调用entries.next().value）
/* for (let [index, item] of ['h', 'y', 'm'].entries()) {
  console.log(index, item);  //0 h  1 y  2 m
} */

//?10.数组实例方法 includes()，返回一个布尔值，表示数组是否包含给定值;第一个参数是指定值，第二参数表示搜索起始位，默认为0
/* console.log([1, 2, 3].includes(1));  //true;
//可替代的方法：arr.indexOf(1)!==-1;可以判断环境是否支持方法，再写一个可替代方法
const contains = (() => {
  return Array.prototype.includes
    ? (arr, item) => arr.includes(item)
    : (arr, item) => arr.some(el => { el === item });
})()

console.log(contains([12, 3, 4, 5], 3)); //true; */

//?11.数组的实例flat()用于展平数组，默认只能展平一层，可以用参数指明展平的层数Infinity;注意的是flat会跳过数组的空位
/* console.log([1, 1, [3, 4, 5, [2, 9]]].flat(Infinity));  //[ 1, 1, 3, 4, 5, 2, 9] */

//?12.flatMap() 用于遍历展平数组，只展平一层，参数为一个遍历函数（item,index,arr）;实例方法还可以指定第二个参数，用于绑定遍历函数中的this
console.log([1, 2, 3].flatMap(function (item) {
  return [item, item + this.name]; //[ 1, '1test', 2, '2test', 3, '3test' ]
}, { name: 'test' }));

//?13.空位处理，forEach()、filter()、reduce()、every()、some()都会跳过空位，map会跳过空位，但是会保留该值;toString()、join会将空位视为undefined；ES6则将空位转为undefined
[, 'a'].forEach((item, index) => {
  console.log(index);
})  //1

console.log([, 'a'].map(item => {
  return 1;
}))  //[ <1 empty item>, 1 ]

//?14.ES2019规定Array.prototype.sort()排序必须稳定，指排序关键字相同的项目排序前后的顺序不变
const stableSort = (s1, s2) => {
  if (s1[0] < s2[0]) {  //按首字母稳定排序（对于首字母相同的字符串相对位置不变）
    return -1;
  }
  return 1;
}

const unstableSort = (s1, s2) => {
  if (s1[0] <= s2[0]) {  //按首字母不稳定排序（对于首字母相同的字符串相对位置改变）
    return -1;
  }
  return 1;
}

const arr = ['hym', 'hjx', 'hxh', 'hyx', 'hyz'];
console.log(arr.sort(stableSort));  //[ 'hym', 'hjx', 'hxh', 'hyx', 'hyz' ]
console.log(arr.sort(unstableSort)); //[ 'hyz', 'hyx', 'hxh', 'hjx', 'hym' ]

/* ---------------------------------字符串新增方法----------------------------------------------- */
//
