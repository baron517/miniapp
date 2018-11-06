var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        deviceData: [],
        farmSetData: wx.getStorageSync("kundian_farm_setData")
    },
    onLoad: function(a) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/webThing",
            data: {
                op: "getYunDevice"
            },
            success: function(a) {
                console.log(a), e.setData({
                    deviceData: a.data.deviceData
                });
            }
        });
    }
});