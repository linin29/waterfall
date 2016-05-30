/*window.onload = function() {
	waterfall('main', 'pin');
	var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
	//鼠标滚动事件
	window.onscroll = function(){
		if(checkscrollside()){
			var oParent = document.getElementById('main');
			for (var i = 0; i < dataInt.data.length; i++) {
				var oPin = document.createElement('div');
				oPin.className = 'pin';
				oParent.appendChild(oPin);
				var oBox=document.createElement('div');
                oBox.className='box';
                oPin.appendChild(oBox);
                var oImg=document.createElement('img');
                oImg.src='./images/'+dataInt.data[i].src;
                oBox.appendChild(oImg);
			}
			waterfall('main','pin');
		}
	}
}*/
/**
 *parent:父级id, pin class名
 */
/*function waterfall(parent, pin) {
	var oParent = document.getElementById('main');
	var aPin = getClassObj(oParent, pin);
	//一个块的宽度
	var iPinW = aPin[0].offsetWidth;
	//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
	var num = Math.floor(document.documentElement.clientWidth/iPinW);
	//设置父级居中样式：定宽+自动水平外边距
	oParent.style.cssText = 'width:' + iPinW*num + 'margin:0 auto';
	//存放每列的高度
	var pinHArr = [];
	for (var i = 0; i < aPin.length; i++) {
		if(i<num){
			//先把前num个块的高度放入数组，即第一列的高度
			pinHArr.push(aPin[i].offsetHeight);
		}else{
			//获取最小的高度
			var minH = Math.min.apply(null, pinHArr);
			var minHindex = getminHIndex(pinHArr, minH);
			aPin[i].style.position = 'absolute';
			aPin[i].style.left = aPin[minHindex].offsetLeft + 'px';
			aPin[i].style.top = minH + 'px';
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            //更新添加了块框后的列高
            pinHArr[minHindex] += aPin[i].offsetHeight;
		}
	}
}*/
/**
 *通过父元素和子元素的class类，获取该同类子元素的数组
 */
/*function getClassObj (parent, className) {
	var obj = parent.getElementsByTagName('*');
	var pinS = [];
	for (var i = 0; i < obj.length; i++) {
		if(obj[i].className ==className){
			pinS.push(obj[i]);
		}
	}
	return pinS;
}*/
/**
 *获取数组最小元素的索引
 */
/*function getminHIndex(arr, minH){
	for(var i in arr){
		if(arr[i] == minH){
			return i;
		}
	}
}*/
/**
 *判断是否滚动到了最后一个元素的中间位置
 */
/*function checkscrollside(){
	var oParent = document.getElementById('main');
    var aPin = getClassObj(oParent,'pin');
    //创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var lastPinH = aPin[aPin.length - 1].offsetTop + Math.floor(aPin[aPin.length-1].offsetHeight / 2);
   	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
   	var documentH = document.documentElement.clientHeight;
   	return (lastPinH < scrollTop + documentH) ? true : false;
}*/

$(window).on("load", function(){
	waterfall();
	var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
	   window.onscroll=function(){
        if(checkscrollside()){
            $.each( dataInt.data, function( index, value ){
                var $oPin = $('<div>').addClass('pin').appendTo( $( "#main" ) );
                var $oBox = $('<div>').addClass('box').appendTo( $oPin );
                $('<img>').attr('src','./images/' + $( value).attr( 'src') ).appendTo($oBox);
            });
            waterfall();
        };
    }
});
/**
 *parent:父级id, pin class名
 */
function waterfall(){
	var $aPin = $("#main>div");
	var iPinW = $aPin.eq(0).width();
	var num = Math.floor($(window).width()/iPinW);
	$("#main").css({'width' : iPinW*num, 'margin': '0 auto'});
	//用于存储 每列中的所有块框相加的高度
	var pinHArr=[];
	$aPin.each(function(index, value){
		var pinH = $aPin.eq(index).height();
		if(index < num){
			pinHArr[index] = pinH;
		}else{
			var minH = Math.min.apply(null, pinHArr);
			var minHIndex = $.inArray(minH, pinHArr);
			$(value).css({'position': 'absolute', 'top' : minH + 'px', 'left' : $aPin.eq(minHIndex).position().left});
			//数组 最小高元素的高 + 添加上的aPin[i]块框高, 更新添加了块框后的列高
            pinHArr[ minHIndex ] += $aPin.eq( index ).height() + 15;
		}
	});
}
function checkscrollside(){
    var $aPin = $( "#main>div" );
    var lastPinH = $aPin.last().get(0).offsetTop + Math.floor($aPin.last().height()/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop = $( window ).scrollTop()//注意解决兼容性
    var documentH = $( document ).width();//页面高度
    return (lastPinH < scrollTop + documentH ) ? true : false;//到达指定高度后 返回true，触发waterfall()函数
}