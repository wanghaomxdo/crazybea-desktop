<?php !defined('ENTRY_KEY')?exit('app denied'):'';
	class mysql extends db{
		
		protected static $instance;
		protected $c;
		protected $conn;
		public $result;
		public $rowSet = array();
		
		final protected function __construct(){
			$this->c = config::getInstance();
			$this->conn = $this->connect($this->c->host, $this->c->user, $this->c->password);
			if(!$this->conn){
				throw new Exception("Could not connect database server",600);
			}
		}
		
		public static function getInstance(){
			if(!(self::$instance instanceof self)){
				self::$instance = new self();
			}
			return self::$instance;
		}
		
		/*
		 * 连接服务器
		 * @pram $h 服务器地址
		 * @pram $h 服务器地址
		 * @pram $h 服务器地址
		 * return bool
		 */
	 	protected function connect($h,$u,$p){
	 		return mysqli_connect($h,$u,$p);
	 	}
		
		protected function setChar(){
			$sql = 'set names '.$this->c->charset;
			log::write($sql);
			mysqli_query($this->conn,$sql);
		}
		
		protected function selectDb(){
			return mysqli_select_db($this->conn,$this->c->database);
		}
		
		public function closeConn(){
			mysqli_close($this->conn);
		}
		
		public function affectRow(){
			return mysqli_affected_rows($this->conn);
		}
		/*
		 * 发送查询
		 * @pram $sql sql语句
		 * return mixed
		 */
		function query($sql){
			if(!$this->selectDb()){
				throw new Exception("Could not find database {$this->c->database}",601);
			}
			$this->setChar();
			log::write($sql);
			$this->result = mysqli_query($this->conn,$sql);
			if(!$this->result){
				throw new Exception("Invalid query:".$sql,602);
			}
			return $this->result;
		}
		
		/*
		 * 查询多行数据
		 * @pram $sql sql语句
		 * return array/bool
		 */
		function getAll($sql){
			$sql = 'SELECT * FROM '.$sql;
			return $this->query($sql);
		}
		
		/*
		 * 查询单行数据
		 * @pram $sql sql语句
		 * return array/bool
		 */
		function getRow(){
			if(is_object($this->result)){
				$row = mysqli_fetch_assoc($this->result);
			}else{
				$row=$this->result;
			}
			return $row;
		}
		
		/*
		 * 查询单个数据
		 * @pram $sql sql语句
		 * return array/bool
		 */
		function getOne($sql){}
		
		/*
		 * 自动执行insert/update
		 * @pram $table 表名
		 * @pram $data 数组
		 * @pram $act 动作，插入或更新
		 * @pram $where 更新条件
		 * return array/bool
		 */
		function autoExecute($table,$data,$act='insert',$where=NULL){
			if($act == 'insert'){
				$sql = "INSERT INTO $table";
				$filed = array();
				$values = array();
				foreach($data as $k => $v){
					array_push($filed,$k);
					array_push($values,$v);
				}
				$sql.="(".implode(",", $filed).") VALUES ('".implode("','", $values)."')";
			}else{
				$sql = "UPDATE $table SET ";
				foreach($data as $k=>$v){
					$sql.="$k='$v',";
				}
				$sql = substr($sql, 0,-1)." WHERE ".$where;
			}
			
			return $this->query($sql);
		}
		
		/*
		 * 取得整个结果集数组
		 * return array/bool
		 */
		 function getResultSet(){
		 	if($this->result==null){
		 		return false;
		 	}
			$this->rowSet = array();
			while($row = mysqli_fetch_assoc($this->result)){
				  array_push($this->rowSet,$row);
			}
			
			return $this->rowSet;
		 }
	}
?>