var app = new getApp(), uniacid = app.siteInfo.uniacid, mudule_name = "kundian_farm_plugin_funding";

Page({
    data: {
        orderData: []
    },
    onLoad: function(a) {
        var n = this, e = app.util.url("entry/wxapp/order") + "m=" + mudule_name, t = a.orderid;
        wx.request({
            url: e,
            data: {
                op: "orderDetail",
                uniacid: uniacid,
                orderid: t
            },
            success: function(a) {
                var e = a.data.orderData, t = "";
                t = 1 == e.return_type ? "平台将以" + e.project.return_percent + "%的价格回收" : spec.spec_desc, 
                n.setData({
                    orderData: a.data.orderData,
                    return_desc: t
                });
            }
        });
    },
    payOrder: function(a) {
        var n = a.currentTarget.dataset.orderid, r = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/fundingPay",
            data: {
                orderid: n,
                uniacid: uniacid
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
                            var e = app.util.url("entry/wxapp/project") + "m=" + mudule_name;
                            wx.request({
                                url: e,
                                data: {
                                    op: "notify",
                                    uniacid: uniacid,
                                    uid: r,
                                    orderid: n,
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
                        fail: function(a) {}
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
                        a.confirm;
                    }
                });
            }
        });
    }
});