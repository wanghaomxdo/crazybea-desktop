<?php
	class infoSubmitAction extends action{
		
		public $input=array(
			"openid"=>array("required"=>1),
			"tel"=>array("required"=>1)
		);
		
		public function __construct($params){
			$this->params=$params;
			$this->db=mysql::getInstance();
		}
		
		public function excute(){
			$openid=$this->params['openid'];
			$tel=$this->params['tel'];
			$sql = "SELECT count(*) as ishas FROM `zhuli_user` WHERE `openid`='{$openid}'";
			$this->db->query($sql);
			$row = $this->db->getRow();
			if($row['ishas']){
				return "<script>window.location.href='./index.php?action=Index&openid=$openid'</script>";
			}
			$weixin=new weixinAPI();
			$userInfo = json_decode($weixin->getUserInfo($openid));
			if(!isset($userInfo->subscribe)){
				return "openid获取失败，请重新登录微信";
			}
			$this->db->autoExecute("`zhuli_user`", array("openid"=>$openid,"tel"=>$tel,"headimgurl"=>$userInfo->headimgurl,"nickname"=>$userInfo->nickname));
			return "<script>window.location.href='./index.php?action=Index&openid=$openid'</script>";
		}
	}
?>