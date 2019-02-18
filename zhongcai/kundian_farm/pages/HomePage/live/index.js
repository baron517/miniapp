var app = new getApp();

Page({
    data: {
        playState: !0,
        LiveIndex: 0,
        farmlands: [],
        liveData: [],
        liveType: [],
        recommendData: [],
        scrollLeft: 0,
        farmSetData: [],
        height: 0
    },
    onLoad: function(a) {
        var i = this;
        i.videoContext = wx.createVideoContext("myVideo", this);
        var t = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/live",
            data: {
                op: "getLiveData",
                uniacid: t
            },
            success: function(a) {
                i.setData({
                    farmland: a.data.liveData,
                    liveType: a.data.liveType,
                    LiveIndex: 0,
                    recommendData: a.data.liveData[0]
                });
            }
        }), app.util.setNavColor(t), i.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        }), wx.getSystemInfo({
            success: function(a) {
                var t, e = a.windowWidth;
                t = a.windowHeight - e / 750 * 215 - 225, i.setData({
                    height: t
                });
            }
        });
    },
    changTab: function(a) {
        var e = this, t = a.currentTarget.dataset.index, i = (e.data.liveType, app.siteInfo.uniacid), n = a.currentTarget.dataset.typename;
        app.util.request({
            url: "entry/wxapp/live",
            data: {
                op: "getLiveTypeData",
                uniacid: i,
                type_id: t
            },
            success: function(a) {
                e.data.liveType.map(function(a, t) {
                    a.name === n && (t <= 1 ? e.setData({
                        scrollLeft: 0
                    }) : 1 < t && t <= e.data.liveType.length - 2 && e.setData({
                        scrollLeft: 100 * (t - 1)
                    }));
                }), e.setData({
                    farmland: a.data.liveData,
                    LiveIndex: t,
                    recommendData: a.data.liveData[0]
                });
            }
        });
    },
    chooseLive: function(a) {
        var t = this, e = a.currentTarget.dataset.id;
        if (t.data.recommendData.id == e) t.data.playState ? (t.videoContext.pause(), t.setData({
            playState: !1
        })) : (t.videoContext.play(), t.setData({
            playState: !0
        })); else for (var i = t.data.farmland, n = 0; n < i.length; n++) e == i[n].id && t.setData({
            recommendData: i[n],
            playState: !0
        });
    },
    statechange: function(a) {
        console.log("live-player code:", a.detail.code);
    },
    play: function(a) {
        this.setData({
            playState: !0
        });
    },
    pause: function(a) {
        this.setData({
            playState: !1
        });
    },
    bindwaiting: function(a) {
        wx.showToast({
            title: "连接成功",
            icon: "loading"
        });
    }
});