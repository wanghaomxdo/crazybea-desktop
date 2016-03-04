<?php !defined(ENTRY_KEY)?exit('app denied'):'';
	function loadView($view,$data){
		if(is_file(ROOT."view/".$view.".php")){
			ob_start();
		
			include ROOT."view/".$view.".php";
			
			$str = ob_get_clean();
			echo $str;
			//$str
			//ob_clean();
		}else{
			echo "page not found";
		}
	}