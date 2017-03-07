$(function(){
	
	//bootstrap 初始化弹出窗
	$('[data-toggle="popover"]').popover();

	/*微信分享弹出窗口设置*/
	var top = window.screen.height / 2 - 250;  
	var left = window.screen.width / 2 - 300;
	 
	/*生成微信二维码*/
	var thisURL = "https://www.baidu.com/";  
	var qrcode= "<img src='https://chart.googleapis.com/chart?cht=qr&chs=150x150&choe=UTF-8&chld=L|4&chl=" + thisURL + "' width='200' height='200' alt='网址URL二维码' />";
	
	/* 分享事件 */
	
	//微信
	$(".share-weixin").click(function(){
		$(".qrcode").html("打开微信扫一扫，打开网页后点击右上角分享"+qrcode).css({"filter":"opacity(1)",
			"top":"calc(50vh - 10em)","z-index":"2"});
		$(".mask").css({"filter":"opacity(1)","z-index":"1"});
	});
	$(".mask").click(function(){
		$(".qrcode").css({"filter":"opacity(0)",
			"top":"calc(50vh - 12em)","z-index":"-1"});;
		$(".mask").css({"filter":"opacity(0)","z-index":"-1"});
	});
	
	//微博
		  
	/*title是标题，rLink链接，summary内容，site分享来源，pic分享图片路径,分享到新浪微博*/  
	$(".share-sinaweibo").click(shareTSina);
	
	function shareTSina(title,rLink,site,pic) {
		
		var title = "分享到新浪微博";  
		var pic = $(".p-img img").attr("src");  
		var rLink = "http://www.jianshu.com/p/e43bf30f3e52";  
		 
		window.open("http://service.weibo.com/share/share.php?pic=" +encodeURIComponent(pic) +"&title=" +   
		encodeURIComponent(title.replace(/&nbsp;/g, " ").replace(/<br \/>/g, " "))+ "&url=" + encodeURIComponent(rLink),  
		"分享至新浪微博",  
		"height=500,width=600,top=" + top + ",left=" + left + ",toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");  	  
	} 

	  
	/*,分享到qq空间*/  
	$(".share-qzone").click(shareQzone);
	
	function shareQzone(title,rLink,summary,site,pic) {  
		title = "标题。";  
		rLink = "http://www.abc.com/heeh.html";  
		site = "http://www.abc.com/heeh.html";  
		window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title='+  
					   encodeURIComponent(title)+'&url='+encodeURIComponent(rLink)+'&summary='+  
					   encodeURIComponent(summary)+ '&site='+encodeURIComponent(site)  
					   ,'_blank','scrollbars=no,width=600,height=450,left=' + left + ',top=' + top + ',status=no,resizable=yes');  
		
	}  
	
	//更多分享
	$(".share-more").attr("data-content",$(".share-more-html").html());
	
	//分享到人人  
	$("body").on("click",".share-renren",shareRR);
	function shareRR(title,rLink,summary){     
		 title = "标题。";  
		 summary = "内容。";  
		 rLink = "http://www.abc.com/heeh.html";  
		window.open('http://share.renren.com/share/buttonshare/post/1004?title='+encodeURIComponent(title)+'&url='+encodeURIComponent(rLink)+'&content='+encodeURIComponent(summary),'_blank',  
		 'scrollbars=no,width=600,height=450,left=' + left + ',top=' + top + ',status=no,resizable=yes');   
	}  
  
	//开心网
	$("body").on("click",".share-kaixinwang",shareKX);
	function shareKX(title,rLink,summary){
		title = "标题。";  
		rLink = "http://www.abc.com/heeh.html";  
		window.open('http://www.kaixin001.com/repaste/bshare.php?rtitle='+encodeURIComponent(title)+  
			'&rurl='+encodeURIComponent(rLink)+'&rcontent='+encodeURIComponent(summary),'_blank', 
			'scrollbars=no,width=600,height=450,left=' + left + ',top=' + top + ',status=no,resizable=yes');
			
	}   
	  	 
	//分享到msn
	$("body").on("click",".share-msn",shareToMSN);
	function shareToMSN(imgUrl){    
		  var title = "标题。";  
		  var content = "内容";       
		  var productUrl ="http://www.abc.com/heeh.html";  
		   
		  window.open("https://profile.live.com/badge/?url=" + productUrl + "&title=" + encodeURI(title) +"&screenshot="+encodeURIComponent(imgUrl),'_blank',  
			   'scrollbars=no,width=600,height=450,left=' + left + ',top=' + top + ',status=no,resizable=yes');  
			   
	 }

/**
	添加表情模块
*/
	emoji=emoji();
	$("#sub-comments-1-2 .comments-content").html(emoji.emojiToHtml($("#sub-comments-1-2 .comments-content").html()));
});