<?php !defined('ENTRY_KEY')?exit('app denied'):'';
	/*
	 * file db.class.php
	 * 数据库抽象类接口
	 */
	 
	 abstract class db{
	 	
		/*
		 * 连接服务器
		 * @pram $h 服务器地址
		 * @pram $h 服务器地址
		 * @pram $h 服务器地址
		 * return bool
		 */
	 	abstract protected function connect($h,$u,$p);
		
		/*
		 * 发送查询
		 * @pram $sql sql语句
		 * return mixed
		 */
		abstract function query($sql);
		
		/*
		 * 查询多行数据
		 * @pram $sql sql语句
		 * return array/bool
		 */
		abstract function getAll($sql);
		
		/*
		 * 查询单行数据
		 * @pram $sql sql语句
		 * return array/bool
		 */
		abstract function getRow();
		
		/*
		 * 查询单个数据
		 * @pram $sql sql语句
		 * return array/bool
		 */
		abstract function getOne($sql);
		
		/*
		 * 自动执行insert/update
		 * @pram $table 表名
		 * @pram $data 数组
		 * @pram $act 动作，插入或更新
		 * @pram $where 更新条件
		 * return array/bool
		 */
		abstract function autoExecute($table,$data,$act='insert',$where);
	 }
?>