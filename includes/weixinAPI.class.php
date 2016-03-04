<?php
	class weixinAPI{
		
		private $appid="";
		private $secret="";
		const API_URL = "https://api.weixin.qq.com/";
		//public function __construct
		public function __construct(){
		
		}
		
		/**
		 * CURL Post
		 */
		private function postCurl($url, $option, $header = 0, $type = 'POST') {
			//$url = "http://211.147.244.114:9801/CASServer/SmsAPI/SendMessage.jsp";
			log::write("url:".$url);
			$curl = curl_init ();
			curl_setopt ( $curl, CURLOPT_SSL_VERIFYPEER, FALSE ); // 对认证证书来源的检查
			curl_setopt ( $curl, CURLOPT_SSL_VERIFYHOST, FALSE ); // 从证书中检查SSL加密算法是否存在
			if (! empty ( $option )&&$type=='POST') {
				curl_setopt ( $curl, CURLOPT_POST, true );
				$data=http_build_query($option);
				log::write("data:".$data);
				curl_setopt ( $curl, CURLOPT_POSTFIELDS, $data ); // Post提交的数据包
			}
			curl_setopt ( $curl, CURLOPT_URL, $url );
			curl_setopt ( $curl, CURLOPT_HEADER, false );
			curl_setopt ( $curl, CURLOPT_RETURNTRANSFER, true );
			curl_setopt ( $curl, CURLOPT_NOBODY, false );
			$return_str = curl_exec ( $curl );
			log::write("return:".$return_str);
			curl_close ( $curl );
			return $return_str;
		}
		
		//获取基础支持access_token
		public function getAccessToken(){
			if(is_file("access_token.json")){
				$data = json_decode(file_get_contents("access_token.json"));
				if($data->expire_time > time()&&!empty($data->access_token)){
					return $data->access_token;
				}
			}
			$url = self::API_URL."cgi-bin/token?grant_type=client_credential&appid={$this->appid}&secret={$this->secret}";
			$json = json_decode($this->postCurl($url, "",0,"GET"));
			//var_dump($json);
			$json->expire_time = time()+$json->expires_in;
			$fp = fopen("access_token.json", "w");
			fwrite($fp, json_encode($json));
			fclose($fp);
			return $json->access_token;
		}
		
		//获取用户基础信息
		public function getUserInfo($openid){
			$access_token = $this->getAccessToken();
			$url = self::API_URL."cgi-bin/user/info?access_token=$access_token&openid=$openid&lang=zh_CN";
			return $this->postCurl($url, "",0,"GET");
		}
		
		//网页授权接口调用凭证access_token
		public function getAuthorizationAccessToken($code){
			$url = self::API_URL."sns/oauth2/access_token?appid={$this->appid}&secret={$this->secret}&code={$code}&grant_type=authorization_code";
			$json = $this->postCurl($url, "",0,"GET");
			return $json;
		}
		
		//获取用户授权页
		public function getAuthorization($redirect_url,$scope,$state="STATE"){
			$data = array(
				"appid"=>$this->appid,
				"redirect_uri"=>$redirect_url,
				"response_type"=>"code",
				"scope"=>$scope,
				"state"=>$state
			);
			$queryString = http_build_query($data);
			$url = "https://open.weixin.qq.com/connect/oauth2/authorize?{$queryString}#wechat_redirect";
			return "<script>window.location.href = '{$url}'</script>";
		}

		//获取授权用户信息
		public function getAuthorizationUserInfo($access_token,$openid){
			$url=self::API_URL."sns/userinfo?access_token={$access_token}&openid={$openid}&lang=zh_CN";
			$json = $this->postCurl($url, "",0,"GET");
			return $json;
		}
		
		
		//获取jsapi_ticket
		public function getTicket(){
			if(is_file("jsapi_ticket.json")){
				$data = json_decode(file_get_contents("jsapi_ticket.json"));
				if($data->expire_time > time()&&!empty($data->ticket)){
					return $data->ticket;
				}
			}
			$access_token = $this->getAccessToken();
			$url = self::API_URL."cgi-bin/ticket/getticket?access_token={$access_token}&type=jsapi";
			$json = json_decode($this->postCurl($url, "",0,"GET"));
			$json->expire_time = time()+$json->expires_in;
			$fp = fopen("jsapi_ticket.json", "w");
			fwrite($fp, json_encode($json));
			fclose($fp);
			return $json->ticket;
		}
		
		//生成随机字符串
		public function make_nonceStr(){
			$codeSet = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			for ($i = 0; $i<16; $i++) {
				$codes[$i] = $codeSet[mt_rand(0, strlen($codeSet)-1)];
			}
			$nonceStr = implode($codes);
			return $nonceStr;
		}
		
		//生成签名
		public function make_signature($nonceStr,$timestamp,$jsapi_ticket,$url){
			$tmpArr = array(
				'jsapi_ticket' => $jsapi_ticket,
				'noncestr' => $nonceStr,
				'timestamp' => $timestamp,
				'url' => $url
			);
			ksort($tmpArr, SORT_STRING);
			$string1 = http_build_query( $tmpArr );
			$string1 = urldecode( $string1 );
			$signature = sha1( $string1 );
			return $signature;
		}
		
		public function getAppId(){
			return $this->appid;
		}
	}

/*$weixin = new weixinAPI();
echo $weixin->getAccessToken();*/
?>