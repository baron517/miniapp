var app = new getApp();

Page({
    data: {
        currentState: "1",
        allLands: [],
        currentLand: [],
        page: 1,
        landData: [],
        farmSetData: [],
        currentIndex: "全部"
    },
    onLoad: function(a) {
        this.setData({
            currentLand: this.data.allLands
        });
        var t = this, n = app.globalData.uid, e = app.siteInfo.uniacid;
        t.data.currentState;
        0 != n ? t.getLandData() : wx.redirectTo({
            url: "../../../login/index"
        }), app.util.setNavColor(e), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    getLandData: function() {
        var t = this, a = app.globalData.uid, n = app.siteInfo.uniacid, e = t.data.currentState;
        app.util.request({
            url: "entry/wxapp/land",
            data: {
                op: "getMineLand",
                uid: a,
                uniacid: n,
                current: e
            },
            success: function(a) {
                t.setData({
                    landData: a.data.landData
                });
            }
        });
    },
    changeState: function(a) {
        var t = this, n = [], e = a.currentTarget.dataset.state;
        t.data.allLands.map(function(a) {
            "1" === e ? n.push(a) : "2" === e ? 0 < a.plant.length && n.push(a) : "3" === e && 0 == a.plant.length && n.push(a);
        }), t.setData({
            currentState: e,
            currentLand: n
        }), t.getLandData();
    },
    intoMineLandDetail: function(a) {
        var t = a.currentTarget.dataset.lid;
        2 == a.currentTarget.dataset.landstatus ? wx.showModal({
            title: "提示",
            content: "您的土地已过期",
            showCancel: !1
        }) : wx.navigateTo({
            url: "../index/index?lid=" + t
        });
    },
    gotoBuy: function(a) {
        wx.navigateTo({
            url: "../selectionLands/index"
        });
    },
    onReachBottom: function(a) {
        var e = this, t = app.globalData.uid, n = app.siteInfo.uniacid, d = e.data.currentState, r = e.data.page, i = e.data.landData;
        app.util.request({
            url: "entry/wxapp/land",
            data: {
                op: "getMineLand",
                uid: t,
                uniacid: n,
                current: d,
                page: r
            },
            success: function(a) {
                if (a.data.landData) {
                    for (var t = a.data.landData, n = 0; n < t.length; n++) i.push(t[n]);
                    e.setData({
                        landData: i,
                        page: parseInt(r) + 1
                    });
                }
            }
        });
    }
});