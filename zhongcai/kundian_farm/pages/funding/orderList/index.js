var app = new getApp(), uniacid = app.siteInfo.uniacid, mudule_name = "kundian_farm_plugin_funding";

Page({
    data: {
        currentIndex: 1,
        confirm: !1,
        orderData: [],
        farmSetData: wx.getStorageSync("kundian_farm_setData"),
        current_cover: "",
        current_orderid: ""
    },
    onLoad: function(a) {
        this.getOrderData(1, 1, 0);
    },
    getOrderData: function(a, e, r) {
        var n = this, t = wx.getStorageSync("kundian_farm_uid"), d = app.util.url("entry/wxapp/order") + "m=" + mudule_name;
        wx.request({
            url: d,
            data: {
                op: "getOrderData",
                uid: t,
                uniacid: uniacid,
                currentIndex: a,
                page: e
            },
            success: function(a) {
                if (a.data.orderData) {
                    var t = new Array();
                    if (1 == r) t = n.data.orderData, a.data.orderData.map(function(a) {
                        t.push(a);
                    }); else t = a.data.orderData, e = 1;
                    n.setData({
                        orderData: t,
                        page: e
                    });
                }
            }
        });
    },
    onReachBottom: function(a) {
        var t = parseInt(this.data.page) + 1, e = this.data.currentIndex;
        this.getOrderData(e, t, 1);
    },
    changeIndex: function(a) {
        var t = a.currentTarget.dataset.index;
        this.getOrderData(t, 1, 0), this.setData({
            currentIndex: t
        });
    },
    payOrder: function(a) {
        var r = a.currentTarget.dataset.orderid, n = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/fundingPay",
            data: {
                orderid: r,
                uniacid: uniacid
            },
            cachetime: "0",
            success: function(a) {
                if (a.data && a.data.data && !a.data.errno) {
                    var e = a.data.data.package;
                    wx.requestPayment({
                        timeStamp: a.data.data.timeStamp,
                        nonceStr: a.data.data.nonceStr,
                        package: a.data.data.package,
                        signType: "MD5",
                        paySign: a.data.data.paySign,
                        success: function(a) {
                            var t = app.util.url("entry/wxapp/project") + "m=" + mudule_name;
                            wx.request({
                                url: t,
                                data: {
                                    op: "notify",
                                    uniacid: uniacid,
                                    uid: n,
                                    orderid: r,
                                    prepay_id: e
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
                            backApp();
                        }
                    });
                }
                "JSAPI支付必须传openid" == a.data.message && wx.navigateTo({
                    url: "../../login/index"
                });
            },
            fail: function(a) {
                wx.showModal({
                    title: "系统提示",
                    content: a.data.message ? a.data.message : "错误",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && backApp();
                    }
                });
            }
        });
    },
    cancelOrder: function(a) {
        var t = this, e = t.data.currentIndex, r = a.currentTarget.dataset.orderid, n = app.util.url("entry/wxapp/order") + "m=" + mudule_name;
        wx.showModal({
            title: "提示",
            content: "是否确认取消该订单？",
            success: function(a) {
                a.confirm && wx.request({
                    url: n,
                    data: {
                        op: "cancelOrder",
                        orderid: r,
                        uniacid: uniacid
                    },
                    success: function(a) {
                        wx.showModal({
                            title: "提示",
                            content: a.data.msg,
                            showCancel: !1,
                            success: function() {
                                t.getOrderData(e, 1, 0);
                            }
                        });
                    }
                });
            }
        });
    },
    preventTouchMove: function() {},
    comfirmOrder: function(a) {
        var t = a.currentTarget.dataset.orderid, e = this.data.orderData, r = "";
        e.map(function(a) {
            a.id == t && (r = a.project.cover);
        }), this.setData({
            confirm: !0,
            current_cover: r,
            current_orderid: t
        });
    },
    cancel: function() {
        this.setData({
            confirm: !1
        });
    },
    confirmGoods: function(a) {
        var t = this, e = a.currentTarget.dataset.orderid, r = app.util.url("entry/wxapp/order") + "m=" + mudule_name, n = t.data.currentIndex;
        wx.request({
            url: r,
            data: {
                op: "confirmOrder",
                uniacid: uniacid,
                orderid: e
            },
            success: function(a) {
                wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1,
                    success: function(a) {
                        t.setData({
                            confirm: !1
                        }), t.getOrderData(n, 1, 0);
                    }
                });
            }
        });
    },
    orderDetail: function(a) {
        var t = a.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../orderdetail/index?orderid=" + t
        });
    }
});