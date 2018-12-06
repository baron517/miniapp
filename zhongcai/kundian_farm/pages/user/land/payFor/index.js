var WxParse = require("../../../../../wxParse/wxParse.js"), app = new getApp();

Page({
    data: {
        userName: "",
        userTel: "",
        state: !1,
        rules: !0,
        selectlands: [],
        totalPrice: 0,
        copyTotalPrice: 0,
        lands: [],
        landLimit: [],
        landLimitArr: [],
        couponCount: 0,
        userCoupon: [],
        land_method: "",
        selectLand: [],
        landDetail: [],
        day: [],
        currentIndex: 0,
        background_color: "#16ba63"
    },
    onLoad: function(t) {
        var e = this, a = app.siteInfo.uniacid, n = app.globalData.uid;
        if (2 == t.land_method) {
            var i = t.land_id, o = wx.getStorageSync("selectSpec");
            console.log(o), app.util.request({
                url: "entry/wxapp/land",
                method: "POST",
                data: {
                    op: "getPayLand",
                    uniacid: a,
                    lid: i,
                    selectLand: JSON.stringify(o),
                    land_method: t.land_method,
                    uid: n
                },
                success: function(a) {
                    e.setData({
                        land_method: t.land_method,
                        landDetail: a.data.landDetail,
                        selectLand: o,
                        landLimit: a.data.landLimit,
                        day: a.data.day,
                        totalPrice: a.data.total_price,
                        couponCount: a.data.couponCount,
                        userName: a.data.user.truename,
                        userTel: a.data.user.phone
                    }), "" != a.data.farmRule.value && WxParse.wxParse("article", "html", a.data.farmRule.value, e, 5), 
                    e.totalPrice();
                }
            });
        } else {
            var d = t.lid, r = wx.getStorageSync("Land");
            app.util.request({
                url: "entry/wxapp/land",
                method: "POST",
                data: {
                    op: "getPayLand",
                    uniacid: a,
                    lid: d,
                    selectLand: JSON.stringify(r),
                    uid: n
                },
                success: function(a) {
                    var t = a.data.selectLand;
                    "" != a.data.farmRule.value && WxParse.wxParse("article", "html", a.data.farmRule.value, e, 5), 
                    e.setData({
                        lands: t,
                        couponCount: a.data.couponCount,
                        userName: a.data.user.truename,
                        userTel: a.data.user.phone
                    }), e.totalPrice();
                }
            });
        }
        app.util.setNavColor(a);
    },
    bindPickerChange: function(a) {
        for (var t = this, e = a.currentTarget.dataset.id, n = t.data.lands, i = app.siteInfo.uniacid, o = app.globalData.uid, d = 0; d < n.length; d++) e == n[d].id && (n[d].select_index = a.detail.value), 
        t.setData({
            lands: n
        });
        this.totalPrice();
        var r = t.data.copyTotalPrice;
        app.util.request({
            url: "entry/wxapp/coupon",
            data: {
                op: "getLandCoupon",
                uniacid: i,
                uid: o,
                total_price: r
            },
            success: function(a) {
                t.setData({
                    couponCount: a.data.couponCount,
                    userCoupon: []
                });
            }
        });
    },
    totalPrice: function() {
        var a = this, t = a.data.land_method, e = 0, n = a.data.landLimit;
        if (2 == t) {
            var i = this.data.selectLand, o = this.data.currentIndex;
            i.map(function(a) {
                e = parseFloat(e) + a.price;
            }), a.setData({
                totalPrice: parseFloat(e).toFixed(2),
                copyTotalPrice: parseFloat(e).toFixed(2)
            });
        } else {
            for (var d = a.data.lands, r = 0; r < d.length; r++) e = parseFloat(d[r].selectArea * d[r].landLimit[d[r].select_index].price * d[r].landLimit[d[r].select_index].day) + parseFloat(e);
            a.setData({
                totalPrice: parseFloat(e).toFixed(2),
                copyTotalPrice: parseFloat(e).toFixed(2)
            });
        }
    },
    bindLimitChange: function(a) {
        var t = a.detail.value;
        this.setData({
            currentIndex: t
        }), this.totalPrice();
    },
    nowPay: function(a) {
        var t = this, e = t.data.userName, n = t.data.userTel;
        if ("" == e) return wx.showToast({
            title: "请填写姓名！"
        }), !1;
        if ("" == n) return wx.showToast({
            title: "请填写联系电话"
        }), !1;
        for (var i = t.data.lands, o = (t.data.landLimit, t.data.totalPrice), d = t.data.rules, r = new Array(), s = new Array(), u = new Array(), c = 0; c < i.length; c++) r[c] = i[c].id, 
        s[c] = i[c].selectArea, u[c] = i[c].landLimit[i[c].select_index].id;
        var l = app.siteInfo.uniacid, p = app.globalData.uid, x = t.data.userCoupon, f = 0, m = 0;
        "" != x && (console.log(x), f = x.coupon.id, m = x.coupon.coupon_price), d ? app.util.request({
            url: "entry/wxapp/land",
            method: "POST",
            dataType: "json",
            data: {
                op: "addLandOrder",
                uid: p,
                uniacid: l,
                land_id: r.join("_"),
                land_count: s.join("_"),
                land_limit_id: u.join("_"),
                total_price: o,
                username: e,
                phone: n,
                coupon_id: f,
                coupon_price: m
            },
            success: function(a) {
                var e = a.data.order_id;
                app.util.request({
                    url: "entry/wxapp/landPay",
                    data: {
                        orderid: e,
                        uniacid: l
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
                                        url: "entry/wxapp/land",
                                        data: {
                                            op: "notify_land",
                                            order_id: e,
                                            uniacid: l,
                                            prepay_id: t
                                        },
                                        success: function(a) {
                                            wx.showToast({
                                                title: "支付成功",
                                                success: function(a) {
                                                    wx.removeStorageSync("Land"), wx.redirectTo({
                                                        url: "../personLand/index"
                                                    });
                                                }
                                            });
                                        }
                                    });
                                },
                                fail: function(a) {
                                    wx.redirectTo({
                                        url: "../personLand/index"
                                    });
                                }
                            });
                        } else wx.redirectTo({
                            url: "../personLand/index"
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
                                    url: "../personLand/index"
                                });
                            }
                        });
                    }
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "请先阅读并同意农场规则！"
        });
    },
    newLandPay: function(a) {
        var t = this, e = t.data.userName, n = t.data.userTel;
        if ("" == e) return wx.showToast({
            title: "请填写姓名！"
        }), !1;
        if ("" == n) return wx.showToast({
            title: "请填写联系电话"
        }), !1;
        var i = t.data.selectLand, o = t.data.landLimit, d = t.data.currentIndex, r = t.data.totalPrice, s = t.data.rules, u = app.siteInfo.uniacid, c = wx.getStorageSync("kundian_farm_uid"), l = t.data.userCoupon, p = 0, x = 0;
        if ("" != l && (console.log(l), p = l.coupon.id, x = l.coupon.coupon_price), 0 != c) {
            if (!s) return wx.showModal({
                title: "提示",
                content: "请先阅读并同意农场协议",
                showCancel: !1
            }), !1;
            app.util.request({
                url: "entry/wxapp/land",
                method: "POST",
                dataType: "json",
                data: {
                    op: "insertLandOrder",
                    uid: c,
                    uniacid: u,
                    total_price: r,
                    username: e,
                    phone: n,
                    coupon_id: p,
                    coupon_price: x,
                    selectLand: JSON.stringify(i),
                    lid: t.data.landDetail.id,
                    limit_id: o[d].id
                },
                success: function(a) {
                    var e = a.data.order_id;
                    wx.removeStorageSync("selectSpec"), app.util.request({
                        url: "entry/wxapp/landPay",
                        data: {
                            orderid: e,
                            uniacid: u
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
                                            url: "entry/wxapp/land",
                                            data: {
                                                op: "notify_land",
                                                order_id: e,
                                                uniacid: u,
                                                prepay_id: t
                                            },
                                            success: function(a) {
                                                wx.showToast({
                                                    title: "支付成功",
                                                    success: function(a) {
                                                        wx.removeStorageSync("Land"), wx.redirectTo({
                                                            url: "../personLand/index"
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    },
                                    fail: function(a) {
                                        wx.redirectTo({
                                            url: "../personLand/index"
                                        });
                                    }
                                });
                            } else wx.redirectTo({
                                url: "../personLand/index"
                            });
                        },
                        fail: function(a) {
                            wx.showModal({
                                title: "系统提示",
                                content: a.data.message ? a.data.message : "错误",
                                showCancel: !1,
                                success: function(a) {
                                    a.confirm && wx.redirectTo({
                                        url: "../personLand/index"
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else wx.navigateTo({
            url: "../../../login/index"
        });
    },
    preventTouchMove: function() {},
    hideModal: function() {
        this.setData({
            state: !1
        });
    },
    showModal: function() {
        this.setData({
            state: !0
        });
    },
    inputUserName: function(a) {
        var t = a.detail.value;
        this.setData({
            userName: t
        });
    },
    inputUserTel: function(a) {
        var t = a.detail.value;
        this.setData({
            userTel: t
        });
    },
    changeRules: function() {
        var a = this.data.rules;
        this.setData({
            rules: !a
        });
    },
    selectCoupon: function(a) {
        var t = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../coupon/useCoupon/index?type=4&totalPrice=" + t
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