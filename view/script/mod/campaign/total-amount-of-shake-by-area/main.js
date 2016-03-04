define(["require", "exports", "module", "app", "skateboard", "jquery", "riot", "./total-amount-of-shake-by-area-tag"],
function(a, t, e) { (function() {
        var t, o, i, s, n, r, l = function(a, t) {
            function e() {
                this.constructor = a
            }
            for (var o in t) c.call(t, o) && (a[o] = t[o]);
            return e.prototype = t.prototype,
            a.prototype = new e,
            a.__super__ = t.prototype,
            a
        },
        c = {}.hasOwnProperty;
        s = a("app"),
        i = a("skateboard"),
        t = a("jquery"),
        n = a("riot"),
        r = a("./total-amount-of-shake-by-area-tag"),
        o = function(a) {
            function t() {
                return t.__super__.constructor.apply(this, arguments)
            }
            return l(t, a),
            t.prototype.render = function() {
                return t.__super__.render.apply(this, arguments),
                n.mount(this.$(".sb-mod__body")[0], r, {
                    type: this._args[1]
                })
            },
            t
        } (i.BaseMod),
        e.exports = o
    }).call(this)
}),
define("./total-amount-of-shake-by-area-tag", ["require", "exports", "module", "riot", "app", "skateboard", "riot-mixins", "highcharts"],
function(a, t, e) {
    riot = a("riot"),
    riot.tag("total-amount-of-shake-by-area-tag", '<div class="body-inner"> <div class="nav-bar-left"> <h2>Interest Report</h2> <h3>Total Amount of Shake by Area</h3> </div> </div> <div class="category"> <a href="/view/campaign/total-amount-of-shake-by-area/-/1/event"> <div class="bee-cell small small-vertical {active: type == \'event\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Event </div> </div> </div> </a> <a href="/view/campaign/total-amount-of-shake-by-area/-/1/store"> <div class="bee-cell small small-vertical {active: type == \'store\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Store </div> </div> </div> </a> <a href="/view/campaign/total-amount-of-shake-by-area/-/1/city"> <div class="bee-cell small small-vertical {active: type == \'city\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> City </div> </div> </div> </a> <a href="/view/campaign/total-amount-of-shake-by-area/-/1/country"> <div class="bee-cell small small-vertical {active: type == \'country\'}"> <div class="top"></div> <div class="mid"></div> <div class="bot"></div> <div class="content"> <div class="inner"> Country </div> </div> </div> </a> </div> <div id="total-amount-of-shake-by-area-chart" style="width:100%; padding: 5% 15%;"> </div> <div class="highest"> <label>Highest Total Shake:</label> <span class="number">{data[0].data[0]}</span>. <span class="name">{categories[0]}</span><br > <label>Highest Unique Shake:</label> <span class="number">{data[1].data[0]}</span>. <span class="name">{categories[0]}</span> </div> <div class="desc"> Total Shake: Total No. of Valid Shakes<br > Unique Shake: Total No. of Shaked Users </div>', ".body-sb-mod--campaign-total-amount-of-shake-by-area .campaign-menu { -webkit-transform: translateY(0); transform: translateY(0); } .sb-mod.sb-mod--campaign-total-amount-of-shake-by-area { padding-bottom: 60px; } .sb-mod.sb-mod--campaign-total-amount-of-shake-by-area .category { text-align: center; margin-top: 20px; position:absolute; right:20px;} .sb-mod.sb-mod--campaign-total-amount-of-shake-by-area .highest { text-align: center; font-size: 0.9rem; margin-bottom: 10px; } .sb-mod.sb-mod--campaign-total-amount-of-shake-by-area .highest .number { font-size: 1.3rem; color: #5d5d5d; } .sb-mod.sb-mod--campaign-total-amount-of-shake-by-area .highest .name { color: #fff; }",
    function(t) {
        var e, o, i, s, n, r;
        o = a("app"),
        r = a("skateboard"),
        n = a("riot-mixins"),
        e = a("highcharts"),
        this.type = t.type || "event",
        this.mixin(n.navBar),
        s = {
            event: [{
                name: "Total Shake",
                data: [270, 240, 120, 20]
            },
            {
                name: "Unique Shake",
                data: [140, 120, 100, 20]
            }],
            store: [{
                name: "Total Shake",
                data: [270, 240, 120, 20]
            },
            {
                name: "Unique Shake",
                data: [140, 120, 100, 20]
            }],
            city: [{
                name: "Total Shake",
                data: [250, 200, 150, 150]
            },
            {
                name: "Unique Shake",
                data: [110, 100, 120, 50]
            }],
            country: [{
                name: "Total Shake",
                data: [270, 220, 170, 150]
            },
            {
                name: "Unique Shake",
                data: [180, 200, 110, 50]
            }]
        },
        this.data = s[this.type],
        i = {
            event: ["IFC", "Kerry Centre", "iapm", "Plaza 66"],
            store: ["IFC", "Kerry Centre", "iapm", "Plaza 66"],
            city: ["Beijing", "Shanghai", "Guangzhou", "Others"],
            country: ["China", "Korea", "Hong Kong", "Others"]
        },
        this.categories = i[this.type],
        this.on("mount",
        function() {
            return $("#total-amount-of-shake-by-area-chart").highcharts({
                credits: {
                    enabled: !1
                },
                colors: ["#fc9319", "#433713"],
                chart: {
                    type: "column",
                    backgroundColor: null
                },
                title: {
                    text: null
                },
                tooltip: {
                    enabled: !1
                },
                xAxis: {
                    categories: this.categories
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
                series: this.data
            })
        })
    }),
    e.exports = "total-amount-of-shake-by-area-tag"
});