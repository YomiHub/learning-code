/* ---------------------------------Symbol----------------------------------------------- */
// ?1.symbol参数 （ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值，接受一个字符串作为参数，表示对 Symbol 实例的描述）
/* let s1 = Symbol('hym');
let s2 = Symbol('hym');
console.log(s1, s2); //Symbol(hym) Symbol(hym)
console.log(s1 == s2);//false */

//?2.Symbol.prototype.description
/* console.log(s1.description);  //hym */

//?3.Symbol作为属性名（在对象的内部{}，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之）
/* let mysymbol = Symbol();
let obj = {};
Object.defineProperty(obj, mysymbol, { value: 'hym' });  //将对象的属性名定义为Symbol类型
console.log(obj[mysymbol])  //hym */

//?4.属性名遍历：for···in和for···of循环，Object.keys()、Object.getOwnPropertyNames()、JSON.tringify()都不会返回Symbol属性，可以通过Object.getOwnPropertySymbols()]、Refelect.ownKeys()获取
//使用Symbol键名不容易被常规遍历访问到，可以为对象定义一些非私有的，但又希望只应用于内部的方法

/* console.log(Object.getOwnPropertySymbols(obj));  //[ Symbol() ]
console.log(Reflect.ownKeys(obj));//[ Symbol() ] */

//?5.Symbol.for()，重新使用同一个Symbol值，先查询是否有Symbol.for()相同参数创建的Symbol值，有就返回没有就重新创建
//Symbol.for()的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值
/*
 let s1 = Symbol.for('hym');
let s2 = Symbol.for('hym');  //先检查给定的key是否已经存在
console.log(s1 === s2)  //true */

//?6.Symbol.keyFor(),返回已登记Symbol类型的值的key
/* let s1 = Symbol.for('hym');
let s2 = Symbol('hym');

console.log(Symbol.keyFor(s1));  //hym
console.log(Symbol.keyFor(s2));  //undefined */

/* ---------------------------------Set和Map数据结构----------------------------------------------- */
//?1.Set类似于数组，但值都是唯一的；通过add方法来添加成员
/* let arr = [1, 2, 3, 3, 3, 4, 5, 7, 7];
let set = new Set();
arr.forEach(item => {
  set.add(item);  //向set中添加元素不会发生类型转换，且在Set结构中NaN和NaN相等，但两个空对象不相等
})
console.log(set)  //Set { 1, 2, 3, 4, 5, 7 }

//数组去重
console.log([...new Set(arr)]);  //扩展运算符将set结构转为数组  [ 1, 2, 3, 4, 5, 7 ]

 */
//?2.Set的遍历方法和操作方法（add、delete、has、clear、keys、values、entries、forEach）
//操作方法Set.prototype.add(value)、delete(value)：删除某个值，返回一个布尔值、has(value)：返回一个布尔值、clear()：清除所有成员，没有返回值
/* let s = new Set();
s.add('hym').add('hjx').add('hxh');

//Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致
console.log(s.keys(), s.values());  //[Set Iterator] { 'hym', 'hjx', 'hxh' } [Set Iterator] { 'hym', 'hjx', 'hxh' }

// entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组 使用for··· of循环而不是for···in
for (let item of s.entries()) {
  console.log(item);
}
// [ 'hym', 'hym' ]
// [ 'hjx', 'hjx' ]
// [ 'hxh', 'hxh' ]

//遍历Set结构并改变Set结构
s = new Set(Array.from(s, val => {
  return val + 'change'
}))

console.log(s);  //Set { 'hymchange', 'hjxchange', 'hxhchange' } */

//?3.weakSet:构与 Set 类似，它与 Set 有两个区别: (1)WeakSet 的成员只能是对象，而不能是其他类型的值。(2)WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
//因为特性2，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息，WeakSet 不可遍历。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失

/* const foos = new WeakSet();
class Foo {
  constructor() {
    foos.add(this);  //foos对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑foos，也不会出现内存泄漏
  }

  method () {
    if (!foos.has(this)) {
      console.log('Foo实例方法只能在Foo实例上调用');
    }
    console.log('调用了method')
  }
}

let obj = new Foo();
obj.method();  //调用了method */

