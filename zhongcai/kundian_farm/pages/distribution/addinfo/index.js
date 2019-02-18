var app = new getApp(), uniacid = app.siteInfo.uniacid, uid = wx.getStorageSync("kundian_farm_uid");

Page({
    data: {
        click: !0,
        isShow: !1,
        farmSetData: []
    },
    onLoad: function(t) {
        if (0 == uid || "" == uid) wx.navigateTo({
            url: "../../login/index"
        }); else {
            var i = this;
            app.util.request({
                url: "entry/wxapp/distribution",
                data: {
                    op: "apply_become_distribution",
                    uniacid: uniacid
                },
                success: function(t) {
                    console.log(t), i.setData({
                        farmSetData: t.data.farmSetData
                    });
                }
            });
        }
        app.util.setNavColor(uniacid);
    },
    click: function() {
        var t = this.data.click;
        this.setData({
            click: !t
        });
    },
    check: function() {
        this.setData({
            isShow: !0
        });
    },
    preventTouchMove: function() {},
    close: function() {
        this.setData({
            isShow: !1
        });
    },
    formSubmit: function(t) {
        var i = t.detail.value.name, a = t.detail.value.phone;
        if ("" == i) return wx.showToast({
            title: "请填写姓名"
        }), !1;
        if ("" == a) return wx.showToast({
            title: "请填写手机号"
        }), !1;
        if (0 == this.data.click) return wx.showModal({
            title: "提示",
            content: "请先同意申请协议",
            showCancel: !1
        }), !1;
        var e = t.detail.formId;
        app.util.request({
            url: "entry/wxapp/distribution",
            data: {
                op: "apply_distribution",
                uniacid: uniacid,
                name: i,
                phone: a,
                uid: uid,
                form_id: e
            },
            success: function(t) {
                wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1,
                    success: function() {
                        wx.switchTab({
                            url: "../../user/center/index"
                        });
                    }
                });
            }
        });
    }
});