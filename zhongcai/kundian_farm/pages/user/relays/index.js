var app = new getApp(), uniacid = app.siteInfo.unaicid;

Page({
    data: {
        relays: []
    },
    onLoad: function(t) {
        this.getRelaysData();
    },
    getRelaysData: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/webThing",
            data: {
                op: "getRelays"
            },
            success: function(t) {
                a.setData({
                    relays: t.data.relays
                });
            }
        });
    },
    controlRelays: function(t) {
        var a = this, e = t.currentTarget.dataset.id, s = t.currentTarget.dataset.status, n = a.data.relays;
        console.log(n), app.util.request({
            url: "entry/wxapp/webThing",
            data: {
                op: "controlRelays",
                id: e,
                status: s
            },
            success: function(t) {
                wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1,
                    success: function(t) {
                        n.map(function(t) {
                            e == t.ID && (t.Status = 1 == s ? 0 : 1);
                        }), a.setData({
                            relays: n
                        });
                    }
                });
            }
        });
    },
    onPullDownRefresh: function(t) {
        this.getRelaysData();
    },
    onReady: function() {}
});