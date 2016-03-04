<?php !defined('ENTRY_KEY')?exit('app denied'):'';
	class action implements actionInterface{
		
		public $input = array();
		public $db;
		public $params;
		
		
		public function validation(){
			
			foreach($this->input as $field=>$validate){
				foreach($validate as $k=>$v){
					if(method_exists($this, $k)){
						if(!isset($this->params[$field])){
							return false;
						}
						if(!$this->$k($this->params[$field],$v)){
							return false;
						}
					}
				}
			}
			
			return true;
		}
		
		public function excute(){}
		
		public function required($params,$v){
			if($v<=0){
				return true;
			}
			if($params == "" ||empty($params)){
				return false;
			}
			return true;
		}
		
		public function maxLength($string,$max){
			if(is_string($string)){
				if(mb_strlen($string,"UTF-8")>$max){
					return false;
				}
			}else if(is_int($string)){
				if($string>(1<<$max)){
					return false;
				}
			}
			return true;
		}
		
		public function minLength($string,$min){
			if(is_string($string)){
				if(mb_strlen($string,"UTF-8")<$min){
					return false;
				}
			}else if(is_int($string)){
				if($string<((1<<($min-1)))){
					return false;
				}
			}
			return true;
		}
		
	}