define(["require", "exports", "module", "./core", "./base-mod"],
function(t, e, n) { (function() {
        var e, o;
        o = t("./core"),
        e = t("./base-mod"),
        n.exports = {
            version: "0.2.4",
            core: o,
            BaseMod: e
        }
    }).call(this)
}),
define("./core", ["require", "exports", "module", "jquery", "./ajax-history"],
function(t, e, n) { (function() {
        var e, o, r, i, a, d, s, u, c, f, l, m, h, p, v, y, _, b, g, w;
        e = t("jquery"),
        g = t("./ajax-history"),
        c = {},
        a = null,
        d = "",
        m = null,
        h = "",
        v = 0,
        _ = null,
        l = {},
        r = e(document.body),
        b = 0,
        u = 0,
        i = function() {
            var t, e, n;
            t = document.createElement("div"),
            n = {
                webkitTransition: ["webkitTransitionEnd", "-webkit-transition", "-webkit-transform"],
                transition: ["transitionend", "transition", "transform"]
            };
            for (e in n) if (void 0 !== t.style[e]) return n[e];
            return null
        } (),
        p = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
        function(t) {
            return setTimeout(t, 16)
        },
        y = function(t) {
            var n;
            return l.switchNavTab ? l.switchNavTab(t) : (n = t.navTab, "function" == typeof n && (n = n()), e("nav [data-tab]", r).removeClass("active"), e('nav [data-tab="' + n + '"]', r).addClass("active"))
        },
        f = function(t, e) {
            var n, o;
            return l.onAfterViewChange ? l.onAfterViewChange(t, e) : (o = "body-sb-mod--" + e._modName.replace(/\//g, "-"), n = document.body.className.replace(/\bbody-sb-mod--\S+/, o), /\bsb-show-nav\b/.test(n) ? e.showNavTab || (n = n.replace(/\s*\bsb-show-nav\b/, "")) : e.showNavTab && (n += " sb-show-nav"), document.body.className = n)
        },
        o = function(n, o, i) {
            var a, d;
            return l.constructContentDom ? a = l.constructContentDom(n, o, i) : (d = t(l.modBase + "mod/" + n + "/title.tpl.html"), a = e(['<div class="sb-mod sb-mod--' + n.replace(/\//g, "-") + '" data-sb-mod="' + n + '" data-sb-scene="0">', '<header class="sb-mod__header">', d ? d.render({
                args: o,
                opt: i
            }) : '<h1 class="title"></h1>', "</header>", '<div class="sb-mod__body" onscroll="require(\'app\').mod.scroll(this.scrollTop);">', '<div class="sb-mod__body__msg" data-sb-mod-not-renderred>', "内容正在赶来，请稍候...", "</div>", "</div>", '<div class="sb-mod__fixed-footer" style="display: none;">', "</div>", "</div>"].join("")).prependTo(r)),
            a
        },
        s = function() {
            var t;
            return /\bbody-sb-mod--\S+/.test(document.body.className) || e(document.body).addClass("body-sb-mod--init-mod"),
            l.container && (r = e(l.container)),
            g.setListener(function(t) {
                return w.view(t, {
                    from: "history"
                })
            }),
            g.init({
                isSupportHistoryState: l.isSupportHistoryState
            }),
            t = new Date,
            e(document.body).on("click",
            function(n) {
                var o, r, i;
                if (o = n.target, t = new Date, "A" !== o.tagName && (o = e(o).closest("a")[0]), o && "A" === o.tagName) {
                    if (r = null != (i = o.pathname) ? i.replace(/^\/+/, "") : void 0, o.target) return;
                    if (":back" === r) return n.preventDefault(),
                    history.back();
                    if (0 === (null != r ? r.indexOf(l.modPrefix + "/") : void 0)) return n.preventDefault(),
                    w.view(r, {
                        from: "link"
                    })
                }
            }).on("click", "[data-refresh-btn]",
            function() {
                var t;
                return t = c[d],
                null != t ? t.refresh() : void 0
            }),
            s = function() {}
        },
        w = e.extend(e({}), {
            init: function(t) {
                return t && (l = t),
                null == l.defaultModName && (l.defaultModName = "home"),
                null == l.modBase && (l.modBase = ""),
                null == l.modPrefix && (l.modPrefix = "view"),
                l.modPrefix = l.modPrefix.replace(/^\/+|\/+$/g, ""),
                s()
            },
            modCacheable: function() {
                return l.modCacheable
            },
            getPreviousModName: function() {
                return h
            },
            getCurrentModName: function() {
                return d
            },
            getCached: function(t) {
                return c[t]
            },
            removeCache: function(t) {
                return c[t] = null
            },
            fadeIn: function(t, n, o, r, a) {
                var d, s, u, c, f, m, h, v, y;
                return "function" == typeof l.onBeforeFadeIn && l.onBeforeFadeIn(t),
                l.fadeIn ? l.fadeIn(t, n, o, r, a) : (h = "", r = r || (null != (c = l.animate) ? c.type: void 0), y = (null != (f = l.animate) ? f.timingFunction: void 0) || "linear", u = (null != (m = l.animate) ? m.duration: void 0) || 300, d = function() {
                    return "slide" === r && (e(".sb-mod").css({
                        zIndex: "0"
                    }), n.css({
                        zIndex: "2"
                    })),
                    "function" == typeof a ? a() : void 0
                },
                "fade" === r || "fadeIn" === r ? i ? (s = {
                    opacity: "0"
                },
                s[i[1]] = "none", s[i[2]] = "translateZ(0)", n.css(s).show(), n[0].offsetTop, p(function() {
                    return s = {},
                    s[i[1]] = "opacity " + u / 1e3 + "s " + y,
                    s.opacity = "1",
                    n.one(i[0], d),
                    n.css(s)
                })) : (n.css({
                    opacity: "0"
                }), n.show(), p(function() {
                    return n.animate({
                        opacity: "1"
                    },
                    u, y, d)
                })) : "slide" === r ? (v = e("[data-slide-direction]", n).data("slide-direction"), i ? (s = {
                    zIndex: "2"
                },
                s[i[1]] = "none", "vu" === v || "vd" === v ? s[i[2]] = "translate3d(0, " + ("vd" === v ? "-": "") + "100%, 0)": s[i[2]] = "translate3d(" + (o ? "-": "") + "100%, 0, 0)", n.css(s).show(), n[0].offsetTop, p(function() {
                    return s = {},
                    s[i[1]] = i[2] + " " + u / 1e3 + "s " + y,
                    s[i[2]] = "translate3d(0, 0, 0)",
                    n.one(i[0], d),
                    n.css(s)
                })) : ("vu" === v || "vd" === v ? n.css({
                    zIndex: "2",
                    left: "0",
                    top: ("vd" === v ? "-": "") + "100%"
                }) : n.css({
                    zIndex: "2",
                    left: (o ? "-": "") + "100%",
                    top: "0"
                }), n.show(), p(function() {
                    return n.animate({
                        left: "0",
                        top: "0"
                    },
                    u, y, d)
                }))) : (n.show(), d()), h)
            },
            fadeOut: function(t, n, o, r, a) {
                var s, u, c, f, m, h, v, y, _, b, g, w;
                return "function" == typeof l.onBeforeFadeOut && l.onBeforeFadeOut(t),
                l.fadeOut ? l.fadeOut(t, n, o, r, a) : (_ = "", r = r || (null != (f = l.animate) ? f.type: void 0), g = (null != (m = l.animate) ? m.timingFunction: void 0) || "linear", u = (null != (h = l.animate) ? h.duration: void 0) || 300, s = function() {
                    return n.data("sb-mod") !== d && n.hide(),
                    "function" == typeof a ? a() : void 0
                },
                "fade" === r ? p(i ?
                function() {
                    var t;
                    return t = {},
                    t[i[1]] = "opacity " + u / 1e3 + "s " + g,
                    t[i[2]] = "translateZ(0)",
                    t.opacity = "0",
                    n.one(i[0], s),
                    n.css(t)
                }: function() {
                    return n.animate({
                        opacity: "0"
                    },
                    u, g, s)
                }) : "slide" === r ? (b = e("[data-slide-direction]", n).data("slide-direction"), w = "1", c = "100", (null != (v = l.animate) ? v.slideOutPercent: void 0) >= -100 && (c = parseInt(null != (y = l.animate) ? y.slideOutPercent: void 0)), ("vu" === b || "vd" === b) && (_ = "fade", w = "3"), i ? p(function() {
                    var t;
                    return t = {
                        zIndex: w
                    },
                    t[i[1]] = i[2] + " " + u / 1e3 + "s " + g,
                    "vu" === b || "vd" === b ? t[i[2]] = "translate3d(0, " + ("vd" === b ? -100 : 100) + "%, 0)": t[i[2]] = "translate3d(" + (o ? c: -c) + "%, 0, 0)",
                    n.one(i[0], s),
                    n.css(t)
                }) : (n.css({
                    zIndex: w,
                    left: "0",
                    top: "0"
                }), p(function() {
                    return "vu" === b || "vd" === b ? n.animate({
                        top: ("vd" === b ? -100 : 100) + "%"
                    },
                    u, g, s) : n.animate({
                        left: (o ? c: -c) + "%"
                    },
                    u, g, s)
                }))) : s(), _)
            },
            view: function(n, i) {
                var s, u, p, v, C, x, N, D, M, O;
                return n = n.replace(/^\/+/, ""),
                i = i || {},
                p = i.args || [],
                i.reload ? void(g.isSupportHistoryState() ? location.origin + "/" + n === location.href ? location.reload() : location.href = "/" + n: (g.setMark(n), location.reload())) : (n.indexOf("/-/") > 0 ? (M = n.split("/-/"), s = M[1] && M[1].split("/") || []) : (M = n.split("/args..."), s = M[1] && M[1].split(".") || []), e.each(p,
                function(t, e) {
                    return e ? s[t] = e: void 0
                }), D = d, N = c[D], 0 === n.indexOf(l.modPrefix + "/") && (x = M[0].replace(l.modPrefix, "").replace(/^\/+|\/+$/g, "")), x = x || l.defaultModName, C = c[x], _ = {
                    from: i.from || "api",
                    scrollTop: e(window).scrollTop(),
                    loadFromModCache: !0,
                    fromModName: D,
                    toModName: x,
                    fromMark: a,
                    toMark: n,
                    args: s,
                    opt: i.modOpt
                },
                ("function" == typeof l.onBeforeViewChange ? l.onBeforeViewChange(x, C) : void 0) !== !1 ? n === a && "alert" !== x ? void(C && (C.refresh(), f(x, C), w.trigger("afterViewChange", C))) : (m = a, h = d, a = n, d = x, b++, O = b, C && C.isRenderred() && "alert" !== x && x === D ? (C.update(s, i.modOpt), f(x, C), w.trigger("afterViewChange", C)) : C && C.isRenderred() && "alert" !== x && !i.modOpt && (!C.viewed || "history" === _.from || l.alwaysUseCache || C.alwaysUseCache) && C.getArgs().join("/") === s.join("/") ? C.fadeIn(N, null != N ? N.fadeOut(x) : void 0,
                function() {
                    return y(C),
                    f(x, C),
                    w.trigger("afterViewChange", C)
                }) : (_.loadFromModCache = !1, w.removeCache(x), null != C && C.destroy(), e('[data-sb-mod="' + x + '"]', r).remove(), v = function(e, n, o) {
                    return t([l.modBase + "mod/" + e + "/main"],
                    function(t) {
                        var r;
                        if (O !== b || c[e]) return n.remove();
                        try {
                            return C = c[e] = new t(e, n, o, i.modOpt)
                        } catch(a) {
                            throw r = a,
                            "undefined" != typeof console && null !== console && "function" == typeof console.error && console.error(r.stack),
                            r
                        } finally {
                            C ? (C._afterFadeIn(N), y(C), f(e, C), w.trigger("afterViewChange", C)) : n.remove()
                        }
                    },
                    function() {
                        return "alert" === e ? alert('Failed to load module "' + (i.failLoadModName || e) + '"') : (n.remove(), O === b ? w.showAlert({
                            type: "error",
                            subType: "load_mod_fail",
                            failLoadModName: e
                        },
                        {
                            failLoadModName: e,
                            holdMark: !0
                        }) : void 0)
                    })
                },
                l.initContentDom && x === l.defaultModName ? (u = e(l.initContentDom), u.attr("data-mod-name", x), l.initContentDom = null, v(x, u, s)) : (l.initContentDom && (e(l.initContentDom).remove(), l.initContentDom = null), u = o(x, s, i.modOpt), w.fadeIn(null, u, null != N ? N.hasParent(x) : void 0, null != N ? N.fadeOut(x) : void 0,
                function() {
                    return v(x, u, s)
                }))), i.holdMark ? void 0 : g.setMark(n, {
                    replaceState: i.replaceState
                })) : void 0)
            },
            load: function(n, i, a) {
                var s, f, m, h, p, v, y, _, g;
                return n = n.replace(/^\/+/, ""),
                i = i || {},
                m = i.args || [],
                n.indexOf("/-/") > 0 ? (_ = n.split("/-/"), s = _[1] && _[1].split("/") || []) : (_ = n.split("/args..."), s = _[1] && _[1].split(".") || []),
                e.each(m,
                function(t, e) {
                    return e ? s[t] = e: void 0
                }),
                0 === n.indexOf(l.modPrefix + "/") && (y = _[0].replace(l.modPrefix, "").replace(/^\/+|\/+$/g, "")),
                y = y || l.defaultModName,
                v = c[y],
                a && u++,
                g = b,
                h = u,
                y === d || v && v.isRenderred() && "alert" !== y && !i.modOpt && (l.alwaysUseCache || v.alwaysUseCache) && v.getArgs().join("/") === s.join("/") ? "function" == typeof a ? a() : void 0 : (w.removeCache(y), null != v && v.destroy(), e('[data-sb-mod="' + y + '"]', r).remove(), p = function(e, n, o) {
                    return t([l.modBase + "mod/" + e + "/main"],
                    function(t) {
                        var r;
                        if (g !== b || h !== u || c[e]) return n.remove();
                        try {
                            return v = c[e] = new t(e, n, o, i.modOpt,
                            function() {
                                return g === b && h === u && "function" == typeof a ? a() : void 0
                            })
                        } catch(d) {
                            throw r = d,
                            n.remove(),
                            "undefined" != typeof console && null !== console && "function" == typeof console.error && console.error(r.stack),
                            r
                        }
                    },
                    function() {
                        if (a) {
                            if ("alert" === e) return alert('Failed to load module "' + (i.failLoadModName || e) + '"');
                            if (n.remove(), g === b && h === u) return w.showAlert({
                                type: "error",
                                subType: "load_mod_fail",
                                failLoadModName: e
                            },
                            {
                                failLoadModName: e
                            })
                        }
                    })
                },
                f = o(y, s, i.modOpt), p(y, f, s))
            },
            getViewChangeInfo: function() {
                return _
            },
            scroll: function(t) {
                var n;
                return l.scroll ? l.scroll(t) : (n = t - v, v = t, n > 0 && t > 44 ? e('[data-sb-mod="' + w.getCurrentModName() + '"]').addClass("sb-hide-header") : e('[data-sb-mod="' + w.getCurrentModName() + '"]').removeClass("sb-hide-header"))
            },
            showAlert: function(t, e) {
                return t = t || {
                    type: "error"
                },
                e = e || {},
                e.modOpt = t,
                w.view("view/alert/-/" + (new Date).getTime(), e)
            }
        }),
        n.exports = w
    }).call(this)
}),
define("./ajax-history", ["require", "exports", "module", "jquery"],
function(t, e, n) { (function() {
        var e, o, r, i, a, d, s, u, c, f, l, m, h, p, v, y, _, b, g, w, C, x, N;
        e = t("jquery"),
        l = {},
        o = [],
        r = !0,
        i = 100,
        m = void 0,
        d = void 0,
        c = null,
        f = null,
        s = !!history.pushState,
        p = function(t) {
            return t !== d ? (m = d, d = t) : void 0
        },
        a = function() {
            var t;
            return t = _(),
            t !== d && u(t) && (p(t), c) ? c.call(f, t) : void 0
        },
        h = function(t, e) {
            return r ? (delete o[l[t]], o.push(e), l[t] = o.length - 1, delete o[l[t] - i]) : void 0
        },
        u = function(t) {
            return "string" == typeof t && !/^[#!]/.test(t)
        },
        g = function(t) {
            return t = t || {},
            s = "undefined" != typeof t.isSupportHistoryState ? t.isSupportHistoryState: s,
            r = "undefined" != typeof t.cacheEnabled ? t.cacheEnabled: r,
            i = t.cacheSize || i,
            s ? e(window).on("popstate", a) : e(window).on("hashchange", a),
            a(),
            g = function() {}
        },
        x = function(t, e) {
            return c = "function" == typeof t ? t: null,
            f = e || null
        },
        C = function(t, e) {
            return u(t) ? h(t, e) : void 0
        },
        y = function(t) {
            return o[l[t]]
        },
        v = function() {
            return l = {},
            o = []
        },
        N = function(t, e) {
            return e = e || {},
            e.title && (document.title = e.title),
            t !== d && u(t) ? (p(t), s ? history[e.replaceState ? "replaceState": "pushState"](e.stateObj, e.title || document.title, "/" + t) : location.hash = "!" + t) : void 0
        },
        _ = function() {
            return s ? location.pathname.replace(/^\//, "") : location.hash.replace(/^#!?\/?/, "")
        },
        b = function() {
            return m
        },
        w = function() {
            return s
        },
        n.exports = {
            init: g,
            setListener: x,
            setCache: C,
            getCache: y,
            clearCache: v,
            setMark: N,
            getMark: _,
            getPrevMark: b,
            isSupportHistoryState: w
        }
    }).call(this)
}),
define("./base-mod", ["require", "exports", "module", "jquery", "./core"],
function(t, e, n) { (function() {
        var e, o, r;
        e = t("jquery"),
        r = t("./core"),
        o = function() {
            function n(t, e, n, o, r) {
                return this._modName = t,
                e ? (this._contentDom = e, this._bindEvents(), this._args = n || [], this._opt = o || {},
                this._onFirstRender = r, this.init(), void this.render()) : this
            }
            var o;
            return o = !1,
            n.prototype.showNavTab = !1,
            n.prototype.navTab = "",
            n.prototype.events = {},
            n.prototype.parentModNames = {
                home: 1
            },
            n.prototype._bindEvents = function() {
                return e.each(this.events,
                function(t) {
                    return function(e, n) {
                        return e = e.split(" "),
                        t._contentDom.on(e.shift(), e.join(" "), t[n])
                    }
                } (this))
            },
            n.prototype._unbindEvents = function() {
                return e.each(this.events,
                function(t) {
                    return function(e, n) {
                        return e = e.split(" "),
                        t._contentDom.off(e.shift(), e.join(" "), t[n])
                    }
                } (this))
            },
            n.prototype._ifNotCachable = function(e, n, o) {
                var i, a;
                return i = "undefined" != typeof this.cachable ? this.cachable: r.modCacheable(),
                "undefined" != typeof i ? i ? "function" == typeof o ? o() : void 0 : "function" == typeof n ? n() : void 0 : (a = r.getCached(e), a ? a.hasParent(this._modName) ? "function" == typeof o ? o() : void 0 : "function" == typeof n ? n() : void 0 : t(["mod/" + e + "/main"],
                function(t) {
                    return function(r) {
                        return a = new r(e),
                        a.hasParent(t._modName) ? "function" == typeof o ? o() : void 0 : "function" == typeof n ? n() : void 0
                    }
                } (this),
                function(t) {
                    return function() {
                        return 0 !== e.indexOf(t._modName + "/") ? "function" == typeof n ? n() : void 0 : "function" == typeof o ? o() : void 0
                    }
                } (this)))
            },
            n.prototype._afterFadeIn = function(t) {
                return this.viewed = !0
            },
            n.prototype._afterFadeOut = function(t) {
                return this._ifNotCachable(t,
                function(t) {
                    return function() {
                        return t.destroy()
                    }
                } (this))
            },
            n.prototype._renderHeader = function(t) {
                return this._contentDom ? "string" == typeof t ? e("> .sb-mod__header", this._contentDom).html(t) : e("> .sb-mod__header", this._contentDom).html(this._headerTpl.render(t)) : void 0
            },
            n.prototype._renderBody = function(t) {
                return this._contentDom ? "string" == typeof t ? e("> .sb-mod__body", this._contentDom).html(t) : e("> .sb-mod__body", this._contentDom).html(this._bodyTpl.render(t)) : void 0
            },
            n.prototype._renderFixedFooter = function(t) {
                return this._contentDom ? "string" == typeof t ? e("> .sb-mod__fixed-footer", this._contentDom).html(t).show() : e("> .sb-mod__fixed-footer", this._contentDom).html(this._fixedFooterTpl.render(t)).show() : void 0
            },
            n.prototype._renderError = function(t) {
                return this._contentDom ? (e("> .sb-mod__body", this._contentDom).html(['<div class="sb-mod__body__msg" data-refresh-btn>', '<div class="msg">', t || G.SVR_ERR_MSG, "</div>", '<div class="refresh"><span class="icon icon-refresh"></span>点击刷新</div>', "</div>"].join("")), e("> .sb-mod__fixed-footer", this._contentDom).hide()) : void 0
            },
            n.prototype._onRender = function() {
                return "function" == typeof this._onFirstRender && this._onFirstRender(),
                this._onFirstRender = null
            },
            n.prototype.render = function() {
                return this._headerTpl && this._renderHeader({
                    args: this._args,
                    opt: this._opt
                }),
                this._bodyTpl && this._renderBody({
                    args: this._args,
                    opt: this._opt
                }),
                this._fixedFooterTpl && this._renderFixedFooter({
                    args: this._args,
                    opt: this._opt
                }),
                this._onRender()
            },
            n.prototype.init = function() {},
            n.prototype.$ = function(t) {
                return e(t, this._contentDom)
            },
            n.prototype.getModName = function() {
                return this._modName
            },
            n.prototype.getArgs = function() {
                return this._args
            },
            n.prototype.update = function(t, e) {
                return this._args = t || this._args,
                this._opt = e || this._opt,
                this.refresh()
            },
            n.prototype.refresh = function() {
                return this.scrollToTop(),
                r.scroll(0),
                this.render()
            },
            n.prototype.scrollToTop = function() {
                return e("> .sb-mod__body", this._contentDom).scrollTop(0)
            },
            n.prototype.isRenderred = function() {
                return 0 === e("[data-sb-mod-not-renderred]", this._contentDom).length
            },
            n.prototype.hasParent = function(t) {
                var e, n, o, r;
                if (o = 0 === this._modName.indexOf(t + "/"), !o) {
                    n = this.parentModNames;
                    for (e in n) if (r = n[e], o = t === e || 0 === e.indexOf(t + "/")) break
                }
                return o
            },
            n.prototype.fadeIn = function(t, e, n) {
                return r.fadeIn(this, this._contentDom, null != t ? t.hasParent(this._modName) : void 0, e,
                function(e) {
                    return function() {
                        return e._afterFadeIn(t),
                        "function" == typeof n ? n() : void 0
                    }
                } (this))
            },
            n.prototype.fadeOut = function(t, e, n) {
                return this._contentDom.attr("data-sb-scene", (parseInt(this._contentDom.attr("data-sb-scene")) || 0) + 1),
                this._ifNotCachable(t,
                function(t) {
                    return function() {
                        return r.removeCache(t._modName)
                    }
                } (this)),
                r.fadeOut(this, this._contentDom, this.hasParent(t), e,
                function(e) {
                    return function() {
                        return e._afterFadeOut(t),
                        "function" == typeof n ? n() : void 0
                    }
                } (this))
            },
            n.prototype.captureScene = function(t) {
                var e;
                return this._contentDom ? (e = parseInt(this._contentDom.attr("data-sb-scene")) || 0, t(function(t) {
                    return function(n) {
                        var o;
                        return t._contentDom && (o = parseInt(t._contentDom.attr("data-sb-scene")) || 0, o === e) ? n() : void 0
                    }
                } (this))) : void 0
            },
            n.prototype.destroy = function() {
                return r.removeCache(this._modName),
                this._unbindEvents(),
                this._contentDom.remove(),
                this._contentDom = null
            },
            n
        } (),
        n.exports = o
    }).call(this)
});