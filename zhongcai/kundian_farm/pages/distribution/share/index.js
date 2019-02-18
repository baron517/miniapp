var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        userInfo: []
    },
    onLoad: function(a) {
        var e = this, n = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/distribution",
            data: {
                op: "getQrcode",
                uniacid: uniacid,
                uid: n
            },
            success: function(a) {
                console.log(a), e.setData({
                    userInfo: a.data.user
                });
            }
        });
    },
    onShareAppMessage: function(a) {
        var e = wx.getStorageSync("kundian_farm_setData"), n = wx.getStorageSync("kundian_farm_uid"), t = this.data.userInfo;
        return {
            path: "/kundian_farm/pages/HomePage/index/index?&user_uid=" + n,
            success: function(a) {},
            title: e.share_home_title,
            imageUrl: t.qrcode
        };
    }
});