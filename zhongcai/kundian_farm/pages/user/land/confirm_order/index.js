var app = new getApp();

Page({
    data: {
        borderImg: "../../../../images/icon/address-line.png",
        address: "",
        name: "",
        phone: "",
        seedData: [],
        seed_id: [],
        farmSetData: [],
        mine_land_id: ""
    },
    onLoad: function(a) {
        var e = this, t = a.seed_id, d = a.mine_land_id, i = app.siteInfo.uniacid, s = app.globalData.uid;
        app.util.request({
            url: "entry/wxapp/seed",
            data: {
                op: "getSureOrder",
                uniacid: i,
                seed_id: t,
                uid: s
            },
            success: function(a) {
                e.setData({
                    seedData: a.data.seedData,
                    seed_id: t,
                    mine_land_id: d
                });
            }
        }), app.util.setNavColor(i), e.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    selAddress: function(a) {
        var e = this;
        wx.chooseAddress({
            success: function(a) {
                e.setData({
                    address: a.provinceName + a.cityName + a.countyName + a.detailInfo,
                    name: a.userName,
                    phone: a.telNumber
                });
            }
        });
    },
    nowPay: function(a) {
        var e = this, t = e.data.name, d = e.data.address, i = e.data.phone, s = app.globalData.uid, n = app.siteInfo.uniacid, r = e.data.seed_id, o = e.data.mine_land_id;
        if ("" == d || "" == t || "" == i) wx.showToast({
            title: "请选择收货地址"
        }); else {
            var c = {
                op: "addOrder",
                address: d,
                name: t,
                phone: i,
                uniacid: n,
                seed_id: r,
                uid: s,
                mine_land_id: o
            };
            app.util.request({
                url: "entry/wxapp/seed",
                data: c,
                success: function(a) {
                    var t = a.data.order_id;
                    app.util.request({
                        url: "entry/wxapp/SeedSendPay",
                        data: {
                            orderid: t,
                            uniacid: n
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
                                        app.util.request({
                                            url: "entry/wxapp/seed",
                                            data: {
                                                op: "notify_send",
                                                order_id: t,
                                                uniacid: n,
                                                prepay_id: e,
                                                seed_id: r
                                            },
                                            success: function(a) {
                                                wx.showToast({
                                                    title: "支付成功",
                                                    success: function(a) {
                                                        wx.redirectTo({
                                                            url: "../../../shop/orderList/index"
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    },
                                    fail: function(a) {
                                        wx.redirectTo({
                                            url: "../../../shop/orderList/index"
                                        });
                                    }
                                });
                            } else wx.redirectTo({
                                url: "../../../shop/orderList/index"
                            });
                        },
                        fail: function(a) {
                            wx.showModal({
                                title: "系统提示",
                                content: a.data.message ? a.data.message : "错误",
                                showCancel: !1,
                                success: function(a) {
                                    a.confirm && wx.redirectTo({
                                        url: "../../../shop/orderList/index"
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    }
});