<?php
	class LoginAction extends action{
		public function __construct($params){
			$this->params=$params;
			$this->db = mysql::getInstance();
		}
		
		public function excute(){
			$email = $this->params['email'];
			$password = $this->params['passwords'];
			$sql = "SELECT token FROM `user` WHERE `email` = '{$email}' AND `password` = '{$password}'";
			$this->db->query($sql);
			$helper = $this->db->getRow();
			/*$data = array(
				"topurl"=>$helper['topurl'],
				"name"=>$helper['name']
			);*/
			if($helper !== null){
				//return fetch::loadView("home", $data);
				echo json_encode(array("code"=>$helper['token']));exit;
			}
			else{
				//return fetch::loadView("login", null);
				echo json_encode(array("code"=>"f"));exit;	
			}
		}
	}
?>