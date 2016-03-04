<?php
	class IndexAction extends action{
		public function __construct($params){
			$this->params=$params;
			$this->db = mysql::getInstance();
		}
		
		public function excute(){
			return fetch::loadView("login", null);
		}
	}
?>