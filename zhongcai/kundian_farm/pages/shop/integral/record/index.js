var app = new getApp();

Page({
    data: {
        recordData: [],
        page: 1,
        sign_title: ""
    },
    onLoad: function(a) {
        var t = this, n = app.siteInfo.uniacid, e = app.globalData.uid;
        app.util.request({
            url: "entry/wxapp/sign",
            data: {
                op: "getRecord",
                uniacid: n,
                uid: e
            },
            success: function(a) {
                t.setData({
                    recordData: a.data.recordData
                });
            }
        }), app.util.setNavColor(n);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var e = this, a = app.siteInfo.uniacid, t = app.globalData.uid, o = e.data.page, i = e.data.recordData;
        app.util.request({
            url: "entry/wxapp/sign",
            data: {
                op: "getRecord",
                uniacid: a,
                uid: t,
                page: o
            },
            success: function(a) {
                if (a.data.recordData) {
                    for (var t = a.data.recordData, n = 0; n < t.length; n++) i.push(t[n]);
                    e.setData({
                        recordData: i,
                        page: parseInt(o) + 1
                    });
                }
            }
        });
    },
    onShareAppMessage: function() {}
});