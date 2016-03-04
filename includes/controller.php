<?php !defined('ENTRY_KEY')?exit('app denied'):'';

	function index($a,$b){
		echo $a+$b;
	}


	function login($name,$pwd){
		$mysql = mysql::getInstance();
		$c = config::getInstance();
		//$sql = $
		$data = array(
			"name"=>"huangyou",
			"pwd"=>md5("123456"),
			"mobile"=>"18897955645",
			"ctime"=>date($c->time_format,time())
		);
		//$mysql->autoExecute("user", $data);
		$result =$mysql->getAll("user");
		var_dump($mysql->getResultSet());		
	}