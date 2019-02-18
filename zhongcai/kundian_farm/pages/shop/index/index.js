var app = new getApp(), util = require("../../../utils/util.js");

Page({
    data: {
        classify: 1,
        Adopt: [],
        typeData: [],
        recommendData: [],
        arr: [],
        scrollTop: 0,
        tarrHight: [],
        user_id: 0,
        newGoodsData: [],
        page: 1,
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, i = app.siteInfo.uniacid, e = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/shop",
            data: {
                op: "index",
                uniacid: i,
                uid: e
            },
            success: function(a) {
                t.setData({
                    Adopt: a.data.slideData,
                    typeData: a.data.typeData,
                    recommendData: a.data.recommendData
                }), util.computeHeight(t, a.data.recommendData, 2);
            }
        }), app.util.setNavColor(i);
        var n = a.user_uid;
        null != n && 0 != n && (app.loginBindParent(n, e), t.setData({
            user_uid: n
        })), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    onShow: function(a) {
        var t = this.data.user_uid, i = wx.getStorageSync("kundian_farm_uid");
        null != t && 0 != t && (app.loginBindParent(t, i), that.setData({
            user_uid: t
        }));
    },
    onPageScroll: function(a) {
        for (var t = this, i = a.scrollTop, e = t.data.arr, n = t.data.tarrHight, o = 0; o < t.data.recommendData.length; o++) n[o] < i && 0 == e[o] && (e[o] = !0);
        t.setData({
            arr: e,
            scrollTop: i
        });
    },
    intoOrderDetail: function(a) {
        var t = a.currentTarget.dataset.goodsid;
        app.siteInfo.uniacid;
        wx.navigateTo({
            url: "../prodeteils/index?goodsid=" + t
        });
    },
    intoGoodsList: function(a) {
        var t = a.currentTarget.dataset.typeid;
        a.currentTarget.dataset.urltype;
        wx.navigateTo({
            url: "../proList/index?type_id=" + t
        });
    },
    touchstart: function(a) {
        this.data.touchDot = a.touches[0].pageX;
        var t = this;
        this.data.interval = setInterval(function() {
            t.data.time += 1;
        }, 100);
    },
    touchmove: function(a) {
        var t = a.touches[0].pageX, i = this.data.touchDot;
        this.data.time;
        t - i <= -40 && !this.data.done && (this.data.done = !0, this.scrollLeft()), 40 <= t - i && !this.data.done && (this.data.done = !0, 
        this.scrollRight());
    },
    touchend: function(a) {
        clearInterval(this.data.interval), this.data.time = 0, this.data.done = !1;
    },
    scrollLeft: function() {
        var a = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        }), t = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        }), i = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.setData({
            img_width_three: 200
        }), this.animation1 = a, this.animation2 = t, this.animation3 = i, this.animation1.translateX(-60).opacity(.5).step(), 
        this.animation2.translateX(-60).opacity(1).scale(.8, .8).step(), this.animation3.translateX(-60).opacity(.5).scale(1.2, 1.2).step(), 
        this.setData({
            animation1: a.export(),
            animation2: t.export(),
            animation3: i.export()
        });
        var e = this;
        setTimeout(function() {
            e.animation1.translateX(0).opacity(.5).step({
                duration: 0,
                timingFunction: "linear"
            }), e.animation2.translateX(0).opacity(1).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), e.animation3.translateX(0).opacity(.5).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), e.setData({
                animation1: a.export(),
                animation2: t.export(),
                animation3: i.export(),
                img_width_three: 60
            });
        }.bind(this), 300);
        var n = this.data.Adopt, o = n.shift();
        n.push(o), setTimeout(function() {
            this.setData({
                Adopt: n
            });
        }.bind(this), 195);
    },
    scrollRight: function() {
        var a = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        }), t = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        }), i = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        }), wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.setData({
            img_width_one: 200
        }), this.animation1 = a, this.animation2 = t, this.animation3 = i, this.animation1.translateX(60).opacity(.5).scale(1.2, 1.2).step(), 
        this.animation2.translateX(60).opacity(1).step(), this.animation3.translateX(60).opacity(.5).step(), 
        this.setData({
            animation1: a.export(),
            animation2: t.export(),
            animation3: i.export()
        });
        var e = this;
        setTimeout(function() {
            e.animation1.translateX(0).opacity(.5).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), e.animation2.translateX(0).opacity(1).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), e.animation3.translateX(0).opacity(.5).step({
                duration: 0,
                timingFunction: "linear"
            }), e.setData({
                animation1: a.export(),
                animation2: t.export(),
                animation3: i.export(),
                img_width_one: 60
            });
        }.bind(this), 300);
        var n = this.data.Adopt, o = n.pop();
        n.unshift(o), setTimeout(function() {
            this.setData({
                Adopt: n
            });
        }.bind(this), 195);
    },
    selectGoods: function(a) {
        wx.navigateTo({
            url: "../search/index"
        });
    },
    intoGoodsDetail: function(a) {
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../prodeteils/index?goodsid=" + t
        });
    },
    intoDetail: function(a) {
        var t = a.currentTarget.dataset.linktype, i = a.currentTarget.dataset.linkparam;
        1 == t ? wx.navigateTo({
            url: "../../land/landList/index"
        }) : 2 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/AdoptRules/index?aid=" + i
        }) : wx.navigateTo({
            url: "../../shop/Adopt/index"
        }) : 3 == t ? wx.navigateTo({
            url: "../../shop/integral/index/index"
        }) : 4 == t ? wx.navigateTo({
            url: "../live/index"
        }) : 5 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/prodeteils/index?goodsid=" + i
        }) : wx.switchTab({
            url: "../../shop/index/index"
        }) : 6 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/Group/proDetails/index?goods_id=" + i
        }) : wx.navigateTo({
            url: "../../shop/Group/index"
        }) : 7 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/integral/exchangedetails/index?goods_id=" + i
        }) : wx.navigateTo({
            url: "../../shop/integral/exchange/index"
        }) : 8 == t && (0 != i ? wx.navigateTo({
            url: "../../article/detail/index?aid=" + i
        }) : wx.navigateTo({
            url: "../../article/index/index"
        }));
    },
    intoDetailSlide: function(a) {
        var t = a.currentTarget.dataset.linktype, i = a.currentTarget.dataset.linkparam;
        1 == t ? wx.navigateTo({
            url: "../../user/land/selectionLands/index"
        }) : 2 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/AdoptRules/index?aid=" + i
        }) : wx.navigateTo({
            url: "../../shop/Adopt/index"
        }) : 3 == t ? wx.navigateTo({
            url: "../../shop/integral/index/index"
        }) : 4 == t ? wx.navigateTo({
            url: "../live/index"
        }) : 5 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/prodeteils/index?goodsid=" + i
        }) : wx.switchTab({
            url: "../../shop/index/index"
        }) : 6 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/Group/proDetails/index?goods_id=" + i
        }) : wx.navigateTo({
            url: "../../shop/Group/index"
        }) : 7 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/integral/exchangedetails/index?goods_id=" + i
        }) : wx.navigateTo({
            url: "../../shop/integral/exchange/index"
        }) : 8 == t && (0 != i ? wx.navigateTo({
            url: "../../article/detail/index?aid=" + i
        }) : wx.navigateTo({
            url: "../../article/index/index"
        }));
    },
    onShareAppMessage: function() {
        var a = wx.getStorageSync("kundian_farm_setData");
        return {
            path: "/kundian_farm/pages/shop/index/index?&user_uid=" + wx.getStorageSync("kundian_farm_uid"),
            success: function(a) {},
            title: a.share_shop_title
        };
    },
    onPullDownRefresh: function(a) {
        var t = this, i = app.siteInfo.uniacid, e = wx.getStorageSync("kundian_farm_uid");
        0 != e ? app.util.request({
            url: "entry/wxapp/shop",
            data: {
                op: "index",
                uniacid: i,
                uid: e
            },
            success: function(a) {
                t.setData({
                    Adopt: a.data.slideData,
                    typeData: a.data.typeData,
                    recommendData: a.data.recommendData
                }), util.computeHeight(t, a.data.recommendData, 2), wx.stopPullDownRefresh();
            }
        }) : wx.redirectTo({
            url: "../../login/index"
        });
    },
    changeType: function(a) {
        var t = a.currentTarget.dataset.index;
        this.getGoodsData(1, t), this.setData({
            classify: t
        });
    },
    getGoodsData: function(e, n, o) {
        var r = this, a = app.siteInfo.uniacid;
        if (1 != o) if (1 == n) {
            if (0 < r.data.recommendData.length) return !1;
        } else if (console.log(r.data.newGoodsData.length), 0 < r.data.newGoodsData.length) return;
        app.util.request({
            url: "entry/wxapp/shop",
            data: {
                op: "getNewGoods",
                uniacid: a,
                page: e,
                classify: n
            },
            success: function(a) {
                if (1 == o) if (1 == n) {
                    var t = r.data.recommendData;
                    a.data.recommendData.map(function(a) {
                        t.push(a);
                    }), r.setData({
                        recommendData: t,
                        page: parseInt(e) + 1
                    });
                } else {
                    var i = r.data.newGoodsData;
                    a.data.newGoodsData.map(function(a) {
                        i.push(a);
                    }), r.setData({
                        newGoodsData: i,
                        page: parseInt(e) + 1
                    });
                } else 1 == n ? r.setData({
                    recommendData: a.data.recommendData,
                    page: 1
                }) : r.setData({
                    newGoodsData: a.data.newGoodsData,
                    page: 1
                });
            }
        });
    },
    onReachBottom: function(a) {
        var t = this.data.classify, i = parseInt(this.data.page) + 1;
        this.getGoodsData(i, t, 1);
    }
});