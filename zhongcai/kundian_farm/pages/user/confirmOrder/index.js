var app = new getApp();

Page({
    data: {
        borderImg: "../../../images/icon/address-line.png",
        buyList: [],
        animalData: [],
        adoptData: [],
        specItem: [],
        aboutData: [],
        address: "",
        phone: "",
        name: "",
        adopt_id: "",
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, e = a.adopt_id, d = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/animal",
            data: {
                op: "getSureOrder",
                uniacid: d,
                adopt_id: e
            },
            success: function(a) {
                t.setData({
                    animalData: a.data.animalData,
                    adoptData: a.data.adoptData,
                    specItem: a.data.specItem,
                    aboutData: a.data.aboutData,
                    adopt_id: e
                });
            }
        }), app.util.setNavColor(d), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    selAddress: function(a) {
        var t = this;
        wx.chooseAddress({
            success: function(a) {
                t.setData({
                    address: a.provinceName + a.cityName + a.countyName + a.detailInfo,
                    name: a.userName,
                    phone: a.telNumber
                });
            }
        });
    },
    nowPay: function(a) {
        var t = this, e = t.data.name, d = t.data.address, i = t.data.phone, n = app.globalData.uid, s = app.siteInfo.uniacid, o = t.data.adopt_id;
        if ("" == d || "" == e || "" == i) wx.showToast({
            title: "请选择收货地址"
        }); else {
            var r = {
                op: "addOrder",
                address: d,
                name: e,
                phone: i,
                uniacid: s,
                adopt_id: o,
                uid: n
            };
            app.util.request({
                url: "entry/wxapp/animal",
                data: r,
                success: function(a) {
                    var e = a.data.order_id;
                    app.util.request({
                        url: "entry/wxapp/animalSendPay",
                        data: {
                            orderid: e,
                            uniacid: s
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
                                            url: "entry/wxapp/animal",
                                            data: {
                                                op: "notify_send",
                                                order_id: e,
                                                uniacid: s,
                                                prepay_id: t,
                                                adopt_id: o
                                            },
                                            success: function(a) {
                                                wx.showToast({
                                                    title: "支付成功",
                                                    success: function(a) {
                                                        wx.redirectTo({
                                                            url: "../../shop/orderList/index"
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    },
                                    fail: function(a) {
                                        wx.redirectTo({
                                            url: "../../shop/orderList/index"
                                        });
                                    }
                                });
                            } else wx.redirectTo({
                                url: "../../shop/orderList/index"
                            });
                        },
                        fail: function(a) {
                            wx.showModal({
                                title: "系统提示",
                                content: a.data.message ? a.data.message : "错误",
                                showCancel: !1,
                                success: function(a) {
                                    a.confirm && wx.redirectTo({
                                        url: "../../shop/orderList/index"
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    onShareAppMessage: function() {}
});