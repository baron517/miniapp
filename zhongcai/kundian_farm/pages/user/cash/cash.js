var app = getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        price: 0,
        selected: 0,
        user: [],
        farmSetData: []
    },
    onLoad: function(t) {
        var e = this, a = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "getWallet",
                uniacid: uniacid,
                uid: a
            },
            success: function(t) {
                e.setData({
                    user: t.data.userInfo
                });
            }
        }), e.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    formSubmit: function(t) {
        var e = wx.getStorageSync("kundian_farm_uid"), a = parseFloat(parseFloat(t.detail.value.price).toFixed(2)), i = this.data.user;
        if (!a) return wx.showModal({
            title: "提示",
            content: "请输入提现金额",
            showCancel: !1
        }), !1;
        if (i.money < a) return wx.showModal({
            title: "提示",
            content: "提现金额不足",
            showCancel: !1
        }), !1;
        if (a < parseFloat(this.data.farmSetData.user_withdraw_low_price)) wx.showModal({
            title: "提示",
            content: "提现金额不能低于" + this.data.farmSetData.user_withdraw_low_price + "元",
            showCancel: !1
        }); else {
            var s = t.detail.value.name, n = t.detail.value.mobile;
            if (s && null != s) if (n && null != n) {
                var r = this.data.selected;
                0 == r || 1 == r ? (wx.showLoading({
                    title: "正在提交",
                    mask: !0
                }), app.util.request({
                    url: "entry/wxapp/user",
                    data: {
                        op: "user_withdraw",
                        uid: e,
                        name: s,
                        phone: n,
                        price: a,
                        uniacid: uniacid
                    },
                    success: function(t) {
                        wx.showModal({
                            title: "提示",
                            content: t.data.msg,
                            showCancel: !1,
                            success: function() {
                                wx.redirectTo({
                                    url: "../recode/index"
                                });
                            }
                        });
                    }
                })) : wx.showToast({
                    title: "请选择提现方式"
                });
            } else wx.showToast({
                title: "账号不能为空"
            }); else wx.showToast({
                title: "姓名不能为空"
            });
        }
    },
    select: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            selected: e
        });
    }
});