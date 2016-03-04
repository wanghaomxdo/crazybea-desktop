<?php !defined('ENTRY_KEY')?exit('app denied'):'';
	/*
	 * file filter.php
	 * 参数过滤类
	 */
	class filter {
		
		/*
		 * 参数过滤函数
		 * @pram $arr 需要转义的数据
		 * return str/array
		 */
		public static function _addslashes($arr){
			if(is_array($arr)){
				foreach ($arr as $key => $value) {
					if(is_string($value)){
						$arr[$key]=addslashes($value);
					}elseif(is_array($value)){
						$arr[$key]=filter::_addslashes($value);
					}
				}
			}elseif(is_string($arr)){
				$arr=addslashes($arr);
			}
			return $arr;
		}
	
	}
?>