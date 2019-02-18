var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        isShow: !1,
        express: [ "圆通快递", "顺丰快递", "中通快递", "韵达快递", "百世汇通", "菜鸟裹裹", "申通快递", "EMS", "天天快递", "宅急送", "邮政包裹" ],
        expressName: "",
        send_number: "",
        borderImg: "../../../../images/icon/address-line.png",
        orderData: [],
        type: 1,
        farmSetData: []
    },
    onLoad: function(a) {
        app.util.setNavColor(uniacid);
        var e = this, t = a.orderid, s = a.type;
        app.util.request({
            url: "entry/wxapp/manager",
            data: {
                op: "getOrderDetail",
                orderid: t,
                uniacid: uniacid,
                type: s
            },
            success: function(a) {
                console.log(a), e.setData({
                    orderData: a.data.orderData,
                    type: s
                });
            }
        }), e.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    preventTouchMove: function() {},
    fahuo: function() {
        this.setData({
            isShow: !0
        });
    },
    closeModel: function() {
        this.setData({
            isShow: !1
        });
    },
    bindPickerChange: function(a) {
        var e = a.detail.value;
        this.setData({
            expressName: this.data.express[e]
        });
    },
    scanCode: function() {
        var e = this;
        wx.scanCode({
            success: function(a) {
                e.setData({
                    send_number: a.result
                });
            }
        });
    },
    sendOrder: function(a) {
        var e = this, t = e.data.orderData, s = e.data.expressName, r = e.data.send_number, n = e.data.type;
        "" == r && (r = a.detail.value.send_number), app.util.request({
            url: "entry/wxapp/manager",
            data: {
                op: "sureSend",
                uniacid: uniacid,
                orderid: t.id,
                express_company: s,
                send_number: r,
                type: n
            },
            success: function(a) {
                1 == a.data.code && (wx.showToast({
                    title: "发货成功"
                }), t.status = 2, e.setData({
                    orderData: t,
                    send_number: "",
                    isShow: !1
                }));
            }
        });
    },
    cancelOrder: function(a) {
        var e = a.currentTarget.dataset.orderid, t = this.data.type, s = this, r = s.data.orderData;
        1 == t ? app.util.request({
            url: "entry/wxapp/manager",
            data: {
                op: "cancelOrder",
                uniacid: uniacid,
                orderid: e
            },
            success: function(a) {
                wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    success: function() {
                        r.status = 5, s.setData({
                            orderData: r
                        });
                    }
                });
            }
        }) : 2 == t ? app.util.request({
            url: "entry/wxapp/manager",
            data: {
                op: "cancelGroupOrder",
                uniacid: uniacid,
                orderid: e
            },
            success: function(a) {
                wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    success: function() {
                        r.status = 5, s.setData({
                            orderData: r
                        });
                    }
                });
            }
        }) : 3 == t && app.util.request({
            url: "entry/wxapp/manager",
            data: {
                op: "cancelIntrgralOrder",
                uniacid: uniacid,
                orderid: e
            },
            success: function(a) {
                wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    success: function() {
                        r.status = 5, s.setData({
                            orderData: r
                        });
                    }
                });
            }
        });
    }
});