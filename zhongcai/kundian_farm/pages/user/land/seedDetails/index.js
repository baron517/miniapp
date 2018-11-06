var app = new getApp();

Page({
    data: {
        plant: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, e = app.siteInfo.uniacid, n = a.sid;
        app.util.request({
            url: "entry/wxapp/land",
            data: {
                op: "getSendDetail",
                uniacid: e,
                sid: n
            },
            success: function(a) {
                t.setData({
                    plant: a.data.sendDetail
                });
            }
        }), app.util.setNavColor(e), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    }
});