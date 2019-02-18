var util = require("../../../../utils/util.js"), app = new getApp();

Page({
    data: {
        currentType: "综合",
        sort: !0,
        goodsData: [],
        page: 1,
        type_id: "",
        arr: [],
        scrollTop: 0,
        tarrHight: []
    },
    onLoad: function(a) {
        var t = this, e = a.type_id, o = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/integral",
            data: {
                op: "getGoodsList",
                type_id: e,
                uniacid: o
            },
            success: function(a) {
                a.data.goodsData ? t.setData({
                    type_id: e,
                    goodsData: a.data.goodsData
                }) : t.setData({
                    type_id: e
                }), util.computeHeight(t, a.data.goodsData, 2);
            }
        }), app.util.setNavColor(o);
    },
    onPageScroll: function(a) {
        for (var t = this, e = a.scrollTop, o = t.data.arr, s = t.data.tarrHight, i = 0; i < t.data.goodsData.length; i++) s[i] < e && 0 == o[i] && (o[i] = !0);
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
            url: "entry/wxapp/integral",
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
            url: "entry/wxapp/integral",
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
            url: "../exchangedetails/index?goods_id=" + t
        });
    },
    onShareAppMessage: function() {}
});