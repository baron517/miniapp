var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        currentIndex: "6",
        isInput: !1,
        page: 1,
        landData: [],
        plate: 1,
        animalData: [],
        farmSetData: []
    },
    onLoad: function(a) {
        app.util.setNavColor(uniacid);
        var t = this.data.currentIndex, n = a.plate;
        this.getInitData(this, uniacid, t, n), this.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    changeIndex: function(a) {
        var t = this.data.plate;
        this.getInitData(this, uniacid, a.currentTarget.dataset.index, t), this.setData({
            currentIndex: a.currentTarget.dataset.index
        });
    },
    getInitData: function(t, a, n, e) {
        1 == e ? app.util.request({
            url: "entry/wxapp/managerLand",
            data: {
                op: "getLand",
                uniacid: a,
                current: n
            },
            success: function(a) {
                console.log(a), t.setData({
                    landData: a.data.landData,
                    page: 1,
                    plate: e
                });
            }
        }) : app.util.request({
            url: "entry/wxapp/managerAnimal",
            data: {
                op: "getAnimal",
                uniacid: a,
                current: n
            },
            success: function(a) {
                console.log(a), t.setData({
                    animalData: a.data.animalData,
                    page: 1,
                    plate: e
                }), wx.setNavigationBarTitle({
                    title: "认养管理"
                });
            }
        });
    },
    isInput: function() {
        this.setData({
            isInput: !0
        });
    },
    confrim: function(a) {
        console.log(a.detail.value);
    },
    onReachBottom: function(a) {
        var t = this, n = t.data.currentIndex, e = t.data.page;
        if (1 == t.data.plate) {
            var i = t.data.landData;
            app.util.request({
                url: "entry/wxapp/managerLand",
                data: {
                    op: "getLand",
                    uniacid: uniacid,
                    current: n,
                    page: e
                },
                success: function(a) {
                    a.data.landData && (a.data.landData.map(function(a) {
                        i.push(a);
                    }), t.setData({
                        landData: i,
                        page: parseInt(e) + 1
                    }));
                }
            });
        } else {
            var d = t.data.animalData;
            app.util.request({
                url: "entry/wxapp/managerAnimal",
                data: {
                    op: "getAnimal",
                    uniacid: uniacid,
                    current: n,
                    page: e
                },
                success: function(a) {
                    a.data.animalData && (a.data.animalData.map(function(a) {
                        d.push(a);
                    }), t.setData({
                        animalData: d,
                        page: parseInt(e) + 1
                    }));
                }
            });
        }
    },
    intoLandDetail: function(a) {
        var t = this.data.plate;
        if (1 == t) {
            var n = a.currentTarget.dataset.mineid;
            wx.navigateTo({
                url: "../../land/myLand/index?mineid=" + n + "&plate=" + t
            });
        } else {
            var e = a.currentTarget.dataset.adoptid;
            wx.navigateTo({
                url: "../../land/myLand/index?adoptid=" + e + "&plate=" + t
            });
        }
    },
    weeding: function(a) {
        var t = this, n = a.currentTarget.dataset.lid, e = app.siteInfo.uniacid, i = this.data.plate;
        app.util.request({
            url: "entry/wxapp/managerLand",
            data: {
                op: "weeding",
                lid: n,
                uniacid: e
            },
            success: function(a) {
                console.log(a), wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1,
                    confirmText: "朕知道了"
                }), t.getInitData(t, e, t.data.currentIndex, i);
            }
        });
    },
    killVer: function(a) {
        var t = this, n = a.currentTarget.dataset.lid, e = app.siteInfo.uniacid, i = this.data.plate;
        app.util.request({
            url: "entry/wxapp/managerLand",
            data: {
                op: "killVer",
                lid: n,
                uniacid: e
            },
            success: function(a) {
                console.log(a), wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1,
                    confirmText: "朕知道了"
                }), t.getInitData(t, e, t.data.currentIndex, i);
            }
        });
    }
});