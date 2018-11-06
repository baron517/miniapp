var app = new getApp();

Page({
    data: {
        integralData: [],
        page: 1
    },
    onLoad: function(a) {
        var t = this, e = app.siteInfo.uniacid, i = app.globalData.uid;
        app.util.request({
            url: "entry/wxapp/integral",
            data: {
                op: "getIntegralRecord",
                uid: i,
                uniacid: e
            },
            success: function(a) {
                t.setData({
                    integralData: a.data.orderData
                });
            }
        }), app.util.setNavColor(e);
    },
    onReachBottom: function(a) {
        var i = this, t = app.siteInfo.uniacid, e = app.globalData.uid, r = i.data.page, n = i.data.integralData;
        app.util.request({
            url: "entry/wxapp/integral",
            data: {
                op: "getIntegralRecord",
                uid: e,
                uniacid: t,
                page: r
            },
            success: function(a) {
                if (a.data.orderData) {
                    for (var t = a.data.orderData, e = 0; e < t.length; e++) n.push(t[e]);
                    i.setData({
                        integralData: n,
                        page: parseInt(r) + 1
                    });
                }
            }
        });
    },
    pay: function(a) {
        var e = a.currentTarget.dataset.orderid, i = app.siteInfo.uniacid, r = app.globalData.uid;
        app.util.request({
            url: "entry/wxapp/integralPay",
            data: {
                orderid: e,
                uniacid: i
            },
            cachetime: "0",
            success: function(a) {
                if (a.data && a.data.data && !a.data.errno) {
                    var t = a.data.data.package;
                    wx.requestPayment({
                        timeStamp: a.data.data.timeStamp,
                        nonceStr: a.data.data.nonceStr,
                        package: a.data.data.package,
                        signType: "MD5",
                        paySign: a.data.data.paySign,
                        success: function(a) {
                            app.util.request({
                                url: "entry/wxapp/integral",
                                data: {
                                    op: "notify",
                                    order_id: e,
                                    uniacid: i,
                                    prepay_id: t,
                                    uid: r
                                },
                                success: function(a) {
                                    wx.showToast({
                                        title: "支付成功",
                                        success: function(a) {
                                            wx.redirectTo({
                                                url: "../orderList/index"
                                            });
                                        }
                                    });
                                }
                            });
                        },
                        fail: function(a) {
                            wx.redirectTo({
                                url: "../orderList/index"
                            });
                        }
                    });
                } else wx.redirectTo({
                    url: "../orderList/index"
                });
            },
            fail: function(a) {
                wx.showModal({
                    title: "系统提示",
                    content: a.data.message ? a.data.message : "错误",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && wx.redirectTo({
                            url: "../../orderList/index"
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function() {}
});