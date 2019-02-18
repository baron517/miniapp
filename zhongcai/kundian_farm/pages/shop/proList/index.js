var app = new getApp(), util = require("../../../utils/util.js");

Page({
    data: {
        currentType: "综合",
        sort: !0,
        goodsData: [],
        page: 1,
        type_id: "",
        arr: [],
        scrollTop: 0,
        tarrHight: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this;
        if (a.type_id) var e = a.type_id; else e = 0;
        if (a.goods_name) var o = a.goods_name; else o = "";
        var s = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/shop",
            data: {
                op: "getGoodsList",
                type_id: e,
                uniacid: s,
                goods_name: o
            },
            success: function(a) {
                a.data.goodsData ? t.setData({
                    type_id: e,
                    goodsData: a.data.goodsData
                }) : t.setData({
                    type_id: e
                }), util.computeHeight(t, a.data.goodsData, 4);
            }
        }), app.util.setNavColor(s), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    onPageScroll: function(a) {
        for (var t = this, e = a.scrollTop, o = t.data.arr, s = t.data.tarrHight, i = 0; i < t.data.goodsData.length; i++) s[i] < e + 300 && 0 == o[i] && (o[i] = !0);
        t.setData({
            arr: o,
            scrollTop: e
        });
    },
    sortPro: function(a) {
        var t = this, e = a.currentTarget.dataset.name, o = a.currentTarget.dataset.rank, s = void 0, i = "";
        e == this.data.currentType ? (s = !this.data.sort, i = "desc") : (s = !0, i = "asc");
        var r = app.siteInfo.uniacid, d = t.data.type_id;
        app.util.request({
            url: "entry/wxapp/shop",
            data: {
                op: "getGoodsList",
                type_id: d,
                uniacid: r,
                rank: o,
                rank_type: i
            },
            success: function(a) {
                a.data.goodsData && t.setData({
                    goodsData: a.data.goodsData
                });
            }
        }), this.setData({
            currentType: e,
            sort: s
        }), util.computeHeight(t, t.data.goodsData, 4), util.returnTop();
    },
    onReachBottom: function(a) {
        var o = this, s = o.data.type_id, t = app.siteInfo.uniacid, i = o.data.page, r = o.data.goodsData;
        app.util.request({
            url: "entry/wxapp/shop",
            data: {
                op: "getGoodsList",
                type_id: s,
                uniacid: t,
                page: i
            },
            success: function(a) {
                if (a.data.goodsData) {
                    for (var t = a.data.goodsData, e = 0; e < t.length; e++) r.push(t[e]);
                    o.setData({
                        type_id: s,
                        goodsData: r,
                        page: parseInt(i) + 1
                    });
                }
            }
        });
    },
    intoGoodsDetail: function(a) {
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../prodeteils/index?goodsid=" + t
        });
    },
    onShareAppMessage: function() {}
});