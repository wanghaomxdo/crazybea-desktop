<?php !defined('ENTRY_KEY')?exit('app denied'):'';
	/*
	 * file cofig.inc.php
	 * 配置文件
	 */
	 
	 $_CFG=array();
	 
	 //运行环境,true为生产环境，false为测试环境
	 $_CFG['runtime']=false;
	 
	 
	 //定义数据库

	 // $_CFG['host']='192.168.1.164';
	 $_CFG['host']='localhost';


	 $_CFG['user']='root';
	 $_CFG['password']='root';
	 $_CFG['database']='crazybea-desktop';
	 $_CFG['charset']='utf8';
	 
	 //时间配置
	 $_CFG['timezone']='PRC';
	 $_CFG['time_format']='Y-m-d H:i:s';
	 
	 //默认控制器
	 $_CFG['default_moduel'] = 'frontView/';
	 $_CFG['default_controller']='Index';
	 
	 //session过期时间,单位秒，86400为一天，604800为一周，2592000为一月
	 $_CFG['session_expire']=86400*3;
	 
	 //默认分页单页显示行数
	 $_CFG['page_row'] = 10;
	 
	 //文件上传配置
	 $_CFG['upload_max_size']=5120;
?>