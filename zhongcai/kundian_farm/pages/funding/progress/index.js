var app = new getApp(), uniacid = app.siteInfo.uniacid, mudule_name = "kundian_farm_plugin_funding";

Page({
    data: {
        progressList: []
    },
    onLoad: function(a) {
        var e = this, i = a.pid, n = app.util.url("entry/wxapp/project") + "m=" + mudule_name;
        wx.request({
            url: n,
            data: {
                op: "getProgress",
                uniacid: uniacid,
                pid: i
            },
            success: function(a) {
                console.log(a), e.setData({
                    progressList: a.data.progress
                });
            }
        });
    }
});