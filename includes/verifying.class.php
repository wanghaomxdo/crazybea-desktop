<?php
	class verifying{
		
		public $code = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
		public $width = 50;
		public $height = 25;
		
		public $im;
		
		public function __construct(){
			$this->im  =  imagecreate ($this->width,$this->height ); //创建画布
			$bgcolor = imagecolorallocate($this->im, rand(170, 255), rand(170,255), rand(170,255));
			$verifying = substr(str_shuffle($this->code), 0,4);
			$fontcolor = imagecolorallocate($this->im, rand(0,85), rand(0,85), rand(0,85));
			$linecolor = imagecolorallocate($this->im, rand(85,170), rand(85,170), rand(85,170));
			imagestring($this->im, 5, 5, 5, $verifying, $fontcolor);
			imageline($this->im, 0, rand(0,25), 50, rand(0,25), $linecolor);
			imageline($this->im, 0, rand(0,25), 50, rand(0,25), $linecolor);
			imageline($this->im, 0, rand(0,25), 50, rand(0,25), $linecolor);
			//imagefill($, $x, $y, $color)
		}
		
	}
