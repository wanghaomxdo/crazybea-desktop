<?php
	class introAction extends action{
		public function __construct($params){
			$this->params=$params;
			//$this->db = mysql::getInstance();
		}
		
		public function excute(){
			return fetch::loadView("intro", "");
		}
	}
		
?>