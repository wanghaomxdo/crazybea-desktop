define(["require", "exports", "module", "app", "./login-history.tpl.html"],
function(t, o, i) { (function() {
        var o, e;
        o = t("app"),
        e = t("./login-history.tpl.html"),
        i.exports = {
            navBar: {
                showLoginHistory: function() {
                    return o.dialog.show(e.render(), "Login history")
                },
                toggleAppMenu: function() {
                    return $(document.body).toggleClass("app-menu-on")
                }
            }
        }
    }).call(this)
}),
define("./login-history.tpl.html", ["require", "exports", "module"],
function(require, exports, module) {
    exports.render = function($data, $opt) {
        $data = $data || {};
        var _$out_ = [];
        with($data) _$out_.push('<style type="text/css">.login-history { padding: 10px; padding-top: 20px; } .login-history .item { margin-bottom: 10px; padding: 3px; background-color: #c3a32c; color: #fff; text-align: center; font-weight: bold; font-size: 0.9rem; }</style><div class="login-history"><div class="item">15:03 04/Jul</div><div class="item">16:03 05/Jun</div><div class="item">17:03 02/May</div></div>');
        return _$out_.join("")
    }
});