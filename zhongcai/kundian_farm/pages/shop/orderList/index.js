var app = new getApp();

Page({
    data: {
        currentIndex: "4",
        orderData: [],
        status: "",
        page: 1,
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this;
        if (a.status) var e = a.status; else e = 4;
        var r = app.siteInfo.uniacid, d = app.globalData.uid;
        app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "orderList",
                uniacid: r,
                uid: d,
                status: e
            },
            success: function(a) {
                a.data.orderData ? t.setData({
                    orderData: a.data.orderData,
                    currentIndex: e
                }) : t.setData({
                    currentIndex: e
                });
            }
        }), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        }), app.util.setNavColor(r);
    },
    getOrderData: function() {
        var t = this, a = t.data.currentIndex, e = app.siteInfo.uniacid, r = app.globalData.uid;
        app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "orderList",
                uniacid: e,
                uid: r,
                status: a
            },
            success: function(a) {
                a.data.orderData && t.setData({
                    orderData: a.data.orderData,
                    page: 1
                });
            }
        });
    },
    changeIndex: function(a) {
        this.setData({
            currentIndex: a.currentTarget.dataset.index
        }), this.getOrderData();
    },
    cancelOrder: function(a) {
        var t = this, e = app.siteInfo.uniacid, r = app.globalData.uid, d = a.currentTarget.dataset.orderid;
        app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "cancelOrder",
                uid: r,
                uniacid: e,
                order_id: d
            },
            success: function(a) {
                1 == a.data.code ? (wx.showToast({
                    title: "订单已取消"
                }), t.getOrderData()) : wx.showToast({
                    title: "取消失败"
                });
            }
        });
    },
    payOrder: function(a) {
        var e = this, r = app.siteInfo.uniacid, d = (app.globalData.uid, a.currentTarget.dataset.orderid);
        app.util.request({
            url: "entry/wxapp/shopPay",
            data: {
                orderid: d,
                uniacid: r
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
                                url: "entry/wxapp/shop",
                                data: {
                                    op: "notify",
                                    order_id: d,
                                    uniacid: r,
                                    prepay_id: t
                                },
                                success: function(a) {
                                    wx.showToast({
                                        title: "支付成功",
                                        success: function(a) {
                                            wx.redirectTo({
                                                url: "../orderList/index"
                                            }), e.getOrderData();
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
                "JSAPI支付必须传openid" == a.data.message ? wx.navigateTo({
                    url: "../../login/index"
                }) : wx.showModal({
                    title: "系统提示",
                    content: a.data.message ? a.data.message : "错误",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && wx.redirectTo({
                            url: "../orderList/index"
                        });
                    }
                });
            }
        });
    },
    applyRefund: function(a) {
        var t = this, e = app.siteInfo.uniacid, r = app.globalData.uid, d = a.currentTarget.dataset.orderid;
        app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "applyRefund",
                uid: r,
                uniacid: e,
                order_id: d
            },
            success: function(a) {
                1 == a.data.code ? (wx.showToast({
                    title: "申请已提交"
                }), t.getOrderData()) : wx.showToast({
                    title: "申请失败"
                });
            }
        });
    },
    sureGoods: function(a) {
        var t = this, e = app.siteInfo.uniacid, r = app.globalData.uid, d = a.currentTarget.dataset.orderid;
        app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "sureGoods",
                uid: r,
                uniacid: e,
                order_id: d
            },
            success: function(a) {
                1 == a.data.code ? (wx.showToast({
                    title: "收货成功"
                }), t.getOrderData()) : wx.showToast({
                    title: "收货失败"
                });
            }
        });
    },
    intoOrderDetail: function(a) {
        var t = a.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../Group/orderDetails/index?order_id=" + t
        });
    },
    onReachBottom: function(a) {
        var r = this, t = app.siteInfo.uniacid, e = app.globalData.uid, d = r.data.currentIndex, i = r.data.page, o = r.data.orderData;
        app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "orderList",
                uniacid: t,
                uid: e,
                status: d,
                page: i
            },
            success: function(a) {
                if (a.data.orderData) {
                    for (var t = a.data.orderData, e = 0; e < t.length; e++) o.push(t[e]);
                    r.setData({
                        orderData: o,
                        page: parseInt(i) + 1
                    });
                }
            }
        });
    },
    deleteOrder: function(d) {
        var i = this;
        wx.showModal({
            title: "提示",
            content: "确认删除该订单吗？删除后不可找回！",
            success: function(a) {
                if (a.confirm) {
                    var t = app.siteInfo.uniacid, e = app.globalData.uid, r = d.currentTarget.dataset.orderid;
                    app.util.request({
                        url: "entry/wxapp/order",
                        data: {
                            op: "deleteOrder",
                            uniacid: t,
                            orderid: r,
                            uid: e
                        },
                        success: function(a) {
                            console.log(a), 1 == a.data.code ? (wx.showToast({
                                title: a.data.msg
                            }), i.getOrderData()) : wx.showToast({
                                title: a.data.msg
                            });
                        }
                    });
                } else a.cancel;
            }
        });
    },
    onShareAppMessage: function() {}
});