//?4.Map它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键

/* let mapArr = [['name', 'hym'], ['age', 18]];
let map = new Map(mapArr);  //接受键值对数组作为参数
console.log(map);  //Map { 'name' => 'hym', 'age' => 18 }

let s1 = ['a'];
let s2 = ['a'];
let testMap = new Map();
testMap.set(s1, 'a').set(s2, 'b');
console.log(testMap.get(s1), testMap.get(s2));  //a b */

//?5.Map 的实例属性和操作方法：size属性、Map.prototype.set(key, value)、get(key)、has(key)、delete(key)删除某个键，返回true。如果删除失败，返回false、clear()没有返回值
/* let map = new Map().set('name', 'hym').set('age', 18);
console.log(map.get('age'));  //18 */

//?6.Map三个遍历器函数，一个遍历方法keys()、values()、entries()、forEach()方法还可以接受第二个参数，用来绑定this
/* //结合数组的map、filter可以实现Map的遍历与过滤
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)  //通过扩展运算符将Map结果转为数组结构
);

console.log(map1)  //Map { 1 => 'a', 2 => 'b' }

//?7.将Map结构转为对象结构
function changeToObj (map) {
  //通过{}创建的对象和new Object()的方式是一样的，都会继承Object对象的所有属性
  let obj = Object.create(null);  //创建的对象是不继承Object原型链上的属性，如tostring()方法这些
  for (let [k, v] of map) {
    obj[k] = v;  //对于非字符串键名会转为字符串
  }
  return obj;
}

console.log(changeToObj(map1));  //[Object: null prototype] { '1': 'a', '2': 'b' }

//?8.对象转为Map结构要使用entries()
let test = { 'name': 'hym', 'age': 1 };
let mapTest = new Map(Object.entries(test));
console.log(mapTest); */

//?9.将Map转为Json结构:当键名都是字符串则可以转为对象JSON；当键名包含有非字符串则可以转为数组对象
/* function toObjJson (map) {
  return JSON.stringify(changeToObj(map));  //obj转JSON
}

//包含有非字符串
function toarrJson (map) {
  return JSON.stringify([...map]);  //数组转JSON
}

console.log(toObjJson(map1));  //{"1":"a","2":"b"} */

//?10.将JSON转为Map时，先使用JSON.parse()转为对象，再将对象转为Map: new Map(Object.entries(test));但对于如下JSON数组
/* function jsonToMap (jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']} */

//?11.WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名它的键名，其所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内
//避免不使用对象的时候，忘记删除引用导致内存泄漏
/* const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
console.log(wm.get(element))// "some information" */

/* ---------------------------------Proxy----------------------------------------------- */
//?1.Proxy介绍: 在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截
/* var object = new Proxy({}, {
  get: function (target, propKey, receiver) {   //读取对象属性拦截
    console.log(`getting ${propKey}`);
    return Reflect.get(target, propKey, receiver);
  },
  set:function(target,propKey,value,receiver){
    return Reflect.set(target,propKey,value,receiver);
  }
})

object.count = 1;
console.log(++object.count) //getting count 2 */

//?2.Proxy 实例也可以作为其他对象的原型对象（继承）
/* let pro = new Proxy({}, {
  get: function (target, propKey) {
    return '拦截了'
  }
})
let obj = Object.create(pro);  //作为对象的原型
console.log(obj.name);  //对象没有该属性，所以从原型中寻找 拦截了 */

//?3.Proxy支持的拦截操作有13种get(target, propKey, receiver)、set(target, propKey, value, receiver)、has(target, propKey)
//deleteProperty(target, propKey)、ownKeys(target)、getOwnPropertyDescriptor(target, propKey)
//defineProperty(target, propKey, propDesc)、preventExtensions(target)、getPrototypeOf(target)
//isExtensible(target)、setPrototypeOf(target, proto)、apply(target, object, args)、construct(target, args)

