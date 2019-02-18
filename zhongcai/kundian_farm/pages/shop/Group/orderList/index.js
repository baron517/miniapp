var app = new getApp();

Page({
    data: {
        currentIndex: "1",
        proJect: [],
        orderData: [],
        page: 1,
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, e = app.globalData.uid, r = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/group",
            data: {
                op: "getGroupList",
                uid: e,
                uniacid: r
            },
            success: function(a) {
                t.setData({
                    orderData: a.data.orderData
                });
            }
        }), app.util.setNavColor(r), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    getOrderData: function() {
        var t = this, a = app.globalData.uid, e = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/group",
            data: {
                op: "getGroupList",
                uid: a,
                uniacid: e
            },
            success: function(a) {
                t.setData({
                    orderData: a.data.orderData
                });
            }
        });
    },
    changeIndex: function(a) {
        var t = a.currentTarget.dataset.index;
        this.setData({
            currentIndex: a.currentTarget.dataset.index
        });
        var e = this, r = app.globalData.uid, i = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/group",
            data: {
                op: "getGroupList",
                uid: r,
                uniacid: i,
                status: t
            },
            success: function(a) {
                e.setData({
                    orderData: a.data.orderData
                });
            }
        });
    },
    payGroupOrder: function(a) {
        var e = app.siteInfo.uniacid, r = (app.globalData.uid, a.currentTarget.dataset.orderid);
        app.util.request({
            url: "entry/wxapp/groupPay",
            data: {
                orderid: r,
                uniacid: e
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
                                url: "entry/wxapp/group",
                                data: {
                                    op: "notify",
                                    order_id: r,
                                    uniacid: e,
                                    prepay_id: t
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
                            url: "../orderList/index"
                        });
                    }
                });
            }
        });
    },
    applyRefund: function(a) {
        var t = this, e = app.siteInfo.uniacid, r = app.globalData.uid, i = a.currentTarget.dataset.orderid;
        app.util.request({
            url: "entry/wxapp/group",
            data: {
                op: "applyGroupRefund",
                uid: r,
                uniacid: e,
                order_id: i
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
        var t = this, e = app.siteInfo.uniacid, r = app.globalData.uid, i = a.currentTarget.dataset.orderid;
        app.util.request({
            url: "entry/wxapp/group",
            data: {
                op: "sureGoods",
                uid: r,
                uniacid: e,
                order_id: i
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
    cancelOrder: function(a) {
        var t = this, e = app.siteInfo.uniacid, r = app.globalData.uid, i = a.currentTarget.dataset.orderid;
        app.util.request({
            url: "entry/wxapp/group",
            data: {
                op: "cancelOrder",
                uid: r,
                uniacid: e,
                order_id: i
            },
            success: function(a) {
                1 == a.data.code ? (wx.showToast({
                    title: "取消成功"
                }), t.getOrderData()) : wx.showToast({
                    title: "取消失败"
                });
            }
        });
    },
    onReachBottom: function(a) {
        var r = this, t = app.globalData.uid, e = app.siteInfo.uniacid, i = r.data.page, d = r.data.orderData, o = r.data.currentIndex;
        app.util.request({
            url: "entry/wxapp/group",
            data: {
                op: "getGroupList",
                uid: t,
                uniacid: e,
                status: o,
                page: i
            },
            success: function(a) {
                if (console.log(a), a.data.orderData) {
                    for (var t = a.data.orderData, e = 0; e < t.length; e++) d.push(t[e]);
                    r.setData({
                        orderData: d,
                        page: parseInt(i) + 1
                    });
                }
            }
        });
    },
    deleteOrder: function(i) {
        var d = this;
        wx.showModal({
            title: "提示",
            content: "确认删除订单吗？删除后将不可找回",
            success: function(a) {
                if (a.confirm) {
                    var t = i.currentTarget.dataset.orderid, e = app.globalData.uid, r = app.siteInfo.uniacid;
                    app.util.request({
                        url: "entry/wxapp/group",
                        data: {
                            op: "deleteOrder",
                            uniacid: r,
                            uid: e,
                            orderid: t
                        },
                        success: function(a) {
                            console.log(a), 1 == a.data.code ? (wx.showToast({
                                title: a.data.msg
                            }), d.getOrderData()) : wx.showToast({
                                title: a.data.msg
                            });
                        }
                    });
                }
            }
        });
    }
});