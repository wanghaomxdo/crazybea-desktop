 <!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>CRAZYBEA</title>
	<link rel="stylesheet" href="css/reset.min.css">
	<link rel="stylesheet" href="css/home.css">
	<script type = "text/javascript">
	var G = G || {
	    DOMAIN: document.domain,
	    ORIGIN: location.protocol + "//" + location.host,
	    CGI_ORIGIN: location.protocol + "//" + location.host,
	    CDN_ORIGIN: location.protocol + "//" + location.host,
	    CDN_CONTEXT: "webapp/crazybea-desktop/view",
	    MD5_MAP: {
	        "lib/app/main.js": "572ae7bb",
	        "lib/async/main.js": "7976db15",
	        "lib/hammer/main.js": "8d12301d",
	        "lib/highcharts/main.js": "1dfd6dc1",
	        "lib/iscroll/main.js": "31c79a57",
	        "lib/jquery-2.1.3/main.js": "e13da5f3",
	        "lib/riot/main.js": "ef88132a",
	        "lib/riot-mixins/main.js": "fba9ae46",
	        "lib/skateboard/main.js": "ee647e6c",
	        "mod/campaign/main.js": "bb1e67ee",
	        "mod/campaign-list/main.js": "f21e4486",
	        "mod/login/main.js": "604ab190",
	        "mod/campaign/conversion-analysis-by-area/main.js": "433336e3",
	        "mod/campaign/overall-engagement-by-area/main.js": "bb42dadf",
	        "mod/campaign/overall-engagement-by-date/main.js": "e2bb4d7c",
	        "mod/campaign/shake-percentage-by-area/main.js": "db337b37",
	        "mod/campaign/total-amount-of-shake-by-area/main.js": "a11ab635",
	        "mod/campaign/total-shake-by-date/main.js": "af389223"
	    },
	    IS_PROTOTYPE: !1,
	    pageTime: [new Date]
	};

		G.CDN_CONTEXT ? G.CDN_BASE = G.CDN_ORIGIN + "/" + G.CDN_CONTEXT: G.CDN_BASE = G.CDN_ORIGIN,
		G.id = function(a) {
		    return document.getElementById(a)
		},
		G.DOMAIN && G.DOMAIN != document.domain && (document.domain = G.DOMAIN),
		function() {
		    for (var a = ["CGI_ORIGIN", "CDN_ORIGIN"], o = 0; o < a.length; o++) 0 === G[a[o]].indexOf("//") && (G[a[o]] = location.protocol + G[a[o]]);
		    if ("file:" == location.protocol) {
		        var i = location.href.match(/^(.+)\/static\//);
		        i && (G.ORIGIN = G.CDN_ORIGIN = G.CGI_ORIGIN = i[1])
		    }
		} (); 
	</script>
  <script type="text/javascript ">
  	document.write(['<link rel="stylesheet " href="'+G.CDN_BASE+'/style/app/main.css?v=3b405fae" />',
  					'<link rel="stylesheet " href="'+G.CDN_BASE+'/script/lib/air-datepicker/css/datepicker.css?v=3b405fae" />'].join(""));
  </script>

  <div id="circleG" class="circleG_wrapper"> 
   <div class="circleG circleG_1"></div> 
   <div class="circleG circleG_2"></div> 
   <div class="circleG circleG_3"></div> 
  </div> 
	<script type = "text/javascript" > 
		document.write(['<script type="text/javascript" src="' + G.CDN_BASE + '/script/lib/fastclick/fastclick.js?v=2a75dd5a"></s', "cript>", '<script type="text/javascript" src="' + G.CDN_BASE + '/script/lib/yom/require-lite.js?v=2bd17520"></s', "cript>"].join("")); 
	</script>
  	<script type="text/javascript ">
  		FastClick.attach(document.body);
		window.addEventListener("load ",function(){
			document.body.className=document.body.className+"loaded "
			},!1);
		require(["jquery"],function(e){
					var t=null;
					G.state=e.extend(e({}),{
                          set:function(e){
                                        if("object "==typeof e&&e)
                                        {
                                          if(t)
                                            for(var n in e)
                                              Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);
                                          else 
                                            t=e;

                                          G.state.trigger("change ",e)
                                        }
                                      },
                          get:function(e){
                            return e?t&&t[e]:t
                          }
                        })
    });
  	</script>
