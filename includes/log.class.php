<?php !defined('ENTRY_KEY')?exit('app denied'):'';
	/*
	 *file log.class.php
	 * 记录信息到日志 
	 */
	 
	 class log {
	 	
		const LOGFILE = 'curr.log';//日志文件名
		
	 	/*
		 *写日志 
		 */
	 	public static function write($sql){
	 		$config=config::getInstance();
	 		$sql.="\t".date($config->time_format,time())."\r\n";
	 		$log=self::isBak();
			$fh=fopen($log, "a");
			fwrite($fh,$sql);
			fclose($fh);
	 	}
		
		/*
		 * 备份日志
		 */
		public static function bak(){
			$log = ROOT . 'data/log/'.self::LOGFILE;
			$bak = ROOT . 'data/log/'.date('ymd').mt_rand(100000, 999999).'.bak';
			return rename($log, $bak);
		}
		
		/*
		 * 读取判断日志大小
		 */ 
		public static function isBak(){
			$log = ROOT . 'data/log/'.self::LOGFILE;
			if(!file_exists($log)){
				touch($log);
				return $log;
			}
			clearstatcache(true,$log);
			if(filesize($log)<=1024*1024){
				return $log;
			}
			
			if(!self ::bak()){
				return $log;
			}else{
				touch($log);
				return $log;
			}		
		}				
	 }
?>