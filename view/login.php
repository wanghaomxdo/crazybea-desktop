<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>CRAZYBEA</title>
	<link rel="stylesheet" href="css/reset.min.css">
	<link rel="stylesheet" href="css/login.css">
</head>
<body>
	<div class="container login">
    		<div class="layout-logo"></div>
    		<div class="layout-form">
    			<div class="email"><input type="text" id="Email" placeholder="Email"></div>
    			<div class="password"><input type="password" id="password" placeholder="Password"></div>
	    			<div class="signin"></div>
    			<div class="rememberme"></div>
    			<div class="rememberme-i"></div>
    		</div>
    		<div class="layout-foot">
	    		<div class="copyright">
	    			<p>Createc Solution 2015 - 2016; All Rights Reserved</p>
	    			<p>沪ICP备14054408号-5</p>
	    		</div>
    		</div>
	</div>


	<!--Script
	====================================================== -->
	<script data-main="app" src="view/script/lib/jquery-2.1.3/main.js"></script>
	<script>
	(function(){
		$(".signin").click(function(){
			var email = document.getElementById("Email").value;
			var passwords = document.getElementById("password").value;
			//window.location.href = "index.php?action=Login&email="+email+"&passwords="+passwords+"";
			$.ajax({
    	        type: "POST", //用POST方式传输
    	        dataType: "JSON", //数据格式:JSON
    	        url: 'http://'+window.location.host+'/webapp/crazybea-desktop/index.php?action=Login', //目标地址
    	        data: {email:email,passwords:passwords},
    	        error: function (XMLHttpRequest, textStatus, errorThrown) {alert("网络错误,请重试!"); },
    	        success: function (obj){
            	if(obj.code=="f"){
            		alert("账号或密码错误!");
            	}else{
            		alert("登陆成功");
            		window.location.href = "index.php?action=Home&token="+obj.code+"&date="+Date();
            	}
    			}
    	    });
		});
	})();
	</script>

    </body>
</html>
