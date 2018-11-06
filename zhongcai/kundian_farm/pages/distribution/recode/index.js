var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        status: -1,
        page: 1,
        list: []
    },
    onLoad: function(t) {
        wx.getStorageSync("kundian_farm_uid");
        var a = this.data.page;
        this.getRecord(-1, a);
    },
    getRecord: function(t, a, e) {
        var s = wx.getStorageSync("kundian_farm_uid"), i = this, n = i.data.list;
        app.util.request({
            url: "entry/wxapp/distribution",
            data: {
                op: "getWithdrawRecord",
                uniacid: uniacid,
                uid: s,
                status: t
            },
            success: function(t) {
                if (1 == e) {
                    var a = t.data.list;
                    a && a.map(function(t) {
                        n.push(t);
                    }), i.setData({
                        list: n
                    });
                } else i.setData({
                    list: t.data.list
                });
            }
        });
    },
    showDesc: function(t) {
        var e = t.currentTarget.dataset.id, a = this.data.records;
        a.map(function(t) {
            if (t.id == e) {
                var a = t.show;
                t.show = !a;
            }
        }), this.setData({
            records: a
        });
    },
    changeStatus: function(t) {
        var a = t.currentTarget.dataset.index, e = this, s = e.data.page;
        e.getRecord(a, s), e.setData({
            status: a,
            page: 1
        });
    },
    onReachBottom: function() {
        var t = this, a = t.data.status, e = parseInt(t.data.page) + 1;
        t.getRecord(a, e, 1), t.setData({
            status: a,
            page: e
        });
    }
});