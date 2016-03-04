<?php !defined('ENTRY_KEY')?exit('app denied'):'';
	interface actionInterface{
		
		//public $params;
		
		function validation();
		
		function excute();
	}