</head>
<body>
	<div class="container">

		<!-- left layout -->
		<div class="sidebar">
			<div class="bg"></div>
			<div class="userinfo">
				<div><img class="headimg" src="img/home/headimg.jpg" alt=""></div>
				<span class="name"><?php echo $data['name'] ?></span>
			</div>
			
			<div class='menu'>
				<ul>
				   <li><a href='/view/campaign-list' data-closenavbar=".navbar"><img src="img/home/sidebar-icon/home.png" alt="">HOME</a></li>
				   <li class='active has-sub'><a data-toggle="#campaign-menu-sub"><img src="img/home/sidebar-icon/report.png" alt="">REPORT</a>
				      <ul id="campaign-menu-sub" class="menu-sub" data-type="treemenu">
				         <li><a href="/view/campaign/shake-percentage-by-area/-/1/event" data-toggle="#nav-bar-interest">Interest</a></li>
				         <li><a href="/view/campaign/overall-engagement-by-area/-/1/0" data-toggle="#nav-bar-engagement">Engagement</a></li>
				         <li><a href="/view/campaign/conversion-analysis-by-area/-/1/event" data-toggle="#nav-bar-conversion">Conversion</a></li>
				      </ul>
				   </li>
				   <li class='active has-sub'><a data-toggle="#settings-menu-sub"><img src="img/home/sidebar-icon/settings.png" alt="">SETTING</a>
				      <ul id="settings-menu-sub" class="menu-sub" data-type="treemenu">
				         <li><a ><img src="img/home/sidebar-icon/newfunction.png" alt="">New Function</a></li>
				         <li><a ><img src="img/home/sidebar-icon/contactus.png" alt="">Contact Us</a></li>
				         <li><a ><img src="img/home/sidebar-icon/share.png" alt="">Share</a></li>
				         <li><a href='index.php?action=Index'><img src="img/home/sidebar-icon/switchuser.png" alt="">Switch User</a></li>
				         <li><a href='/view/accountadmin-list' data-closenavbar=".navbar"><img src="img/home/sidebar-icon/accountadmin.png" alt="">Account Admin</a></li>
				      </ul>
				   </li>
				</ul>
			</div>
		</div>

		<!-- right layout -->
		<div class="main">
			<div class="main-wrap">
				<div class="line"></div>

				<div class="navbar">
					<div class="interest menu-sub" id="nav-bar-interest" data-type="navbar">
						<a href="/view/campaign/shake-percentage-by-area/-/1/event"> 
						   <div class="bee-cell-navbar"> 
						    <div class="left"></div> 
						    <div class="mid"></div> 
						    <div class="right"></div> 
						    <div class="content"> 
						    	<div class="inner" data-toggle-class="outline">Percentage by Area</div> 
						    </div> 
						   </div>
						</a>

						<a href="/view/campaign/total-amount-of-shake-by-area/-/1/event"> 
						   <div class="bee-cell-navbar"> 
						    <div class="left"></div> 
						    <div class="mid"></div> 
						    <div class="right"></div> 
						    <div class="content"> 
						    	<div class="inner" data-toggle-class="outline">Amount by Area</div> 
						    </div> 
						   </div>
						</a>

						<a href="/view/campaign/total-shake-by-date/-/1/day"> 
						   <div class="bee-cell-navbar"> 
						    <div class="left"></div> 
						    <div class="mid"></div> 
						    <div class="right"></div> 
						    <div class="content"> 
						    	<div class="inner" data-toggle-class="outline">By Date</div> 
						    </div> 
						   </div>
						</a>

						<a > 
						   <div class="bee-cell-navbar bee-cell-navbar-timerange outline"> 
						    <div class="right"></div> 
						    <div class="mid"></div> 
						    <div class="left"></div> 
						    <div class="content"> 
						    	<div class="inner">Time Range
								
						    	</div> 
						    </div> 
						   </div>
						</a>
					</div>

					<div class="engagement menu-sub" id="nav-bar-engagement" data-type="navbar">
						<a href="/view/campaign/overall-engagement-by-area/-/1/0"> 
						   <div class="bee-cell-navbar"> 
						    <div class="left"></div> 
						    <div class="mid"></div> 
						    <div class="right"></div> 
						    <div class="content"> 
						    	<div class="inner" data-toggle-class="outline">By Area</div> 
						    </div> 
						   </div>
						</a>

						<a href="/view/campaign/overall-engagement-by-date/-/1/0"> 
						   <div class="bee-cell-navbar"> 
						    <div class="left"></div> 
						    <div class="mid"></div> 
						    <div class="right"></div> 
						    <div class="content"> 
						    	<div class="inner" data-toggle-class="outline">By Time</div> 
						    </div> 
						   </div>
						</a>
					</div>

					<div class="conversion menu-sub" id="nav-bar-conversion" data-type="navbar">
						<a href="/view/campaign/conversion-analysis-by-area/-/1/event"> 
						   <div class="bee-cell-navbar"> 
						    <div class="left"></div> 
						    <div class="mid"></div> 
						    <div class="right"></div> 
						    <div class="content"> 
						    	<div class="inner">By Area</div> 
						    </div> 
						   </div>
						</a>
					</div>
				</div>

				<div class="timerange-layout"></div>

				<div class="page-wrapper"></div>
			</div>
		</div>


	</div>

	<!--Script
	====================================================== -->
	<script type = "text/javascript" > 
	require(["jquery", "app", "skateboard", "riot", "datepicker"],
		function(e, o, a, n, d) {
			e('.timerange-layout').datepicker({language: "en", range: true}).data('datepicker').show(),
			e(".bee-cell-navbar-timerange").on("click", function(){
				if(e(".timerange-layout").css("display") != "none")
					e(".timerange-layout").hide();
				else
					e(".timerange-layout").show();
			}),
		    a.core.init({
		        container: e(".page-wrapper"),
		        defaultModName: "campaign-list",
		        animate: {
		            type: "fade",
		            timingFunction: "linear",
		            duration: 300
		        },
		        modCacheable: !0,
		        alwaysUseCache: !0,
		        isSupportHistoryState: !1,
		        onBeforeViewChange: function(a, n) {
		            o.ajax.hideLoading(),
		            o.alerts.alert.hide(),
		            o.alerts.modal.hide(),
		            o.dialog.hide(),
		            o.toggle.hideAll()		        },
		        onBeforeFadeOut: function(o) {
		            var n = a.core.getViewChangeInfo();
		            if (o) if ("history" != n.from && n.fromModName != n.toModName) {
		                var r = n.scrollTop || e(window).scrollTop();
		                o._prevWinScrollTop = r
		            } else o._prevWinScrollTop = 0
		        },
		        onAfterViewChange: function(o, n) {
		            var r = "body-sb-mod--" + n._modName.replace(/\//g, "-"),
		            t = document.body.className.replace(/\bbody-sb-mod--\S+/, r);
		            /\bsb-show-nav\b/.test(t) ? n.showNavTab || (t = t.replace(/\s*\bsb-show-nav\b/, "")) : n.showNavTab && (t += " sb-show-nav"),
		            document.body.className = t,
		            "history" == a.core.getViewChangeInfo().from && n._prevWinScrollTop ? e(window).scrollTop(n._prevWinScrollTop) : e(window).scrollTop(0)
		        },
		        constructContentDom: function(o, a, n) {
		            var r = e(['<div class="sb-mod sb-mod--' + o.replace(/\//g, "-") + '" data-sb-mod="' + o + '" data-sb-scene="0" style="display: none;">', '<div class="sb-mod__body">', '<div class="body-inner" data-sb-mod-not-renderred>', "</div>", "</div>", "</div>"].join("")).prependTo(e(".page-wrapper"));
		            return r
		        }
		    })
		},
		function() {}); 
	</script>

</body>
</html>