var _Page;

function _defineProperty(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page((_defineProperty(_Page = {
    data: {
        currentIndex: 0,
        page: 1,
        is_show_send: 1,
        orderid: "",
        express_company: "",
        send_number: "",
        type: 1,
        farmSetData: []
    },
    onLoad: function(e) {
        app.util.setNavColor(uniacid);
        var a = this, t = e.type;
        a.setData({
            type: t,
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        }), a.getOrder(a, uniacid, t);
    },
    changeIndex: function(e) {
        this.setData({
            currentIndex: e.currentTarget.dataset.index
        });
        var a = this;
        a.getOrder(a, uniacid, a.data.type);
    },
    showSend: function(e) {
        var a = e.currentTarget.dataset.orderid;
        this.setData({
            orderid: a,
            is_show_send: 2
        });
    },
    hideSend: function(e) {
        this.setData({
            is_show_send: 1
        });
    },
    scan: function(e) {
        var a = this;
        wx.scanCode({
            success: function(e) {
                a.setData({
                    send_number: e.result
                });
            }
        });
    },
    sureSend: function(e) {
        var a = this, t = a.data.orderid, r = e.detail.value.express_company, n = a.data.send_number;
        "" == n && (n = e.detail.value.send_number), app.util.request({
            url: "entry/wxapp/manager",
            data: {
                op: "sendGoods",
                uniacid: uniacid,
                orderid: t,
                express_company: r,
                send_number: n
            },
            success: function(e) {
                1 == e.data.code && wx.showModal({
                    title: "提示",
                    content: "发货成功",
                    confirmText: "朕知道了",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && (a.setData({
                            is_show_send: 1,
                            send_number: ""
                        }), a.getOrder(a, uniacid));
                    }
                });
            }
        });
    }
}, "sureSend", function(e) {
    var a = this, t = a.data.orderid, r = e.detail.value.express_company, n = a.data.send_number, d = a.data.type;
    "" == n && (n = e.detail.value.send_number), app.util.request({
        url: "entry/wxapp/manager",
        data: {
            op: "sureSend",
            uniacid: uniacid,
            orderid: t,
            express_company: r,
            send_number: n,
            type: d
        },
        success: function(e) {
            1 == e.data.code && wx.showModal({
                title: "提示",
                content: "发货成功",
                confirmText: "朕知道了",
                showCancel: !1,
                success: function(e) {
                    e.confirm && (a.setData({
                        is_show_send: 1,
                        send_number: ""
                    }), a.getOrder(a, uniacid, a.data.type));
                }
            });
        }
    });
}), _defineProperty(_Page, "getOrder", function(a, e, t) {
    app.util.request({
        url: "entry/wxapp/manager",
        data: {
            op: "order_list",
            uniacid: e,
            current: a.data.currentIndex,
            type: t
        },
        success: function(e) {
            a.setData({
                orderData: e.data.orderData,
                page: 1
            });
        }
    });
}), _defineProperty(_Page, "cancelOrder", function(e) {
    var a = this, t = e.currentTarget.dataset.orderid;
    app.util.request({
        url: "entry/wxapp/manager",
        data: {
            op: "cancelOrder",
            uniacid: uniacid,
            orderid: t
        },
        success: function(e) {
            wx.showModal({
                title: "提示",
                confirmText: "朕知道了",
                showCancel: !1,
                content: e.data.msg,
                success: function() {
                    a.getOrder(a, uniacid);
                }
            });
        }
    });
}), _defineProperty(_Page, "cancelGroupOrder", function(e) {
    var a = this, t = e.currentTarget.dataset.orderid;
    app.util.request({
        url: "entry/wxapp/manager",
        data: {
            op: "cancelGroupOrder",
            uniacid: uniacid,
            orderid: t
        },
        success: function(e) {
            wx.showModal({
                title: "提示",
                content: e.data.msg,
                confirmText: "朕知道了",
                showCancel: !1,
                success: function() {
                    a.getOrder(a, uniacid, a.data.type);
                }
            });
        }
    });
}), _defineProperty(_Page, "cancelIntrgralOrder", function(e) {
    var a = this, t = e.currentTarget.dataset.orderid;
    app.util.request({
        url: "entry/wxapp/manager",
        data: {
            op: "cancelIntrgralOrder",
            uniacid: uniacid,
            orderid: t
        },
        success: function(e) {
            wx.showModal({
                title: "提示",
                content: e.data.msg,
                confirmText: "朕知道了",
                showCancel: !1,
                success: function() {
                    a.getOrder(a, uniacid, a.data.type);
                }
            });
        }
    });
}), _defineProperty(_Page, "onReachBottom", function(e) {
    var a = this, t = a.data.page, r = a.data.orderData;
    app.util.request({
        url: "entry/wxapp/manager",
        data: {
            op: "order_list",
            uniacid: uniacid,
            current: a.data.currentIndex,
            page: t,
            type: a.data.type
        },
        success: function(e) {
            e.data.orderData && e.data.orderData.map(function(e) {
                r.push(e);
            });
            a.setData({
                orderData: r,
                page: parseInt(t) + 1
            });
        }
    });
}), _defineProperty(_Page, "intoOrderDetail", function(e) {
    var a = e.currentTarget.dataset.orderid, t = (e.currentTarget.dataset.status, this.data.type);
    wx.navigateTo({
        url: "../orderState/index?orderid=" + a + "&type=" + t
    });
}), _defineProperty(_Page, "deleteOrder", function(r) {
    var n = this;
    wx.showModal({
        title: "提示",
        content: "确认删除该订单吗？删除后将不可找回！",
        success: function(e) {
            if (e.confirm) {
                var a = n.data.type, t = r.currentTarget.dataset.orderid;
                app.util.request({
                    url: "entry/wxapp/manager",
                    data: {
                        op: "deleteOrder",
                        orderid: t,
                        uniacid: uniacid,
                        type: a
                    },
                    success: function(e) {
                        console.log(e), 1 == e.data.code ? wx.showModal({
                            title: "提示",
                            content: e.data.msg,
                            confirmText: "朕知道了",
                            showCancel: !1,
                            success: function() {
                                n.getOrder(n, uniacid, a);
                            }
                        }) : wx.showToast({
                            title: e.data.msg
                        });
                    }
                });
            }
        }
    });
}), _Page));