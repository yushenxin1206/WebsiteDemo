$(function(){

	/*全局变量*/
	var $back2top=$("a#back-to-top");
	var $window=$(window);
	var $navTop=$("nav").offset().top;
	/*事件绑定*/
	$window.resize(function(){
		$navTop=$("nav").offset().top;
	});
	$window.scroll(fScroll);
	
	$back2top.click(function(){
		$("body").animate({scrollTop: 0}, 400);
	});
	
	$("a#nav-designs").click(function(){
		var scrollTop=$("#section-1").offset().top;
		$("body").animate({scrollTop: scrollTop}, 400);
	});
	
	/*函数封装*/
	function fScroll(){
		//console.log($(window).scrollTop());
		if($window.scrollTop()>$navTop)
			$back2top.css("display","block");
		else 
			$back2top.css("display","none");
	}
});