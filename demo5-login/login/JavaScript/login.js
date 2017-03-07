$(document).ready(function(){
	var $info=$("#info"),
		$myUsername=$("#myUsername"),
		$myPassword=$("#myPassword"),
		$wrap=$("#wrap");
		
	//alert("sad ");
	window.onresize=resize;
	resize();
	function resize(){
		$wrap.css("width",document.documentElement.clientWidth);
		$wrap.css("height",document.documentElement.clientHeight);
		setTimeout(resize,50);
	}
	$myUsername.focus();//用户名输入框获取焦点
	//鼠标滑过动画
	$("#comfirm").mouseover(function(){
		$(this).css({"color":"#00b2f1","background-color":"#fbe6d4"});
	});
	$("#comfirm").mouseout(function(){
		$(this).css({"color":"#fbe6d4","background-color":"#00b2f1"});
	});
	//登入
	$("#comfirm").click(function(event){
		$info.html("");
		//阻止表单自动提交
		/*if(event&&event.preventDefault) event.preventDefault();
		else  window.event.returnValue = false;*/
		
		var username=$.trim($myUsername.val()),//1.9用attr("va1ue")获取不到
			password=$.trim($myPassword.val());
		$(this).animate({backgroundColor:"#00b2f1"},5,function(){
			$(this).animate({color:"#00b2f1",backgroundColor:"#fbe6d4"},50);
		});
			if(username==""){
				$info.html("请输入用户名!");
				$myUsername.focus();
			}else if(password==""){
				$info.html("请输入密码！");
				$myPassword.focus();
			}else{
				password=hex_md5(password);//加密再传输
				//console.log(password.length);
				//console.log(encodeURIComponent(password));
				/*通过encodeURIComponent(result)发现（从控制台看类型和内容一模一样）result后面还有几个字符%20%20(为空格)，因此一直判断不相等*/
				$.post("http://115.156.245.250:8080/storage/manager/login",{username:username,password:password},function(result){
								/*if(password==$.trim(result))//去掉传输过程中后面增加的两个空格
									alert("密码正确！");
								console.log($.trim(result).length);
								console.log(encodeURIComponent(result));*/
								//result=JSON.parse(result);
								//console.log(result);
								if(result.errorCode==1){
									$info.html("登录成功！");
									window.location.href=result.param;//必须用域名或ip访问，
								}else if($.trim(result.errorMsg)=="用户名不存在！"){//$.trim去掉传输过程中后面增加的两个空格
									$myUsername.focus();
									$myUsername.val('');
								}else if($.trim(result.errorMsg)=="密码错误！"){
									$myPassword.focus();
									$myPassword.val('');
								}
						});
			}
	});
	/*修改密码*/
	//呼出修改密码面板
	$("#revisePassword").click(function(){
		var username=$.trim($myUsername.val());
		$info.html("");
		if(username==""){
			$info.html("请输入用户名！");
			$myUsername.focus();
		}else{
			//向服务器验证用户名是否存在
			/*$.post("xxx.xxx.xxx",{username:username},function(data){
				if(data.errorCode==0)
					$info.html("用户名不存在！");
				else{
					$("#revisePasswordBoard").css("display","block");
					$("#hidebg").css({"height":window.screen.height,"width":window.screen.width,"display":"block"});
				}
			});*/
			$("#revisePasswordBoard").css("display","block");
			$("#hidebg").css({"height":window.screen.height,"width":window.screen.width,"display":"block"});
		}
		
	});
	//关闭修改密码面板
	$("#closeBoard").click(function(){
		$("#revisePasswordBoard").css("display","none");
		$("#hidebg").css("display","none");
		$("#revisePasswordBoard .input-password").val("");
	});
	//向服务器提交新密码、
	$("#revisePasswordComfirm").click(function(){
		var username=$.trim($myUsername.val()),
			oldPassword=$.trim($("#myOldPassword").val()),
			newPassword=$.trim($("#myNewPassword").val()),
			newPassword2=$.trim($("#myNewPassword2").val());
		//判断两次密码是否一样
			if(newPassword!=newPassword2){
				$("#myNewPassword").val("");
				$("#myNewPassword2").val("");
				$("#myNewPassword").focus();
				alert("两次输入密码不一致！");
			}else if(oldPassword==newPassword){
				$("#myNewPassword").val("");
				$("#myNewPassword2").val("");
				$("#myNewPassword").focus();
				alert("新旧密码一样！");
			}else{
				$.post("xxx.xxx.xxx",{username:username,oldPassword:oldPassword,newPassword:newPassword},function(data){
					if(data.errorCode==0)//原密码错误！
						alert("密码错误！")
					else{
						$("#revisePasswordBoard").css("display","none");
						$("#hidebg").css("display","none");
						$("#revisePasswordBoard .input-password").val("");
						$myPassword.focus();
						alert("密码更改成功！");
					}
				});
			}
	});
});