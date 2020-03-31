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
  }
})

object.count = 1;
console.log(++object.count) //getting count 2 */


//?2.Proxy 实例也可以作为其他对象的原型对象
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
var target = function () { return 'i am the target' };
var handler = {
  apply: function () {
    return 'i am the Proxy'
  }
}

let proxy = new Proxy(target, handler);
console.log(proxy())  //  i am the Proxy  把 Proxy实例作为函数调用时，会被apply拦截，通过call,apply调用同样会被拦截

/* ---------------------------------Symbol----------------------------------------------- */


/* -------------------------参考自：阮一峰的ES6入门https://es6.ruanyifeng.com/  ------------------------------- */