//!通过拦截防止对象的内部属性（命名以下划线开头）被操作
/* const handler = {
  get (target, propKey) {
    invariant(propKey, 'get');
    return target[propKey];
  },
  set (target, propKey, value) {
    invariant(propKey, 'set');
    target[propKey] = value;
    return true;
  }
}

function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attemp to ${action} private "${key}" property`);
  }
}

let target = {};
let proxy = new Proxy(target, handler);
console.log(proxy._name);  //Invalid attemp to get private "_name" property */

//!当Proxy的实例作为函数调用时就会被apply拦截
/* var target = function () { return 'i am the target' };
var handler = {
  apply: function () {
    return 'i am the Proxy'
  }
}

let proxy = new Proxy(target, handler);
console.log(proxy())  //  i am the Proxy  把 Proxy实例作为函数调用时，会被apply拦截，通过call,apply调用同样会被拦截
 */

//!当Proxy的实例作为构造函数调用,被construct拦截
/* var handler = {
  construct: function (target, args) {
    return { value: args[1] };  //construct方法返回的必须是一个对象，否则会报错
  }
}

var fproxy = new Proxy(function (x, y) {
  return x + y;
}, handler);

console.log(new fproxy(1, 2));  //{ value: 2 } 被construct拦截 */

//

/* ---------------------------------Reflect----------------------------------------------- */
//?1.Reflect是ES6为操作对象提供的新API，主要目的有四个：
//将Object对象的明显属性（defineProperty）放到Reflect、
//修改某些Object方法的返回结果、
//让Object操作都变成函数行为、
//Reflect对象方法与Proxy对象方法一一对应，就可以方便调用Reflect上的方法完成默认行为

/* var obj = {name:'hym',age:18}
Object.defineProperty(obj,'name',{
  writable:false,
  configurable:false
})

try{
  Object.defineProperty(obj,'name',{value:'hjx'});
}catch(e){
  console.log('错误：'+e)  // 错误：TypeError: Cannot redefine property: name
}

//使用Reflect改变方法返回的结果，设置不成功时会返回false
if(Reflect.defineProperty(obj,'name',{value:'hjx'})){
  console.log('设置成功：'+obj.name);
}else{
  console.log('设置失败：'+obj.name)
}

console.log('name' in obj);  
console.log(Reflect.has(obj,'name'))  //将命令式操作变为函数行为 */

//?2.Reflect有13个静态方法，大部分与Object对象的同名方法的作用都是相同的，而且它与Proxy对象的方法是一一对应的
/* var obj1 = {
  name:'hym',
  age:22,
  get all(){
    return this.name+'-'+this.age  // 读取函数的this绑定receiver
  }
}

var obj2 = {
  name:'hjx',
  age:15,
  get all(){
    return this.name+'-'+this.age
  }
}

// 如果第一个参数不是对象，Reflect.get方法会报错
console.log(Reflect.get(obj1,'all',obj2));  // hjx-15 读取函数的this指向obj2 */

//?3.同样在调用set时传入receiver，赋值函数的this就会指向receiver；另外，当Proxy和Reflect联合使用，且Reflect传入receiver时则Reflect.set会触发Proxy.defineProperty
/* let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
// defineProperty */

//? 4.需要绑定函数的this时使用fn.apply(obj,args)，但如果函数自定义了apply方法时需要使用Function.prototype.apply.call(fn,obj,args)，使用Reflect可以进行简化Reflect.apply(fn,obj,args)
/* var data = [1,2,3,4];
//旧写法
// var minList = Math.min.apply(Math,data);
// var minStr = Object.prototype.toString.call(minList);

var minList = Reflect.apply(Math.min,Math,data);
var minStr = Reflect.apply(Object.prototype.toString,minList,[]);

console.log(minList)
console.log(minStr)
//1
//[object Number]
 */

//?5. Proxy结合Reflect实现简单的观察者模式
/* var queueObservers = new Set() // 用于存放观察者

const observe = (fn) => queueObservers.add(fn) //添加观察者
const observable = (obj) => new Proxy(obj, { set }) //为观察的对象设置拦截

function set(target, key, value, receiver) {
  const res = Reflect.set(target, key, value, receiver)
  queueObservers.forEach((observe) => observe())
  return res
}

observe(function () {
  console.log('观察者函数被触发')
})

var test = observable({ name: 'hym' })
test.name = 'hjx'  //"观察者函数被触发" */

