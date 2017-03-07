<?php
/*处理跨域*/
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST,GET');
header('Access-Control-Allow-Credentials:true');

//$visitingFrom=$_SERVER['HTTP_HOST'];
$link=mysql_connect("localhost","root","root");//连接MySQL
mysql_select_db("yushenxin");//选择数据库

mysql_query("set names 'utf8'");

$username = $_POST['username'];
$password=$_POST['password'];

$q = "SELECT * FROM login";
$rs = mysql_query($q, $link); 
if(!$rs){die("Valid result!");} 
//读取数据库
while($row = mysql_fetch_row($rs)){
	//session_save_path('D:/data/session');//设置session路径,否则不能开启session
	//通过更改PHP配置文件修改session路径一直无效，通过vhosts-conf修改即可
	if($row[0]==$username){
		if($password==$row[1]){
			//trim()函数移除字符串两侧的空白字符或其他预定义字符。
			session_id('admin');
			session_start();//开启session功能 跨网页存储
			//session_save_path('D:/data/session');
			$_SESSION['admin']=1;
			$result="登陆成功！";
			/*$login=array('username'=>$row[0]);
			session_register(login); */
			break;	
		}else{
			$result="密码错误！";
			break;
		}
	}
	$result="用户名不存在！";
}

/*$sql = "insert into login(name,password) values ('$username','$password')";//向writings数据表中添加数据
mysql_query($sql);//借SQL语句插入数据*/

mysql_free_result($rs);
mysql_close($link);//关闭MySQL连接
//echo $result;//此处strlen($result)为‘32’，但再js端获取的长度为34，即在传输过程中后面加了2个空格
echo $result;
?>  