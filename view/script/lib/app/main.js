define(["require", "exports", "module", "./config", "./css", "./cookie", "./local-storage", "./util", "./ajax", "./alerts", "./scroll", "./toggle", "./stat", "./dialog", "./wx"],
function(e) {
    return {
        config: e("./config"),
        css: e("./css"),
        cookie: e("./cookie"),
        localStorage: e("./local-storage"),
        util: e("./util"),
        ajax: e("./ajax"),
        alerts: e("./alerts"),
        scroll: e("./scroll"),
        toggle: e("./toggle"),
        stat: e("./stat"),
        dialog: e("./dialog"),
        wx: e("./wx")
    }
}),
define("./config", ["require", "exports", "module"],
function(e) {
    return {
        DEFAULT_MOD: "home",
        MOD_PREFIX: "view",
        RES_CODE: {
            RESOURCE_NOT_EXIST: 2,
            NEED_LOGIN: 10
        }
    }
}),
define("./css", ["require", "exports", "module", "jquery"],
function(e) {
    function t(e, i) {
        var l, c;
        if (o.isArray(e)) return l = [],
        o.each(e,
        function(e, n) {
            l.push(t(n, i))
        }),
        l;
        if (/^https?:|^\//.test(e) || (e = G.CDN_ORIGIN + e), l = a[e], c = o("#" + l)[0], l && c) {
            if (!i) return l;
            n(e)
        }
        return l = "app-css-link-" + r++,
        c = o('<link id="' + l + '" rel="stylesheet" type="text/css" media="screen" href="' + e + '" />'),
        o(o(document.head || "head").children()[0]).before(c),
        a[e] = l
    }
    function n(e) {
        var t;
        return o.isArray(e) ? (t = [], o.each(e,
        function(e, o) {
            t.push(n(o))
        }), t) : (/^https?:|^\//.test(e) || (e = G.CDN_ORIGIN + e), t = o("#" + a[e])[0], t ? (delete a[e], t.parentNode.removeChild(t)) : null)
    }
    var o = e("jquery"),
    r = 0,
    a = {};
    return {
        load: t,
        unload: n
    }
}),
define("./cookie", ["require", "exports", "module"],
function(e) {
    var t = G.DOMAIN;
    return {
        set: function(e, n, o, r, a) {
            var i;
            a && (i = new Date, i.setTime(i.getTime() + 36e5 * a)),
            document.cookie = e + "=" + n + "; " + (i ? "expires=" + i.toGMTString() + "; ": "") + ("path=" + (r || "/") + "; ") + ("domain=" + (o || t) + ";")
        },
        get: function(e) {
            var t = new RegExp("(?:^|;\\s*)" + e + "=([^;]*)"),
            n = document.cookie.match(t);
            return n && n[1] || ""
        },
        del: function(e, n, o) {
            document.cookie = e + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + ("path=" + (o || "/") + "; ") + ("domain=" + (n || t) + ";")
        }
    }
}),
define("./local-storage", ["require", "exports", "module"],
function(e) {
    function t(e, t) {
        return t = t || {},
        s[e](t)
    }
    function n(e, t, n) {
        function o(e, t) {
            var n;
            return e ? (n = e.match(/(.*)\[expires=(\d+)\]$/), n && (n[2] < (new Date).getTime() ? (e = void 0, r.push(t)) : e = n[1])) : e = void 0,
            e
        }
        var r = [];
        return e && "object" == typeof e ? $.each(e,
        function(t, n) {
            e[t] = o(n, t)
        }) : e = o(e, t),
        r.length && a(r.join(" "), {
            proxy: n
        }),
        e
    }
    function o(e, n, o) {
        return o = o || {},
        o.life && "cookie" != c.name && (n += "[expires=" + ((new Date).getTime() + 36e5 * o.life) + "]"),
        t("set", {
            key: e,
            val: n,
            cb: o.callback,
            life: o.life
        })
    }
    function r(e, o) {
        var r, a;
        return o = o || {},
        o.callback ? (r = function(t) {
            o.callback(n(t, e, o.proxy))
        },
        t("get", {
            key: e,
            cb: r
        })) : (a = t("get", {
            key: e
        }), n(a, e, o.proxy))
    }
    function a(e, n) {
        return n = n || {},
        t("remove", {
            key: e
        })
    }
    function l(e) {
        return e = e || {},
        t("clear", {})
    }
    var c = {
        name: "default",
        db: {},
        set: function(e, t) {
            this.db[e] = t
        },
        get: function(e) {
            return this.db[e]
        },
        remove: function(e) {
            delete this.db[e]
        },
        clear: function() {
            this.db = {}
        }
    },
    u = [{
        name: "localStorage",
        isSupported: !!window.localStorage,
        set: function(e, t) {
            localStorage.setItem(e, t)
        },
        get: function(e) {
            return localStorage.getItem(e)
        },
        remove: function(e) {
            localStorage.removeItem(e)
        },
        clear: function() {
            localStorage.clear()
        },
        init: function() {}
    }];
    for (i = 0; i < u.length; i++) if (u[i].isSupported) {
        c = u[i],
        c.init();
        break
    }
    var s = {
        set: function(e) {
            var t = c.set(e.key, e.val, e.life);
            return e.cb ? e.cb(t) : t
        },
        get: function(e) {
            var t, n = e.key.split(" ");
            return n.length > 1 ? (t = {},
            $.each(n,
            function(e, n) {
                t[n] = c.get(n)
            })) : t = c.get(n[0]),
            e.cb ? e.cb(t) : t
        },
        remove: function(e) {
            var t = e.key.split(" ");
            t.length > 1 ? $.each(t,
            function(e, t) {
                c.remove(t)
            }) : c.remove(t[0]),
            e.cb && e.cb()
        },
        clear: function(e) {
            c.clear(),
            e.cb && e.cb()
        }
    };
    return {
        _db: c,
        _do: t,
        set: o,
        get: r,
        remove: a,
        clear: l
    }
}),
define("./util", ["require", "exports", "module", "jquery"],
function(e) {
    var t = e("jquery"),
    n = 0,
    o = {};
    return o.url2obj = function(e) {
        if ("string" != typeof e) return e;
        var t = e.match(/([^:]*:)?(?:\/\/)?([^\/:]+)?(:)?(\d+)?([^?#]+)(\?[^?#]*)?(#[^#]*)?/);
        return t = t || [],
        uri = {
            href: e,
            protocol: t[1] || "http:",
            host: (t[2] || "") + (t[3] || "") + (t[4] || ""),
            hostname: t[2] || "",
            port: t[4] || "",
            pathname: t[5] || "",
            search: t[6] || "",
            hash: t[7] || ""
        },
        uri.origin = uri.protocol + "//" + uri.host,
        uri
    },
    o.cloneObject = function(e, n, r) {
        var a = e;
        if (n = n || 0, r = r || 0, r > n) return a;
        if ("object" == typeof e && e) if (t.isArray(e)) a = [],
        t.each(e,
        function(e, t) {
            a.push(t)
        });
        else {
            a = {};
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (a[i] = n ? o.cloneObject(e[i], n, ++r) : e[i])
        }
        return a
    },
    o.getUniqueId = function() {
        return "APP_UNIQUE_ID_" + n++
    },
    o.getOrigin = function(e) {
        return e = e || window.location,
        e.origin || [e.protocol, "//", e.host].join("")
    },
    o.getByteLength = function(e) {
        return e.replace(/[^\x00-\xff]/g, "xx").length
    },
    o.headByByte = function(e, t, n) {
        if (e = new String(e).toString(), o.getByteLength(e) <= t) return e;
        n = n || "";
        var r;
        r = n ? t -= o.getByteLength(n) : t;
        do e = e.slice(0, r--);
        while (o.getByteLength(e) > t);
        return e + n
    },
    o.encodeHtml = function(e) {
        return (e + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\x60/g, "&#96;").replace(/\x27/g, "&#39;").replace(/\x22/g, "&quot;")
    },
    o.decodeHtml = function(e) {
        return (e + "").replace(/&quot;/g, '"').replace(/&#0*39;/g, "'").replace(/&#0*96;/g, "`").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&")
    },
    o.getUrlParam = function(e, t) {
        t = t || window.location;
        var n = new RegExp("(\\?|#|&)" + e + "=(.*?)(&|#|$)"),
        o = (t.href || "").match(n);
        return o ? decodeURIComponent(o[2]) : ""
    },
    o.getUrlParams = function(e) {
        e = e || window.location;
        var t, n, o = e.search,
        r = {};
        if (o) for (o = o.slice(1), o = o.split("&"), n = 0, l = o.length; n < l; n++) t = o[n].split("="),
        r[t[0]] = decodeURIComponent(t[1] || "");
        if (o = e.hash) for (o = o.slice(1), o = o.split("&"), n = 0, l = o.length; n < l; n++) t = o[n].split("="),
        r[t[0]] = r[t[0]] || decodeURIComponent(t[1] || "");
        return r
    },
    o.appendQueryString = function(e, n, o) {
        if (n = "object" == typeof n ? t.param(n, !0) : "string" == typeof n ? n.replace(/^&/, "") : "", !n) return e;
        if (o) e += -1 == e.indexOf("#") ? "#" + n: "&" + n;
        else if ( - 1 == e.indexOf("#")) e += -1 == e.indexOf("?") ? "?" + n: "&" + n;
        else {
            var r = e.split("#");
            e = -1 == r[0].indexOf("?") ? r[0] + "?" + n + "#" + (r[1] || "") : r[0] + "&" + n + "#" + (r[1] || "")
        }
        return e
    },
    o.formatMsg = function(e, n) {
        return e += "",
        n && t.each(n,
        function(t, n) {
            n = o.encodeHtml(n),
            e = e.replace(new RegExp("\\{\\{" + t + "\\}\\}", "g"), n)
        }),
        e
    },
    o.formatDecimal = function(e, t, n) {
        function r(e) {
            var t = [],
            n = 0;
            for (e = e.split(""); e.length;) ! n || n % 3 || t.unshift(","),
            t.unshift(e.pop()),
            n++;
            return t.join("")
        }
        n = n || {};
        var a, i, l, c, u = "";
        return e += "",
        a = e.match(/^(\-?)(\w*)(.?)(\w*)/),
        i = t.match(/^(\-?)(\w*)(.?)(\w*)/),
        i[2] && (u += a[2]),
        i[3] && i[4] ? (u += i[3], l = Math.min(i[4].length, 4), c = a[4].length, u += a[4].slice(0, l), l > c && (u += new Array(l - c + 1).join("0")), c > l && (n.round && a[4].charAt(l) >= 5 || n.ceil && a[4].charAt(l) > 0) ? o.formatDecimal((u * Math.pow(10, l) + 1) / Math.pow(10, l), t) : (u = u.split("."), u[0] = r(u[0]), u = u.join("."), a[1] && "0" != u && (u = a[1] + u), u)) : (n.round ? u = Math.round(e) + "": n.ceil && (u = Math.ceil(e) + ""), u = r(u))
    },
    o.formatDateTime = function(e, t) {
        if (!e) return "";
        var n = t,
        o = "";
        return e = new Date(e),
        n = n.replace(/yyyy|yy/,
        function(t) {
            return 4 === t.length ? e.getFullYear() : (e.getFullYear() + "").slice(2, 4)
        }).replace(/MM|M/,
        function(t) {
            return 2 === t.length && e.getMonth() < 9 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1
        }).replace(/dd|d/,
        function(t) {
            return 2 === t.length && e.getDate() < 10 ? "0" + e.getDate() : e.getDate()
        }).replace(/HH|H/,
        function(t) {
            return 2 === t.length && e.getHours() < 10 ? "0" + e.getHours() : e.getHours()
        }).replace(/hh|h/,
        function(t) {
            var n = e.getHours();
            return o = n > 11 ? "PM": "AM",
            n = n > 12 ? n - 12 : n,
            2 === t.length && 10 > n ? "0" + n: n
        }).replace(/mm/,
        function(t) {
            return e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes()
        }).replace(/ss/,
        function(t) {
            return e.getSeconds() < 10 ? "0" + e.getSeconds() : e.getSeconds()
        }).replace("tt", o)
    },
    o.formatLeftTime = function(e, t, n, o) {
        var r = m = h = 0;
        return r = parseInt(e / 1e3),
        r = r || 1,
        r >= 60 && (m = parseInt(r / 60), r %= 60),
        m >= 60 && (h = parseInt(m / 60), m %= 60),
        [h ? h + (t || "h") : "", m ? m + (n || "m") : "", r ? r + (o || "s") : ""].join("")
    },
    o.formatFileSize = function(e) {
        var t, n, r;
        return 100 > e ? o.formatDecimal(e, "0.00", {
            ceil: 1
        }) + "B": (t = e / 1024, 1e3 > t ? o.formatDecimal(t, "0.00", {
            ceil: 1
        }) + "KB": (n = t / 1024, 1e3 > n ? o.formatDecimal(n, "0.00", {
            ceil: 1
        }) + "MB": (r = n / 1024, o.formatDecimal(r, "0.00", {
            ceil: 1
        }) + "GB")))
    },
    o
}),
define("./ajax", ["require", "exports", "module", "jquery", "./config", "./alerts", "./util", "./cookie"],
function(e) {
    var t = e("jquery"),
    n = e("./config"),
    o = (e("./alerts"), e("./util")),
    r = (e("./cookie"), {}),
    a = {},
    i = {};
    return i.getDataTypeUrl = function(e, t) {
        var n, r;
        return /^(https?:|\/\/)/.test(e) ? n = e: (e = e.replace(/^\/+/, ""), n = G.CGI_ORIGIN + "/" + e, r = o.getUrlParams(o.url2obj(n)), G.IS_PROTOTYPE && (n = r.m && r.c && r.a ? G.CGI_ORIGIN + "/static/mockup-data/" + [r.m, r.c, r.a].join("/") : G.CGI_ORIGIN + "/static/mockup-data/" + e), n = n.replace(/[^\/]+$/,
        function(e) {
            return e.replace(/^[\w\-\.]+/,
            function(e) {
                return e.split(".")[0] + "." + t
            })
        })),
        -1 === n.indexOf("csrf_token=") && (n = o.appendQueryString(n, {
            csrf_token: G.csrfToken
        })),
        n
    },
    i.showLoading = function() {
        t("#circleG").show()
    },
    i.hideLoading = function() {
        t("#circleG").hide()
    },
    i.dealCommonCode = function(e) {
        var t = !0;
        return (e !== n.RES_CODE.NEED_LOGIN || /\/login\/login\-/.test(location.pathname)) && (t = !1),
        t
    },
    i.get = function(e) {
        var n, o;
        if (e = e || {},
        e.type = e._method = "GET", e.headers = e.headers || {},
        e.headers["X-Requested-With"] = "XMLHttpRequest", o = e.success, e.success = function(t, n, r) { ! e.noDealCommonCode && i.dealCommonCode(t.code) || !o || o(t, n, r)
        },
        e.url = i.getDataTypeUrl(e.url, "json"), e.dataType = "json", e.queueName) {
            if (a[e.queueName]) return;
            a[e.queueName] = !0
        }
        return n = t.ajax(e),
        e.loading === !1 || i.showLoading(),
        n.always(function() {
            e.queueName && (a[e.queueName] = !1),
            e.loading === !1 || i.hideLoading()
        }),
        n
    },
    i.post = function(e) {
        var n, a, l;
        if (e = e || {},
        e.type = e._method = e._method || "POST", e.dataType = "json", e.url = i.getDataTypeUrl(e.url, e.dataType), l = e.data, e.charset = e.charset || "UTF-8", e.headers = e.headers || {},
        e.headers["X-Requested-With"] = "XMLHttpRequest", e.notJsonParamData || (e.contentType = "application/json; charset=" + e.charset, e.data = "string" == typeof l ? l: null == l ? l: JSON.stringify(l)), a = e.success, e.success = function(t, n, o) { ! e.noDealCommonCode && i.dealCommonCode(t.code) || !a || a(t, n, o)
        },
        e.queueName) {
            if (r[e.queueName]) return;
            r[e.queueName] = !0
        }
        return G.IS_PROTOTYPE && (e.type = "POST", e.url = o.appendQueryString(e.url, {
            _method: (e._method || "POST").toLowerCase()
        })),
        n = t.ajax(e),
        e.loading === !1 || i.showLoading(),
        n.always(function() {
            e.queueName && (r[e.queueName] = !1),
            e.loading === !1 || i.hideLoading()
        }),
        n
    },
    i.put = function(e) {
        e = e || {},
        e._method = "PUT",
        i.post(e)
    },
    i.del = function(e) {
        e = e || {},
        e._method = "DELETE",
        i.post(e)
    },
    i.getUploadOpt = function(e, t, n) {
        e = i.getDataTypeUrl(e, t),
        n(G.ORIGIN == G.CGI_ORIGIN ? {
            url: e
        }: {
            url: e,
            data: {
                domain: G.DOMAIN || ""
            },
            xhrGetter: function(e) {
                var t = new XMLHttpRequest;
                e(t)
            }
        })
    },
    i
}),
define("./alerts", ["require", "exports", "module", "jquery"],
function(e) {
    var t, n = e("jquery"),
    o = [],
    r = {};
    return r.alert = function(e, o, a) {
        clearTimeout(t),
        e = e || G.SVR_ERR_MSG,
        o = {
            info: "info",
            succ: "succ",
            error: "error"
        } [o] || "error",
        r.alert.hide(),
        n(['<div class="float-alert ' + o + '" style="display: none;">', e, "</div>"].join("")).appendTo(document.body).fadeIn(),
        t = setTimeout(function() {
            r.alert.hide()
        },
        a || 5e3)
    },
    r.alert.hide = function() {
        n(".float-alert").remove()
    },
    r.modal = function(e, t) {
        var a = [],
        i = n(".modal-container");
        i.length || (i = n('<div class="modal-container"><div class="modal-mask"></div><div class="modal-dialog"></div></div>').appendTo(document.body), n(".modal-mask", i).on("click",
        function() {
            n(".modal-btns", i).length && r.modal.hide()
        })),
        t = t || {},
        a.push('<div class="modal-content">' + e + "</div>"),
        t.btns && (a.push('<div class="modal-btns">'), n.each(t.btns,
        function(e, t) {
            o[e] = t.click,
            a.push('<a data-modal-btn="' + e + '" href="javascript:void(0);">' + t.text + "</a>")
        }), a.push("</div>")),
        n(".modal-dialog", i).html(a.join("")),
        i.fadeIn(200)
    },
    r.modal.hide = function() {
        n(".modal-container").hide()
    },
    n(document.body).on("click", ".alert .icon-close",
    function(e) {
        target = e.target,
        n(target).closest(".alert").remove()
    }).on("click", ".modal-container [data-modal-btn]",
    function(e) {
        var t = n(e.target).data("modal-btn"),
        a = o[t];
        r.modal.hide(),
        a && a()
    }),
    r
}),
define("./scroll", ["require", "exports", "module", "jquery"],
function(e) {
    function t(t, o, r) {
        e(["iscroll"],
        function(e) {
            r = r || {},
            t = n(t);
            var a = "undefined" != typeof r.topOffset ? r.topOffset: 40,
            i = n(".scroll-pull-down", t),
            l = n(".scroll-pull-up", t),
            c = NaN,
            u = new e(t[0], {
                click: !0,
                hScrollbar: !1,
                vScrollbar: !1,
                topOffset: a,
                onRefresh: function() {
                    i.removeClass("release loading"),
                    l.removeClass("release loading"),
                    this.minScrollY = -a
                },
                onNewPositionStart: r.onNewPositionStart,
                onScrollMove: function() {
                    var e = this.y - c;
                    c = this.y,
                    r.onScrollMove && r.onScrollMove(c),
                    e > 0 ? r.onScrollUp && r.onScrollUp(c) : 0 > e && r.onScrollDown && r.onScrollDown(c),
                    i[0] && (this.y > 5 && !i.hasClass("loading") ? (i.addClass("release"), this.minScrollY = 0) : (i.removeClass("release"), i.hasClass("loading") || (this.minScrollY = -a))),
                    l[0] && (this.y + 5 < this.maxScrollY && !l.hasClass("loading") && !l.hasClass("nomore") ? l.addClass("release") : l.removeClass("release"))
                },
                onScrollEnd: function() {
                    r.onScrollEnd && r.onScrollEnd(this.y),
                    i.hasClass("release") && (i.addClass("loading"), r.pullDownLoad && r.pullDownLoad()),
                    l.hasClass("release") && (l.addClass("loading"), r.pullUpLoad && r.pullUpLoad())
                }
            });
            o(u)
        })
    }
    var n = e("jquery");
    return t
}),
define("./toggle", ["require", "exports", "module", "jquery"],
function(e) {
    function t(e, t) {
        var n;
        e = r(e),
        e.hasClass(t) || ("visible" == t && (e.css({
            display: "block"
        }), e.prop("offsetHeight"), e.off("webkitTransitionEnd")), e.addClass(t), n = e.data("type"), n && a.trigger(n + ".on", e))
    }
    function n(e, t) {
        var n;
        e = r(e),
        e.hasClass(t) && ("visible" == t && e.css({
            display: "none"
        }), e.removeClass(t), n = e.data("type"), n && a.trigger(n + ".off", e))
    }
    function o(m) {
        var e = [m];
        r.each(e,
        function(e, t) {
            r('[data-type="' + t + '"]').each(function(e, t) {
                t = r(t);
                var o = "visible";
                o = t.data("toggle-class") || o,
                t.hasClass(o) && n(t, o)
            })
        })
    }
    var r = e("jquery"),
    a = r({});
    return r(document).on("click",
    function(e) {
        var a = r(e.target),
        i = a.data("toggle"),
        x = a.data("closenavbar"),
        m = r(i).data("type"),
        l = "visible";
        if(x)
        {
            r("div[data-type].visible").hide();
        }
        if(i && r(i).attr("class").indexOf("visible") == -1)
        {
            i || (a = a.closest("[data-toggle]"), i = a.data("toggle")),
            i ? (l = a.data("toggle-class") || l, a = r(i), a.length ? a.hasClass(l) ? (o(m), n(a, l)) : (o(m), t(a, l)) : o(m)) : o(m)
        }
        if(i && r(e.target).data("toggle").indexOf("nav-bar") > -1)
        {   
            r(".bee-cell-navbar").each(function(i, n){
                if(r(n).attr("class").indexOf("timerange") == -1)
                    r(n).removeClass("outline");
            })
            r(i + " .bee-cell-navbar:first").addClass("outline")
            r("div[data-type].visible").show();
        }
        if(r(e.target).data("toggle-class"))
        {   
            r(".bee-cell-navbar").each(function(i, n){
                if(r(n).attr("class").indexOf("timerange") == -1)
                    r(n).removeClass("outline");
            })
            a.parents(".bee-cell-navbar").addClass("outline")
        }
    }),
    a.hideAll = o,
    a
}),
define("./stat", ["require", "exports", "module", "jquery", "./ajax"],
function(e) {
    function t(e) {
        for (var t = 0,
        n = window.app_stat_sender_pool = window.app_stat_sender_pool || []; n[t];) t++;
        var o = n[t] = new Image;
        o.onload = o.onerror = function() {
            o.onload = o.onerror = null,
            n[t] = null
        };
        o.src = e
    }
    var n = e("jquery"),
    o = e("./ajax"),
    r = {};
    return r.pv = function(e, n, r) {
        e = encodeURIComponent(e || location.href),
        e = o.getDataTypeUrl("tracking/open/trace/" + n + "?action=onload&event=" + e + (r ? "&mid=" + r: ""), "json"),
        t(e)
    },
    r.click = function(e, n, r) {
        url = o.getDataTypeUrl("tracking/open/trace/" + n + "?action=click&event=" + e + (r ? "&mid=" + r: ""), "json"),
        t(url)
    },
    n(document).on("click", "[data-click-tag]",
    function(e) {
        tag = n(this).data("click-tag"),
        tag && (tag = tag.split("."), r.click(tag[0], tag[1], tag[2]))
    }),
    r
}),
define("./dialog", ["require", "exports", "module", "jquery"],
function(e) {
    var t = e("jquery"),
    n = {};
    return n.show = function(e, o) {
        el = t("#app-dialog"),
        el.length || (el = t('<div id="app-dialog" class="dialog"><div class="dialog-close-btn img-btn"></div><div class="dialog-title"></div><div class="dialog-content"></div></div>').appendTo(document.body), t(".dialog-close-btn", el).on("click",
        function() {
            n.hide()
        })),
        n.hide(),
        t(".dialog-title", el).html(o || ""),
        t(".dialog-content", el).html(e),
        el.fadeIn()
    },
    n.hide = function() {
        t("#app-dialog").hide()
    },
    n
}),
define("./wx", ["require", "exports", "module"],
function(e) {
    var t = "undefined" != typeof WeixinJSBridge,
    n = {};
    return n.ready = function(e) {
        t ? e() : "undefined" == typeof WeixinJSBridge ? document.addEventListener ? document.addEventListener("WeixinJSBridgeReady",
        function() {
            t = !0,
            e()
        },
        !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady",
        function() {
            t = !0,
            e()
        }), document.attachEvent("onWeixinJSBridgeReady",
        function() {
            t = !0,
            e()
        })) : (t = !0, e())
    },
    n.version = function() {
        var e = navigator.userAgent.match(/MicroMessenger\/([\d.]+)/i);
        return e ? parseInt(e[1]) : -1
    },
    n
});