/* ---------------------------------Promise----------------------------------------------- */
//?1.使用Promise简单实现Ajax
/* const getJson = function(url){
  const promise = new Promise(function(resolve,reject){
    const handler = function(){
      if(this.readyState!==4){
        return;
      }

      if(this.status ==200||this.status==304){
        return resolve(this.response);  //添加return 避免resolve后面的语句被执行
      }else{
        return reject(new Erro(this.statusText))
      }
    }

    const client = new XMLHttpRequest()
    client.open("GET",url)
    client.onreadystatechange= handler
    client.responseType = "json"
    client.setRequestHeader('Accept','application/json');
    client.send()
  })

  return promise;
}

getJson("./test.json").then(function(res){
  console.log('content:'+JSON.stringify(res))  //content:{"name":"hym"}
},function(error){
  console.error('错误信息'+error)
}); */

//?2.Promise.prototype.then()接收两个参数，参数二可选，建议使用catch方法代替参数二：resolved状态的回调、rejected状态回调；Promise.prototype.catch()
//如果异步操作抛出错误，状态就会变为rejected，就会调用catch()方法指定的回调函数，处理这个错误。另外，then()方法指定的回调函数，如果运行中抛出错误，也会被catch()方法捕获
/* const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};
someAsyncThing().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
  // 下面一行会报错，因为y没有声明，该catch内抛出的错误需要使用catch捕获
  y + 2;
}).catch(function(error) {
  console.log('carry on', error);
});
// oh no [ReferenceError: x is not defined]
// carry on [ReferenceError: y is not defined] */

//?3.Promise.prototype.finally()不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数
/* //finally方法的回调函数不接受任何参数，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

// resolve 的值是 undefined
Promise.resolve(2).then(()=>{},()=>{})
// resolve 的值是 2
Promise.resolve(2).finally(() => {})

// reject 的值是 undefined
Promise.reject(3).then(() => {}, () => {})
// reject 的值是 3
Promise.reject(3).finally(() => {})

//finally方法总会返回resolve或reject原来的值 */

//?4.Promise.all()，当所有promise的状态都为fulfilled，才会返回fulfilled；只要有一个状态为rejected,返回的状态就为rejected

//如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法
/* const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])  // 参数可以不是数组，但必须具有 Iterator 接口
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了] */

//?5.Promise.race()，只要有一个Promise的状态改变，则返回最先改变的Promise实例返回值

//如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数
/* const p = Promise.race([
  getJson("./test.json"),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error); */

//?8.Promise.try()让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API
/* //方法1.使用async
const f = ()=>console.log("同步函数");

(async ()=>f())()  //立即执行的匿名函数，会立即执行里面的async函数
.then(val=>console.log(val))  //异步时则用then指定下一步
.catch(e=>console.log(e))   //async不能捕获错误，需要Promise.catch()方法
console.log('next')
// 同步函数
// next
// undefined

//方法2.使用new Promise()
(()=>new Promise(
  resolve=>resolve(f())
))();  //使用立即执行的匿名函数，执行new Promise()，这种情况下，同步函数也是同步执行的

//方法3.Promise.try()
Promise.try(() => database.users.get({id: userId}))  //Promise对象可能返回执行的异步错误，或者数据库连接的同步错误
  .then(val=>console.log(val))
  .catch(e=>console.log(e))  //捕获所有同步和异步的错误 */

//?7.应用：图片加载
/* const preloadImage = function(url){
  return new Promise(function(resolve,reject){
    const image = new Image();
    image.onload = resolve
    image.onerror = reject;
    image.src = url;
  })
} */


/* ---------------------------------Iterator----------------------------------------------- */
//它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作

//?1.Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环
//如果要被for···of循环调用，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）
/* 
class RangeIterator{
  constructor(start,stop){
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator](){
    return this;
  }

  next(){
    var value = this.value;
    if(this.value<this.stop){
      this.value++;
      return {value:value,done:false}
    }
    return {value:undefined,done:true}
  }
}

function range(start,stop){
  return new RangeIterator(start,stop);
}

for(var val of range(0,3)){
  console.log(val);// 0, 1, 2
} */

