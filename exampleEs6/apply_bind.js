//获取一个独一的fn
function symbol(obj) {
  let unique = (Math.random() + new Date().getTime()).toString(32).slice(0, 8);
  if (obj.hasOwnProperty(unique)) {   //避免覆盖已经存在的fn
    return symbol(obj);
  } else {
    return unique;
  }
}

Function.prototype.myapply = function (context) {
  if (typeof context === "undefined" || context === null) {
    context = window;
  }
  //或者context = context || window;   //如果没有传入对象则指向window

  let fn = symbol(context);    //fn为唯一值
  context.fn = this;
  var res = arguments[1].length ? context.fn(...arguments[1]) : context.fn();
  delete context.fn;
  return res;
}

Function.prototype.mybind = function (context) {
  let self = this;
  let args = [...arguments].slice(1);

  return function () {
    let nextArgs = [...arguments];
    return self.myapply(context, args.concat(nextArgs));
  }
}

var person = {
  name: "hym",
  callName: function (age) {
    console.log(this.name + "的年龄" + age)
  }
}

var person1 = {
  name: "yomi"
}

let fn = person.callName.mybind(person1, 18);
fn();