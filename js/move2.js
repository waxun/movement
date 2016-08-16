function startMove(obj,json,fn){
				clearInterval(obj.timer);
				
				obj.timer=setInterval(function(){
//问题之一: opacity的oaserInt后为0
					// var iCur = parseInt(getStyle(obj,attr));//替换obj.offsetWidth
					for(var attr in json){
						//1、取当前值
						var iCur=0;
						if(attr=="opacity"){
							//外面又加一个parseInt是为了处理小数出现的问题
							iCur=parseInt(parseFloat(getStyle(obj,attr))*100);//因为下面ceil都是处理整数的，所有需要兼容一下*100
						}else{
							iCur = parseInt(getStyle(obj,attr));
						}
						//2、计算速度
						var iSpeed=(json[attr]-iCur)/8;//目标点-div的当前的宽
						iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
						//3、检测停止条件

						/*当检测到了目标点就立刻停止定时器，任何一个到了*/
						// if(iCur==json[attr]){//如果oDiv的可见宽=目标，则清除定时器
							
							
						// }else{
							//问题之二: opacity=100px？？？
							var bStop = true;//标志这次运动结束--所有的值都到达了
							if(iCur!=json[attr]){//当有的值不等于目标点
								bStop=false;
							}
							if(attr=="opacity"){
								obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
								obj.style.opacity=(iCur+iSpeed)/100;

								//输出一下透明度
								// txt1.value=obj.style.opacity;
							}else{
								obj.style[attr]=iCur+iSpeed+'px';//设置div的宽为当前的宽+速度
							}
							
						}
					
					if(bStop){//如果都到了
						clearInterval(obj.timer);
							if(fn){
								fn();
							}
					}
				},30);
			}
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle( obj )[attr];
}