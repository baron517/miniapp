var app = new getApp();

Page({
    data: {
        animalData: [],
        adoptData: [],
        between_day: 0,
        statusData: [],
        adopt_id: "",
        page: 1,
        state: 1,
        isslaugHter: !1,
        farmSetData: [],
        isShow: !1
    },
    onLoad: function(a) {
        var t = this, e = app.siteInfo.uniacid, i = a.adopt_id;
        app.util.request({
            url: "entry/wxapp/animal",
            data: {
                op: "getAdoptDetail",
                uniacid: e,
                adopt_id: i
            },
            success: function(a) {
                t.setData({
                    animalData: a.data.animalData,
                    adoptData: a.data.adoptData,
                    between_day: a.data.between_day,
                    statusData: a.data.statusData,
                    adopt_id: i
                });
            }
        }), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        }), app.util.setNavColor(e);
    },
    onReachBottom: function(a) {
        var i = this, t = app.siteInfo.uniacid, e = i.data.adopt_id, s = i.data.statusData, n = i.data.page;
        app.util.request({
            url: "entry/wxapp/animal",
            data: {
                op: "getStatusData",
                uniacid: t,
                adopt_id: e,
                page: n
            },
            success: function(a) {
                if (a.data.statusData) {
                    for (var t = a.data.statusData, e = 0; e < t.length; e++) s.push(t[e]);
                    i.setData({
                        statusData: s,
                        page: parseInt(n) + 1
                    });
                }
            }
        });
    },
    preImg: function(a) {
        for (var t = this.data.statusData, e = a.currentTarget.dataset.sid, i = a.currentTarget.dataset.index, s = new Array(), n = 0; n < t.length; n++) t[n].id == e && (s = t[n].src);
        wx.previewImage({
            current: s[i],
            urls: s
        });
    },
    kellSend: function(a) {
        var t = this.data.adopt_id;
        wx.navigateTo({
            url: "../../user/confirmOrder/index?adopt_id=" + t
        });
    },
    slaugHter: function() {
        this.setData({
            isslaugHter: !0
        });
    },
    cancel: function() {
        this.setData({
            isslaugHter: !1
        });
    },
    confrim: function() {},
    preventTouchMove: function() {},
    showVideo: function() {
        this.setData({
            isShow: !0
        });
    },
    hideVideo: function() {
        this.setData({
            isShow: !1
        });
    }
});