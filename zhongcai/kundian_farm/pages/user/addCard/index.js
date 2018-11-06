var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        records: [],
        card_num: "",
        card_pwd: "",
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, e = wx.getStorageSync("kundian_farm_uid");
        0 != e ? (app.util.request({
            url: "entry/wxapp/sign",
            data: {
                op: "getCardRecord",
                uid: e,
                uniacid: uniacid
            },
            success: function(a) {
                console.log(a), a.data.cardData && t.setData({
                    records: a.data.cardData
                });
            }
        }), app.util.setNavColor(uniacid)) : wx.redirectTo({
            url: "../../login/index"
        }), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    submitInfo: function(a) {
        var t = wx.getStorageSync("kundian_farm_uid");
        console.log(t);
        var e = a.detail.value.card_num, d = a.detail.value.card_pwd;
        if ("" == e) return wx.showToast({
            title: "请填写卡号"
        }), !1;
        if ("" == d) return wx.showToast({
            title: "请填写密码"
        }), !1;
        var i = this;
        app.util.request({
            url: "entry/wxapp/sign",
            data: {
                op: "addCard",
                uniacid: uniacid,
                uid: t,
                card_num: e,
                card_pwd: d
            },
            success: function(a) {
                0 == a.data.code ? (wx.showToast({
                    title: "绑定成功"
                }), i.setData({
                    card_num: "",
                    card_pwd: ""
                })) : 1 == a.data.code ? wx.showToast({
                    title: "绑定失败"
                }) : 2 == a.data.code ? wx.showModal({
                    title: "提示",
                    content: "卡号或密码输入错误"
                }) : 3 == a.data.code && wx.showModal({
                    title: "提示",
                    content: "卡号已被绑定"
                });
            }
        });
    },
    onShareAppMessage: function(a) {}
});