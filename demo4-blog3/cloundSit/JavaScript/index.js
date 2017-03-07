$(document).ready(function(){
	/*ajax是异步的，若法和ajax在同一级，ajax还没接到返回结果时，可能就已经执行了那个方法了*/
	/*新建数组对象a=new Array()，若a[2]赋值为x，则a[0]a[1]a[3]等仍然为undefined*/
	var page,//页码对象
		pageNum=1,//总页数
		$currentPage,//当前页面
		currentPageNum=1,//当前页码
		currentWritingNum=1,//当前文章在页面所在行
		$nextPage=$("#nextPage"),
		$writings=$("#writings");

	/*载入第一页数据库文章封面和最近更新*/
	getWritingsCover("getWritings",1);
	
	/*获取最多访问*/
	
	/*根据文章数生成页码*/
	$.post("http://127.0.0.1/cloudRelaxing/read.php",{order:"getWritingNum",param:0},function(result){
						var writingNum=parseInt(result),
							liHtml='';
							pageNum=Math.ceil(writingNum/10);
						//console.log(pageNum);
						if(pageNum!=1){
							for(var i=pageNum;i>0;i--){
								liHtml='<li><a href="###">'+i+'</a></li>';
								$(liHtml).prependTo("#pageNumber");
							}
							$nextPage.css("display","inline-block");
						}
						/*获取页码对象*/
						page=$("#pageNumber li a[id!='nextPage']");
						page.eq(currentPageNum-1).css("background-color","#ddd");
						//console.log(page.length);
	});
		
	//获取封面函数
	function getWritingsCover(order,param){
		$.post("http://127.0.0.1/cloudRelaxing/read.php",{order:order,param:param},function(result){
						//清空当前内容
						$writings.html("");
						/*将返回的结果显示在页面中*/
						//解码为数组(针对json_encode)
						result=JSON.parse(result);//尽量不要用eval(),会执行恶意代码
						//将符合标准的json字符串转化为JS的json对象（key和value一定要用双引号包括，否则会出现解析异常）
						//url解码
						var liHtml;
						for(var i=0;i<result.length;i++){
							result[i]=JSON.parse(result[i]);
							for(var key in result[i])
								result[i][key]=URLdecode(result[i][key]);
							//将结果显示在页面中
							liHtml='<li class="writing">'+result[i].$image+'<h2><a href="###">'+result[i].$title+'</a></h2>'+'<p>'+result[i].$abstract+'...'+'</p>'+'<a href="###">更多内容</a></li>';
							//alert(result.$abstract);
							$(liHtml).appendTo("#writings");//浏览器自动重新渲染，无需添加样式
						}
						//获取当前封面，并打标签
						$currentPage=$("#writings li");
						for(var i=0;i<$currentPage.length;i++){
							$currentPage.eq(i).attr("num",i);//注：自定义属性js不能直接通过node.xxx获取
						}
						//缓存页面,减少ajax请求
						$.pageCache.push(currentPageNum-1,$writings.html());
						//更新最近更新栏目
						if(param==1)
							getLatestWritings(result);
		});
	}
	//获取文章内容函数
	function getWritingContent(order,param){
		$.post("http://127.0.0.1/cloudRelaxing/read.php",{order:order,param:param},function(result){
						$writings.html(URLdecode(result));
						//添加返回图标
						var pageBack='<a href="###"><img id="pageBack" style="heigt:5px;width:15px;float:left;" src="Image/back.ico"/></a>';
						$(pageBack).prependTo("#writings");
						/*缓存文章*/
						$.writingCache.push(param-1,$writings.html());
		});
	}
	
	//获取最近更新函数
	function getLatestWritings(result){
		
		
		for(var i=0;i<3;i++){
			liHtml='<li class="recentWritings"><a href="###">'+result[i].$title+'</a><span>'+result[i].$time.substring(0,10)+'</span>'+'</li>';
			$(liHtml).appendTo("#recent");
		}
		var $recentList=$("#recent li");
		for(i=0;i<$recentList.length;i++){
			$recentList.eq(i).attr("num",i);//注：自定义属性js不能直接通过node.xxx获取
		}
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
	
	/*文章数据缓存*/
	/*cache.* page data cache in cache.*/
	(function($) {

		$.writingCache = {};
		$.extend($.writingCache, {

			map : {},

			push : function(key, value) {
				$.writingCache.map[key] = value;
			},

			remove : function(key) {
				delete($.writingCache.map[key]);
			},

			clear : function() {
				$.writingCache.map = {};
			},

			get : function(key) {
				return $.writingCache.map[key];
			}

		});

	})(jQuery);
	
	
	/***事件***/
	/*设置鼠标滑过动画*/
	/*主菜单*/
	
	$("#menu li a").mouseover(function(){
		$(this).css("color","#ccc");
	});
	$("#menu li a").mouseout(function(){
		$(this).css("color","#888");
	});
	/*侧栏*/
	$("#info #writingsStatis").on("mouseover","li a",function(){
		$(this).css("color","#888");
	});
	$("#info #writingsStatis").on("mouseout","li a",function(){
		$(this).css("color","#a00");
	});
	/*文章*/ 
	/*1.7版本后live被移除 用on给未来元素绑定事件 $(a).on(b,c,d),其中a为已经存在的祖先元素 b为事件 c为未来或当前元素（省略即为本身）
	即祖先元素的后代 d为回调函数*/
	$writings.on("mouseover","li h2 a",function(){ 
		$(this).css("color","#78ccf9");
	});
	$writings.on("mouseout","li h2 a",function(){
		$(this).css("color","#666");
	});
	$writings.on("mouseover","li>a",function(){
		$(this).css({"background-color":"#78ccf9","color":"#fff","border-color":"#fff"});
		
	});
	$writings.on("mouseout","li>a",function(){
		$(this).css({"background-color":"#fff","color":"#888","border-color":"#ddd"});
	});
	/*页码*/
	$("#pageNumber").on("mouseover","li a",function(){
		$(this).css("color","#ccc");
		/*$("#pageNumber #nextPage span").css("color","#ccc");*/
	});
	$("#pageNumber").on("mouseout","li a",function(){
		$(this).css("color","#8e8a8a");
		/*$("#pageNumber #nextPage span").css("color","#5e5a5a");*/
	});
	$nextPage.on("mouseover",function(){
		$(this).css("color","#ccc");
		$("#nextPage span").css("color","#ccc");
	});
	$nextPage.on("mouseout",function(){
		$(this).css("color","#8e8a8a");
		$("#nextPage span").css("color","#5e5a5a");/*a标签颜色属性不能继承*/
	});	
	
	/*设置点击事件*/
	/*菜单栏超链接*/
	$("#index_link").attr("href","file:///C:/Documents and Settings/Administrator/桌面/前端/云憩/index.html");
	
	/*文章页返回箭头*/
	$writings.on("click","#pageBack",function(){
		$(document).scrollTop((currentWritingNum-1)*803+350);//定位到之前的封面
		//console.log($currentPage.eq(currentWritingNum-1).scrollTop());
		$writings.html($.pageCache.map[currentPageNum-1]);
		/*显示页码*/
		$("#pageNumber").css("display","block");
	});
	
	/*阅读全文内容*/
	$writings.on("click","li a",function(){ 
		$(document).scrollTop(300);//定位到文章标题
		var $num=$(this).parents(".writing").attr("num");
		//console.log($num.length);
		for(var i=0;i<$currentPage.length;i++){
			if($num===$currentPage.eq(i).attr("num")){
				
				var writingNum=(currentPageNum-1)*10+i+1;
				
				if(typeof($.writingCache.map[writingNum-1])=="undefined")//无缓存则请求
				getWritingContent("getWritingContent",writingNum);//请求数据库文章
				else
				$writings.html($.writingCache.map[writingNum-1]);
				/*页码隐藏*/
				$("#pageNumber").css("display","none");
				//currentWritingNum=parseInt($num)+1;//parseInt出现NaN(之前前后有空格，不是纯数字)
				currentWritingNum=i+1;
				return;
			}
			//console.log($currentPage[i]);
		}
	});
	//通过最近更新阅读全文
	$("#recent").on("click","li a",function(){ 
		$(document).scrollTop(300);//定位到文章标题
		var $num=parseInt($(this).parents(".recentWritings").attr("num"))+1;
		//console.log($num.length);

		if(typeof($.writingCache.map[$num-1])=="undefined")//无缓存则请求
		getWritingContent("getWritingContent",$num);//请求数据库文章
		else
		$writings.html($.writingCache.map[$num-1]);
		/*页码隐藏*/
		$("#pageNumber").css("display","none");
		//currentWritingNum=parseInt($num)+1;//parseInt出现NaN(之前前后有空格，不是纯数字)
		currentWritingNum=$num;
	});
	
	/*页码跳转*/
	//下一页
	$nextPage.on("click",function(){
		
		if(typeof($.pageCache.map[currentPageNum+1-1])=="undefined")//无缓存则请求
		getWritingsCover("getWritings",++currentPageNum);//载入下一页的封面
		else
		$writings.html($.pageCache.map[currentPageNum++]);//载入缓存
	
		if(currentPageNum==pageNum){
			$(this).css("display","none");
		}
		page.css("background-color","#fff");
		page.eq(currentPageNum-1).css("background-color","#ddd");
	});
	//点击某一页
	$("#pageNumber").on("click","li a[id!='nextPage']",function(){
			//获取页码
			currentPageNum=parseInt($(this).html());
			
			if(typeof($.pageCache.map[currentPageNum-1])=="undefined")//无缓存则请求
			getWritingsCover("getWritings",currentPageNum);//载入封面
			else
			$writings.html($.pageCache.map[currentPageNum-1]);//载入缓存
		
			if(currentPageNum==pageNum)
				$nextPage.css("display","none");
			else
				$nextPage.css("display","inline-block");
			page.css("background-color","#fff");
			$(this).css("background-color","#ddd");
			/*$("#pageNumber #nextPage span").css("color","#ccc");*/
	});
});