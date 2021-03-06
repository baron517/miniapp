var app = new getApp(), uniacid = app.siteInfo.uniacid, uid = app.globalData.uid;

Page({
    data: {
        isUsed: !1,
        userCoupon: [],
        type: 1
    },
    onLoad: function(a) {
        var t = this, e = a.type, i = wx.getStorageSync("kundian_farm_uid"), u = a.totalPrice;
        app.util.request({
            url: "entry/wxapp/coupon",
            data: {
                op: "getUseCoupon",
                uniacid: uniacid,
                uid: i,
                type: e,
                totalPrice: u
            },
            success: function(a) {
                t.setData({
                    userCoupon: a.data.userCoupon,
                    type: e
                });
            }
        }), app.util.setNavColor(uniacid);
    },
    isUsed: function() {
        var a = this.data.isUsed;
        this.setData({
            isUsed: !a
        }), wx.navigateBack({
            delta: 1
        });
    },
    useCoupon: function(a) {
        var t = a.currentTarget.dataset.id, e = this.data.userCoupon, i = new Array();
        e.map(function(a) {
            a.id == t && (i = a);
        }), wx.setStorageSync("user_coupon", i), wx.navigateBack({
            delta: 1
        });
    }
});