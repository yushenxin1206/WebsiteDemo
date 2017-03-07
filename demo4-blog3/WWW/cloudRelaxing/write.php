<?php
/*处理跨域*/
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST,GET');
header('Access-Control-Allow-Credentials:true');

mysql_connect("localhost","root","root");//连接MySQL
mysql_select_db("yushenxin");//选择数据库

mysql_query("set names 'utf8'");

//获取内容
$order=$_POST['order'];
$content = $_POST['param'];
//$content =md5($content );//直接使用MD5加密
switch($order){
	case 'upload':
		//获取标题、摘要
		preg_match("/<h1([\s\S]*?)>([\s\S]*?)<\/h1>/",substr($content,0,500), $title);
		if(!$title){
			$title="无题";
			$abstract=substr(strip_tags($content),0,160);
		}
		else{
			$title=strip_tags($title[0]);
			$abstract=substr(strip_tags(substr($content,stripos($content,"</h1>",0)+5)),0,160);
		}
		if($abstract=="")
			$abstract="略";


		//获取图像
		preg_match("/<img([\s\S]*?)\/>/",$content, $image);
		if(!$image)
			$image='<img src="http://hiphotos.baidu.com/praisejesus/pic/item/e8df7df89fac869eb68f316d.jpg" />';//内有双引号 外必须为单引号
		else
			$image=$image[0];

		//获取时间
		$time=date('y-m-d H:i:s');

		$sql = "insert into writings(title,abstract,content,image,time) values ('$title','$abstract','$content','$image','$time')";//向writings数据表中添加数据
		mysql_query($sql);//借SQL语句插入数据
		$result='上传成功！';
	break;
	case 'delete':
		$param=$content;
		$sql="delete from writings where time="."'".$param."'";	//若变量不加两个引号则不能成功，从js端可以看到语句为time=2016-05-17 10:23:19明显错误	
		$state=mysql_query($sql);
		if($state)
		$result='删除成功！';
		else
		$result='删除失败！';
	break;
	/*case 'revise':
		$param=$content;
		$sql="delete from writings where time="."'".$param."'";	//若变量不加两个引号则不能成功，从js端可以看到语句为time=2016-05-17 10:23:19明显错误	
		$state=mysql_query($sql);
		if($state)
		$result='修改成功！';
		else
		$result='修改失败！';
	break;*/
	default:
		$result='操作错误！';
		break;
}

mysql_close();//关闭MySQL连接
           
echo $result;

/*preg_match("/<p([\s\S]*?)>([\s\S]*?)<\/p>/",$content, $matches);//php中单双引号规则与js相同，字符串会自动满足规则
echo strip_tags($matches[0]);*/

?>  