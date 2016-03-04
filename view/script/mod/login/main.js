define(["require", "exports", "module", "app", "skateboard", "jquery", "riot", "./login-tag"],
function(t, o, e) { (function() {
        var o, i, n, r, s, l, a = function(t, o) {
            function e() {
                this.constructor = t
            }
            for (var i in o) d.call(o, i) && (t[i] = o[i]);
            return e.prototype = o.prototype,
            t.prototype = new e,
            t.__super__ = o.prototype,
            t
        },
        d = {}.hasOwnProperty;
        r = t("app"),
        n = t("skateboard"),
        o = t("jquery"),
        l = t("riot"),
        s = t("./login-tag"),
        i = function(t) {
            function o() {
                return o.__super__.constructor.apply(this, arguments)
            }
            return a(o, t),
            o.prototype.render = function() {
                return o.__super__.render.apply(this, arguments),
                l.mount(this.$(".sb-mod__body")[0], s),
                setTimeout(function() {
                    return n.core.load("view/campaign-list"),
                    n.core.load("view/campaign")
                },
                1e3)
            },
            o
        } (n.BaseMod),
        e.exports = i
    }).call(this)
}),
define("./login-tag", ["require", "exports", "module", "riot", "jquery", "app", "skateboard"],
function(t, o, e) {
    riot = t("riot"),
    riot.tag("login-tag", '<div class="body-inner"> <div class="img-bg-wrapper"> <img class="img-bg-img" riot-src="{G.CDN_BASE}/image/login-bg.png?v=8ad3e040"> <div class="img-bg-cover"></div> <button class="img-btn help-btn" onclick="{showHelp}">help</button> <div class="login-form"> <div class="bee-input"> <div class="left"></div> <div class="mid"></div> <div class="right"></div> <input type="text" placeholder="Email"> </div> <div class="bee-input"> <div class="left"></div> <div class="mid"></div> <div class="right"></div> <input type="password" placeholder="Password"> </div> <div class="bee-button"> <div class="left"></div> <div class="mid"></div> <div class="right"></div> <button onclick="{login}">Login</button> </div> <label class="checkbox on" onclick="{toggleRemember}"><span class="icon">&nbsp;</span><span>Remember me</span></label> </div> <div class="copyright"> Createc Solution 2015 - 2016; All Rights Reserved </div> </div> </div>', ".sb-mod.sb-mod--login .help-btn { top: 45%; left: 50%; margin-left: -5%; width: 10%; height: 6%; } .sb-mod.sb-mod--login .login-form { position: absolute; top: 56%; left: 50%; margin-left: -100px; width: 200px; text-align: center; } .sb-mod.sb-mod--login .copyright { position: absolute; bottom: 10px; left: 50%; margin-left: -150px; width: 300px; text-align: center; font-size: 0.8rem; color: #555; }",
    function(o) {
        var e, i, n;
        e = t("jquery"),
        i = t("app"),
        n = t("skateboard"),
        this.showHelp = function() {
            return i.dialog.show("Your data journey starts here you will find it amazing with Crazybea, the most user-friendly O2O platform ever created. Enjoy hunting your honey! Follow us tightly for real time software updates!")
        },
        this.toggleRemember = function(t) {
            return e(t.currentTarget).toggleClass("on")
        },
        this.login = function() {
            return n.core.view("/view/campaign-list")
        },
        this.on("mount",
        function() {
            return console.log("mount"),
            console.log(e(".bee-input").length)
        }),
        this.on("update",
        function() {
            return console.log("update"),
            console.log(e(".bee-input").length)
        }),
        this.on("updated",
        function() {
            return console.log("updated"),
            console.log(e(".bee-input").length)
        }),
        this.on("unmount",
        function() {
            return console.log("unmount")
        })
    }),
    e.exports = "login-tag"
});