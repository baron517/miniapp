var app = new getApp(), uniacid = app.siteInfo.uniacid, uid = wx.getStorageSync("kundian_farm_uid");

Page({
    data: {
        seed: [],
        totalPrice: 0,
        copyTotalPrice: 0,
        couponCount: 0,
        userCoupon: [],
        lid: "",
        farmSetData: []
    },
    onLoad: function(a) {
        var t = a.lid;
        if (wx.getStorageSync("kundian_farm_buy_seed")) {
            var e = this, o = wx.getStorageSync("kundian_farm_buy_seed"), n = a.total_price;
            this.setData({
                seed: o,
                totalPrice: n,
                copyTotalPrice: n,
                lid: t
            }), app.util.request({
                url: "entry/wxapp/coupon",
                data: {
                    op: "getUseCouponCount",
                    uniacid: uniacid,
                    type: 5,
                    totalprice: n,
                    uid: uid
                },
                success: function(a) {
                    console.log(a), e.setData({
                        couponCount: a.data.couponCount
                    });
                }
            });
        }
        this.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    selectCoupon: function(a) {
        var t = this.data.copyTotalPrice;
        wx.navigateTo({
            url: "../../coupon/useCoupon/index?type=5&totalPrice=" + t
        });
    },
    onShow: function() {
        var a = this.data.copyTotalPrice;
        if (wx.getStorageSync("user_coupon")) {
            var t = wx.getStorageSync("user_coupon");
            wx.removeStorageSync("user_coupon"), this.setData({
                userCoupon: t,
                totalPrice: parseFloat(a - t.coupon.coupon_price).toFixed(2)
            });
        } else this.setData({
            userCoupon: [],
            totalPrice: a
        });
    },
    surePay: function(a) {
        for (var t = this, e = t.data.seed, o = new Array(), n = new Array(), i = t.data.totalPrice, u = t.data.lid, c = 0; c < e.length; c++) o[c] = e[c].id, 
        n[c] = e[c].num;
        var d = t.data.userCoupon, r = 0, s = 0;
        "" != d && (console.log(d), r = d.coupon.id, s = d.coupon.coupon_price), uid ? app.util.request({
            url: "entry/wxapp/land",
            data: {
                op: "addSendOrder",
                uniacid: uniacid,
                uid: uid,
                total_price: i,
                sid: o.join("_"),
                count: n.join("_"),
                coupon_id: r,
                coupon_price: s,
                lid: u
            },
            success: function(a) {
                var e = a.data.order_id;
                app.util.request({
                    url: "entry/wxapp/sendPay",
                    data: {
                        orderid: e,
                        uniacid: uniacid
                    },
                    cachetime: "0",
                    success: function(a) {
                        if (console.log(a), a.data && a.data.data && !a.data.errno) {
                            var t = a.data.data.package;
                            wx.requestPayment({
                                timeStamp: a.data.data.timeStamp,
                                nonceStr: a.data.data.nonceStr,
                                package: a.data.data.package,
                                signType: "MD5",
                                paySign: a.data.data.paySign,
                                success: function(a) {
                                    app.util.request({
                                        url: "entry/wxapp/land",
                                        data: {
                                            op: "notify_send",
                                            order_id: e,
                                            uniacid: uniacid,
                                            prepay_id: t,
                                            lid: u
                                        },
                                        success: function(a) {
                                            wx.showToast({
                                                title: "支付成功",
                                                success: function(a) {
                                                    wx.navigateTo({
                                                        url: "../index/index?lid=" + u
                                                    });
                                                }
                                            });
                                        }
                                    });
                                },
                                fail: function(a) {}
                            });
                        }
                    },
                    fail: function(a) {
                        wx.showModal({
                            title: "系统提示",
                            content: a.data.message ? a.data.message : "错误",
                            showCancel: !1,
                            success: function(a) {
                                a.confirm;
                            }
                        });
                    }
                });
            }
        }) : wx.navigateTo({
            url: "../../../login/index"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});