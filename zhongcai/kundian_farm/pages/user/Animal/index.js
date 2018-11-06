var app = new getApp();

Page({
    data: {
        currentState: 1,
        adoptData: [],
        page: 1,
        farmSetData: []
    },
    onLoad: function(a) {
        this.getAdoptData(), this.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        }), app.util.setNavColor(app.siteInfo.uniacid);
    },
    getAdoptData: function() {
        var t = this, a = app.globalData.uid, e = app.siteInfo.uniacid, n = t.data.currentState;
        0 != a ? app.util.request({
            url: "entry/wxapp/animal",
            data: {
                op: "getMyAnimal",
                uid: a,
                uniacid: e,
                status: n
            },
            success: function(a) {
                t.setData({
                    adoptData: a.data.animalData
                });
            }
        }) : wx.redirectTo({
            url: "../../login/index"
        });
    },
    changeState: function(a) {
        this.setData({
            currentState: a.currentTarget.dataset.state
        }), this.getAdoptData();
    },
    onReachBottom: function() {
        var n = this, a = app.globalData.uid, t = app.siteInfo.uniacid, e = n.data.currentState, i = n.data.page, p = n.data.adoptData;
        app.util.request({
            url: "entry/wxapp/animal",
            data: {
                op: "getMyAnimal",
                uid: a,
                uniacid: t,
                status: e,
                page: i
            },
            success: function(a) {
                if ("" != a.data.animalData) {
                    for (var t = a.data.animalData, e = 0; e < t < length; e++) p.push(t[e]);
                    n.setData({
                        adoptData: p,
                        page: parseInt(i) + 1
                    });
                }
            }
        });
    },
    intoAdoptDetail: function(a) {
        var t = a.currentTarget.dataset.adoptid;
        wx.navigateTo({
            url: "../../shop/adoptiveState/index?adopt_id=" + t
        });
    },
    onShareAppMessage: function() {},
    gotoBuy: function(a) {
        wx.navigateTo({
            url: "../../shop/Adopt/index"
        });
    }
});