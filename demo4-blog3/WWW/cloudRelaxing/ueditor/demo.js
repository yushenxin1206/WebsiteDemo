//注意异步对程序的影响
var ue = UE.getEditor('container'),
	WMstate=0,//文章管理器状态0为空隐藏，1为有内容并且显示，2为有内容隐藏
	optionHtml,
	currentNum=1,
	pageNum,
	writingNum,
	reviseState=0,
	revisionUploadTime='',
	$writingManagement=$("#writingManagement");
	
getPageList(0);//先获取整个页码，避免实时调用的异步影响
function uptext(){
		if (!ue.hasContents()){
			alert('请先填写内容!');
		}else if(reviseState==0){
			var data=ue.getContent();
			//console.log(data);
			$.post('http://127.0.0.1/cloudRelaxing/write.php',{order:'upload',param:data},function(result){
					alert(result);
			});
		}else{
			var data=ue.getContent();
			$.post('http://127.0.0.1/cloudRelaxing/write.php',{order:'upload',param:data},function(result){
					if($.trim(result)=="上传成功！"){
						deleteWriting(revisionUploadTime);//上传成功，删除原文章
						$.pageCache.clear();//清除所有缓存(都受到了影响)
						$("#CRButton").css("display","none");
						revisionUploadTime='';
						ue.setContent('');
						$("#WMButton").click();
						alert("修改成功！");
					}
					else
						alert("修改失败！");
			});
		}
	}
