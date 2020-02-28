const path = require('path');
var template = require('art-template');

//使用方式一：创建好.art文件
var html = template(path.join(__dirname, '../mytpl.art'), {
  user: {
    name: 'aui'
  }
});

console.log(html);

//使用方式二：字符串形式
/* let tpl = '<ul>{{each list value index}}<li>{{index}}{{value}}</li>{{/each}}</ul>';
let render = template.compile(tpl);
let ret = render({
  list: ['english', 'math', 'chinese']
});
console.log(ret); */

//使用方式三：简单化
/* let tpl = '<ul>{{each list}}<li>{{$index}}{{$value}}</li>{{/each}}</ul>';
let ret = template.render(tpl, {
  list: ['english', 'math', 'chinese']
});
console.log(ret); */
