define(["require", "exports", "module", "app", "skateboard", "jquery", "riot", "./conversion-analysis-by-area-tag"],
function(a, e, t) { (function() {
        var e, n, i, o, s, r, c = function(a, e) {
            function t() {
                this.constructor = a
            }
            for (var n in e) d.call(e, n) && (a[n] = e[n]);
            return t.prototype = e.prototype,
            a.prototype = new t,
            a.__super__ = e.prototype,
            a
        },
        d = {}.hasOwnProperty;
        o = a("app"),
        i = a("skateboard"),
        e = a("jquery"),
        r = a("riot"),
        s = a("./conversion-analysis-by-area-tag"),
        n = function(a) {
            function e() {
                return e.__super__.constructor.apply(this, arguments)
            }
            return c(e, a),
            e.prototype.render = function() {
                return e.__super__.render.apply(this, arguments),
                r.mount(this.$(".sb-mod__body")[0], s, {
                    type: this._args[1]
                })
            },
            e
        } (i.BaseMod),
        t.exports = n
    }).call(this)
}),
define("./conversion-analysis-by-area-tag", ["require", "exports", "module", "riot", "app", "skateboard", "riot-mixins", "highcharts"],
function(a, e, t) {
    riot = a("riot"),
    riot.tag("conversion-analysis-by-area-tag", '<div class="body-inner"> <div class="nav-bar-left"> <h2>Conversion Report</h2> <h3>Total Amount of Conversion by Area</h3> </div> </div> <div class="category"> <a href="/view/campaign/conversion-analysis-by-area/-/1/event"> <div class="bee-cell small small-vertical {active: type == \'event\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Event </div> </div> </div> </a> <a href="/view/campaign/conversion-analysis-by-area/-/1/store"> <div class="bee-cell small small-vertical {active: type == \'store\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Store </div> </div> </div> </a> <a href="/view/campaign/conversion-analysis-by-area/-/1/city"> <div class="bee-cell small small-vertical {active: type == \'city\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> City </div> </div> </div> </a> <a href="/view/campaign/conversion-analysis-by-area/-/1/country"> <div class="bee-cell small small-vertical {active: type == \'country\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Country </div> </div> </div> </a> </div> <div id="conversion-analysis-by-area-chart" style="width:100%; padding: 5% 15%;"> </div> <div class="desc"> Did not Convert: Did not Take Any Conversion Action.<br > To Wechat: Action to Follow Wechat.<br > To Store: Click to E-commerce/Store Locator.<br > To Share: Share on momment and to friend. </div>', ".body-sb-mod--campaign-conversion-analysis-by-area .campaign-menu { -webkit-transform: translateY(0); transform: translateY(0); } .sb-mod.sb-mod--campaign-conversion-analysis-by-area { padding-bottom: 60px; } .sb-mod.sb-mod--campaign-conversion-analysis-by-area .category { text-align: center; margin-top: 20px; position:absolute; right:20px; }",
    function(e) {
        var t, n, i, o, s, r;
        n = a("app"),
        r = a("skateboard"),
        s = a("riot-mixins"),
        t = a("highcharts"),
        this.type = e.type || "event",
        this.mixin(s.navBar),
        o = {
            event: [{
                name: "Did not Convert",
                data: [3, 4, 4, 2, 3]
            },
            {
                name: "To Wechat",
                data: [2, 2, 3, 2, 2]
            },
            {
                name: "To Store",
                data: [5, 3, 4, 7, 4]
            },
            {
                name: "To Share",
                data: [2, 1, 1, 1, 2]
            }],
            store: [{
                name: "Did not Convert",
                data: [22, 15, 23, 12, 18]
            },
            {
                name: "To Wechat",
                data: [20, 25, 28, 29, 28]
            },
            {
                name: "To Store",
                data: [25, 28, 19, 25, 22]
            },
            {
                name: "To Share",
                data: [18, 23, 20, 19, 25]
            }],
            city: [{
                name: "Did not Convert",
                data: [180, 250, 170, 220, 180]
            },
            {
                name: "To Wechat",
                data: [240, 210, 200, 210, 220]
            },
            {
                name: "To Store",
                data: [200, 220, 240, 260, 280]
            },
            {
                name: "To Share",
                data: [200, 210, 260, 200, 200]
            }],
            country: [{
                name: "Did not Convert",
                data: [2300, 3e3, 2200, 2300, 2100]
            },
            {
                name: "To Wechat",
                data: [2200, 1200, 2700, 2200, 1800]
            },
            {
                name: "To Store",
                data: [1800, 2200, 1800, 1900, 2500]
            },
            {
                name: "To Share",
                data: [2300, 2300, 2500, 2800, 2300]
            }]
        },
        i = {
            event: ["Kerry Centre", "iapm", "IFC", "Plaza 66", "Others"],
            store: ["Kerry Centre", "iapm", "IFC", "Plaza 66", "Others"],
            city: ["Beijing", "Shanghai", "Shenzhen", "Guangzhou", "Others"],
            country: ["China", "Korea", "Japan", "Hong Kong", "Others"]
        },
        this.on("mount",
        function() {
            return $("#conversion-analysis-by-area-chart").highcharts({
                credits: {
                    enabled: !1
                },
                colors: ["#fc9319", "#7c9440", "#90c222", "#433714"],
                chart: {
                    type: "bar",
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
                    series: {
                        stacking: "normal"
                    },
                    bar: {
                        borderWidth: 0,
                        allowPointSelect: !1
                    }
                },
                series: o[this.type]
            })
        })
    }),
    t.exports = "conversion-analysis-by-area-tag"
});