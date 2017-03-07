function emoji(){
	//表情图片路径
	var imgSrc = './images/emoji/';
	//表情对应字符
	var emojiHtmlArr = [
		{'id':1,'phrase':'[微笑]','url':'1.gif'},{'id':2,'phrase':'[撇嘴]','url':'2.gif'},
		{'id':3,'phrase':'[色]','url':'3.gif'},{'id':4,'phrase':'[发呆]','url':'4.gif'},
		{'id':5,'phrase':'[流泪]','url':'5.gif'},{'id':6,'phrase':'[害羞]','url':'6.gif'},
		{'id':7,'phrase':'[闭嘴]','url':'7.gif'},{'id':8,'phrase':'[睡]','url':'8.gif'},
		{'id':9,'phrase':'[大哭]','url':'9.gif'},{'id':10,'phrase':'[尴尬]','url':'10.gif'},
		{'id':11,'phrase':'[发怒]','url':'11.gif'},{'id':12,'phrase':'[调皮]','url':'12.gif'},
		{'id':13,'phrase':'[呲牙]','url':'13.gif'},{'id':14,'phrase':'[惊讶]','url':'14.gif'},
		{'id':15,'phrase':'[难过]','url':'15.gif'},{'id':16,'phrase':'[冷汗]','url':'16.gif'},
		{'id':17,'phrase':'[抓狂]','url':'17.gif'},{'id':18,'phrase':'[吐]','url':'18.gif'},
		{'id':19,'phrase':'[偷笑]','url':'19.gif'},{'id':20,'phrase':'[可爱]','url':'20.gif'},
		{'id':21,'phrase':'[白眼]','url':'21.gif'},{'id':22,'phrase':'[傲慢]','url':'22.gif'},
		{'id':23,'phrase':'[饥饿]','url':'23.gif'},{'id':24,'phrase':'[困]','url':'24.gif'},
		{'id':25,'phrase':'[惊恐]','url':'25.gif'},{'id':26,'phrase':'[流汗]','url':'26.gif'},
		{'id':27,'phrase':'[憨笑]','url':'27.gif'},{'id':28,'phrase':'[大兵]','url':'28.gif'},
		{'id':29,'phrase':'[奋斗]','url':'29.gif'},{'id':30,'phrase':'[咒骂]','url':'30.gif'},
		{'id':31,'phrase':'[疑问]','url':'31.gif'},{'id':32,'phrase':'[嘘]','url':'32.gif'},
		{'id':33,'phrase':'[晕]','url':'33.gif'},{'id':34,'phrase':'[折磨]','url':'34.gif'},
		{'id':35,'phrase':'[衰]','url':'35.gif'},{'id':36,'phrase':'[敲打]','url':'36.gif'},
		{'id':37,'phrase':'[再见]','url':'37.gif'},{'id':38,'phrase':'[擦汗]','url':'38.gif'},
		{'id':39,'phrase':'[抠鼻]','url':'39.gif'},{'id':40,'phrase':'[糗大了]','url':'40.gif'},
		{'id':41,'phrase':'[坏笑]','url':'41.gif'},{'id':42,'phrase':'[左哼哼]','url':'42.gif'},
		{'id':43,'phrase':'[右哼哼]','url':'43.gif'},{'id':44,'phrase':'[哈欠]','url':'44.gif'},
		{'id':45,'phrase':'[鄙视]','url':'45.gif'},{'id':46,'phrase':'[委屈]','url':'46.gif'},
		{'id':47,'phrase':'[快哭了]','url':'47.gif'},{'id':48,'phrase':'[阴险]','url':'48.gif'},
		{'id':49,'phrase':'[亲亲]','url':'49.gif'},{'id':50,'phrase':'[吓]','url':'50.gif'},
		{'id':51,'phrase':'[可怜]','url':'51.gif'},{'id':52,'phrase':'[拥抱]','url':'52.gif'},
		{'id':53,'phrase':'[月亮]','url':'53.gif'},{'id':54,'phrase':'[太阳]','url':'54.gif'},
		{'id':55,'phrase':'[炸弹]','url':'55.gif'},{'id':56,'phrase':'[骷髅]','url':'56.gif'},
		{'id':57,'phrase':'[菜刀]','url':'57.gif'},{'id':58,'phrase':'[猪头]','url':'58.gif'},
		{'id':59,'phrase':'[西瓜]','url':'59.gif'},{'id':60,'phrase':'[咖啡]','url':'60.gif'},				
		{'id':61,'phrase':'[饭]','url':'61.gif'},{'id':62,'phrase':'[爱心]','url':'62.gif'},
		{'id':63,'phrase':'[强]','url':'63.gif'},{'id':64,'phrase':'[弱]','url':'64.gif'},
		{'id':65,'phrase':'[握手]','url':'65.gif'},{'id':66,'phrase':'[胜利]','url':'66.gif'},
		{'id':67,'phrase':'[抱拳]','url':'67.gif'},{'id':68,'phrase':'[勾引]','url':'68.gif'},
		{'id':69,'phrase':'[OK]','url':'69.gif'},{'id':70,'phrase':'[NO]','url':'70.gif'},
		{'id':71,'phrase':'[玫瑰]','url':'71.gif'},{'id':72,'phrase':'[凋谢]','url':'72.gif'},
		{'id':73,'phrase':'[示爱]','url':'73.gif'},{'id':74,'phrase':'[爱情]','url':'74.gif'},
		{'id':75,'phrase':'[飞吻]','url':'75.gif'}
	];
	
	//添加表情
	var emojiHtml = '<div class="emoji-box-wrap">'+addemojiHtml()+'</div>';
	$(".add-emoji").attr("data-content",emojiHtml);
	
	//选择表情加入输入框
	$('body').on('click','.emoji-box span',function(){
		var textarea=$(this).parent().parent().parent().parent().parent().parent().find('textarea').attr('id');
		insertAtCursor(document.getElementById(textarea), emojiHtmlArr[$(this).attr('data-num')].phrase);
	});

	//生成表情
	function addemojiHtml(){
		var emojiHtml = '';
		emojiHtml += '<div class="emoji-box">';
		for(f=0;f<emojiHtmlArr.length;f++){
			emojiHtml += '<span data-num="' + f + '"><img src="' + imgSrc + emojiHtmlArr[f].url +'" /></span>';
		}
		emojiHtml += '</div>';
		return emojiHtml;
	}
	//在光标处加入内容
	function insertAtCursor(myField, myValue) { 
		//IE support 
		if (document.selection) { 
			myField.focus(); 
			sel = document.selection.createRange(); 
			sel.text = myValue; 
			sel.select(); 
		} 
		//MOZILLA/NETSCAPE support 
		else if (myField.selectionStart || myField.selectionStart == '0') { 
			var startPos = myField.selectionStart; 
			var endPos = myField.selectionEnd; 
			// save scrollTop before insert 
			var restoreTop = myField.scrollTop; 
			myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos,myField.value.length); 
			if (restoreTop > 0) { 
				// restore previous scrollTop 
				myField.scrollTop = restoreTop; 
			} 
			myField.focus(); 
			myField.selectionStart = startPos + myValue.length; 
			myField.selectionEnd = startPos + myValue.length; 
		} else { 
			myField.value += myValue; 
			myField.focus(); 
		} 
	} 
	//在文本中显示表情
	function emojiToHtml(rContent) {
		rContent = rContent.replace(/</g,'&lt;'); 
		rContent = rContent.replace(/>/g,'&gt;'); 
		rContent = rContent.replace(/\n/g,'<br/>'); 
		var regx = /(\[[\u4e00-\u9fa5]*\w*\]){1}/g;
		//正则查找“[]”格式
		var rs = rContent.match(regx);
		if(rs) {
			for( i = 0; i < rs.length; i++) {
				for( n = 0; n < emojiHtmlArr.length; n++) {
					if(emojiHtmlArr[n].phrase == rs[i]) {
						var t = '<img src="' + imgSrc + emojiHtmlArr[n].url + '" />';
						rContent = rContent.replace(rs[i], t);
						break;
					}
				}
			}
		}
		return rContent;
	}
	
	return {
		emojiToHtml:emojiToHtml
	}
	
}