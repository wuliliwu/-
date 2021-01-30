
// 生成一个min到max的随机数
function rand(min, max) {
  return parseInt(Math.random()*(max-min+1))+min
}

// 格式化时间
function dateFormat(fmt, date) {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
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
  var timer = (userTime - nowTime)/1000  //转换成秒数
  var days = parseInt(timer/60/60/24)
  var hours = parseInt(timer/60/60%24)
  var minutes = parseInt(timer/60%60)
  var seconds = parseInt(timer%60)
  days = days<10?'0'+days:days
  hours = hours<10?'0'+hours:hours
  minutes = minutes<10?'0'+minutes:minutes
  seconds = seconds<10?'0'+seconds:seconds
  return days+'天'+hours+'小时'+minutes+'分钟'+seconds+'秒'
}


// 返回一个随机的颜色16进制
function color(){
  var str = "#";
  for(var i=0;i<6;i++){
      str += rand(0,15).toString(16);
  }
  return str;
}


// 数组去重
Array.prototype.Mydistinct = function() {
  var obj = {}
  var newArr = []
  for (let i = 0; i < this.length; i++) {
    var cur = this[i]
    if (obj[cur]) {
      obj[cur]++
    }else{
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
    str = str.replace(reg,'')
    return str
  }