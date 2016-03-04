<?php !defined('ENTRY_KEY')?exit('app denied'):'';
/*
 * 
 * file fetch.class.php
 * 页面静态化缓存类
 * 
 */

class fetch{
	
	const CACHE_DIR = "data/html5/";//缓存目录
	public static $cacheFile;
	public static $cacheStr;
	
	/*
	 * 写缓存
	 * @param $cache 缓存内容
	 * @param $file  缓存文件名
	 * return viod
	 */ 
	public static function writeCache($cache,$file){
		
		$handle = fopen(ROOT.self::CACHE_DIR.$file, "w");
		$write = fwrite($handle, $cache);
		fclose($handle);
		
	}
	
	/*
	 * 读缓存
	 * @param $file
	 * return String
	 */ 
	public static function readCache($file){
		try{
			$str = file_get_contents(ROOT.self::CACHE_DIR.$file);
		}catch(Exception $e){
			throw $e;
		}
		
		return $str;
	}
	
	/*
	 * 判断是否已经缓存
	 * @param $cache 缓存文件名
	 * return boolean
	 */ 
	public static function isCache($cache){
		return is_file(ROOT.self::CACHE_DIR.$cache);
	}
	
	/*
	 * 不缓存加载页面
	 * @param $view 页面名称
	 * @param $data 传入页面的数据
	 * return String
	 */
	public static function loadView($view,$data){
		if(is_file(ROOT."view/".$view.".php")){
			ob_start();
		
			include ROOT."view/".$view.".php";
			
			self::$cacheStr = ob_get_clean();
			return self::$cacheStr;
			//$str
			//ob_clean();
		}else{
			throw new Exception("Page is not found",700);
		}
	}

	public static function loadCache($cache){
		return file_get_contents(ROOT.self::CACHE_DIR.$cache);
	}
	
	/*
	 * 加载页面并缓存
	 * @param $view   页面文件
	 * @param $data   传入页面的数据
	 * @param $action 请求的动作
	 * @param $params 请求的参数
	 * return String
	 */ 
	
	public static function output($view,$data,$action,$params){
		self::$cacheFile = md5($action.serialize($params));
		
		$cache = self::loadView($view, $data);
		self::writeCache($cache, self::$cacheFile);
		
		return $cache;
	}
		
	/*
	 * 清除缓存 
	 * return void
	 */
	public static function cleanAll(){
		try{
			if ( $dh  =  opendir ( self::CACHE_DIR )) {
		        while (( $file  =  readdir ( $dh )) !==  false ) {
		        	if($file!="." && $file!="..") {
		           		unlink(ROOT.self::CACHE_DIR.$file) ;
		            }
	        	}
	         	closedir ( $dh );
	    	}
		}catch(Exception $e){
			throw $e;
		}
		
	}
}