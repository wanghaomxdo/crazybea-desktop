<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		.box{display: block; width: 400px; height: 400px; background-color: #336699; opacity: 0.5;}
		.box2{display: block;width: 100px; height: 100px; background-color: #000;}
	</style>
	<script>
var a = "a", b = "bss";

//方法一
a = [b, b = a][0];
alert(b);
	</script>
</head>
<body>
	<div class="box"><div class="box2"></div></div>
	
</body>
</html>