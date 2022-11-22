let turple: [string, number] = ["hym", 123];
let arr3: Array<string | number> = [1, "hhh"];

let obj3: object = { name: "hym", age: 14 };
let obj4: { name: string; age: number } = { name: "hhh", age: 18 };
obj4["age"] = 20;

let fnx = (x: string, y: number) => {
  return x + y;
};

let noreturn = () => {};

let typeset: (x: number, y: number) => number;
typeset = (x, y) => x + y;

interface Item {
  readonly id: number;
  name: string;
  // [x:string]:any; //支持多个任意类型的属性
  age?: number;
}

interface Result {
  data: Item[];
}

function render(res: Result) {
  res.data.forEach((item) => {
    console.log(item.id);
  });
}

let res = {
  data: [{ id: 1, name: "hym", age: 18 }],
};

render(res);
render({
  data: [{ id: 1, name: "hym", age: 18 }],
} as Result);

//不确定数据有多少属性时，使用可索引接口
interface Unkown {
  [index: number]: string; //数字类型索引
  [index: string]: any; //属性值是相互兼容的，此处不能为number
}

// 变量定义函数
let Fnn1: (x: number, y: number) => number;

// 接口定义函数
interface Fnn2 {
  (x: number, y: number): number;
}

// 类型别名定义函数
type Fnn3 = (x: number, y: number) => number;

let add: Fnn3 = (a, b) => {
  return a + b;
};

interface MixinLib {
  (): void;
  version: string;
  doSome(): void;
}

//用于生成多个实例
function getObj() {
  let lib: MixinLib = (() => {}) as MixinLib;
  lib.version = "1.0";
  lib.doSome = () => {
    console.log("doSome");
  };
  return lib;
}

let lib1 = getObj(); //获取一个实例
lib1(); //本身是立即执行函数
lib1.doSome();

function add5(x: number, y?: number) {
  return y ? x + y : x;
}

//在必选参数z之前的默认参数依旧要传undefined，之后的可以取默认值
function add6(x: number, y = 1, z: number, q = 1) {
  return x + y + z + q;
}

console.log(add6(1, undefined, 3));

//函数重载
function add7(...arr: number[]): number;
function add7(...arr: string[]): string;
function add7(...arr: any[]): any {
  let item = arr[0];
  if (typeof item === "number") {
    return arr.reduce((prev, cur) => prev + cur);
  }
  if (typeof item === "string") {
    return arr.join("");
  }
}

console.log(add7("i", " am", " yomi"));
console.log(add7(1, 2, 3));

//类

class User {
  //给构造函数添加private时，类就不能被继承、也不能实例化；protected时不能被实例化相当于基类
  constructor(name: string) {
    // this.name = name;
  }
  // name:string; //要给属性添加类型注解，且需要初始化
  // name?:string; //设置为可选属性
  name: string = "yomi"; //设置默认值
  static skin: string = "white";
  private pri() {} //默认是public，设置为私有成员只能被类本身调用，不能被子类和实例调用
  protected pro() {}
}

class Son extends User {
  constructor(name: string, age: number, public from: string) {
    super(name);
    this.age = age;
    this.from = from; //在构造函数使用修饰符，就可以省略在类中定义属性

    //这里可以访问父类protected成员
    this.pro();
  }
  age: number;
  readonly weight: number = 45;
}

console.log(User.skin, Son.skin);

//抽象类
abstract class Person {
  abstract say(): void;
}

class Man extends Person {
  constructor() {
    super();
  }
  say() {
    console.log("man");
  }
}

class Woman extends Person {
  constructor() {
    super();
  }
  say() {
    console.log("woman");
  }
  next() {
    return this; //实现链式调用，做到父类子类方法调用的连贯性
  }
}

let people: Person[] = [new Man(), new Woman()];
people.forEach((item) => {
  item.say();
});

//接口和类
interface Human {
  name: string;
  eat(): void;
}

class Lisa implements Human {
  constructor(name: string) {
    this.name = name;
  }
  name: string;

