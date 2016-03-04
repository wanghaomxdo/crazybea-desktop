define(["require", "exports", "module", "app", "skateboard", "jquery", "riot", "./total-shake-by-date-tag"],
function(a, e, t) { (function() {
        var e, s, i, n, l, r, o = function(a, e) {
            function t() {
                this.constructor = a
            }
            for (var s in e) d.call(e, s) && (a[s] = e[s]);
            return t.prototype = e.prototype,
            a.prototype = new t,
            a.__super__ = e.prototype,
            a
        },
        d = {}.hasOwnProperty;
        n = a("app"),
        i = a("skateboard"),
        e = a("jquery"),
        l = a("riot"),
        r = a("./total-shake-by-date-tag"),
        s = function(a) {
            function e() {
                return e.__super__.constructor.apply(this, arguments)
            }
            return o(e, a),
            e.prototype.render = function() {
                return e.__super__.render.apply(this, arguments),
                l.mount(this.$(".sb-mod__body")[0], r, {
                    type: this._args[1]
                })
            },
            e
        } (i.BaseMod),
        t.exports = s
    }).call(this)
}),
define("./total-shake-by-date-tag", ["require", "exports", "module", "riot", "app", "skateboard", "riot-mixins", "highcharts"],
function(a, e, t) {
    riot = a("riot"),
    riot.tag("total-shake-by-date-tag", '<div class="body-inner"> <div class="nav-bar-left"> <h2>Interest Report</h2> <h3>Total Shake by Date</h3> </div> </div> <div class="category"> <a href="/view/campaign/total-shake-by-date/-/1/day"> <div class="bee-cell small small-vertical {active: type == \'day\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Day </div> </div> </div> </a> <a href="/view/campaign/total-shake-by-date/-/1/week"> <div class="bee-cell small small-vertical {active: type == \'week\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Week </div> </div> </div> </a> <a href="/view/campaign/total-shake-by-date/-/1/month"> <div class="bee-cell small small-vertical {active: type == \'month\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Month </div> </div> </div> </a> <a href="/view/campaign/total-shake-by-date/-/1/quarter"> <div class="bee-cell small small-vertical {active: type == \'quarter\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Quarter </div> </div> </div> </a> </div> <div id="total-shake-by-date-chart" style="hwidth:100%; padding: 5% 15%;"> </div> <div class="highest" if="{type == \'day\'}"> <label>Highest Shake:</label> <span class="number red">99</span>. <span class="name">24-Jul</span><br > <label>Highest Increase:</label> <span class="number green">54</span>. <span class="name">24-Jul</span> </div> <div class="highest" if="{type == \'week\'}"> <label>Highest Shake:</label> <span class="number red">100</span>. <span class="name">July WK4</span><br > <label>Highest Increase:</label> <span class="number green">50</span>. <span class="name">July WK4</span> </div> <div class="highest" if="{type == \'month\'}"> <label>Highest Shake:</label> <span class="number red">70</span>. <span class="name">April</span><br > <label>Highest Increase:</label> <span class="number green">20</span>. <span class="name">June</span> </div> <div class="highest" if="{type == \'quarter\'}"> <label>Highest Shake:</label> <span class="number red">10,000</span>. <span class="name">Quarter 4</span><br > <label>Highest Increase:</label> <span class="number green">5,000</span>. <span class="name">Quarter 4</span> </div>', ".body-sb-mod--campaign-total-shake-by-date .campaign-menu { -webkit-transform: translateY(0); transform: translateY(0); } .sb-mod.sb-mod--campaign-total-shake-by-date { padding-bottom: 60px; } .sb-mod.sb-mod--campaign-total-shake-by-date .category { text-align: center; margin-top: 20px; position:absolute; right:20px;} .sb-mod.sb-mod--campaign-total-shake-by-date .highest { text-align: center; font-size: 0.9rem; margin-bottom: 10px; } .sb-mod.sb-mod--campaign-total-shake-by-date .highest .number { font-size: 1.3rem; color: #90c122; } .sb-mod.sb-mod--campaign-total-shake-by-date .highest .number.red { color: red; } .sb-mod.sb-mod--campaign-total-shake-by-date .highest .number.green { color: green; } .sb-mod.sb-mod--campaign-total-shake-by-date .highest .name { color: #fff; }",
    function(e) {
        var t, s, i, n, l, r;
        s = a("app"),
        r = a("skateboard"),
        l = a("riot-mixins"),
        t = a("highcharts"),
        this.type = e.type || "day",
        this.mixin(l.navBar),
        n = {
            day: [{
                name: "Total Shake",
                data: [25, 25, 45, {
                    y: 99,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }],
            week: [{
                name: "Total Shake",
                data: [30, 35, 50, {
                    y: 100,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }],
            month: [{
                name: "Total Shake",
                data: [700, 300, 500, {
                    y: 600,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }],
            quarter: [{
                name: "Total Shake",
                data: [2500, 2800, 5e3, {
                    y: 1e4,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }]
        },
        i = {
            day: ["21-Jul", "22-Jul", "23-Jul", "24-Jul"],
            week: ["Jul WK1", "Jul WK2", "Jul WK3", "Jul WK4"],
            month: ["April", "May", "June", "July"],
            quarter: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]
        },
        this.on("mount",
        function() {
            return $("#total-shake-by-date-chart").highcharts({
                credits: {
                    enabled: !1
                },
                colors: ["#fc9319"],
                chart: {
                    type: "line",
                    backgroundColor: null
                },
                title: {
                    text: null
                },
                tooltip: {
                    enabled: !1
                },
                xAxis: {
                    categories: i[this.type]
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    }
                },
                plotOptions: {
                    column: {
                        borderWidth: 0,
                        allowPointSelect: !1
                    }
                },
                series: n[this.type]
            })
        })
    }),
    t.exports = "total-shake-by-date-tag"
});