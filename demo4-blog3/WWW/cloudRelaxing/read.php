<?php
/*处理跨域*/
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST,GET');
header('Access-Control-Allow-Credentials:true');

$link=mysql_connect("localhost","root","root");//连接MySQL
mysql_select_db("yushenxin");//选择数据库

mysql_query("set names 'utf8'");

$order = $_POST['order'];
$param = $_POST['param'];
//根据命令获取数据
switch($order){
	case "getWritings":
			$param1=($param-1)*10;
			$q = "SELECT * FROM writings order by time desc limit ".$param1.",10";//整型自动转为字符串（与js一样）
			$rs = mysql_query($q, $link); 
			if(!$rs){die("Valid result!");} 
			//读取数据库
			$count=0;
			while($row = mysql_fetch_row($rs)){
				$myData[$count]=$row;
				$count++;
			}
			//urlencode编码（不然不符合json规则，js中的解析函数无法解析）
			for($i=0;$i<$count;$i++)
				for($j=0;$j<6;$j++){
					if($j!=2)
					$myData[$i][$j]=urlencode($myData[$i][$j]);//没有读到数据会echo其他信息（错误或提示），导致js收到的数据有误，导致控制台提示错误
				}
			//以json格式存储数据
			for($i=0;$i<$count;$i++){
				$result[$i]='{"$title":"'.$myData[$i][0].'","$abstract":"'.$myData[$i][1].'"
							,"$image":"'.$myData[$i][3].'","$visitors":"'.$myData[$i][4].'","$time":"'.$myData[$i][5].'"}';
			}
			$result=json_encode($result);
			
			mysql_free_result($rs);
			//$result='{"$title":"woshi"}';
			//echo "进入了case语句";
		break;
	case "getWritingNum":
			$sql ='select count(*) as num from writings';
			$num = mysql_fetch_assoc(mysql_query($sql));
			$result = $num['num'];
			//$result="进入了第二个case";
		break;
	case "getWritingContent":
			$q = "SELECT * FROM writings order by time desc limit ".($param-1).",1";//整型自动转为字符串（与js一样）
			$rs = mysql_query($q, $link); 
			if(!$rs){die("Valid result!");} 
			//读取数据库
			$row = mysql_fetch_row($rs);
			$result=urlencode($row[2]);
			mysql_free_result($rs);
		break;
	case "getWritingList":
			$param1=($param-1)*15;
			$q = "SELECT * FROM writings order by time desc limit ".$param1.",15";//整型自动转为字符串（与js一样）
			$rs = mysql_query($q, $link); 
			if(!$rs){die("Valid result!");} 
			//读取数据库
			$count=0;
			while($row = mysql_fetch_row($rs)){
				$myData[$count]=$row;
				$count++;
			}
			//urlencode编码（不然不符合json规则，js中的解析函数无法解析,譬如其中的双引号和分号会影响解析）
			for($i=0;$i<$count;$i++)
				for($j=0;$j<6;$j++){
					if($j==0||$j==5)
					$myData[$i][$j]=urlencode($myData[$i][$j]);//没有读到数据会echo其他信息（错误或提示），导致js收到的数据有误，导致控制台提示错误
				}
			//以json格式存储数据
			for($i=0;$i<$count;$i++){
				$result[$i]='{"$title":"'.$myData[$i][0].'","$time":"'.$myData[$i][5].'"}';
			}
			$result=json_encode($result);
			
			mysql_free_result($rs);
			//$result="进入了case语句";
		break;
	case "revise":
		$q="select *from writings where time="."'".$param."'";
		$rs = mysql_query($q, $link); 
			if(!$rs){die("Valid result!");} 
		$row = mysql_fetch_row($rs);
		$result=urlencode($row[2]);
		mysql_free_result($rs);
		break;
	case "view":
		$q="select *from writings where time="."'".$param."'";
		$rs = mysql_query($q, $link); 
			if(!$rs){die("Valid result!");} 
		$row = mysql_fetch_row($rs);
		$result=urlencode($row[2]);
		mysql_free_result($rs);
		break;
	default:
		break;
}

mysql_close($link);//关闭MySQL连接
echo $result;
?>  