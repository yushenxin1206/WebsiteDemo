<?php
//session_save_path('D:/data/session');
session_id('admin');
session_start();
if(isset($_SESSION['admin'])&&$_SESSION['admin']==1)
{
    echo "success!";
}
else
{
    echo "error!";
	//echo "<script>alert('error!');window.location.href=' http://www.baidu.com/';</script>";
	//echo $_SESSION['admin'];
}
session_destroy();//使用完清除session，否则还是能通过href直接访问
?>