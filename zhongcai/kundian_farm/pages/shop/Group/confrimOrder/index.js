var app = new getApp();

Page({
    data: {
        state: !1,
        Bacon: !1,
        Sausage: !1,
        goodsData: [],
        specItem: [],
        aboutData: [],
        total_price: 0,
        copyTotalPrice: 0,
        count: 0,
        address: "",
        userName: "",
        phone: "",
        is_add: 0,
        add_total_price: 0,
        goods_id: "",
        spec_id: "",
        couponCount: 0,
        userCoupon: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, e = a.goods_id;
        if (a.spec_id) var o = a.spec_id; else o = 0;
        var s = app.siteInfo.uniacid, i = a.count, d = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/group",
            data: {
                op: "getSureGoodsData",
                goods_id: e,
                spec_id: o,
                uniacid: s,
                count: i,
                uid: d
            },
            success: function(a) {
                t.setData({
                    goodsData: a.data.goodsData,
                    specItem: a.data.specItem,
                    aboutData: a.data.aboutData,
                    total_price: a.data.total_price,
                    copyTotalPrice: a.data.total_price,
                    count: i,
                    specVal: a.data.specVal,
                    goods_id: e,
                    spec_id: o,
                    couponCount: a.data.couponCount
                });
            }
        }), app.util.setNavColor(s), t.setData({
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
            },
            fail: function(a) {
                wx.showModal({
                    title: "提示",
                    content: "您上次拒绝了授权收获地址",
                    confirmText: "前去授权",
                    success: function(a) {
                        a.confirm ? wx.switchTab({
                            url: "../../../user/center/index"
                        }) : a.cancel && console.log("用户点击取消");
                    }
                });
            }
        });
    },
    machining: function() {
        var a = this;
        if (a.data.state) this.setData({
            state: !this.data.state,
            add_total_price: 0,
            is_add: 0
        }); else {
            var t = a.data.copyTotalPrice, e = a.data.goodsData, o = a.data.aboutData, s = t - e.send_price, i = s * (o.add_price / 100);
            if ("" != this.data.userCoupon) var d = parseFloat(i) + parseFloat(e.send_price) + parseFloat(s) - this.data.userCoupon.coupon.coupon_price; else d = parseFloat(i) + parseFloat(e.send_price) + parseFloat(s);
            this.setData({
                state: !this.data.state,
                add_total_price: d
            });
        }
    },
    Bacon: function() {
        this.setData({
            is_add: 1
        });
    },
    Sausage: function() {
        this.setData({
            is_add: 2
        });
    },
    formSubmit: function(a) {
        var t = this, e = wx.getStorageSync("kundian_farm_uid"), o = app.siteInfo.uniacid, s = a.detail.value.remark, i = t.data.address, d = t.data.userName, n = t.data.phone, r = t.data.state, c = t.data.is_add, u = t.data.goods_id, p = t.data.spec_id, l = t.data.count, _ = t.data.userCoupon, g = 0, f = 0;
        if ("" != _ && (console.log(_), g = _.coupon.id, f = _.coupon.coupon_price), "" == i || "" == d || "" == n) wx.showToast({
            title: "请选择地址"
        }); else {
            var h = {
                op: "addGroupOrder",
                uid: e,
                uniacid: o,
                address: i,
                phone: n,
                name: d,
                is_add: c,
                statu: r,
                goods_id: u,
                spec_id: p,
                count: l,
                remark: s,
                coupon_id: g,
                coupon_price: f
            };
            app.util.request({
                url: "entry/wxapp/group",
                data: h,
                success: function(a) {
                    var e = a.data.order_id;
                    app.util.request({
                        url: "entry/wxapp/groupPay",
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
                                            url: "entry/wxapp/group",
                                            data: {
                                                op: "notify",
                                                order_id: e,
                                                uniacid: o,
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
                            "JSAPI支付必须传openid" == a.data.message ? wx.navigateTo({
                                url: "../../../login/index"
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
        }
    },
    selectCoupon: function(a) {
        var t = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../../user/coupon/useCoupon/index?type=2&totalPrice=" + t
        });
    },
    onShow: function(a) {
        var t = this.data.copyTotalPrice, e = this.data.is_add;
        if (wx.getStorageSync("user_coupon")) {
            var o = wx.getStorageSync("user_coupon");
            wx.removeStorageSync("user_coupon"), 1 == e ? this.setData({
                userCoupon: o,
                add_total_price: parseFloat(this.data.add_total_price - o.coupon.coupon_price).toFixed(2)
            }) : this.setData({
                userCoupon: o,
                total_price: parseFloat(t - o.coupon.coupon_price).toFixed(2)
            });
        } else this.setData({
            userCoupon: [],
            total_price: t
        });
    }
});