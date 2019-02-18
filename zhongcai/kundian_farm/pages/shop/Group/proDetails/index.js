var _data;

function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var WxParse = require("../../../../../wxParse/wxParse.js"), app = new getApp();

Page({
    data: (_data = {
        imgs: [],
        info: {},
        state: !1,
        Position: []
    }, _defineProperty(_data, "state", !1), _defineProperty(_data, "count", 1), _defineProperty(_data, "goodsData", []), 
    _defineProperty(_data, "specItem", []), _defineProperty(_data, "goods_id", ""), 
    _defineProperty(_data, "specVal", ""), _defineProperty(_data, "sku_name_str", ""), 
    _defineProperty(_data, "aboutData", []), _defineProperty(_data, "user_uid", 0), 
    _defineProperty(_data, "farmSetData", []), _defineProperty(_data, "bottom", 0), 
    _data),
    onLoad: function(t) {
        var a = this, e = t.goods_id, o = app.siteInfo.uniacid, s = wx.getStorageSync("kundian_farm_uid"), i = t.user_uid;
        null != i && 0 != i && (app.loginBindParent(i, s), a.setData({
            user_uid: i
        })), app.util.request({
            url: "entry/wxapp/group",
            data: {
                op: "getGroupDetail",
                uniacid: o,
                goods_id: e
            },
            success: function(t) {
                a.setData({
                    goodsData: t.data.goodsData,
                    specItem: t.data.specItem,
                    goods_id: e,
                    aboutData: t.data.aboutData
                }), "" != t.data.goodsData.goods_desc && WxParse.wxParse("article", "html", t.data.goodsData.goods_desc, a, 5);
            }
        });
        var n = 0;
        -1 < app.globalData.sysData.model.indexOf("iPhone X") && (n = 68), app.util.setNavColor(o), 
        a.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            bottom: n
        });
    },
    onShow: function(t) {
        app.siteInfo.uniacid;
        var a = this.data.user_uid, e = wx.getStorageSync("kundian_farm_uid");
        null != a && 0 != a && (app.loginBindParent(a, e), this.setData({
            user_uid: a
        }));
    },
    showMode: function() {
        this.setData({
            state: !0
        });
    },
    hideModal: function() {
        this.setData({
            state: !1
        });
    },
    chooseTime: function(t) {
        for (var s = this, i = t.currentTarget.dataset.specid, n = t.currentTarget.dataset.valid, d = s.data.specItem, r = new Array(), a = 0; a < d.length; a++) {
            d[a].id == i && (d[a].is_select = 1);
            for (var e = 0; e < d[a].specVal.length; e++) d[a].id == i && (d[a].specVal[e].is_select = 0), 
            d[a].specVal[e].id == n && (d[a].specVal[e].is_select = 1), 1 == d[a].specVal[e].is_select && r.push(d[a].specVal[e].id);
        }
        var o = app.siteInfo.uniacid, u = r.join("_"), c = s.data.goods_id;
        app.util.request({
            url: "entry/wxapp/group",
            data: {
                op: "getGroupSpec",
                spec_id: u,
                uniacid: o,
                goods_id: c
            },
            success: function(t) {
                if (1 == t.data.code) s.setData({
                    specVal: t.data.specVal
                }); else if (2 == t.data.code) {
                    for (var a = 0; a < d.length; a++) {
                        d[a].id == i && (d[a].is_select = 1);
                        for (var e = 0; e < d[a].specVal.length; e++) {
                            d[a].specVal[e].id == n && (d[a].specVal[e].is_select = 0, d[a].specVal[e].is_count = 0);
                            for (var o = 0; o < r.length; o++) r[o] == n && r.splice(o, 1);
                        }
                    }
                    wx.showToast({
                        title: "库存不足"
                    }), s.setData({
                        specVal: []
                    });
                }
                s.setData({
                    specItem: d,
                    sku_name_str: t.data.sku_name_str,
                    count: 1
                });
            }
        });
    },
    buyNow: function(t) {
        var a = this, e = wx.getStorageSync("kundian_farm_uid");
        if (0 != e && null != e) {
            var o = a.data.goodsData, s = a.data.count;
            1 == o.is_open_sku ? a.setData({
                state: !0
            }) : 1 <= o.count && s > o.count ? wx.navigateTo({
                url: "../confrimOrder/index?goods_id=" + o.id + "&count=" + s
            }) : wx.showToast({
                title: "库存不足"
            });
        } else wx.navigateTo({
            url: "../../../login/index"
        });
    },
    reduceNum: function() {
        1 != this.data.count && this.setData({
            count: this.data.count - 1
        });
    },
    addNum: function() {
        var t = this, a = t.data.specVal, e = t.data.count, o = t.data.goodsData;
        if (1 == o.is_open_sku) {
            if ("" == a || 0 == a.length) return wx.showToast({
                title: "请选择规格"
            }), !1;
            parseInt(e) + 1 > a.count ? wx.showToast({
                title: "库存不足"
            }) : this.setData({
                count: this.data.count + 1
            });
        } else parseInt(e) + 1 > o.count ? wx.showToast({
            title: "库存不足"
        }) : this.setData({
            count: this.data.count + 1
        });
    },
    chooseNum: function(t) {
        var a = this.data.specVal, e = t.detail.value, o = this.data.goodsData;
        if (1 == o.is_open_sku) {
            if ("" == a || 0 == a.length) return wx.showToast({
                title: "请选择规格"
            }), !1;
            parseInt(e) > a.count ? (wx.showToast({
                title: "库存不足"
            }), this.setData({
                count: 1
            })) : this.setData({
                count: e
            });
        } else parseInt(e) > o.count ? (wx.showToast({
            title: "库存不足"
        }), this.setData({
            count: 1
        })) : this.setData({
            count: e
        });
    },
    goHome: function(t) {
        wx.switchTab({
            url: "../../../HomePage/index/index"
        });
    },
    doCall: function(t) {
        var a = t.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: a
        });
    },
    sureGoods: function(t) {
        var a = this, e = a.data.goods_id, o = a.data.goodsData, s = (a.data.specItem, a.data.count), i = a.data.specVal, n = wx.getStorageSync("kundian_farm_uid");
        if (0 != n && null != n) if (1 == o.is_open_sku) {
            if (0 == i.length || "" == i) return wx.showToast({
                title: "请选择规格"
            }), !1;
            1 <= i.count && i.count >= s ? wx.navigateTo({
                url: "../confrimOrder/index?goods_id=" + e + "&spec_id=" + i.id + "&count=" + s
            }) : wx.showToast({
                title: "库存不足"
            });
        } else 1 <= i.count && i.count >= s ? wx.navigateTo({
            url: "../confrimOrder/index?goods_id=" + e + "&count=" + s
        }) : wx.showToast({
            title: "库存不足"
        }); else wx.navigateTo({
            url: "../../../login/index"
        });
    },
    onShareAppMessage: function() {
        var t = wx.getStorageSync("kundian_farm_uid");
        return {
            path: "/kundian_farm/pages/shop/Group/proDetails/index?goods_id=" + this.data.goodsData.id + "&user_uid=" + t,
            success: function(t) {},
            title: this.data.goodsData.goods_name,
            imageUrl: this.data.goodsData.cover
        };
    }
});