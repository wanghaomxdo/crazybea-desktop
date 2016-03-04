<?php !defined('ENTRY_KEY')?exit('app denied'):'';
	/*
	 * file config.class.php
	 * 读取配置文件类
	 */
	class config{
		protected static $instance=null;
		protected $data = array();//储存配置数组
		
		final protected function __construct(){
			require(ROOT.'includes/config.inc.php');
			$this->data=$_CFG;
			//var_dump($this->data['runtime']);
		} 
		
		public static function getInstance(){
			if(!(self::$instance instanceof self)){
				self::$instance=new self();
			}
			return self::$instance;
		}
		
		final private function __clone(){}
		
		/*
		 * 魔术方法，取得配置项$key
		 * @pram $key 配置项名
		 * return mixed
		 */
		public function __get($key){
			if(array_key_exists($key, $this->data)){
				return $this->data[$key];
			}else{
				return null;
			}
		}
		/*
		 * 魔术方法，设置配置项$key
		 * @pram $key 配置项名
		 * @pram $value	配置项值
		 * return 
		 */
		public function __set($key,$value){
			$this->data[$key]=$value;
		}
	}
?>