// 生成一个min到max的随机数
function rand(min, max) {
  return parseInt(Math.random() * (max - min + 1)) + min
}

// 格式化时间
function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

function countDown(time) {
  var nowTime = +new Date()
  var userTime = +new Date(time)
  var timer = (userTime - nowTime) / 1000 //转换成秒数
  var days = parseInt(timer / 60 / 60 / 24)
  var hours = parseInt(timer / 60 / 60 % 24)
  var minutes = parseInt(timer / 60 % 60)
  var seconds = parseInt(timer % 60)
  days = days < 10 ? '0' + days : days
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds
  return days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒'
}


// 返回一个随机的颜色16进制
function color() {
  var str = "#";
  for (var i = 0; i < 6; i++) {
    str += rand(0, 15).toString(16);
  }
  return str;
}


// 数组去重
Array.prototype.Mydistinct = function () {
  var obj = {}
  var newArr = []
  for (let i = 0; i < this.length; i++) {
    var cur = this[i]
    if (obj[cur]) {
      obj[cur]++
    } else {
      obj[cur] = 1
    }
  }
  for (const key in obj) {
    if (Number(key).toString() === 'NaN') {
      newArr.push(key)
    } else {
      newArr.push(Number(key))
    }
  }
  return newArr
}

// 封装字符串去除两边空格
function trim(str) {
  var reg = /^\s*|\s+$/g
  str = str.replace(reg, '')
  return str
}


function getStyle(obj, key) {
  if (obj.currentStyle) {
    return obj.currentStyle[key]
  } else {
    return window.getComputedStyle(obj, null)[key]
  }
}
// 目标对象,属性,属性值,回调函数
// 写动画步骤
// 1.清除定时器
// 2.开启定时器
// 3.判断属性是不是opacity,获取属性不同
// 4.定义速度speed,正值向上取整,负值向下取整
// 5.临界值停止定时器

function move(obj, target, callback) {
  clearInterval(obj.timer)
  obj.timer = setInterval(function () {
    var flag = true
    for (const key in target) {
      if (key == 'opacity') {
        var current = parseInt(getStyle(obj, key) * 100)
      } else {
        // console.log(111);
        var current = parseInt(getStyle(obj, key))
      }
      // 定义速度
      var speed = target[key] > current ? Math.ceil((target[key] - current) / 10) : Math.floor((target[key] - current) / 10)

      // 下一次的值
      var next = current + speed
      if (key == 'opacity') {
        obj.style[key] = next / 100
        obj.style.filter = 'alpha(opacity=' + next + ')'
      } else if (key == 'zIndex') {
        obj.style[key] = target[key]
      } else {
        obj.style[key] = next + 'px'
      }
      if (next != target[key]) {
        flag = false
      }
    }
    if (flag) {
      clearInterval(obj.timer)
    }
  }, 10)
}


// 获取元素距离屏幕左边和上边的距离,不管有几个父盒子定位
function getLeftTop(obj) {
  // 声明一个变量来存储拿到的left和top
  var distance = {
    left: 0,
    top: 0
  }
  while (true) {
    distance.left = distance.left + obj.offsetLeft
    distance.top = distance.top + obj.offsetTop
    obj = obj.offsetParent
    if (obj.nodeName == 'BODY') {
      return distance
    }
  }
}