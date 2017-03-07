<?php
//session_save_path('D:/data/session');
session_id('admin');
session_start();
//isset($_SESSION['admin'])&&$_SESSION['admin']==1
if(1)//利用php、html混合写法，通过验证则显示下面的html代码，否则不显示
{
?>
<!DOCTYPE HTML>
<html lang='en-US'>
<head>
	<meta charset='UTF-8'>
	<link href='../Image/favicon.ico' rel='shortcut icon'>
	<script src='../lib/jquery.js'></script>
	<title>博客编辑</title>
	<link rel='stylesheet' href='demo.css' type='text/css' > 
</head>

<body>
	<!-- 加载编辑器的容器 -->
	<script id='container' name='content' type='text/plain'></script>
	<input type='button' name='Submit' value=' 提交 ' onClick='uptext();' style='cursor:pointer;'/>
	<input type='button' name='preview' value=' 预览 ' onClick='preview();' style='cursor:pointer;'/>
	<input id="WMButton" type='button' value=' 文章管理 ' onClick='writingManagement();' style='cursor:pointer;'/>
	<input id="CRButton" type='button' value=' 撤销修改 ' onClick='cancelRevise();' style='cursor:pointer;display:none'/>
	<div id='writingManagement' style='display:none;'></div>
	<div id='writingPreview' style='display:none;'></div>
	<div id='writingView' style='display:none;'></div>
	<!-- 配置文件 -->
	<script type='text/javascript' src='ueditor.config.js'></script>
	<!-- 编辑器源码文件 -->
	<script type='text/javascript' src='ueditor.all.js'></script>
	<!-- 实例化编辑器 -->
	<script type='text/javascript' src='demo.js'></script>
</body>
</html>
<?php
}
else
{
	echo "<script>alert('error!');window.location.href=' http://www.baidu.com/';</script>";
	//echo $_SESSION['admin'];
}
session_destroy();//使用完清除session，否则还是能通过href直接访问
?>