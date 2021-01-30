/*
作用:返回一个随机整数
参数:第一个是最小值,第二个最大值
返回值:最小到最大值之间的随机整数
*/
function rand(min,max){
	return min+Math.floor(Math.random()*(max-min+1));
}


/*
作用:生成随机颜色
参数:无
返回值:返回一个十六进制的颜色  #456ABC
*/
function getColor(){
	var str = "#";
	for(var i=0;i<6;i++){		
		str += rand(0,15).toString(16)
	}	
	return str;

}

/*
作用:通过id获取元素
参数:id
返回值:DOM节点
*/
function $id(id){
	return document.getElementById(id);
}

/*
作用:获取窗口可视区域的宽高
参数:无
返回值:json对象
*/

function getClient(){
	if(window.innerWidth!=undefined){
		return {
			width: window.innerWidth,
			height:window.innerHeight
		};
	}else if(document.compatMode=="CSS1Compat"){
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		};
	}else{
		return {
			width:document.body.clientWidth,
			height:document.body.clientHeight
		};
	}
}

function scroll(){
	// return {
	// 	left:document.documentElement.scrollLeft+document.body.scrollLeft,
	// 	top:document.documentElement.scrollTop+document.body.scrollTop
	// }
	return {
		left:document.documentElement.scrollLeft||document.body.scrollLeft,
		top:document.documentElement.scrollTop||document.body.scrollTop
	}
}

function getElements(className){
		//定义一个数组,用于存放符合条件的DOM节点
		var result = [];
		//第一步:获取页面上的所有标签
		var all = document.getElementsByTagName('*');
		//第二步:筛选其中类名叫one的元素
		for(var i=0;i<all.length;i++){
			if(all[i].className==className){
				//如果循环到的标签的类名和传入的类名一致,说明这个标签就是符合条件的
				result.push(all[i])
			}
		}
		return result;
}

//封装一个getStyle方法用于获取元素的样式
function getStyle(element,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(element,null)[attr];
	}else{
		return element.currentStyle[attr];
	}

}

function addEvent(dom,type,fn){
	if(dom.addEventListener){
		dom.addEventListener(type,fn,false)
	}else{
		dom.attachEvent("on"+type,fn)
	}
}


function trim(str){
	var reg = /(^\s+)|(\s+$)/g
	str = str.replace(reg,"")
	return str;
}



// 思路:封装一个匀速运动函数,可以实现指定元素,指定属性运动到指定目标位置,要求属性是数值型的,单位是px
// function animate(dom,attr,target,fn){
// 	clearInterval(dom.timer);
// 	dom.timer = setInterval(function(){
// 		//获取当前位置(属性:attr)
// 		var current = getStyle(dom,attr);
// 		if(attr == "opacity"){
// 			current = current*100
// 		}else{
// 			current = parseInt(current)
// 		}
// 		//设置速度(如果当前位置大于目标位置,速度为负数,否则为正数)
// 		var speed = current>target?-5:5;
// 		//计算下一次的位置
// 		var next = current + speed;
// 		//判断是否到达目标位置
// 		if(Math.abs(next-target)<=5){
// 			//计算的位置和目标位置距离不到一步,直接到位
// 			if(attr == "opacity"){
// 				dom.style.opacity = target/100;
// 				dom.style.filter = "alpha(opacity="+target+")";//ie678
// 			}else{
// 				dom.style[attr] = target + "px";
// 			}
// 			if(fn){
// 				fn()
// 			}
// 			clearInterval(dom.timer)
			
// 		}else{
// 			//元素定位
// 			if(attr == "opacity"){
// 				dom.style.opacity = next/100;
// 				dom.style.filter = "alpha(opacity="+next+")";
// 			}else{
// 				dom.style[attr] = next+"px";
// 			}
			
// 		}
		
// 	},30)
// }

//思路:封装一个缓动函数,可以实现指定元素,指定属性运动到指定目标位置,要求属性是数值型的,单位是px
//这个函数用于源代码的01-03题目
// function animate(dom,attr,target,fn){
// 	clearInterval(dom.timer);
// 	dom.timer = setInterval(function(){
// 		//获取当前值
// 		var current = getStyle(dom,attr);
// 		if(attr=="opacity"){
// 			//如果是透明度,值是小数,要乘以100
// 			current *= 100;
// 		}else{
// 			current = parseInt(current);//取整,去除px单位
// 		}
// 		//设置速度
// 		var speed = (target - current)/10;
// 		speed = speed>0?Math.ceil(speed):Math.floor(speed);
// 		//计算下一次的值
// 		var next = current + speed;
// 		if(attr=="zIndex"){
// 			next = target;
// 		}
// 		//判断是否到达目标值
// 		if(next==target){
// 			if(attr=="opacity"){
// 				dom.style.opacity = target/100;
// 				dom.style.filter = "alpha(opacity="+target+")";//ie678
// 			}else{
// 				dom.style[attr] = target + "px"
// 			}	
// 			if(fn){
// 				fn();//fn是动画完成以后执行的函数
// 			}				
// 			clearInterval(dom.timer);
// 		}else{
// 			//元素定位
// 			if(attr=="opacity"){
// 				dom.style.opacity = next/100;
// 				dom.style.filter = "alpha(opacity="+next+")";//ie678
// 			}else{
// 				dom.style[attr] = next + "px";
// 			}
// 		}
		
// 	},20)
// }

//这个函数用于源代码的04以后的题目
function animate(dom,json,fn){		
		/*
		dom:要缓动的节点
		json:就是要执行缓动的键值对{"width":600,"height":300,"left":300,"top":400}
		fn:是动画完成后的回调函数
		*/		
		clearInterval(dom.timer);//要用定时器先清定时器
		dom.timer = setInterval(function(){
			//设定标志值
			var flag = 1;

			for(var attr in json){
				//获取当前值
				var current = getStyle(dom,attr);
				if(attr=="opacity"){
					current *=100;//透明度需要乘以100					
				}else{
					current = parseInt(current);
				}
				//获取目标值
				var target = json[attr];
				//设置速度
				var speed = (target- current)/10;
				speed = speed>0?Math.ceil(speed):Math.floor(speed);
				//计算下一个位置
				var next = current + speed;
				if(attr == "zIndex"){
					next = target;
				}
				//判断是否到达目标位置
				if(next!=target){
					flag = 0;
				}	
				//元素定位
				if(attr=="opacity"){
					dom.style.opacity = next/100;
					dom.style.filter = "alpha(opacity="+next+")"
				}else if(attr=="zIndex"){
					dom.style[attr] = next;
				}else{
					dom.style[attr] = next+"px";
				}
			}
	
	
			if(flag){
				if(fn){
					fn();
				}
				clearInterval(dom.timer);
			}
	
		},20)
	}
