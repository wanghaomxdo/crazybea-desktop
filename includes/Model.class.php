<?php
	class Model{
		
		public $db;
		public $table;
		//public $autocommit=false;
		public $primary_key;
		
		public function __construct(){
			$this->db=mysql::getInstance();
		}
		
		public function getRowByPK($value){
			$sql = "SELECT * FROM `{$this->table}` WHERE `{$this->primary_key}`=$value";
			$this->db->query($sql);
			return $this->db->getRow();
		}
		
		public function getAll(){
			$this->db->getAll($this->table);
			return $this->db->getResultSet();
		}
		
		public function delRowByPK($value){
			$sql = "DELETE FROM `{$this->table}` WHERE `{$this->primary_key}`=$value";
			return $this->db->query($sql);
		}
		/*public function __destruct(){
			if($autocommit){
				
			}
		}*/
	}	
