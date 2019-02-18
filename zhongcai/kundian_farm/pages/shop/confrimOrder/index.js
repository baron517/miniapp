var app = new getApp();

Page({
    data: {
        address: "",
        phone: "",
        userName: "",
        goodsData: [],
        specItem: [],
        specVal: [],
        default: !1,
        count: "",
        totalPrice: [],
        copyTotalPrice: 0,
        cartData: [],
        is_buy_type: 1,
        goods_id: "",
        cart_id: "",
        spec_id: "",
        send_price: 0,
        couponCount: 0,
        userCoupon: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var t = a.goodsid, e = a.spec_id, o = a.cart_id, i = a.count, s = wx.getStorageSync("kundian_farm_uid"), c = this, d = app.siteInfo.uniacid;
        t && (app.util.request({
            url: "entry/wxapp/shop",
            data: {
                op: "getSureGoods",
                uniacid: d,
                goods_id: t,
                spec_id: e,
                count: i,
                uid: s
            },
            success: function(a) {
                1 == a.data.goodsData.is_open_sku ? c.setData({
                    specItem: a.data.specItem,
                    goodsData: a.data.goodsData,
                    count: i,
                    specVal: a.data.specVal,
                    totalPrice: a.data.totalPrice,
                    copyTotalPrice: a.data.totalPrice,
                    goods_id: t,
                    spec_id: e,
                    send_price: a.data.send_price,
                    couponCount: a.data.couponCount
                }) : c.setData({
                    goodsData: a.data.goodsData,
                    count: i,
                    totalPrice: a.data.totalPrice,
                    copyTotalPrice: a.data.totalPrice,
                    goods_id: t,
                    send_price: a.data.send_price,
                    couponCount: a.data.couponCount
                });
            }
        }), app.util.setNavColor(d)), o && app.util.request({
            url: "entry/wxapp/cart",
            data: {
                op: "getBuyCartData",
                uniacid: d,
                uid: s,
                cart_id: o
            },
            success: function(a) {
                c.setData({
                    cartData: a.data.cartData,
                    is_buy_type: 2,
                    totalPrice: a.data.totalPrice,
                    copyTotalPrice: a.data.totalPrice,
                    cart_id: o,
                    send_price: a.data.send_price,
                    couponCount: a.data.couponCount
                });
            }
        }), c.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    chooseAddress: function(a) {
        var t = this;
        wx.chooseAddress({
            success: function(a) {
                console.log(a), t.setData({
                    address: a.provinceName + a.cityName + a.countyName + a.detailInfo,
                    userName: a.userName,
                    phone: a.telNumber
                });
            },
            fail: function(a) {
                wx.showModal({
                    title: "提示",
                    content: "您上次拒绝了授权收获地址",
                    confirmText: "前去授权",
                    success: function(a) {
                        a.confirm ? wx.switchTab({
                            url: "../../user/center/index"
                        }) : a.cancel && console.log("用户点击取消");
                    }
                });
            }
        });
    },
    addCount: function(a) {
        var t = this.data.goodsData, e = parseInt(this.data.count) + 1;
        if (1 == t.is_open_sku) var o = parseFloat(this.data.specVal.price * e) + parseFloat(this.data.send_price); else o = parseFloat(t.price * e) + parseFloat(this.data.send_price);
        this.setData({
            count: e,
            totalPrice: o,
            copyTotalPrice: o
        });
    },
    reduceCount: function(a) {
        if (1 < this.data.count) {
            var t = this.data.goodsData, e = parseInt(this.data.count) - 1;
            if (1 == t.is_open_sku) var o = parseFloat(this.data.specVal.price * e) + parseFloat(this.data.send_price); else o = parseFloat(t.price * e) + parseFloat(this.data.send_price);
            this.setData({
                count: e,
                totalPrice: o,
                copyTotalPrice: o
            });
        }
    },
    subOrder: function(a) {
        var t = this, e = t.data.userName, o = t.data.address, i = t.data.phone, s = wx.getStorageSync("kundian_farm_uid"), c = app.siteInfo.uniacid, d = t.data.is_buy_type, r = a.detail.value.remark, n = t.data.userCoupon, u = t.data.send_price, p = 0, l = 0;
        if ("" != n && (p = n.coupon.id, l = n.coupon.coupon_price), "" != e || "" != o || "" != i) {
            if (1 == d) var _ = t.data.goods_id, g = t.data.count, f = t.data.spec_id, h = {
                op: "addOrder",
                address: o,
                name: e,
                phone: i,
                uniacid: c,
                goods_id: _,
                count: g,
                uid: s,
                remark: r,
                is_buy_type: 1,
                spec_id: f,
                coupon_id: p,
                coupon_price: l,
                send_price: u
            }; else {
                var y = t.data.cart_id;
                h = {
                    op: "addOrder",
                    address: o,
                    name: e,
                    phone: i,
                    uniacid: c,
                    cart_id: y,
                    uid: s,
                    remark: r,
                    is_buy_type: 2,
                    coupon_id: p,
                    coupon_price: l,
                    send_price: u
                };
            }
            app.util.request({
                url: "entry/wxapp/shop",
                data: h,
                success: function(a) {
                    var e = a.data.order_id;
                    app.util.request({
                        url: "entry/wxapp/shopPay",
                        data: {
                            orderid: e,
                            uniacid: c
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
                                                order_id: e,
                                                uniacid: c,
                                                prepay_id: t
                                            },
                                            success: function(a) {
                                                console.log(a), wx.showToast({
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
                }
            });
        } else wx.showToast({
            title: "请选择地址"
        });
    },
    selectCoupon: function(a) {
        var t = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../user/coupon/useCoupon/index?type=1&totalPrice=" + t
        });
    },
    onShow: function(a) {
        var t = this.data.copyTotalPrice;
        if (wx.getStorageSync("user_coupon")) {
            var e = wx.getStorageSync("user_coupon");
            wx.removeStorageSync("user_coupon"), this.setData({
                userCoupon: e,
                totalPrice: parseFloat(t - e.coupon.coupon_price).toFixed(2)
            });
        } else this.setData({
            userCoupon: [],
            totalPrice: t
        });
    }
});