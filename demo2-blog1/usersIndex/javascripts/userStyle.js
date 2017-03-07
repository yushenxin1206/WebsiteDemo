$(function(){
	var $userPhoto=$(".user-photo");
	var photoPosition=[];
	var photoRotate=[];
	for(var i=0;i<$userPhoto.length;i++){
		photoPosition[i]={};
		photoPosition[i].x=Math.ceil((2*Math.random()-1)*10)+25*i+"%";
		photoPosition[i].y=Math.ceil((2*Math.random()-1)*10)+25*i+"%";
		photoRotate[i]=Math.ceil((2*Math.random()-1)*20);
		
		$userPhoto.eq(i).css({"top":photoPosition[i].y,"left":photoPosition[i].x,"transform":"rotate("
			+photoRotate[i]+"deg)"}).attr("data-num",i);
	}
	console.log(photoPosition[i]);
	
	$userPhoto.mouseover(function(){
		var i=parseInt($(this).attr("data-num"));
		var photoRerot="rotate("+0+"deg)";
		var photoScale="scale("+1.2+")";
		var photoZindex=i+3;
		$(this).css({"transform":photoRerot+" "+photoScale,"z-index":photoZindex});
	});
	$userPhoto.mouseout(function(){
		var i=parseInt($(this).attr("data-num"));
		var photoRerot="rotate("+photoRotate[i]+"deg)";
		$(this).css({"transform":photoRerot,"z-index":i});
	});
});