$(document).ready(function(){
	var $info=$("#info"),
		magState=0,
		tabState=0,
		$wrap=$("#wrap");
	//alert("sad ");
	window.onresize=resize;
	resize();
	function resize(){
		$wrap.css("width",$(window).width());
		$wrap.css("height",$(window).height());
		setTimeout(resize,50);
	}
	
	//登出
	$("#logout").click(function(){
		//alert("sss");
		$.post("http://115.156.245.250:8080/storage/manager/logout",{order:"logout"},function(data){
			//alert("sss");
		});
	});
	
	$("#myUsername").focus();//用户名输入框获取焦点
	
	//载入用户列表
	getAccountList();
	
	//鼠标滑过动画
	$("#comfirm").mouseover(function(){
		$(this).css({"color":"#0c6700","background-color":"#fbe6d4"});
	});
	$("#comfirm").mouseout(function(){
		$(this).css({"color":"#fbe6d4","background-color":"#0c6700"});
	});
	$("#management").mouseover(function(){
		$(this).css({"color":"#0b6474","background-color":"#fbe6d4"});
	});
	$("#management").mouseout(function(){
		$(this).css({"color":"#fbe6d4","background-color":"#0b6474"});
	});
	//注册
	$("#comfirm").click(function(){
		var username=$("#myUsername").val(),//1.9用attr("va1ue")获取不到
			password=$("#myPassword").val(),
			accountType=$(".accountType input:radio:checked").val();
		$info.html("");
		$(this).animate({backgroundColor:"#0c6700"},5,function(){
			$(this).animate({color:"#0c6700",backgroundColor:"#fbe6d4"},50);
		});
			if($.trim(username)==""){
				$info.html("请输入用户名!");
				$("#myUsername").focus();
			}else if($.trim(password)==""){
				$info.html("请输入密码！");
				$("#myPassword").focus();
			}else{
				//password=hex_md5(password);//加密再传输
				//console.log(password.length);
				//console.log(encodeURIComponent(password));
				/*通过encodeURIComponent(result)发现（从控制台看类型和内容一模一样）result后面还有几个字符%20%20(为空格)，因此一直判断不相等*/
				$.post("http://115.156.245.250:8080/storage/manager/addstaff",{accountType:accountType,username:username,password:password},function(data){
								//$info.html(data.msg);
								if($.trim(data.errorCode)==2){//$.trim去掉传输过程中后面增加的两个空格
									alert("注册成功！");
									$("#myUsername").val("");
									$("#myPassword").val("");
									//刷新用户列表
									getAccountList();
								}else if($.trim(data.errorCode)==1){
									$("#myUsername").focus().val("");
									alert("用户名已存在！");
								}else{
									alert("后台异常，注册失败！");
								}
						});
			}
	});
	//账户管理
	$("#management").click(function(){
		$info.html("");
		$(this).animate({backgroundColor:"#0b6474"},5,function(){
			$(this).animate({color:"#0b6474",backgroundColor:"#fbe6d4"},50);
		});
		if(magState==0){
			$("#management-blank").css("display","block");
			magState=1;
		}else{
			$("#management-blank").css("display","none");
			magState=0;
		}
		//$("#hidebg").css({"height":window.screen.height,"display":"block"});
	});
	//关闭选择面板
	/*$("#managementTypeChose #closeBoard").click(function(){
		$("#managementTypeChose").css("display","none");
		$("#hidebg").css("display","none");
	});*/
	//确认选择，调出账户管理面板
	/*$("#managementTypeChose #typeComfirm").click(function(){
		$("#managementTypeChose").css("display","none");
		$("#management-blank").css("display","block");
	});*/
	
	//删除账户
	$(".management-table").on("click",".delete a ",function(){
		$info.html("");
		var se=confirm("确定删除此账户？"),
			username="";
		if (se==true)
		  {
			username=$(this).parent().parent().find(".accountName").text();
			//alert(username);
			sendDeleteUsername(username);
		  }
	});
	
	//账户类型切换
	//alert($(window).height());
	$("#manageAccount").click(function(){
		$("#tableWrapper").animate({left:"0"},300);
		$("#accountType span").css("color","rgba(0,163,163,0.8)");
		$(this).css("color","rgba(0,233,233,0.8)");
		tabState=0;
	});
	$("#checkAccount").click(function(){
		$("#tableWrapper").animate({left:"-625px"},300);
		$("#accountType span").css("color","rgba(0,163,163,0.8)");
		$(this).css("color","rgba(0,233,233,0.8)");
		tabState=1;
	});
	$("#workerAccount").click(function(){
		$("#tableWrapper").animate({left:"-1250px"},300);
		$("#accountType span").css("color","rgba(0,163,163,0.8)");
		$(this).css("color","rgba(0,233,233,0.8)");
		tabState=2;
	});
	
	//页面切换
	$(".nextPage").click(function(){
		var $managementTable=$("#management-table"+tabState),
		    tableTop=parseInt($managementTable.css("top")),
			nextTop=tableTop-490+"px",
			param=0,
			tableHeight=$managementTable.height();
			if(tabState!=0)
				param=20;
			//alert(tableTop);
			//alert($("#management-table").height());
		/*if($("#management-table").height()+tableTop<980)
			nextTop=490-$("#management-table").height()+"px";*/
		if(tableHeight>492){
			$managementTable.animate({top:nextTop},300,function(){
				tableTop=parseInt($managementTable.css("top"));
				if(tableHeight+tableTop<490-param){
					nextTop=490-param-$managementTable.height()+"px";
					$managementTable.animate({top:nextTop},300);
				}		
			});
		}
	});
	$(".lastPage").click(function(){
		var $managementTable=$("#management-table"+tabState),
			tableTop=parseInt($managementTable.css("top")),
			//alert(tableTop);
			nextTop=tableTop+490+"px",
			param=0;
			//tableHeight=$("#management-table0").height(),
			if(tabState!=0)
				param=20;
			if(tableTop>=-param) $managementTable.animate({top:-param+"px"},300);
			else $managementTable.animate({top:nextTop},300,function(){
				tableTop=parseInt($managementTable.css("top"));
				if(tableTop>-param)
				$managementTable.animate({top:-param+"px"},300);
			});
	});
	//向服务器请求用户列表
	function getAccountList(){
		$.post("http://115.156.245.250:8080/storage/manager/showstaff",{order:"getAccountList"},function(data){
				//console.log(data.param[0]);
				var $Html='';
				var $td="<tr class='table-title'><th>用户名</th><th>初始密码</th><th>操作</th></tr>";
				var $table0=$("#management-table0"),
					$table1=$("#management-table1"),
					$table2=$("#management-table2");
					//清空原内容
					$table0.html("");
					$table1.html("");
					$table2.html("");
					//添加表头
					$table0.append($td);
					$table1.append($td);
					$table2.append($td);
					//添加人员信息
				for(var i=0;i<data.param.length;i++){
					$Html='<tr class="accountInfo"><td class="accountName">'+data.param[i].username+'</td><td class="originPassword">'
							+data.param[i].password+'</td><td class="delete"><a>删除</a></td></tr>'
					switch(data.param[i].level){
						case 1:
							$table0.append($Html);
						break;
						case 2:
							$table1.append($Html);
						break;
						case 3:
							$table2.append($Html);
						break;
						default:
						break;
					}
				}
							
		});
	}
	//向服务器发送删除的用户名
	function sendDeleteUsername(username){
		$.post("http://115.156.245.250:8080/storage/manager/deletestaff",{order:"deleteAccount",username:username},function(data){
						console.log(data);
						if(data.errorCode==1){
							getAccountList();
							alert("删除成功！");
						}else alert("删除失败！");
		});
	}
});