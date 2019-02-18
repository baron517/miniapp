var app = new getApp(), uniacid = app.siteInfo.uniacid, mudule_name = "kundian_farm_plugin_funding";

Page({
    data: {
        proDetail: [],
        spec: [],
        count: 1,
        name: "",
        phone: "",
        address: "",
        farmsetData: wx.getStorageSync("kundian_farm_setData"),
        funding_set: [],
        return_type: 2,
        return_desc: ""
    },
    onLoad: function(a) {
        var e = this, t = app.util.url("entry/wxapp/project") + "m=" + mudule_name, n = a.count, i = JSON.parse(a.spec), d = a.pid;
        wx.request({
            url: t,
            data: {
                op: "getOrderProDetail",
                uniacid: uniacid,
                pid: d,
                count: n,
                spec_id: i.id
            },
            success: function(a) {
                e.setData({
                    proDetail: a.data.proDetail,
                    total_price: a.data.total_price,
                    spec: i,
                    count: n,
                    funding_set: a.data.funding_set,
                    return_desc: i.spec_desc
                });
            }
        });
    },
    chooseAddr: function(a) {
        var e = this;
        wx.chooseAddress({
            success: function(a) {
                e.setData({
                    name: a.userName,
                    phone: a.telNumber,
                    address: a.provinceName + " " + a.cityName + " " + a.countyName + " " + a.detailInfo
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
                        }) : a.cancel;
                    }
                });
            }
        });
    },
    radioChange: function(a) {
        var e = a.detail.value, t = this.data.proDetail, n = this.data.spec, i = "";
        i = 1 == e ? "平台将以" + t.return_percent + "%的价格回收" : n.spec_desc, this.setData({
            return_type: e,
            return_desc: i
        });
    },
    subOrder: function(a) {
        var e = this, i = wx.getStorageSync("kundian_farm_uid"), t = e.data.count, n = e.data.proDetail, d = e.data.spec, r = e.data.name, c = e.data.phone, u = e.data.address, s = e.data.total_price, o = a.detail.value.remark, p = e.data.return_type;
        if ("" == r || "" == u || "" == c) return wx.showToast({
            title: "请选择地址"
        }), !1;
        if (i) {
            var l = app.util.url("entry/wxapp/project") + "m=" + mudule_name;
            wx.request({
                url: l,
                data: {
                    op: "addOrder",
                    pid: n.id,
                    spec_id: d.id,
                    count: t,
                    name: r,
                    phone: c,
                    address: u,
                    uid: i,
                    uniacid: uniacid,
                    remark: o,
                    total_price: s,
                    return_type: p
                },
                success: function(a) {
                    var n = a.data.order_id;
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
                                                uid: i,
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
                                    fail: function(a) {
                                        backApp();
                                    }
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
                                    a.confirm && backApp();
                                }
                            });
                        }
                    });
                }
            });
        } else wx.navigateTo({
            url: "../../login/index"
        });
    }
});