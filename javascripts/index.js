$(function(){

	/*全局变量*/
	var $back2top=$("a#back-to-top");
	var $window=$(window);
	
	/*事件绑定*/
	$window.scroll(fScroll);
	
	$back2top.click(function(){
		$("body").animate({scrollTop: 0}, 800);
	});
	
	$("a#nav-designs").click(function(){
		var scrollTop=$("#section-1").offset().top;
		$("body").animate({scrollTop: scrollTop}, 800);
	});
	
	/*函数封装*/
	function fScroll(){
		//console.log($(window).scrollTop());
		if($window.scrollTop()>500)
			$back2top.css("display","block");
		else 
			$back2top.css("display","none");
	}
});