  //需要实现接口的所有属性
  eat() {
    console.log("eat");
  }
  sleep() {}
}

//组合继承接口
interface One extends Human {
  run(): void;
}

interface Two {
  cry(): void;
}

interface Three extends One, Two {}

//需要实现组合接口的所有属性
let boy: Three = {
  name: "",
  eat() {},
  run() {},
  cry() {},
};

// 接口继承自类
class Auto {
  state = 1;
  private name: string = "yomi";
}

interface AutoInterface extends Auto {
  //抽离了公共成员、私有成员和受保护成员
}

//不是子类，没有实现private成员会报错
/* class A implements AutoInterface {
  state = 1;
} */

// 子类实现接口
class B extends Auto implements AutoInterface {
  //子类已经继承了对应的属性，无需实现
}

//泛型
function log<T>(val: T): T {
  return val;
}

//调用
log<string[]>(["yomi"]); //显示声明类型
log(["yomi"]);

//定义函数类型
// type Log = <T>(val: T) => T;
// let myLog: Log = log;

//只对函数进行约束
// interface Log{
//   <T>(val:T):T
// }

//泛型约束接口的所有成员
interface Log<T = string> {
  (val: T): T;
}

//注意被泛型约束的接口在实现时需要指定类型
let myLog: Log = log;

//泛型类
class Log2<T> {
  run(val: T) {
    return val;
  }
}

let log2 = new Log2<number>(); //实例化也可以不限制类型，
log2.run(1);

//泛型约束：在类中访问泛型参数的属性时
interface Len {
  length: number;
}

function log3<T extends Len>(value: T) {
  console.log(value, value.length); //对length属性做约束
}

interface Foo {
  bar: number;
}
let foo = {} as Foo; //类型断言让下面的赋值通过类型检查
foo.bar = 1;

//更推荐的做法是直接指定类型，而不是随意使用类型断言
let foo2: Foo = {
  bar: 1,
};

//函数兼容性
type Handler = (a: number, b: number) => void;
function hof(fn: Handler) {
  return fn;
}

let handler1 = (a: number) => {};
hof(handler1); //函数参数少的可以赋值给参数多的

interface LessArg {
  a: number;
  b: number;
}

interface MoreArg {
  a: number;
  b: number;
  c: string;
}

let p2a = (point: LessArg) => {};
let p3a = (point: MoreArg) => {};

p3a = p2a;

//函数重载的兼容
function overLoadX(x: number, y: number): number;
function overLoadX(x: string, y: string): string;
function overLoadX(x: any): any {} //参数类型个数和返回值都需要兼容

//枚举类型兼容
enum Fruit {
  Apple,
  Banana,
}
enum Color {
  Red,
  Black,
}
let eat: Fruit.Apple = 1;
// let unmatch:Fruit.Apple = Color.Red; //不兼容的写法

class AT {
  constructor(name: string) {}
  name: string = "";
  age: number = 18;
}

class BT {
  constructor(age: number) {
    this.age = age;
  }
  age: number;
  name: string = "yomi";
}

let atEle = new AT("yomi");
let btEle = new BT(18);
atEle = btEle;

// 不使用泛型T时，下面的赋值可以被兼容
interface Empty<T> {
  // value:T
}

let objEmpty1: Empty<number> = {};
let objEmpty2: Empty<string> = {};
objEmpty1 = objEmpty2;

// 泛型函数
let logOk1 = <T>(x: T): T => {
  return x;
};

let logOk2 = <U>(x: U): U => {
  return x;
};

logOk1 = logOk2; //定义一样，且没有指定类型

//类型保护
enum Type {
  Strong,
  Week,
}

class Java {
  helloJava() {
    console.log("hello java");
  }
}

class JavaScript {
  helloScipt() {
    console.log("hello script");
  }
}

function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined;
}

