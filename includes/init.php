<?php
	/*
	 * file init.php
	 * 框架初始化文件
	 */
	  
	 /*
	  * 允许跨域访问
	  */
	 //header("Access-Control-Allow-Origin:*"); 
	 //header('Access-Control-Allow-Methods:POST,GET');

	 //!defined('ENTRY_KEY')?exit('app denied'):'';
	 //参数过滤
	 !defined('ENTRY_KEY')?exit('app denied'):'';
	 //设置调试模式
	 define('DEBUG', true);
	 if(DEBUG){
	 	error_reporting(E_ALL);
	 }else{
	 	error_reporting(0);
	 }
	 
	 //初始化当前绝对路径
	 define('ROOT',str_replace('\\', '/', dirname(dirname(__FILE__))).'/');
	 
	 
	 //引入基类
	 require 'db.class.php';
	 require 'config.class.php';
	/*require 'verifying.class.php';
	 $image = new verifying();
	 header('content-type:image/png');
	 imagepng($image->im);
	 exit;*/
	 
	 $config = config::getInstance();
	 //var_dump($config);
	 
	 try{
	 	$mysql = mysql::getInstance();
	 }catch(Exception $e){
	 	$data = array(
			"code"=>$e->getCode(),
			"info"=>$e->getMessage()
		);
		echo json_encode($data);
		return;
	 };
	 //echo "aaa";
	 session_start();
	 date_default_timezone_set($config->timezone);
	 
	 $_REQUEST = filter::_addslashes($_REQUEST);
	 $_COOKIE = filter::_addslashes($_COOKIE);
	 
	 //路由转发
	if(!isset($_REQUEST['m'])){
		$_REQUEST['m'] = $config->default_moduel;
	}else{
		$_REQUEST['m'].="/";
	}
	 
	 
	if(isset($_REQUEST['action'])){
		$class = $_REQUEST['action']."Action";
		unset($_REQUEST['action']);
	}else{
		$class = $config->default_controller."Action";
	} 
	//var_dump($mysql);
	//获取参数，并过滤
	$params = $_REQUEST;
	
	//判断是否存在该动作，是则实例化，否则找不到页面
	if(class_exists($class)){
		
		if(fetch::isCache(md5($class.serialize($params)))){
			echo fetch::loadCache(md5($class.serialize($params)));
			
		}else{
			unset($params['m']);
			$action = new $class($params);
			//var_dump($action);
			//参数规则验证，成功执行动作，不成功则禁止访问
			if($action->validation()){
				$output = $action->excute();
				echo $output;
			}else{
				echo "<h1>403 Forbiden</h1>";
			}
		}
	}

	//echo "aaa";
	 /*
	  * 测试区	******************************************************************
	  */
	  

	  
	  
	 
	 /*
	  * 测试区	********************************************************************
	  */
	  
	  //$mysql->closeConn();
	  session_write_close();
	  
	  
	 function __autoload($class){
	 	if(strpos($class, "Action")){
	 		if(is_file(ROOT.'Action/'.$_REQUEST['m'].$class.'.class.php')){
	 			require_once('Action/'.$_REQUEST['m'].$class.'.class.php');
	 			//echo ROOT;
			}else{
				$output=@file_get_contents(ROOT."view/err/404err.html");
				echo $output;
			}
	 	}else if(strpos($class, "System")){
	 		if(is_file(ROOT.'System/'.$class.'.class.php')){
	 			require ROOT.'System/'.$class.'.class.php';
			}else{
				$output=@file_get_contents(ROOT."view/err/404err.html");
				echo $output;
			}
	 	}else{
	 		if(is_file(ROOT.'includes/'.$class.'.class.php')){
	 			require ROOT.'includes/'.$class.'.class.php';
			}else{
				$output=@file_get_contents(ROOT."view/err/404err.html");
				echo $output;
			}
		}
	 }
?>