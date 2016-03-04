define(["require", "exports", "module", "app", "skateboard", "jquery", "riot", "./campaign-overview-tag"],
function(i, s, a) { (function() {
        var s, d, e, v, l, t, n = function(i, s) {
            function a() {
                this.constructor = i
            }
            for (var d in s) c.call(s, d) && (i[d] = s[d]);
            return a.prototype = s.prototype,
            i.prototype = new a,
            i.__super__ = s.prototype,
            i
        },
        c = {}.hasOwnProperty;
        v = i("app"),
        e = i("skateboard"),
        s = i("jquery"),
        t = i("riot"),
        l = i("./campaign-overview-tag"),
        d = function(s) {
            function a() {
                return a.__super__.constructor.apply(this, arguments)
            }
            return n(a, s),
            a.prototype.render = function() {
                return a.__super__.render.apply(this, arguments),
                t.mount(this.$(".sb-mod__body")[0], l),
                setTimeout(function() {
                    return i(["mod/campaign/shake-percentage-by-area/main", "mod/campaign/total-amount-of-shake-by-area/main", "mod/campaign/total-shake-by-date/main", "mod/campaign/conversion-analysis-by-area/main", "mod/campaign/overall-engagement-by-area/main", "mod/campaign/overall-engagement-by-date/main"])
                },
                1e3)
            },
            a
        } (e.BaseMod),
        a.exports = d
    }).call(this)
}),
define("./campaign-overview-tag", ["require", "exports", "module", "riot", "app", "skateboard", "riot-mixins"],
function(i, s, a) {
    riot = i("riot"),
    riot.tag("campaign-overview-tag", '<div class="body-inner"> <div class="nav-bar"> <h2>Dashboard Overview</h2> </div> </div> <div class="section"> <h3>Interest</h3> <div class="bee-cell outline down"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> <div class="title">PV</div> <div class="value">T: 509</div> <div class="value">Y: 1523</div> </div> </div> </div> <div class="bee-cell outline up"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> <div class="title">UV</div> <div class="value">T: 1300</div> <div class="value">Y: 600</div> </div> </div> </div> <div class="bee-cell outline"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> <div class="title">Shake</div> <div class="value">&nbsp;</div> <div class="value">Y: 860</div> </div> </div> </div> </div> <div class="section s2"> <h3>Engagement</h3> <div class="bee-cell outline up"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> <div class="title">Total Click</div> <div class="value">T: 1234</div> <div class="value">Y: 1023</div> </div> </div> </div> <div class="bee-cell outline down"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> <div class="title">Unique Click</div> <div class="value">T: 1002</div> <div class="value">Y: 2013</div> </div> </div> </div> <div class="bee-cell outline"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> <div class="title">Avg. Stay Length</div> <div class="value">1m10s</div> </div> </div> </div> </div> <div class="section s3"> <h3>Conversion</h3> <div class="bee-cell outline down"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> <div class="title">Share on Moment</div> <div class="value">T: 509</div> <div class="value">Y: 1523</div> </div> </div> </div> <div class="bee-cell outline up"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> <div class="title">Share to Friend</div> <div class="value">T: 1300</div> <div class="value">Y: 600</div> </div> </div> </div> <div class="bee-cell outline up"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> <div class="title">To the store</div> <div class="value">T: 1560</div> <div class="value">Y: 860</div> </div> </div> </div> </div>', ".body-sb-mod--campaign .campaign-menu { -webkit-transform: translateY(0); transform: translateY(0); } .sb-mod.sb-mod--campaign { padding-bottom: 60px; } .sb-mod.sb-mod--campaign .section { text-align: center; } .sb-mod.sb-mod--campaign .s2 { margin-left: -490px; } .sb-mod.sb-mod--campaign .s3 { margin: -180px 0px 0px 500px; } .sb-mod.sb-mod--campaign .section h3 { text-align: center; font-size:1.4em; font-weight: normal; margin-bottom: 20px;} .sb-mod.sb-mod--campaign .section .bee-cell .title { font-weight: bold; } .sb-mod.sb-mod--campaign .section .bee-cell.down { color: red; } .sb-mod.sb-mod--campaign .section .bee-cell.up { color: green; }",
    function(s) {
        var a, d, e;
        a = i("app"),
        e = i("skateboard"),
        d = i("riot-mixins"),
        this.mixin(d.navBar)
    }),
    a.exports = "campaign-overview-tag"
});