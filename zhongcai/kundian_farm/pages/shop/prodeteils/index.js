var _Page;

function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var WxParse = require("../../../../wxParse/wxParse.js"), app = new getApp(), uniacid = app.siteInfo.uniacid;

Page((_defineProperty(_Page = {
    data: {
        isServer: !1,
        pageScrollTop: 0,
        isShow: !1,
        scrollShow: !1,
        currentIndex: 1,
        scrollTop: !1,
        goodsData: [],
        goodsid: "",
        is_show: "1",
        specItem: [],
        count: 1,
        price: "",
        spec_src: "",
        spec_id: "",
        buy_type: 1,
        specVal: [],
        sku_name_str: "",
        currentLsit: [],
        fertilizerList: [],
        pesticidesList: [],
        traceData: [],
        is_fumier: 1,
        user_uid: "",
        farmSetData: [],
        show_haibao: !1,
        show_goods_shop_model_mask: !1,
        show_goods_shop_model: !1,
        goods_poster: "",
        local_poster: "",
        bottom: 0
    },
    onLoad: function(a) {
        var t = this, e = app.siteInfo.uniacid, o = a.goodsid, s = a.user_uid;
        console.log(s);
        var i = wx.getStorageSync("kundian_farm_uid");
        app.loginBindParent(s, i), null != s && 0 != s && t.setData({
            user_uid: s
        });
        var n = 0;
        -1 < app.globalData.sysData.model.indexOf("iPhone X") && (n = 68), t.getGoodsDetailData(o), 
        app.util.setNavColor(e), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            bottom: n
        });
    },
    onShow: function(a) {
        app.siteInfo.uniacid;
        var t = this.data.user_uid, e = wx.getStorageSync("kundian_farm_uid");
        app.loginBindParent(t, e);
    },
    getGoodsDetailData: function(e) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/shop",
            data: {
                op: "getGoodsDetail",
                uniacid: uniacid,
                goodsid: e
            },
            success: function(a) {
                var t = new Array();
                a.data.traceData && (t = a.data.traceData), o.setData({
                    goodsData: a.data.goodsData,
                    goodsid: e,
                    specItem: a.data.specItem,
                    traceData: t
                }), "" != a.data.goodsData.goods_desc && WxParse.wxParse("article", "html", a.data.goodsData.goods_desc, o, 5);
            }
        });
    },
    showMode: function(a) {
        var t = this;
        if (1 == t.data.goodsData.is_open_sku) t.setData({
            is_show: 2,
            buy_type: 2
        }); else {
            var e = t.data.goodsid, o = t.data.count, s = app.siteInfo.uniacid, i = wx.getStorageSync("kundian_farm_uid");
            app.util.request({
                url: "entry/wxapp/cart",
                data: {
                    op: "addCart",
                    goods_id: e,
                    uniacid: s,
                    count: o,
                    uid: i
                },
                success: function(a) {
                    1 == a.data.code ? wx.showToast({
                        title: "已加入购物车"
                    }) : wx.showToast({
                        title: "操作失败"
                    });
                }
            });
        }
    },
    hideModal: function() {
        this.setData({
            is_show: 1
        });
    },
    reduceNum: function() {
        1 != this.data.count && this.setData({
            count: this.data.count - 1
        });
    },
    addNum: function() {
        var a = parseInt(this.data.count) + 1;
        this.setData({
            count: a
        });
    },
    chooseNum: function(a) {
        var t = a.detail.value;
        t <= 1 ? this.setData({
            count: 1
        }) : this.setData({
            count: t
        });
    },
    selectSpec: function(a) {
        for (var s = this, t = app.siteInfo.uniacid, e = s.data.goodsid, o = a.currentTarget.dataset.specid, i = a.currentTarget.dataset.valid, n = s.data.specItem, r = new Array(), d = 0; d < n.length; d++) {
            n[d].id == o && (n[d].select_spec = 1);
            for (var c = 0; c < n[d].specVal.length; c++) n[d].id == o && (n[d].specVal[c].select_val = 0), 
            n[d].specVal[c].id == i && (n[d].specVal[c].select_val = 1), 1 == n[d].specVal[c].select_val && r.push(n[d].specVal[c].id);
        }
        var u = r.join(",");
        app.util.request({
            url: "entry/wxapp/shop",
            data: {
                op: "getSpec",
                uniacid: t,
                spec_id: u,
                goodsid: e
            },
            success: function(a) {
                if (1 == a.data.code) {
                    a.data.specVal.count <= 0 && wx.showToast({
                        title: "库存不足..."
                    });
                    for (var t = 0; t < n.length; t++) {
                        n[t].id == r && (n[t].is_select = 1);
                        for (var e = 0; e < n[t].specVal.length; e++) {
                            n[t].specVal[e].is_count = 1, n[t].specVal[e].id == i && (n[t].specVal[e].is_select = 0, 
                            a.data.specVal.count <= 0 && (n[t].specVal[e].is_count = 0));
                            for (var o = 0; o < r.length; o++) r[o] == i && r.splice(o, 1);
                        }
                    }
                    s.setData({
                        price: a.data.specVal.price,
                        spec_src: a.data.specVal.spec_src,
                        spec_id: a.data.specVal.id,
                        specItem: n,
                        specVal: a.data.specVal
                    });
                } else s.setData({
                    specItem: n
                });
            }
        });
    },
    sureGoods: function(a) {
        var t = this.data.goodsid, e = this.data.goodsData, o = this.data.spec_id, s = this.data.count, i = this.data.specVal, n = wx.getStorageSync("kundian_farm_uid");
        if (0 != n && null != n) if (1 == e.is_open_sku) {
            if ("" == o && 0 == o.length) return wx.showToast({
                title: "请选择规格"
            }), !1;
            i.sku_name ? i.count >= s ? (wx.setStorageSync("shop_buy_goods", i), wx.navigateTo({
                url: "../confrimOrder/index?goodsid=" + t + "&spec_id=" + o + "&count=" + s
            })) : wx.showToast({
                title: "库存不足"
            }) : wx.showToast({
                title: "请选择规格"
            });
        } else e.count >= s ? wx.navigateTo({
            url: "../confrimOrder/index?goodsid=" + e.id + "&count=" + s
        }) : wx.showToast({
            title: "库存不足"
        }); else wx.navigateTo({
            url: "../../login/index"
        });
    },
    buySelectSpec: function(a) {
        this.setData({
            is_show: 2,
            buy_type: 1
        });
    },
    buyNow: function(a) {
        this.data.goodsData, this.data.count;
        var t = wx.getStorageSync("kundian_farm_uid");
        0 != t && null != t ? this.setData({
            is_show: 2,
            buy_type: 1
        }) : wx.navigateTo({
            url: "../../login/index"
        });
    },
    addCart: function(a) {
        var t = this, e = t.data.goodsid, o = t.data.spec_id, s = t.data.count, i = app.siteInfo.uniacid, n = wx.getStorageSync("kundian_farm_uid"), r = t.data.specVal;
        if (console.log(o), 0 != n && null != n) {
            if ("" == o || null == o) return wx.showToast({
                title: "请选择规格"
            }), !1;
            r.count >= s ? app.util.request({
                url: "entry/wxapp/cart",
                data: {
                    op: "addCart",
                    goods_id: e,
                    spec_id: o,
                    uniacid: i,
                    count: s,
                    uid: n
                },
                success: function(a) {
                    1 == a.data.code ? (wx.showToast({
                        title: "已加入购物车"
                    }), t.setData({
                        is_show: 1
                    })) : wx.showToast({
                        title: "操作失败"
                    });
                }
            }) : wx.showToast({
                title: "库存不足"
            });
        } else wx.navigateTo({
            url: "../../login/index"
        });
    },
    goHome: function(a) {
        wx.switchTab({
            url: "../../HomePage/index/index"
        });
    },
    onShareAppMessage: function() {
        var a = wx.getStorageSync("kundian_farm_uid");
        return {
            path: "/kundian_farm/pages/shop/prodeteils/index?goodsid=" + this.data.goodsData.id + "&user_uid=" + a,
            success: function(a) {},
            title: this.data.goodsData.goods_name,
            imageUrl: this.data.goodsData.cover
        };
    },
    showShare: function(a) {
        wx.showShareMenu({
            withShareTicket: !0
        });
    },
    intoCart: function(a) {
        wx.navigateTo({
            url: "../buyCar/index"
        });
    },
    onPageScroll: function(a) {
        var t = !1;
        150 <= a.scrollTop && (t = !0), this.setData({
            scrollTop: t
        });
    },
    proDetailVideo: function(a) {
        var t = a.currentTarget.dataset.videosrc;
        wx.navigateTo({
            url: "../prodeteilVideo/index?src=" + t
        });
    },
    chengeIndex: function(a) {
        var t = a.currentTarget.dataset.index;
        this.setData({
            currentIndex: t
        });
    }
}, "onPageScroll", function(a) {
    var t = !1;
    350 <= a.scrollTop && (t = !0), this.setData({
        scrollShow: t
    }), 0 == this.data.isShow ? this.setData({
        pageScrollTop: a.scrollTop
    }) : wx.pageScrollTo({
        scrollTop: this.data.pageScrollTop,
        duration: 0
    });
}), _defineProperty(_Page, "isShow", function(a) {
    var t = a.currentTarget.dataset.index, e = this.data.goodsData;
    1 == t && this.setData({
        currentLsit: e.fumierData,
        isShow: !0,
        is_fumier: t
    }), 2 == t && this.setData({
        currentLsit: e.insecData,
        isShow: !0,
        is_fumier: t
    }), wx.pageScrollTo({
        scrollTop: this.data.pageScrollTop,
        duration: 0
    });
}), _defineProperty(_Page, "scroll", function(a) {
    wx.pageScrollTo({
        scrollTop: this.data.pageScrollTop,
        duration: 0
    });
}), _defineProperty(_Page, "noShow", function() {
    this.setData({
        isShow: !1
    });
}), _defineProperty(_Page, "returnTop", function() {
    wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
    });
}), _defineProperty(_Page, "previewImg", function(a) {
    var t = a.currentTarget.dataset.index, e = a.currentTarget.dataset.id, o = this.data.traceData, s = new Array();
    o.map(function(a) {
        a.id == e && (s = a.img);
    }), wx.previewImage({
        urls: s,
        current: s[t]
    });
}), _defineProperty(_Page, "previewSlideImg", function(a) {
    var t = a.currentTarget.dataset.index, e = this.data.goodsData;
    wx.previewImage({
        urls: e.goods_slide,
        current: e[t]
    });
}), _defineProperty(_Page, "displayServer", function() {
    this.setData({
        isServer: !0
    });
}), _defineProperty(_Page, "hideServer", function() {
    this.setData({
        isServer: !1
    });
}), _defineProperty(_Page, "showGoodsShareModel", function(a) {
    this.setData({
        show_shop_model: !0,
        show_goods_shop_model_mask: !0
    });
}), _defineProperty(_Page, "closeGoodsShareModel", function(a) {
    this.setData({
        show_shop_model: !1,
        show_goods_shop_model_mask: !1
    });
}), _defineProperty(_Page, "closeGoodsHaihao", function(a) {
    this.setData({
        show_haibao: !1,
        show_goods_shop_model_mask: !1
    });
}), _defineProperty(_Page, "createGoodsPost", function(a) {
    var t = this;
    if (t.data.goods_poster) t.setData({
        show_shop_model: !1,
        show_haibao: !0
    }); else {
        wx.showLoading({
            title: "海报生成中"
        });
        var e = wx.getStorageSync("kundian_farm_uid");
        e ? app.util.request({
            url: "entry/wxapp/shop",
            data: {
                op: "createGoodsPost",
                uid: e,
                goods_id: t.data.goodsid,
                uniacid: uniacid
            },
            success: function(a) {
                1 == a.data.code ? (t.setData({
                    show_shop_model: !1,
                    show_haibao: !0,
                    goods_poster: a.data.post_src,
                    local_poster: a.data.local_src
                }), wx.hideLoading()) : wx.showModal({
                    title: "提示",
                    content: "海报生成失败，请稍后重试！",
                    showCancel: !1
                });
            }
        }) : wx.navigateTo({
            url: "../../login/index"
        });
    }
}), _defineProperty(_Page, "saveGoodsPost", function(a) {
    var t = this.data.local_poster;
    wx.downloadFile({
        url: t,
        success: function(a) {
            wx.saveImageToPhotosAlbum({
                filePath: a.tempFilePath,
                success: function(a) {
                    wx.showModal({
                        title: "提示",
                        content: "海报保存成功",
                        showCancel: !1
                    });
                },
                fail: function(a) {}
            });
        }
    });
}), _defineProperty(_Page, "previewGoodsPost", function(a) {
    var t = this.data.goods_poster;
    wx.previewImage({
        urls: [ t ]
    });
}), _Page));