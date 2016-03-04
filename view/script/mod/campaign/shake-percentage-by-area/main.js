define(["require", "exports", "module", "app", "skateboard", "jquery", "riot", "./shake-percentage-by-area-tag"],
function(e, a, t) { (function() {
        var a, i, s, r, n, o, c = function(e, a) {
            function t() {
                this.constructor = e
            }
            for (var i in a) d.call(a, i) && (e[i] = a[i]);
            return t.prototype = a.prototype,
            e.prototype = new t,
            e.__super__ = a.prototype,
            e
        },
        d = {}.hasOwnProperty;
        r = e("app"),
        s = e("skateboard"),
        a = e("jquery"),
        n = e("riot"),
        o = e("./shake-percentage-by-area-tag"),
        i = function(e) {
            function a() {
                return a.__super__.constructor.apply(this, arguments)
            }
            return c(a, e),
            a.prototype.render = function() {
                return a.__super__.render.apply(this, arguments),
                n.mount(this.$(".sb-mod__body")[0], o, {
                    type: this._args[1]
                })
            },
            a
        } (s.BaseMod),
        t.exports = i
    }).call(this)
}),
define("./shake-percentage-by-area-tag", ["require", "exports", "module", "riot", "app", "skateboard", "riot-mixins", "highcharts"],
function(e, a, t) {
    riot = e("riot"),
    riot.tag("shake-percentage-by-area-tag", '<div class="body-inner"> <div class="nav-bar-left"> <h2>Interest Report</h2> <h3>Total Percentage of Shake by Area</h3> </div> </div> <div class="category"> <a href="/view/campaign/shake-percentage-by-area/-/1/event"> <div class="bee-cell small small-vertical {active: type == \'event\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Event </div> </div> </div> </a> <a href="/view/campaign/shake-percentage-by-area/-/1/store"> <div class="bee-cell small  small-vertical {active: type == \'store\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Store </div> </div> </div> </a> <a href="/view/campaign/shake-percentage-by-area/-/1/city"> <div class="bee-cell small  small-vertical {active: type == \'city\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> City </div> </div> </div> </a> <a href="/view/campaign/shake-percentage-by-area/-/1/country"> <div class="bee-cell small  small-vertical {active: type == \'country\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Country </div> </div> </div> </a> </div> <div id="shake-percentage-by-area-chart" style="height: 500px;"> </div> <div class="highest"> <label>Highest Total Shake:</label> <span class="number">{data[0][1]}%</span>. <span class="name">{data[0][0]}</span> </div> <div class="desc"> Total Shake: Total No. of Valid Shakes<br > Unique Shake: Total No. of Shaked Users </div>', ".body-sb-mod--campaign-shake-percentage-by-area .campaign-menu { -webkit-transform: translateY(0); transform: translateY(0); } .sb-mod.sb-mod--campaign-shake-percentage-by-area { padding-bottom: 0px; } .sb-mod.sb-mod--campaign-shake-percentage-by-area .category { text-align: center; margin-top: 20px; position:absolute; right:20px;} .sb-mod.sb-mod--campaign-shake-percentage-by-area .highest { text-align: center; font-size: 0.9rem; margin-bottom: 10px; } .sb-mod.sb-mod--campaign-shake-percentage-by-area .highest .number { font-size: 1.3rem; color: #90c122; } .sb-mod.sb-mod--campaign-shake-percentage-by-area .highest .name { color: #fff; }",
    function(a) {
        var t, i, s, r, n;
        i = e("app"),
        n = e("skateboard"),
        r = e("riot-mixins"),
        t = e("highcharts"),
        this.type = a.type || "event",
        this.mixin(r.navBar),
        s = {
            event: [["IFC", 60], ["Kerry Centre", 20], ["iapm", 10], ["Plaza", 5], ["K11", 3], ["Others", 2]],
            store: [["IFC", 60], ["Kerry Centre", 20], ["iapm", 10], ["Plaza", 5], ["K11", 3], ["Others", 2]],
            city: [["Beijing", 35], ["Shanghai", 25], ["Shenzhen", 15], ["Guangzhou", 15], ["Others", 10]],
            country: [["China", 32], ["Korea", 28], ["Japan", 25], ["Hong Kong", 10], ["India", 5]]
        },
        this.data = s[this.type],
        this.on("mount",
        function() {
            return $("#shake-percentage-by-area-chart").highcharts({
                credits: {
                    enabled: !1
                },
                colors: ["#90c122", "#f78619", "#815911", "#7c9440", "#443714", "#f78619", "#815911"],
                chart: {
                    backgroundColor: null
                },
                title: {
                    text: null
                },
                tooltip: {
                    enabled: !1
                },
                plotOptions: {
                    pie: {
                        borderWidth: 0,
                        allowPointSelect: !1,
                        cursor: "pointer",
                        dataLabels: {
                            enabled: !0,
                            color: "#000000",
                            connectorColor: "#000000",
                            format: "{point.name}: {point.percentage:.1f}%"
                        }
                    }
                },
                series: [{
                    type: "pie",
                    name: "Browser share",
                    data: this.data
                }]
            })
        })
    }),
    t.exports = "shake-percentage-by-area-tag"
});