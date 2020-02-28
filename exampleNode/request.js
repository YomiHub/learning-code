const url = require('url');
let myURL =
  url.parse('http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
console.log(myURL);

/*
Url {
  protocol: 'http:', //协议
  slashes: true,
  auth: 'user:pass',
  host: 'sub.example.com:8080', //包含端口号的域名
  port: '8080',   //端口
  hostname: 'sub.example.com',    //不包含端口号的域名
  hash: '#hash',  //锚点
  search: '?query=string',   //问号以及所有参数
  query: 'query=string',   //去掉问号后的所有参数
  pathname: '/p/a/t/h',     //域名后之后不包含参数的路径
  path: '/p/a/t/h?query=string',    //包含参数的路径
  href: 'http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'  //url完整字符串
}
*/