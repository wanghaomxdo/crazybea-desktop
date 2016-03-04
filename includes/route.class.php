<?php !defined('ENTRY_KEY')?exit('app denied'):'';
	class route{
		
		//路由清单
		public $routes=array();
		
		//当前请求类名
		public $class;
		
		//当前请求的方法名
		public $method;
		
		//当前请求的参数
		public $param = array();
		
		//配置项
		public $config;
		
		
		public function __construct(){
			$config = config::getInstance();
			$this->routes = filter::_addslashes(explode("/", $_SERVER['REQUEST_URI']));
			if(count($this->routes)>3){
				$this->class = $this->routes[3];
				$this->method = $this->routes[4];
				$this->method = array_slice($this->routes, 5);
			}else{
				$this->class = $this->config->default_class;
				$this->method = $this->config->default_method;
			}
		}
		
		
		
	}