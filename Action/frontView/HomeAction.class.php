<?php
	class HomeAction extends action{
		public function __construct($params){
			$this->params=$params;
			$this->db = mysql::getInstance();
		}
		
		public function excute(){
			$token = $this->params['token'];
			$sql = "SELECT * FROM `user` WHERE `token` = '{$token}'";
			$this->db->query($sql);
			$helper = $this->db->getRow();
			$data = array(
				"topurl"=>$helper['topurl'],
				"name"=>$helper['name']
			);
			return fetch::loadView("home", $data);
		}
	}
?>