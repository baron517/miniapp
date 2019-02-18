var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        landType: [],
        currentLand: [],
        currentIndex: 1,
        page: 1
    },
    onLoad: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/land",
            data: {
                op: "getLandList",
                uniacid: uniacid
            },
            success: function(a) {
                t.setData({
                    landType: a.data.landType,
                    currentLand: a.data.landData,
                    currentIndex: a.data.landType[0].id
                });
            }
        });
    },
    changeArea: function(a) {
        var t = a.currentTarget.dataset.id;
        this.getLandData(t, 0, 1);
    },
    getLandData: function(n, e, d) {
        var i = this;
        d = 1 == e ? parseInt(d) + 1 : 1, app.util.request({
            url: "entry/wxapp/land",
            data: {
                op: "getLandByType",
                uniacid: uniacid,
                type_id: n,
                page: d
            },
            success: function(a) {
                if (1 == e) {
                    var t = i.data.currentLand;
                    if (a.data.landData) a.data.landData.map(function(a) {
                        t.push(a);
                    }), i.setData({
                        currentLand: t,
                        currentIndex: n,
                        page: d
                    });
                } else i.setData({
                    currentLand: a.data.landData,
                    currentIndex: n,
                    page: 1
                });
            }
        });
    },
    onReachBottom: function(a) {
        var t = this.data.currentIndex, n = this.data.page;
        this.getLandData(t, 1, n);
    },
    intoLandDetail: function(a) {
        var t = a.currentTarget.dataset.lid;
        wx.navigateTo({
            url: "../landDetails/index?lid=" + t
        });
    }
});