//?2.遍历器对象除了具有next方法，还可以具有return方法和throw方法(next必须，return和throw是可选的)
//return 用于for···of循环提前退出（出错或者break，一般用于在完成遍历前，清理或释放资源）
/* function readLineSync(file){
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return {value:1, done: false };
        },
        return() {
          // file.close();
          console.log('done')
          return { value:undefined,done: true };
        }
      };
    },
  };
}

var fileName = './test.json';

// 情况一
for (let line of readLineSync(fileName)) {
  console.log(line);  // 1 done
  break;  //触发return
}

// 情况二
for (let line of readLineSync(fileName)) {
  console.log(line);  // 1 done 抛出错误
  throw new Error(); //触发return
}
 */

 //注意：for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性；而且不同于forEach，它可以结合break、continue、return 一起使用


/* ---------------------------------Generator----------------------------------------------- */
//?1.Generator函数是一个普通函数，有两个特征，一是在function关键字和函数名之间有一个星号；二是函数内部使用yield表达式
/* 
function* test(){  //ES6没有规定*的书写位置，一般是这种紧跟在function关键字后的写法
  yield 1;
  yield 2;  // yield表达式就是暂停标志，yield后面的表达式只会在next方法移到该行时才进行运算
  return 'ending';
}

var pointer = test();  //返回的是内部状态的指针对象
console.log(pointer.next());  //{ value: 1, done: false }  next使指针移向下一个状态
console.log(pointer.next());  //{ value: 2, done: false }
console.log(pointer.next()); //{ value: 'ending', done: true }  return 后的表达式作为value
console.log(pointer.next());   //{ value: undefined, done: true } done为true表示遍历结束  
 */
//?2.使用Generator实现数组展平
var arr = [1,[2,[3]],4,[5]]
/* var flat = function* (arr){
  var len = arr.length;
  for(let i = 0; i < len; i++){
    if(typeof arr[i] !== 'number'){
      //实际上，任何数据结构只要有 Iterator 接口，就可以被yield*遍历。
      yield* flat(arr[i]);  //ES6 提供了yield*表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数
    }else{
      yield arr[i];
    }
  }
}

for(var item of flat(arr)){  //for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，yield结束，done 为true,则不会将return结果包含在内
  console.log(item)  //1 2 3 4 5
} */

//?3.Generator结合for···of实现斐波那契额数列
/* function* fabonacci(){
  let [prev,curr] = [0,1];
  for(;;){  //无限循环
    yield curr;
    [prev,curr] = [curr,prev+curr];
  }
}

for(let num of fabonacci()){
  if(num>1000) break;
  console.log(num)
} */


//?4.Generator添加遍历器接口
/* var info = {name:'hym',age:18}

function* objectEntries(obj){
  let propKeys = Reflect.ownKeys(obj);

  for(let propKey of propKeys){
    yield [propKey,obj[propKey]];
  }
}

for(let [key,val] of objectEntries(info)){  
  console.log(`${key}:${val}`)
}

//或者添加到Symbol.iterator属性上
function* objectEntries(){
  let propKeys = Object.keys(this);  //不能使用Reflect.ownKeys()获取

  for(let propKey of propKeys){
    yield [propKey,this[propKey]];
  }
}

info[Symbol.iterator] = objectEntries;
for(let [key,val] of info){  
  console.log(`${key}:${val}`)
}
// name:hym
// age:18 */

//?5.Generator返回的总是遍历器对象，而不是this对象，也不能和new命令一起用，可以使用call让Generator函数返回正常的对象实例
/* function* F(){
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

var obj = {};
var f = F.call(obj); //让遍历器函数内部的this对象绑定空对象

console.log(f.next());
console.log(f.next());
console.log(f.next());

console.log(obj.a)

// { value: 2, done: false }
// { value: 3, done: false }
// { value: undefined, done: true }
// 1 可以访问对象的属性，但生成的对象实例是obj */


