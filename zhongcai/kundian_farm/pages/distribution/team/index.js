var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        currentId: 1,
        saleData: [],
        page: 1
    },
    onLoad: function(a) {
        var t = this, e = (wx.getStorageSync("kundian_farm_uid"), t.data.currentId), n = t.data.page;
        t.getSaleData(e, n);
    },
    getSaleData: function(a, t, e) {
        var n = this, i = wx.getStorageSync("kundian_farm_uid"), s = n.data.saleData;
        app.util.request({
            url: "entry/wxapp/distribution",
            data: {
                op: "getSaleTeam",
                uniacid: uniacid,
                uid: i,
                current: a,
                page: t
            },
            success: function(a) {
                (console.log(a), 1 == e) ? a.data.one_sale && (a.data.one_sale.map(function(a) {
                    s.push(a);
                }), n.setData({
                    saleData: s,
                    page: t
                })) : n.setData({
                    saleData: a.data.one_sale,
                    page: 1
                });
            }
        });
    },
    changeId: function(a) {
        var t = a.currentTarget.dataset.id;
        this.getSaleData(t, 1), this.setData({
            currentId: t
        });
    },
    onReachBottom: function(a) {
        var t = this.data.currentId, e = parseInt(this.data.page) + 1;
        this.getSaleData(t, e, 1);
    }
});