function getLanguage(type: Type, x: string | number) {
  let lang = type == Type.Strong ? new Java() : new JavaScript();
  //这种情况需要加类型断言或者使用类型保护
  // if((lang as Java).helloJava){
  //   (lang as Java).helloJava();
  // }else{
  //   (lang as JavaScript).helloScipt();
  // }

  if (lang instanceof Java) {
    //也可以使用in关键字判断是否存在属性
    lang.helloJava();
  } else {
    lang.helloScipt();
  }

  //typeof区分联合类型
  if (typeof x === "string") {
    console.log(x.length);
  } else {
    console.log(x.toFixed(2));
  }

  //自定义类型保护函数
  if (isJava(lang)) {
    lang.helloJava();
  } else {
    lang.helloScipt();
  }

  return lang;
}

getLanguage(Type.Strong, "yomi");

//高级类型

//交叉类型
interface DogInterface {
  eat(): void;
}

interface CatInterface {
  jump(): void;
}

let pet: DogInterface & CatInterface = {
  eat() {},
  jump() {},
};

// 联合类型
let numUnion: 1 | 2 | 3;

// 对象的联合类型
class Dog implements DogInterface {
  eat() {}
}

class Cat implements CatInterface {
  eat() {}
  jump() {}
}
enum Master {
  Boy,
  Girl,
}

function buyPet(type: Master) {
  let pet = type === Master.Boy ? new Dog() : new Cat();
  pet.eat(); //对象的联合类型只能访问共有的交叉属性和方法
  return pet;
}

interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

// 可区分的联合类型
type shape = Square | Rectangle;
function area(s: shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.width * s.height;
    default:
      return ((e: never) => {
        throw new Error(e);
      })(s); //防止未定义的联合类型返回undefined
  }
}

// 索引类型：查询操作符 keyof T
interface Obj {
  a: number;
  b: string;
}

let objtest: keyof Obj; //即let objtest: a|b

//索引访问操作符 T[K] 即对象T的属性K所代表的类型
let attrtest: Obj["a"]; //等价于 let attrtest:number

let someData = {
  a: 1,
  b: 2,
  c: 3,
};

// 约束keys一定是obj的属性：对T和K的约束、参数类型约束、返回值约束
function getVal<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map((key) => obj[key]);
}

console.log(getVal(someData, ["a", "b"]));

//映射类型
interface MapObj {
  a: string;
  b: number;
  c: boolean;
}

type ReadOnlyObj = Readonly<MapObj>; //将接口属性变成已读
type PartialObj = Partial<MapObj>;
type PickObj = Pick<MapObj, "a" | "b">;
type newMapObj = Record<"x" | "y", MapObj>;

//条件类型
// T extends U ? X : Y //如果类型T可以赋值给类型U
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : "object";

type T1 = TypeName<string>; //"string"
type T2 = TypeName<string[]>; //"object"

// (A | B) extends U ? X : Y;
// 等价于 (A extends U ? X : Y)|(B extends U ? X : Y)

type T3 = TypeName<string | string[]>; //即 T3 = "string"|"object"

// 实现类型过滤
type Diff<T, U> = T extends U ? never : T;

type T4 = Diff<"a" | "b" | "c", "a" | "e">;
// Diff<"a","a"|"e"> | Diff<"b","a"|"e"> | Diff<"c","a"|"e">
// never | "b" | "c"
// "b"|"c"

// 剔除null和undefined
type NoneNull<T> = Diff<T, undefined | null>;
type T5 = NoneNull<string | number | undefined | null>;

//官方封装
//Exclude<T,U>  过滤掉 extends U 的类型
//NoneNullable<T>
//Extract<T,U> 从T中抽取出 extends U 的类型

type T6 = Extract<"a" | "b" | "c", "a" | "c">; //得到"a"

//ReturnType<T> 获取函数返回值的类型
type T7 = ReturnType<() => string>;


///<reference path="./other.ts"/>
namespace Shape{
  export function square(x:number){
    return x*x
  }
}

//Shape.circle(1);
Shape.square(1);  //引用来自other文件下的namespace，需要使用三斜线指令