//?6.生成遍历器对象，并统一对象实例
/* function* gen(){
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F(){
  return gen.call(gen.prototype);
}

var f = new F();
console.log(f.next());
console.log(f.next());
console.log(f.next());

console.log(f.a)
// { value: 2, done: false }
// { value: 3, done: false }
// { value: undefined, done: true }
// 1 */

//?7.Generator与状态机
//clock状态机
/* var ticking = true;
var clock = function() {
  if (ticking)
    console.log('Tick!');
  else
    console.log('Tock!');
  ticking = !ticking;
} */

//Generator的实现不需要额外的变量，可避免被其他算法更改、更符合函数式编程的思想
/* var clock = function* (){
  while(true){
    console.log('Tick');
    yield;
    console.log('Tock!');
    yield;
  }
}

var c = clock();
c.next();
c.next();
// Tick
// Tock! */

/* ---------------------------------Generator函数的异步应用----------------------------------------------- */
//?1.在ES6之前处理异步的方法主要有：回调函数、发布/订阅、事件监听、Promise对象
/* var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result);
}

var g = gen();
var res = g.next();

res.value.then(data=>{
  return data.json()
}).then(function(data){
  g.next(data);  //Fetch模块返回的是一个 Promise 对象，因此要用then方法调用下一个next方法
}); */

//?2.Thunk 函数:是自动执行 Generator 函数的一种方法（将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数）
//在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数

/* //ES5版本的实现
var Thunk = function(fn){
  return function(){
    var args = Array.prototype.slice.call(arguments); //转为数组类型
    return function(callback){
      args.push(callback);
      return fn.apply(this,args)// 最后一个参数为回调函数
    }
  }
}

// ES6版本
const Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};


function test(a,cb){
  cb(a);
}

const ft = Thunk(test);

ft(1)(console.log)  //1 */

//?3.Thunk 函数真正的威力，在于可以自动执行 Generator 函数
/* var fs = require('fs');
var thunkify = require('thunkify');  //npm install thunkify
var readFileThunk = thunkify(fs.readFile);

function run(fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;  // 判断是否执行完毕
    result.value(next);
  }

  next();
}

var g = function* (){
  var f1 = yield readFileThunk('fileA');  // 在yield命令后面的必须是 Thunk 函数
  var f2 = yield readFileThunk('fileB');
  // ...
  var fn = yield readFileThunk('fileN');
};

run(g);  //只要执行run函数，这些操作就会自动完成 */

/* ---------------------------------async 函数----------------------------------------------- */
//?1.async函数让异步操作更加容易，简单来说就是Generator函数的语法糖（async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await）
/* async function fn(){
  //return 'Hello Word'  // return 返回的值会成为then回调函数的参数
  throw new Error('抛出的错误')
}

fn().then(
  res=>console.log('res:'+res),  // res:Hello Word
  e=>console.log('error:'+e)  // error:Error: 抛出的错误 async内部抛出的错误会导致返回的Promise对象为rejected状态
)  */

//?2.只有async函数内部所有的await命令后面的Promise对象执行完毕，才会改变状态，执行then方法指定的回调函数
/* var fetch = require('node-fetch');
async function getTitle(url){
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/^<title>([\s\S]+1)<\/title>/i)[1];
}

getTitle('https://tc39.github.io/ecma262/').then(console.log) */

//?3.await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。await命令后面是一个thenable对象（即定义了then方法的对象），那么await会将其等同于 Promise 对象
function sleep(interval){
  return new Promise(resolve=>{
    setTimeout(resolve, interval);
  })
}

//使用await实现休眠效果
async function waitTime(){
  for(let i = 0; i < 3; i++){
    console.log(i);
    await sleep(1000);
  }
}

waitTime().then(v=>console.log("执行完毕")).catch(e=>console.log("await后面的Promise状态为reject"));  //每隔1s打印一个数字，最后打印执行完毕





/* ---------------------------------async 函数----------------------------------------------- */


/* -------------------------参考自：阮一峰的ES6入门https://es6.ruanyifeng.com/  ------------------------------- */