function writingManagement(){
	$("#writingView").css("display","none");//只显示一个div
	$("#writingPreview").css("display","none");//只显示一个div
	//获取首页文章列表
	if(WMstate==0){
		getWritingList('getWritingList',1);
		$writingManagement.css("display","block");
		WMstate=1;
	}else if(WMstate==1){
		$writingManagement.css("display","none");
		WMstate=2;
	}else if(WMstate==2){
		$writingManagement.css("display","block");
		WMstate=1;
	}
}
function getWritingList(order,param){
	$.post('http://127.0.0.1/cloudRelaxing/read.php',{order:order,param:param},function(result){
				//解码为数组(针对json_encode)
				result=JSON.parse(result);//尽量不要用eval(),会执行恶意代码
				
				//将符合标准的json字符串转化为JS的json对象（key和value一定要用双引号包括，否则会出现解析异常）
				//url解码
				var liHtml='',
					pageNumberHtml;
				$writingManagement.html("");
				for(var i=0;i<result.length;i++){
					result[i]=JSON.parse(result[i]);
					for(var key in result[i])
					result[i][key]=URLdecode(result[i][key]);
					//将结果显示在页面中
					liHtml='<li class="writing">'+'<p><span class="number">'+(i+1+15*(param-1))+'</span>'+result[i].$title+'<span class="uploadTime">'+'('+result[i].$time+')'+'</span></p>'+
					'<button class="writingView">查看'+'</button>'+'<button class="writingRevise">修改'+'</button>'+'<button class="writingDelete">删除'+'</button></li>';
					//alert(result.$abstract);
					$(liHtml).appendTo("#writingManagement");//浏览器自动重新渲染，无需添加样式
				}
				pageNumberHtml='<form id="pageSelect">'+'<label>'+'换个页'+'<label>'+
				'<select id="pageNum">'+'<option>'+1+'</option>'+'</select>'+'</form>';
				$(pageNumberHtml).appendTo("#writingManagement");//添加页码
				$(optionHtml).appendTo("#pageNum");//添加页码,由于异步，必须在此处添加，否则可能#pageNum都不存在
				$("#pageNum").val(param);//设置选中页码项
				currentNum=param;//重设当前页
				/*添加缓存*/
				$.pageCache.push(param-1,$writingManagement.html());
			});
}
function getPageList(param){
	/*根据文章数生成页码*/
	$.post("http://127.0.0.1/cloudRelaxing/read.php",{order:"getWritingNum",param:0},function(result){
						writingNum=parseInt(result),
						pageNum=Math.ceil(writingNum/15);
						//console.log(pageNum);
						optionHtml='';
						if(pageNum!=1){
							for(var i=2;i<=pageNum;i++){
								optionHtml+='<option>'+i+'</option>';
							}
						}
						if(param!=0)
							getWritingList('getWritingList',param);//删除后刷新页面时使用
							
	});
}
//解码函数
function URLdecode(str) {
	var ret = "";
	for(var i=0;i<str.length;i++) {
			var chr = str.charAt(i);
			if(chr == "+") {
					ret += " ";
			}else if(chr=="%") {
					var asc = str.substring(i+1,i+3);
					if(parseInt("0x"+asc)>0x7f) {
							ret += decodeURI("%"+ str.substring(i+1,i+9));
							i += 8;
					}else {
							ret += String.fromCharCode(parseInt("0x"+asc));
							i += 2;
					}
			}else {
					ret += chr;
			}
	}
	return ret;
}
/*页面数据缓存*/
/*cache.* page data cache in cache.*/
(function($) {

	$.pageCache = {};
	$.extend($.pageCache, {

		map : {},

		push : function(key, value) {
			$.pageCache.map[key] = value;
		},

		remove : function(key) {
			delete($.pageCache.map[key]);
		},

		clear : function() {
			$.pageCache.map = {};
		},

		get : function(key) {
			return $.pageCache.map[key];
		}

	});

})(jQuery);
/*给下拉菜单绑定change事件*/
$writingManagement.on("change","#pageSelect #pageNum",function(){
	var currentNumTemp=parseInt($(this).val());//获取其中页码的方法1、$(this).find("option:selected").val/html/text 2、直接$(this).val()
	/*有缓存直接载入，无缓存请求服务器*/
	if(typeof($.pageCache.map[currentNumTemp-1])=='undefined')
	getWritingList('getWritingList',currentNumTemp);
	else{
		$writingManagement.html($.pageCache.map[currentNumTemp-1]);
		$("#pageNum").val(currentNumTemp);//设置选中页码项
		currentNum=currentNumTemp;//重设当前页
	}
});
/*删除文章*/
$writingManagement.on("click",".writingDelete",function(){
	var ifdelete=confirm("真的要删除此文章吗？");
	if( ifdelete){
		var uploadTime=$(this).parent().find(".uploadTime").text();
		uploadTime=uploadTime.substring(1,20);//下标从零开始，包括start处，不包括stop处
		//alert(uploadTime);
		deleteWriting(uploadTime);
	 }
});
function deleteWriting(uploadTime){
	$.post("http://127.0.0.1/cloudRelaxing/write.php",{order:"delete",param:uploadTime},function(result){
		if($.trim(result)=="删除成功！"){
			for(var i=currentNum-1;i<pageNum;i++)
			$.pageCache.remove(i);//删除当前页及之后页缓存
			//刷新页面
			getPageList(currentNum);//先获取整个页码，避免实时调用的异步影响
		}
		if(reviseState==0)
		alert(result);
		else
		reviseState=0;
	});
}
/*修改文章--首先将原文章读取到编辑器，提交成功后删除原文章*/
$writingManagement.on("click",".writingRevise",function(){
	var uploadTime=$(this).parent().find(".uploadTime").text();
	uploadTime=uploadTime.substring(1,20);//下标从零开始，包括start处，不包括stop处
	//alert(uploadTime);
	reviseWriting(uploadTime);
});
function reviseWriting(uploadTime){
	$.post("http://127.0.0.1/cloudRelaxing/read.php",{order:"revise",param:uploadTime},function(result){
			result=URLdecode(result);
			ue.setContent(result);
			$("#WMButton").click();
			reviseState=1;
			$("#CRButton").css("display","inline");
			revisionUploadTime=uploadTime;
	});
}
//撤销修改
function cancelRevise(){
	reviseState=0;
	ue.setContent('');
	$("#CRButton").css("display","none");
}
/*查看文章*///和预览分离比较好，逻辑不混乱，易实现，易维护
$writingManagement.on("click",".writingView",function(){
	var uploadTime=$(this).parent().find(".uploadTime").text();
	uploadTime=uploadTime.substring(1,20);//下标从零开始，包括start处，不包括stop处
	//alert(uploadTime);
	viewWriting(uploadTime);
});
function viewWriting(uploadTime){
	$.post("http://127.0.0.1/cloudRelaxing/read.php",{order:"view",param:uploadTime},function(result){
			result=URLdecode(result);
			$("#WMButton").click();
			$("#writingView").html(result).css("display","block");//注意逻辑顺序
	});
}
/*预览文章*/
function preview(){
	$("#writingView").css("display","none");//只显示一个div
     if(WMstate==1){
		$writingManagement.css("display","none");
		WMstate=2;
	}
	var $writingPreview=$("#writingPreview");
	if($writingPreview.css("display")=="none"){
		if (!ue.hasContents()){
			alert('请先填写内容!');
		}else{
			$writingPreview.html(ue.getContent()).css("display","block");
		}
	}else
		$writingPreview.css("display","none");
	
}