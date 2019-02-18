var WxParse = require("../../../../wxParse/wxParse.js"), app = new getApp(), uniacid = app.siteInfo.uniacid, uid = app.globalData.uid;

Page({
    data: {
        specVal: [],
        sku_name: "",
        count: 0,
        aid: "",
        animalData: [],
        totalPrice: 0,
        copyTotalPrice: 0,
        couponCount: 0,
        userCoupon: [],
        userName: "",
        userTel: "",
        state: !1,
        rules: !0,
        farmSetData: []
    },
    onLoad: function(a) {
        var e = 0;
        if (wx.getStorageSync("kundian_farm_buy_animal_specVal")) {
            var t = wx.getStorageSync("kundian_farm_buy_animal_specVal"), n = wx.getStorageSync("kundian_farm_buy_animal");
            wx.removeStorageSync("kundian_farm_buy_animal_specVal"), wx.removeStorageSync("kundian_farm_buy_animal");
            var i = a.aid, o = a.sku_name, u = a.count;
            e = u * t.price, this.setData({
                specVal: t,
                sku_name: o,
                count: u,
                aid: i,
                animalData: n,
                totalPrice: e,
                copyTotalPrice: e
            });
        } else {
            var r = wx.getStorageSync("kundian_farm_buy_animal"), c = a.aid, s = a.count;
            e = s * r.price, this.setData({
                count: s,
                aid: c,
                animalData: r,
                totalPrice: e,
                copyTotalPrice: e
            });
        }
        var d = this;
        app.util.request({
            url: "entry/wxapp/coupon",
            data: {
                op: "getUseCouponCount",
                uid: uid,
                uniacid: uniacid,
                type: 3,
                totalprice: e
            },
            success: function(a) {
                if (d.setData({
                    couponCount: a.data.couponCount,
                    userName: a.data.user.truename,
                    userTel: a.data.user.phone
                }), wx.getStorageSync("kundian_farm_setData")) {
                    var e = wx.getStorageSync("kundian_farm_setData");
                    WxParse.wxParse("article", "html", e.farm_rule, d, 5);
                }
            }
        }), d.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    useCoupon: function(a) {
        var e = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../user/coupon/useCoupon/index?type=3&totalPrice=" + e
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this.data.copyTotalPrice;
        if (wx.getStorageSync("user_coupon")) {
            var e = wx.getStorageSync("user_coupon");
            wx.removeStorageSync("user_coupon"), this.setData({
                userCoupon: e,
                totalPrice: parseFloat(a - e.coupon.coupon_price).toFixed(2)
            });
        } else this.setData({
            userCoupon: [],
            totalPrice: a
        });
    },
    surePay: function(a) {
        var e = this, t = e.data.userName, n = e.data.userTel;
        if ("" == t) return wx.showToast({
            title: "请填写姓名！"
        }), !1;
        if ("" == n) return wx.showToast({
            title: "请填写联系电话"
        }), !1;
        var i = e.data.rules, o = e.data.count, u = e.data.aid, r = e.data.specVal, c = e.data.userCoupon, s = 0, d = 0, p = wx.getStorageSync("kundian_farm_uid");
        "" != c && (console.log(c), s = c.coupon.id, d = c.coupon.coupon_price), i ? r ? app.util.request({
            url: "entry/wxapp/animal",
            data: {
                op: "sureAdoptAnimal",
                uid: p,
                uniacid: uniacid,
                count: o,
                spec_id: r.id,
                aid: u,
                coupon_id: s,
                coupon_price: d,
                username: t,
                phone: n
            },
            success: function(a) {
                if (1 == a.data.code) {
                    var t = a.data.order_id;
                    app.util.request({
                        url: "entry/wxapp/animalPay",
                        data: {
                            orderid: t,
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
                                        app.util.request({
                                            url: "entry/wxapp/animal",
                                            data: {
                                                op: "notify",
                                                order_id: t,
                                                uniacid: uniacid,
                                                prepay_id: e
                                            },
                                            success: function(a) {
                                                wx.showToast({
                                                    title: "支付成功",
                                                    success: function(a) {
                                                        wx.redirectTo({
                                                            url: "../../user/Animal/index"
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    },
                                    fail: function(a) {
                                        wx.redirectTo({
                                            url: "../../user/Animal/index"
                                        });
                                    }
                                });
                            } else wx.redirectTo({
                                url: "../../user/Animal/index"
                            });
                        },
                        fail: function(a) {
                            wx.showModal({
                                title: "系统提示",
                                content: a.data.message ? a.data.message : "错误",
                                showCancel: !1,
                                success: function(a) {
                                    a.confirm && wx.redirectTo({
                                        url: "../../user/Animal/index"
                                    });
                                }
                            });
                        }
                    });
                }
            }
        }) : app.util.request({
            url: "entry/wxapp/animal",
            data: {
                op: "sureAdoptAnimal",
                uid: p,
                uniacid: uniacid,
                count: o,
                aid: u,
                coupon_id: s,
                coupon_price: d,
                username: t,
                phone: n
            },
            success: function(a) {
                if (1 == a.data.code) {
                    var t = a.data.order_id;
                    app.util.request({
                        url: "entry/wxapp/animalPay",
                        data: {
                            orderid: t,
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
                                        app.util.request({
                                            url: "entry/wxapp/animal",
                                            data: {
                                                op: "notify",
                                                order_id: t,
                                                uniacid: uniacid,
                                                prepay_id: e
                                            },
                                            success: function(a) {
                                                wx.showToast({
                                                    title: "支付成功",
                                                    success: function(a) {
                                                        wx.redirectTo({
                                                            url: "../../user/Animal/index"
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    },
                                    fail: function(a) {
                                        wx.redirectTo({
                                            url: "../../user/Animal/index"
                                        });
                                    }
                                });
                            } else wx.redirectTo({
                                url: "../../user/Animal/index"
                            });
                        },
                        fail: function(a) {
                            wx.showModal({
                                title: "系统提示",
                                content: a.data.message ? a.data.message : "错误",
                                showCancel: !1,
                                success: function(a) {
                                    a.confirm && wx.redirectTo({
                                        url: "../../user/Animal/index"
                                    });
                                }
                            });
                        }
                    });
                }
            }
        }) : wx.showModal({
            title: "提示",
            content: "请先阅读并同意农场规则！"
        });
    },
    inputUserName: function(a) {
        var e = a.detail.value;
        this.setData({
            userName: e
        });
    },
    inputUserTel: function(a) {
        var e = a.detail.value;
        this.setData({
            userTel: e
        });
    },
    changeRules: function() {
        var a = this.data.rules;
        this.setData({
            rules: !a
        });
    },
    showModal: function() {
        this.setData({
            state: !0
        });
    },
    preventTouchMove: function() {},
    hideModal: function() {
        this.setData({
            state: !1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});