var app = new getApp();

Page({
    data: {
        borderImg: "../../../../images/icon/address-line.png",
        address: "",
        phone: "",
        userName: "",
        goodsData: [],
        specItem: [],
        specVal: [],
        default: !1,
        count: "",
        aboutData: [],
        totalPrice: [],
        cartData: [],
        is_buy_type: 1,
        goods_id: "",
        cart_id: "",
        spec_id: "",
        send_price: 0,
        farmSetData: []
    },
    onLoad: function(a) {
        var e = a.goodsid;
        if (a.spec_id) var d = a.spec_id; else d = 0;
        a.cart_id;
        var s = a.count, i = (app.globalData.uid, this), t = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/integral",
            data: {
                op: "getSureGoods",
                uniacid: t,
                goods_id: e,
                spec_id: d,
                count: s
            },
            success: function(a) {
                if (a.data.specVal) var t = a.data.specVal; else t = [];
                i.setData({
                    specItem: a.data.specItem,
                    goodsData: a.data.goodsData,
                    count: s,
                    specVal: t,
                    aboutData: a.data.aboutData,
                    totalPrice: a.data.totalPrice,
                    goods_id: e,
                    spec_id: d,
                    send_price: a.data.send_price
                });
            }
        }), app.util.setNavColor(t), i.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    chooseAddress: function(a) {
        var t = this;
        wx.chooseAddress({
            success: function(a) {
                t.setData({
                    address: a.provinceName + a.cityName + a.countyName + a.detailInfo,
                    userName: a.userName,
                    phone: a.telNumber
                });
            }
        });
    },
    formSubmit: function(a) {
        var t = this, e = t.data.userName, d = t.data.address, s = t.data.phone, i = app.globalData.uid, o = app.siteInfo.uniacid, r = (t.data.is_buy_type, 
        a.detail.value.remark), c = t.data.goods_id, n = t.data.count, u = t.data.spec_id, p = t.data.send_price;
        if ("" != d && "" != s && "" != e) {
            var l = {
                op: "addOrder",
                address: d,
                name: e,
                phone: s,
                uniacid: o,
                goods_id: c,
                count: n,
                uid: i,
                remark: r,
                is_buy_type: 1,
                spec_id: u
            };
            app.util.request({
                url: "entry/wxapp/integral",
                data: l,
                success: function(a) {
                    if (1 == a.data.code) {
                        var e = a.data.order_id;
                        "" == p || 0 == p ? app.util.request({
                            url: "entry/wxapp/integral",
                            data: {
                                op: "notify",
                                order_id: e,
                                uniacid: o,
                                uid: i
                            },
                            success: function(a) {
                                wx.showToast({
                                    title: "兑换成功",
                                    success: function(a) {
                                        wx.redirectTo({
                                            url: "../orderList/index"
                                        });
                                    }
                                });
                            }
                        }) : app.util.request({
                            url: "entry/wxapp/integralPay",
                            data: {
                                orderid: e,
                                uniacid: o
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
                                                    uniacid: o,
                                                    prepay_id: t,
                                                    uid: i
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
                    } else 2 == a.data.code ? wx.showToast({
                        title: "兑换失败"
                    }) : 3 == a.data.code ? wx.showToast({
                        title: "积分不足"
                    }) : 4 == a.data.code && wx.showToast({
                        title: "积分支付失败"
                    });
                }
            });
        } else wx.showToast({
            title: "请选择收货地址!"
        });
    }
});