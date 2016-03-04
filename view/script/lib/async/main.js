!
function() {
    function n(n) {
        var e = !1;
        return function() {
            if (e) throw new Error("Callback was already called.");
            e = !0,
            n.apply(t, arguments)
        }
    }
    var t, e, r = {};
    t = this,
    null != t && (e = t.async),
    r.noConflict = function() {
        return t.async = e,
        r
    };
    var u = Object.prototype.toString,
    i = Array.isArray ||
    function(n) {
        return "[object Array]" === u.call(n)
    },
    c = function(n, t) {
        if (n.forEach) return n.forEach(t);
        for (var e = 0; e < n.length; e += 1) t(n[e], e, n)
    },
    a = function(n, t) {
        if (n.map) return n.map(t);
        var e = [];
        return c(n,
        function(n, r, u) {
            e.push(t(n, r, u))
        }),
        e
    },
    o = function(n, t, e) {
        return n.reduce ? n.reduce(t, e) : (c(n,
        function(n, r, u) {
            e = t(e, n, r, u)
        }), e)
    },
    l = function(n) {
        if (Object.keys) return Object.keys(n);
        var t = [];
        for (var e in n) n.hasOwnProperty(e) && t.push(e);
        return t
    };
    "undefined" != typeof process && process.nextTick ? (r.nextTick = process.nextTick, "undefined" != typeof setImmediate ? r.setImmediate = function(n) {
        setImmediate(n)
    }: r.setImmediate = r.nextTick) : "function" == typeof setImmediate ? (r.nextTick = function(n) {
        setImmediate(n)
    },
    r.setImmediate = r.nextTick) : (r.nextTick = function(n) {
        setTimeout(n, 0)
    },
    r.setImmediate = r.nextTick),
    r.each = function(t, e, r) {
        function u(n) {
            n ? (r(n), r = function() {}) : (i += 1, i >= t.length && r())
        }
        if (r = r ||
        function() {},
        !t.length) return r();
        var i = 0;
        c(t,
        function(t) {
            e(t, n(u))
        })
    },
    r.forEach = r.each,
    r.eachSeries = function(n, t, e) {
        if (e = e ||
        function() {},
        !n.length) return e();
        var r = 0,
        u = function() {
            t(n[r],
            function(t) {
                t ? (e(t), e = function() {}) : (r += 1, r >= n.length ? e() : u())
            })
        };
        u()
    },
    r.forEachSeries = r.eachSeries,
    r.eachLimit = function(n, t, e, r) {
        var u = f(t);
        u.apply(null, [n, e, r])
    },
    r.forEachLimit = r.eachLimit;
    var f = function(n) {
        return function(t, e, r) {
            if (r = r ||
            function() {},
            !t.length || 0 >= n) return r();
            var u = 0,
            i = 0,
            c = 0; !
            function a() {
                if (u >= t.length) return r();
                for (; n > c && i < t.length;) i += 1,
                c += 1,
                e(t[i - 1],
                function(n) {
                    n ? (r(n), r = function() {}) : (u += 1, c -= 1, u >= t.length ? r() : a())
                })
            } ()
        }
    },
    s = function(n) {
        return function() {
            var t = Array.prototype.slice.call(arguments);
            return n.apply(null, [r.each].concat(t))
        }
    },
    p = function(n, t) {
        return function() {
            var e = Array.prototype.slice.call(arguments);
            return t.apply(null, [f(n)].concat(e))
        }
    },
    d = function(n) {
        return function() {
            var t = Array.prototype.slice.call(arguments);
            return n.apply(null, [r.eachSeries].concat(t))
        }
    },
    y = function(n, t, e, r) {
        if (t = a(t,
        function(n, t) {
            return {
                index: t,
                value: n
            }
        }), r) {
            var u = [];
            n(t,
            function(n, t) {
                e(n.value,
                function(e, r) {
                    u[n.index] = r,
                    t(e)
                })
            },
            function(n) {
                r(n, u)
            })
        } else n(t,
        function(n, t) {
            e(n.value,
            function(n) {
                t(n)
            })
        })
    };
    r.map = s(y),
    r.mapSeries = d(y),
    r.mapLimit = function(n, t, e, r) {
        return m(t)(n, e, r)
    };
    var m = function(n) {
        return p(n, y)
    };
    r.reduce = function(n, t, e, u) {
        r.eachSeries(n,
        function(n, r) {
            e(t, n,
            function(n, e) {
                t = e,
                r(n)
            })
        },
        function(n) {
            u(n, t)
        })
    },
    r.inject = r.reduce,
    r.foldl = r.reduce,
    r.reduceRight = function(n, t, e, u) {
        var i = a(n,
        function(n) {
            return n
        }).reverse();
        r.reduce(i, t, e, u)
    },
    r.foldr = r.reduceRight;
    var v = function(n, t, e, r) {
        var u = [];
        t = a(t,
        function(n, t) {
            return {
                index: t,
                value: n
            }
        }),
        n(t,
        function(n, t) {
            e(n.value,
            function(e) {
                e && u.push(n),
                t()
            })
        },
        function(n) {
            r(a(u.sort(function(n, t) {
                return n.index - t.index
            }),
            function(n) {
                return n.value
            }))
        })
    };
    r.filter = s(v),
    r.filterSeries = d(v),
    r.select = r.filter,
    r.selectSeries = r.filterSeries;
    var h = function(n, t, e, r) {
        var u = [];
        t = a(t,
        function(n, t) {
            return {
                index: t,
                value: n
            }
        }),
        n(t,
        function(n, t) {
            e(n.value,
            function(e) {
                e || u.push(n),
                t()
            })
        },
        function(n) {
            r(a(u.sort(function(n, t) {
                return n.index - t.index
            }),
            function(n) {
                return n.value
            }))
        })
    };
    r.reject = s(h),
    r.rejectSeries = d(h);
    var g = function(n, t, e, r) {
        n(t,
        function(n, t) {
            e(n,
            function(e) {
                e ? (r(n), r = function() {}) : t()
            })
        },
        function(n) {
            r()
        })
    };
    r.detect = s(g),
    r.detectSeries = d(g),
    r.some = function(n, t, e) {
        r.each(n,
        function(n, r) {
            t(n,
            function(n) {
                n && (e(!0), e = function() {}),
                r()
            })
        },
        function(n) {
            e(!1)
        })
    },
    r.any = r.some,
    r.every = function(n, t, e) {
        r.each(n,
        function(n, r) {
            t(n,
            function(n) {
                n || (e(!1), e = function() {}),
                r()
            })
        },
        function(n) {
            e(!0)
        })
    },
    r.all = r.every,
    r.sortBy = function(n, t, e) {
        r.map(n,
        function(n, e) {
            t(n,
            function(t, r) {
                t ? e(t) : e(null, {
                    value: n,
                    criteria: r
                })
            })
        },
        function(n, t) {
            if (n) return e(n);
            var r = function(n, t) {
                var e = n.criteria,
                r = t.criteria;
                return r > e ? -1 : e > r ? 1 : 0
            };
            e(null, a(t.sort(r),
            function(n) {
                return n.value
            }))
        })
    },
    r.auto = function(n, t) {
        t = t ||
        function() {};
        var e = l(n),
        u = e.length;
        if (!u) return t();
        var a = {},
        f = [],
        s = function(n) {
            f.unshift(n)
        },
        p = function(n) {
            for (var t = 0; t < f.length; t += 1) if (f[t] === n) return void f.splice(t, 1)
        },
        d = function() {
            u--,
            c(f.slice(0),
            function(n) {
                n()
            })
        };
        s(function() {
            if (!u) {
                var n = t;
                t = function() {},
                n(null, a)
            }
        }),
        c(e,
        function(e) {
            var u = i(n[e]) ? n[e] : [n[e]],
            f = function(n) {
                var u = Array.prototype.slice.call(arguments, 1);
                if (u.length <= 1 && (u = u[0]), n) {
                    var i = {};
                    c(l(a),
                    function(n) {
                        i[n] = a[n]
                    }),
                    i[e] = u,
                    t(n, i),
                    t = function() {}
                } else a[e] = u,
                r.setImmediate(d)
            },
            y = u.slice(0, Math.abs(u.length - 1)) || [],
            m = function() {
                return o(y,
                function(n, t) {
                    return n && a.hasOwnProperty(t)
                },
                !0) && !a.hasOwnProperty(e)
            };
            if (m()) u[u.length - 1](f, a);
            else {
                var v = function() {
                    m() && (p(v), u[u.length - 1](f, a))
                };
                s(v)
            }
        })
    },
    r.retry = function(n, t, e) {
        var u = 5,
        i = [];
        "function" == typeof n && (e = t, t = n, n = u),
        n = parseInt(n, 10) || u;
        var c = function(u, c) {
            for (var a = function(n, t) {
                return function(e) {
                    n(function(n, r) {
                        e(!n || t, {
                            err: n,
                            result: r
                        })
                    },
                    c)
                }
            }; n;) i.push(a(t, !(n -= 1)));
            r.series(i,
            function(n, t) {
                t = t[t.length - 1],
                (u || e)(t.err, t.result)
            })
        };
        return e ? c() : c
    },
    r.waterfall = function(n, t) {
        if (t = t ||
        function() {},
        !i(n)) {
            var e = new Error("First argument to waterfall must be an array of functions");
            return t(e)
        }
        if (!n.length) return t();
        var u = function(n) {
            return function(e) {
                if (e) t.apply(null, arguments),
                t = function() {};
                else {
                    var i = Array.prototype.slice.call(arguments, 1),
                    c = n.next();
                    c ? i.push(u(c)) : i.push(t),
                    r.setImmediate(function() {
                        n.apply(null, i)
                    })
                }
            }
        };
        u(r.iterator(n))()
    };
    var k = function(n, t, e) {
        if (e = e ||
        function() {},
        i(t)) n.map(t,
        function(n, t) {
            n && n(function(n) {
                var e = Array.prototype.slice.call(arguments, 1);
                e.length <= 1 && (e = e[0]),
                t.call(null, n, e)
            })
        },
        e);
        else {
            var r = {};
            n.each(l(t),
            function(n, e) {
                t[n](function(t) {
                    var u = Array.prototype.slice.call(arguments, 1);
                    u.length <= 1 && (u = u[0]),
                    r[n] = u,
                    e(t)
                })
            },
            function(n) {
                e(n, r)
            })
        }
    };
    r.parallel = function(n, t) {
        k({
            map: r.map,
            each: r.each
        },
        n, t)
    },
    r.parallelLimit = function(n, t, e) {
        k({
            map: m(t),
            each: f(t)
        },
        n, e)
    },
    r.series = function(n, t) {
        if (t = t ||
        function() {},
        i(n)) r.mapSeries(n,
        function(n, t) {
            n && n(function(n) {
                var e = Array.prototype.slice.call(arguments, 1);
                e.length <= 1 && (e = e[0]),
                t.call(null, n, e)
            })
        },
        t);
        else {
            var e = {};
            r.eachSeries(l(n),
            function(t, r) {
                n[t](function(n) {
                    var u = Array.prototype.slice.call(arguments, 1);
                    u.length <= 1 && (u = u[0]),
                    e[t] = u,
                    r(n)
                })
            },
            function(n) {
                t(n, e)
            })
        }
    },
    r.iterator = function(n) {
        var t = function(e) {
            var r = function() {
                return n.length && n[e].apply(null, arguments),
                r.next()
            };
            return r.next = function() {
                return e < n.length - 1 ? t(e + 1) : null
            },
            r
        };
        return t(0)
    },
    r.apply = function(n) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function() {
            return n.apply(null, t.concat(Array.prototype.slice.call(arguments)))
        }
    };
    var A = function(n, t, e, r) {
        var u = [];
        n(t,
        function(n, t) {
            e(n,
            function(n, e) {
                u = u.concat(e || []),
                t(n)
            })
        },
        function(n) {
            r(n, u)
        })
    };
    r.concat = s(A),
    r.concatSeries = d(A),
    r.whilst = function(n, t, e) {
        n() ? t(function(u) {
            return u ? e(u) : void r.whilst(n, t, e)
        }) : e()
    },
    r.doWhilst = function(n, t, e) {
        n(function(u) {
            if (u) return e(u);
            var i = Array.prototype.slice.call(arguments, 1);
            t.apply(null, i) ? r.doWhilst(n, t, e) : e()
        })
    },
    r.until = function(n, t, e) {
        n() ? e() : t(function(u) {
            return u ? e(u) : void r.until(n, t, e)
        })
    },
    r.doUntil = function(n, t, e) {
        n(function(u) {
            if (u) return e(u);
            var i = Array.prototype.slice.call(arguments, 1);
            t.apply(null, i) ? e() : r.doUntil(n, t, e)
        })
    },
    r.queue = function(t, e) {
        function u(n, t, e, u) {
            return n.started || (n.started = !0),
            i(t) || (t = [t]),
            0 == t.length ? r.setImmediate(function() {
                n.drain && n.drain()
            }) : void c(t,
            function(t) {
                var i = {
                    data: t,
                    callback: "function" == typeof u ? u: null
                };
                e ? n.tasks.unshift(i) : n.tasks.push(i),
                n.saturated && n.tasks.length === n.concurrency && n.saturated(),
                r.setImmediate(n.process)
            })
        }
        void 0 === e && (e = 1);
        var a = 0,
        o = {
            tasks: [],
            concurrency: e,
            saturated: null,
            empty: null,
            drain: null,
            started: !1,
            paused: !1,
            push: function(n, t) {
                u(o, n, !1, t)
            },
            kill: function() {
                o.drain = null,
                o.tasks = []
            },
            unshift: function(n, t) {
                u(o, n, !0, t)
            },
            process: function() {
                if (!o.paused && a < o.concurrency && o.tasks.length) {
                    var e = o.tasks.shift();
                    o.empty && 0 === o.tasks.length && o.empty(),
                    a += 1;
                    var r = function() {
                        a -= 1,
                        e.callback && e.callback.apply(e, arguments),
                        o.drain && o.tasks.length + a === 0 && o.drain(),
                        o.process()
                    },
                    u = n(r);
                    t(e.data, u)
                }
            },
            length: function() {
                return o.tasks.length
            },
            running: function() {
                return a
            },
            idle: function() {
                return o.tasks.length + a === 0
            },
            pause: function() {
                o.paused !== !0 && (o.paused = !0)
            },
            resume: function() {
                if (o.paused !== !1) {
                    o.paused = !1;
                    for (var n = 1; n <= o.concurrency; n++) r.setImmediate(o.process)
                }
            }
        };
        return o
    },
    r.priorityQueue = function(n, t) {
        function e(n, t) {
            return n.priority - t.priority
        }
        function u(n, t, e) {
            for (var r = -1,
            u = n.length - 1; u > r;) {
                var i = r + (u - r + 1 >>> 1);
                e(t, n[i]) >= 0 ? r = i: u = i - 1
            }
            return r
        }
        function a(n, t, a, o) {
            return n.started || (n.started = !0),
            i(t) || (t = [t]),
            0 == t.length ? r.setImmediate(function() {
                n.drain && n.drain()
            }) : void c(t,
            function(t) {
                var i = {
                    data: t,
                    priority: a,
                    callback: "function" == typeof o ? o: null
                };
                n.tasks.splice(u(n.tasks, i, e) + 1, 0, i),
                n.saturated && n.tasks.length === n.concurrency && n.saturated(),
                r.setImmediate(n.process)
            })
        }
        var o = r.queue(n, t);
        return o.push = function(n, t, e) {
            a(o, n, t, e)
        },
        delete o.unshift,
        o
    },
    r.cargo = function(n, t) {
        var e = !1,
        u = [],
        o = {
            tasks: u,
            payload: t,
            saturated: null,
            empty: null,
            drain: null,
            drained: !0,
            push: function(n, e) {
                i(n) || (n = [n]),
                c(n,
                function(n) {
                    u.push({
                        data: n,
                        callback: "function" == typeof e ? e: null
                    }),
                    o.drained = !1,
                    o.saturated && u.length === t && o.saturated()
                }),
                r.setImmediate(o.process)
            },
            process: function l() {
                if (!e) {
                    if (0 === u.length) return o.drain && !o.drained && o.drain(),
                    void(o.drained = !0);
                    var r = "number" == typeof t ? u.splice(0, t) : u.splice(0, u.length),
                    i = a(r,
                    function(n) {
                        return n.data
                    });
                    o.empty && o.empty(),
                    e = !0,
                    n(i,
                    function() {
                        e = !1;
                        var n = arguments;
                        c(r,
                        function(t) {
                            t.callback && t.callback.apply(null, n)
                        }),
                        l()
                    })
                }
            },
            length: function() {
                return u.length
            },
            running: function() {
                return e
            }
        };
        return o
    };
    var x = function(n) {
        return function(t) {
            var e = Array.prototype.slice.call(arguments, 1);
            t.apply(null, e.concat([function(t) {
                var e = Array.prototype.slice.call(arguments, 1);
                "undefined" != typeof console && (t ? console.error && console.error(t) : console[n] && c(e,
                function(t) {
                    console[n](t)
                }))
            }]))
        }
    };
    r.log = x("log"),
    r.dir = x("dir"),
    r.memoize = function(n, t) {
        var e = {},
        u = {};
        t = t ||
        function(n) {
            return n
        };
        var i = function() {
            var i = Array.prototype.slice.call(arguments),
            c = i.pop(),
            a = t.apply(null, i);
            a in e ? r.nextTick(function() {
                c.apply(null, e[a])
            }) : a in u ? u[a].push(c) : (u[a] = [c], n.apply(null, i.concat([function() {
                e[a] = arguments;
                var n = u[a];
                delete u[a];
                for (var t = 0,
                r = n.length; r > t; t++) n[t].apply(null, arguments)
            }])))
        };
        return i.memo = e,
        i.unmemoized = n,
        i
    },
    r.unmemoize = function(n) {
        return function() {
            return (n.unmemoized || n).apply(null, arguments)
        }
    },
    r.times = function(n, t, e) {
        for (var u = [], i = 0; n > i; i++) u.push(i);
        return r.map(u, t, e)
    },
    r.timesSeries = function(n, t, e) {
        for (var u = [], i = 0; n > i; i++) u.push(i);
        return r.mapSeries(u, t, e)
    },
    r.seq = function() {
        var n = arguments;
        return function() {
            var t = this,
            e = Array.prototype.slice.call(arguments),
            u = e.pop();
            r.reduce(n, e,
            function(n, e, r) {
                e.apply(t, n.concat([function() {
                    var n = arguments[0],
                    t = Array.prototype.slice.call(arguments, 1);
                    r(n, t)
                }]))
            },
            function(n, e) {
                u.apply(t, [n].concat(e))
            })
        }
    },
    r.compose = function() {
        return r.seq.apply(null, Array.prototype.reverse.call(arguments))
    };
    var S = function(n, t) {
        var e = function() {
            var e = this,
            r = Array.prototype.slice.call(arguments),
            u = r.pop();
            return n(t,
            function(n, t) {
                n.apply(e, r.concat([t]))
            },
            u)
        };
        if (arguments.length > 2) {
            var r = Array.prototype.slice.call(arguments, 2);
            return e.apply(this, r)
        }
        return e
    };
    r.applyEach = s(S),
    r.applyEachSeries = d(S),
    r.forever = function(n, t) {
        function e(r) {
            if (r) {
                if (t) return t(r);
                throw r
            }
            n(e)
        }
        e()
    },
    "undefined" != typeof module && module.exports ? module.exports = r: "undefined" != typeof define && define.amd ? define([],
    function() {
        return r
    }) : t.async = r
} ();