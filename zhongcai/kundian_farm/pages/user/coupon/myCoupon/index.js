var app = new getApp(), uniacid = app.siteInfo.uniacid, uid = app.globalData.uid;

Page({
    data: {
        currenType: 0,
        currentCoupons: [],
        userCoupon: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, e = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/coupon",
            data: {
                op: "getUserCouponList",
                uniacid: uniacid,
                uid: e
            },
            success: function(a) {
                t.setData({
                    userCoupon: a.data.userCoupon
                }), t.filter();
            }
        }), app.util.setNavColor(uniacid), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    filter: function() {
        var t = this, a = this.data.userCoupon, e = [];
        a.map(function(a) {
            a.state === t.data.currenType && e.push(a);
        }), this.setData({
            currentCoupons: e
        });
    },
    changeState: function(a) {
        var t = a.currentTarget.dataset.state;
        this.setData({
            currenType: t
        }), this.filter();
    },
    useCoupon: function(a) {
        var t = a.currentTarget.dataset.type;
        1 == t ? wx.switchTab({
            url: "../../../shop/index/index"
        }) : 2 == t ? wx.navigateTo({
            url: "../../../shop/Group/index/index"
        }) : 3 == t ? wx.navigateTo({
            url: "../../../shop/Adopt/index"
        }) : 4 == t ? wx.navigateTo({
            url: "../../land/selectionLands/index"
        }) : 5 == t && wx.navigateTo({
            url: "../../land/personLand/index"
        });
    },
    onShow: function(a) {
        var t = this, e = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/coupon",
            data: {
                op: "getUserCouponList",
                uniacid: uniacid,
                uid: e
            },
            success: function(a) {
                t.setData({
                    userCoupon: a.data.userCoupon
                }), t.filter();
            }
        });
    }
});