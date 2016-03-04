define(["require", "exports", "module", "app", "skateboard", "jquery", "riot", "./overall-engagement-by-date-tag"],
function(e, a, t) { (function() {
        var a, i, n, o, l, r, s = function(e, a) {
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
        o = e("app"),
        n = e("skateboard"),
        a = e("jquery"),
        r = e("riot"),
        l = e("./overall-engagement-by-date-tag"),
        i = function(e) {
            function a() {
                return a.__super__.constructor.apply(this, arguments)
            }
            return s(a, e),
            a.prototype.render = function() {
                return a.__super__.render.apply(this, arguments),
                r.mount(this.$(".sb-mod__body")[0], l, {
                    typeNo: parseInt(this._args[1])
                })
            },
            a
        } (n.BaseMod),
        t.exports = i
    }).call(this)
}),
define("./overall-engagement-by-date-tag", ["require", "exports", "module", "riot", "app", "skateboard", "riot-mixins", "highcharts"],
function(e, a, t) {
    riot = e("riot"),
    riot.tag("overall-engagement-by-date-tag", '<div class="body-inner"> <div class="nav-bar-left"> <h2>Engagement Report</h2> <h3>Overall Engagement by Date</h3> </div> </div><div class="category"> <a onclick="{switchType}" data-index="0"> <div class="bee-cell small small-vertical {active: typeNo == 0}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Day </div> </div> </div> </a> <a onclick="{switchType}" data-index="1"> <div class="bee-cell small small-vertical {active: typeNo == 1}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Week </div> </div> </div> </a> <a onclick="{switchType}" data-index="2"> <div class="bee-cell small small-vertical {active: typeNo == 2}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Month </div> </div> </div> </a> <a onclick="{switchType}" data-index="3"> <div class="bee-cell small small-vertical {active: typeNo == 3}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Quarter </div> </div> </div> </a> </div> <div class="chart-container"> <div id="overall-engagement-by-date-chart-0" style="float: left; width:30%; padding: 10% 1%;"></div> </div> <div class="chart-container"> <div id="overall-engagement-by-date-chart-1" style="float: left; width:30%; padding: 10% 1%;"></div> </div>  <div class="chart-container"> <div id="overall-engagement-by-date-chart-2" style="float: left; width:30%; padding: 10% 1%;"></div> </div>', ".body-sb-mod--campaign-overall-engagement-by-date .campaign-menu { -webkit-transform: translateY(0); transform: translateY(0); } .sb-mod.sb-mod--campaign-overall-engagement-by-date { padding-bottom: 60px; } .sb-mod.sb-mod--campaign-overall-engagement-by-date .category { text-align: center; margin-top: 20px;  position:absolute; right:20px; line-height: 30px; } .sb-mod.sb-mod--campaign-overall-engagement-by-date .category .name { display: inline-block; width: 60px; text-align: center; } .sb-mod.sb-mod--campaign-overall-engagement-by-date .items { text-align: center; margin-top: 20px; } .sb-mod.sb-mod--campaign-overall-engagement-by-date .items .bee-cell { margin: 0 5px; } .sb-mod.sb-mod--campaign-overall-engagement-by-date .show-no { text-align: right; padding: 10px; } .sb-mod.sb-mod--campaign-overall-engagement-by-date .chart-container { padding-left: 60px; position: relative; } .sb-mod.sb-mod--campaign-overall-engagement-by-date .chart-container .bee-cell { position: absolute; top: 20px; left: 10px; }",
    function(a) {
        var t, i, n, o;
        i = e("app"),
        o = e("skateboard"),
        n = e("riot-mixins"),
        t = e("highcharts"),
        this.mixin(n.navBar),
        this.showNo = !1,
        this.types = ["Day", "Week", "Month", "Quarter"],
        this.typeNo = a.typeNo || 0,
        this.prevType = function() {
            return this.typeNo--,
            this.typeNo < 0 ? this.typeNo += this.types.length: void 0
        },
        this.nextType = function() {
            return this.typeNo = (this.typeNo + 1) % this.types.length
        },
        this.switchType = function(e) {
            var a, t;
            return t = $(e.currentTarget),
            a = t.data("index"),
            this.typeNo = parseInt(a)
        },
        this.toggleShowNo = function(e) {
            return this.showNo = !this.showNo
        },
        this.on("mount update",
        function() {
            var e, a, t, i, n, o, l, r;
            for (a = [[[{
                name: "Total Click",
                data: [25, 25, 45, {
                    y: 99,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }], [{
                name: "Unique Click",
                data: [20, 20, 40, {
                    y: 90,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }], [{
                name: "Stay Length",
                data: [65, 45, 85, {
                    y: 105,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }]], [[{
                name: "Total Click",
                data: [25, 25, 45, {
                    y: 99,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }], [{
                name: "Unique Click",
                data: [20, 20, 40, {
                    y: 90,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }], [{
                name: "Stay Length",
                data: [85, 65, 75, {
                    y: 95,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }]], [[{
                name: "Total Click",
                data: [2500, 1700, 2300, {
                    y: 3200,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }], [{
                name: "Unique Click",
                data: [2300, 1400, 2e3, {
                    y: 2900,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }], [{
                name: "Stay Length",
                data: [85, 65, 75, {
                    y: 95,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }]], [[{
                name: "Total Click",
                data: [5500, 7700, 8300, {
                    y: 10200,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }], [{
                name: "Unique Click",
                data: [5e3, 7200, 7800, {
                    y: 9300,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }], [{
                name: "Stay Length",
                data: [85, 65, 75, {
                    y: 95,
                    marker: {
                        fillColor: "#ff0000"
                    }
                }]
            }]]], e = [["21-Jul", "22-Jul", "23-Jul", "24-Jul"], ["Jul WK1", "Jul WK2", "Jul WK3", "Jul WK4"], ["April", "May", "June", "July"], ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]], r = ["Total Click", "Unique Click", "Stay Length"], o = [0, 1, 2], l = [], i = 0, n = o.length; n > i; i++) t = o[i],
            l.push($("#overall-engagement-by-date-chart-" + t).highcharts({
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
                    categories: e[this.typeNo]
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    },
                    labels: {
                        format: 2 === t ? "{value}s": "{value}"
                    }
                },
                plotOptions: {
                    column: {
                        borderWidth: 0,
                        allowPointSelect: !1
                    },
                    series: {
                        dataLabels: {
                            enabled: this.showNo ? !0 : !1,
                            format: "{y}"
                        }
                    }
                },
                series: a[this.typeNo][t]
            }));
            return l
        })
    }),
    t.exports = "overall-engagement-by-date-tag"
});