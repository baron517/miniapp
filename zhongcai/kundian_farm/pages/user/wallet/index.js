var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        farmSetData: wx.getStorageSync("kundian_farm_setData"),
        userInfo: []
    },
    onLoad: function(a) {
        var n = this, t = wx.getStorageSync("kundian_farm_uid");
        t ? app.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "getWallet",
                uniacid: uniacid,
                uid: t
            },
            success: function(a) {
                console.log(a), n.setData({
                    userInfo: a.data.userInfo
                });
            }
        }) : wx.navigateTo({
            url: "../../login/index"
        });
    },
    intoCash: function(a) {
        wx.navigateTo({
            url: "../cash/cash"
        });
    },
    intoRecord: function(a) {
        wx.navigateTo({
            url: "../recode/index"
        });
    },
    intoDetail: function(a) {
        wx.navigateTo({
            url: "../wallet_detail/index"
        });
    },
    onReady: function() {},
    onShow: function() {}
});