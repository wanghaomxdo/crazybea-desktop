<?php

	class Factory{
		public static function LoadModel($model){
			if(is_file(ROOT."Model/".$model."Model.class.php")){
				require ROOT."Model/".$model."Model.class.php";
				if(class_exists($model."Model")){
					$model = $model."Model";
					$mo = new $model();
					return $mo;
				}
			}
			
			return false;
		}
		
		public static function bankFactory(){
			$config = config::getInstance();
			//var_dump($config->data['runtime']);
			if($config->runtime){
				return new bankPROD();
			}else{
				return new bank();
			}
		}
	}