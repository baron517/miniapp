var _data;

function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var app = new getApp();

Page({
    data: (_data = {
        imgList: [],
        typeData: [],
        homeBtm: [],
        defaultHomeBtm: [],
        defaultTypeData: [],
        state: !1,
        animal_state: !1,
        animalMine: [],
        seedMine: [],
        setData: [],
        weather: []
    }, _defineProperty(_data, "weather", []), _defineProperty(_data, "currentIndex", 0), 
    _defineProperty(_data, "height", 0), _defineProperty(_data, "couponData", []), _defineProperty(_data, "loading", !0), 
    _defineProperty(_data, "mockView", 4), _defineProperty(_data, "user_uid", 0), _defineProperty(_data, "page", []), 
    _defineProperty(_data, "articleData", []), _data),
    onLoad: function(a) {
        app.siteInfo.uniacid;
        var t = wx.getStorageSync("kundian_farm_uid");
        this.getFirstData();
        var e = a.user_uid;
        null != e && 0 != e && (app.loginBindParent(e, t), this.setData({
            user_uid: e
        }));
    },
    change: function(a) {
        var t = a.detail.current;
        this.setData({
            currentIndex: t
        });
    },
    intoDetail: function(a) {
        var t = a.currentTarget.dataset.url;
        wx.navigateTo({
            url: "../../" + t,
            fail: function(a) {
                wx.switchTab({
                    url: "../../" + t
                });
            }
        });
    },
    preventTouchMove: function() {},
    hideModal: function() {
        this.setData({
            state: !1
        });
    },
    hideAnimalModal: function() {
        this.setData({
            animal_state: !1
        });
    },
    intoBtmDetail: function(a) {
        var t = a.currentTarget.dataset.jumpurl;
        0 != t && "" != t && null != t && wx.navigateTo({
            url: "../../" + t,
            fail: function(a) {
                wx.switchTab({
                    url: "../../" + t
                });
            }
        });
    },
    goToAnimal: function(a) {
        this.setData({
            state: !1
        }), wx.navigateTo({
            url: "../../user/Animal/index"
        });
    },
    goToSeed: function(a) {
        this.setData({
            state: !1
        }), wx.navigateTo({
            url: "../../user/land/personLand/index"
        });
    },
    intoDetailSlide: function(a) {
        var t = a.currentTarget.dataset.linktype, e = a.currentTarget.dataset.linkparam;
        1 == t ? wx.navigateTo({
            url: "../../land/landList/index"
        }) : 2 == t ? e ? wx.navigateTo({
            url: "../../shop/AdoptRules/index?aid=" + e
        }) : wx.navigateTo({
            url: "../../shop/Adopt/index"
        }) : 3 == t ? wx.navigateTo({
            url: "../../shop/integral/index/index"
        }) : 4 == t ? wx.navigateTo({
            url: "../live/index"
        }) : 5 == t ? 0 != e ? wx.navigateTo({
            url: "../../shop/prodeteils/index?goodsid=" + e
        }) : wx.switchTab({
            url: "../../shop/index/index"
        }) : 6 == t ? e ? wx.navigateTo({
            url: "../../shop/Group/proDetails/index?goods_id=" + e
        }) : wx.navigateTo({
            url: "../../shop/Group/index/index"
        }) : 7 == t ? e ? wx.navigateTo({
            url: "../../shop/integral/exchangedetails/index?goods_id=" + e
        }) : wx.navigateTo({
            url: "../../shop/integral/exchange/index"
        }) : 8 == t && (e && 0 != e ? wx.navigateTo({
            url: "../../article/detail/index?aid=" + e
        }) : wx.navigateTo({
            url: "../../article/index/index"
        }));
    },
    intoVetInfo: function(a) {
        wx.navigateTo({
            url: "../../shop/VeterinaryIntroduce/index?title=" + this.data.setData.vet_title
        });
    },
    intoLive: function(a) {
        var t = this.data.setData;
        t.home_title_jump_url && wx.navigateTo({
            url: "../../" + t.home_title_jump_url,
            fail: function(a) {
                wx.switchTab({
                    url: "../../" + t.home_title_jump_url
                });
            }
        });
    },
    intoWeather: function(a) {
        wx.navigateTo({
            url: "../weather/index?farm_name=" + this.data.weather.farm_name + "&weatherSet=" + JSON.stringify(this.data.weatherSet)
        });
    },
    onShareAppMessage: function() {
        var a = wx.getStorageSync("kundian_farm_setData");
        return {
            path: "/kundian_farm/pages/HomePage/index/index?&user_uid=" + wx.getStorageSync("kundian_farm_uid"),
            success: function(a) {},
            title: a.share_home_title
        };
    },
    onPullDownRefresh: function(a) {
        this.getFirstData(), wx.stopPullDownRefresh();
    },
    issues: function() {
        wx.navigateTo({
            url: "../issue/index"
        });
    },
    getCoupon: function(a) {
        var t = a.currentTarget.dataset.type;
        wx.getStorageSync("kundian_farm_uid"), app.siteInfo.uniacid;
        wx.navigateTo({
            url: "../../user/coupon/index/index?type=" + t
        });
    },
    examineMoreCoupon: function(a) {
        wx.navigateTo({
            url: "../../user/coupon/index/index"
        });
    },
    onShow: function(a) {},
    getFirstData: function(a) {
        var u = this, s = app.siteInfo.uniacid, t = wx.getStorageSync("kundian_farm_uid");
        wx.showLoading({
            title: "加载中"
        }), app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "index",
                uniacid: s,
                uid: t
            },
            success: function(a) {
                if (1 == a.data.setData.is_open_custom_page) {
                    var t = new Array();
                    a.data.weather && (t = a.data.weather);
                    var e = new Array();
                    if (a.data.weatherSet && (e = a.data.weatherSet), u.setData({
                        setData: a.data.setData,
                        page: a.data.page,
                        weather: t,
                        loading: !1,
                        homeBtm: a.data.homeBtm,
                        weatherSet: e,
                        animalMine: a.data.animalMine,
                        seedMine: a.data.seedMine
                    }), a.data.weather) {
                        t = a.data.weather;
                        wx.setStorageSync("kundian_farm_weather", t);
                    }
                } else {
                    if (a.data.seedMine) var i = !0; else i = !1;
                    if (a.data.animalMine) var n = !0; else n = !1;
                    if (a.data.weather) {
                        var r = a.data.weather;
                        wx.setStorageSync("kundian_farm_weather", r);
                    }
                    var o = void 0, d = a.data.typeData;
                    d && (o = 8 < d.length ? 390 : 4 < d.length ? 370 : 185), u.setData({
                        imgList: a.data.slideData,
                        typeData: a.data.typeData,
                        homeBtm: a.data.homeBtm,
                        state: i,
                        setData: a.data.setData,
                        weather: r,
                        weatherSet: a.data.weatherSet,
                        couponData: a.data.couponData,
                        height: o,
                        animal_state: n,
                        loading: !1,
                        articleData: a.data.articleData
                    });
                }
                wx.setStorageSync("kundian_farm_setData", a.data.setData), a.data.setData && a.data.setData.bar_title && wx.setNavigationBarTitle({
                    title: a.data.setData.bar_title
                }), app.util.setNavColor(s), wx.hideLoading();
            }
        });
    },
    intoArticle: function(a) {
        wx.navigateTo({
            url: "../../article/index/index"
        });
    }
});