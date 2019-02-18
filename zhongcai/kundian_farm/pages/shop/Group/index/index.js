var app = new getApp();

Page({
    data: {
        goodsData: [],
        page: 1,
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, o = (wx.getStorageSync("kundian_farm_uid"), app.siteInfo.uniacid);
        app.util.request({
            url: "entry/wxapp/group",
            data: {
                op: "getGroupGoods",
                uniacid: o
            },
            success: function(a) {
                t.setData({
                    goodsData: a.data.goodsData
                });
            }
        }), app.util.setNavColor(o), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    onReachBottom: function(a) {
        var e = this, t = (e.data.type_id, wx.getStorageSync("kundian_farm_uid"), app.siteInfo.uniacid), n = e.data.page, d = e.data.goodsData;
        app.util.request({
            url: "entry/wxapp/group",
            data: {
                op: "getGroupGoods",
                uniacid: t,
                page: n
            },
            success: function(a) {
                if (a.data.goodsData) {
                    for (var t = a.data.goodsData, o = 0; o < t.length; o++) d.push(t[o]);
                    e.setData({
                        goodsData: d,
                        page: parseInt(n) + 1
                    });
                }
            }
        });
    },
    intoGroupDetail: function(a) {
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../proDetails/index?goods_id=" + t
        });
    }
});