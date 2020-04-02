window.onload = function () {
  console.log('livereload');
  let welcom = () => {
    console.log('欢迎来到websoket测试页面')
  };
  welcom();
  //客户端发送socket
  var oBtn = document.getElementById('btn');
  var oDiv = document.getElementById('div1');
  var socket = null;

  oBtn.onclick = function () {
    socket = io.connect('http://copywebsite.com:3000');  //与服务器端建立连接
    socket.on('hello', function (data) {
      alert(data);
      this.emit('hellotoo', '欢迎欢迎');
    });

    socket.on('a', function (data) {
      alert(data);
    });

    socket.on('move2', function (data) {
      oDiv.style.left = data.left + 'px';
      oDiv.style.top = data.top + 'px';
    });
  }

  //同步拖拽事件（就像游戏场景，所有客户端可以看到相同的场景）
  oDiv.onmousedown = function (ev) {
    var ev = ev || event;
    var disX = ev.clientX - this.offsetLeft;
    var disY = ev.clientY - this.offsetTop;

    if (oDiv.setCapture) {
      oDiv.setCapture();
    }

    document.onmousemove = function (ev) {
      var ev = ev || event;
      oDiv.style.left = ev.clientX - disX + 'px';
      oDiv.style.top = ev.clientY - disY + 'px';

      socket.emit('move', {
        left: oDiv.offsetLeft,   //可以直接传对象
        top: oDiv.offsetTop
      });
    }

    document.onmouseup = function () {
      document.onmousemove = null;
      //releaseCapture : 释放全局捕获
      if (oDiv.releaseCapture) {
        oDiv.releaseCapture();
      }
    }
    return false;
  }
}