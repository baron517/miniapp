var app = new getApp(), uniacid = app.siteInfo.uniacid, mudule_name = "kundian_farm_plugin_funding", WxParse = require("../../../../wxParse/wxParse.js");

Page({
    data: {
        isShow: !1,
        animationData: {},
        currentId: 1,
        success: !1,
        isBuy: !1,
        chooseNum: 1,
        proDetail: [],
        spec: [],
        currentSpec: [],
        farmSetData: wx.getStorageSync("kundian_farm_setData"),
        progressList: []
    },
    onLoad: function(t) {
        this.videoContext = wx.createVideoContext("myVideo", this);
        var a = this, e = t.pid, i = app.util.url("entry/wxapp/project") + "m=" + mudule_name;
        wx.request({
            url: i,
            data: {
                op: "getProDetail",
                uniacid: uniacid,
                pid: e
            },
            success: function(t) {
                a.setData({
                    proDetail: t.data.proDetail,
                    spec: t.data.spec,
                    progressList: t.data.progress
                }), "" != t.data.proDetail.project_detail && WxParse.wxParse("article", "html", t.data.proDetail.project_detail, a, 5);
                var e = wx.createAnimation({
                    transformOrigin: "50% 50%",
                    duration: 1e3,
                    timingFunction: "ease",
                    delay: 0
                });
                e.width(a.data.proDetail.progress + "%").step({
                    duration: 1e3
                }), a.setData({
                    animationData: e.export()
                });
            }
        });
    },
    showVideo: function() {
        this.setData({
            isShow: !0
        }), this.videoContext.play();
    },
    hiddenVideo: function() {
        this.setData({
            isShow: !1
        }), this.videoContext.pause();
    },
    chooseLevel: function(t) {
        var e = this, a = t.currentTarget.dataset.id;
        this.data.spec.map(function(t) {
            t.id == a && e.setData({
                currentSpec: t
            });
        }), this.setData({
            currentId: a
        });
    },
    buyNow: function() {
        this.setData({
            isBuy: !0
        });
    },
    close: function() {
        this.setData({
            isBuy: !1
        });
    },
    preventTouchMove: function() {},
    reduce: function() {
        var t = this.data.chooseNum;
        if (1 === t) return !1;
        1 < t && this.setData({
            chooseNum: t - 1
        });
    },
    add: function() {
        var t = this.data.chooseNum;
        this.setData({
            chooseNum: t + 1
        });
    },
    goHome: function(t) {
        wx.switchTab({
            url: "../../HomePage/index/index"
        });
    },
    sureSelect: function(t) {
        var e = this.data.currentSpec, a = wx.getStorageSync("kundian_farm_uid"), i = this.data.chooseNum;
        if (a) if ("" != e) {
            var s = JSON.stringify(e), o = this.data.proDetail;
            wx.navigateTo({
                url: "../confrimOrder/index?count=" + i + "&spec=" + s + "&pid=" + o.id
            });
        } else wx.showToast({
            title: "请选择档位"
        }); else wx.navigateTo({
            url: "../../login/index"
        });
    },
    progressHistory: function(t) {
        var e = this.data.proDetail.id;
        wx.navigateTo({
            url: "../progress/index?pid=" + e
        });
    }
});