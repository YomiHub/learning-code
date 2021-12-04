/*
 * @Author: Yomi
 * @Date: 2021-09-04 09:40:32
 * @LastEditors: Yomi
 * @LastEditTime: 2021-09-05 16:44:15
 */

// 原始类型
let bool: boolean = true;
let str: String = "abc"; //不允许 123 赋值，类型不同
let num: number = 123;
let num2: number | undefined | null = 123;

let sym1: Symbol = Symbol(); //显示声明
let sym2 = Symbol();

let un: undefined = undefined; //不能被赋值任何其他的属性值
let nu: null = null;

//num = undefined; //undefined和null做为子类型是允许赋值的，但需要在tsconfig中设置strictNullChecks=false
num2 = null; //或者在严格类型时声明num2为联合类型

// 声明数组类型的方式
let arr1: number[] = [1, 2, 3];
let arr2: Array<number | String> = [1, 2, 3, "abc"]; // Array是ts的泛型接口

// 元组
let tuple: [number, string] = [123, "abc"]; //必须按照类型顺序严格对应
tuple.push(4); // 使用push不会报错，tuple也能变成[123,'abc',4]，但使用tuple[2]越界访问，编译会报错

//对象
let errobj: object = { x: 1, y: 2 }; //这种定义方式是不允许修改属性的
let obj: { x: number; y: number } = { x: 1, y: 2 };
obj.x = 3; //具体声明了属性类型后可以修改属性值

//函数
let fn = (x: number, y: number) => x + y;
let cal: (x: number, y: number) => number; //函数类型声明
cal = (a, b) => a + b; //函数类型具体实现

//void 表示没有任何返回值的类型
let noReturn =()=>{}

//any
let z; //不指定类型的时候默认就是any类型，可任意赋值
z=123;
z='abc';

//never 表示永远不会有返回值的类型
let error = ()=>{
  throw new Error('error');
}

let endless = ()=>{
  while(true){} //死循环，永远没有返回值
}

// 数字枚举   不设置初始值则默认为从0开始的值
enum Role {
  Reporter = 3,
  Developer,
  Maintainer,
  Owner,
  Guest
}
console.log(Role.Reporter)
console.log(Role)  //反向映射，可以通过key访问value，也可以value访问key
/*{
  3: "Reporter"
  4: "Developer"
  5: "Maintainer"
  6: "Owner"
  7: "Guest"
  Developer: 4
  Guest: 7
  Maintainer: 5
  Owner: 6
} */

//字符串枚举
enum Answer{
  N,
  Y = "yes"
}
console.log(Answer);
/* {
  0: "N"
  N: 0
  Y: "yes"
} */

//枚举成员的分类
enum Char {
  a,
  b=Char.a,
  c = 1+2,
  d = Math.random(), //computred
  e = '123'.length,
  f = 5 //在computed枚举后面的枚举成员一定要有初始值
}

//常量枚举的使用
const enum Month {
  Jan,
  Feb,
  Mar
}
let month = [Month.Jan,Month.Feb,Month.Mar]  //在运行时会直接被替换成常量