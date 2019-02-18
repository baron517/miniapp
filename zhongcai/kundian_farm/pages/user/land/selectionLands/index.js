var app = new getApp();

Page({
    data: {
        lands: [],
        currentLand: {},
        selectedLand: [],
        sumPrice: 0,
        sumNum: 0,
        state: !1,
        scrollLeft: 0,
        user_uid: 0,
        farmSetData: []
    },
    onLoad: function(a) {
        var e = this, t = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/land",
            data: {
                op: "getLandData",
                uniacid: t
            },
            success: function(a) {
                e.setData({
                    lands: a.data.landData,
                    currentLand: a.data.landData[0]
                });
            }
        });
        var n = a.user_uid, d = wx.getStorageSync("kundian_farm_uid");
        app.loginBindParent(n, d), null != n && 0 != n && e.setData({
            user_uid: n
        }), app.util.setNavColor(t), e.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    onShow: function(a) {
        var e = this.data.user_uid, t = wx.getStorageSync("kundian_farm_uid");
        app.loginBindParent(e, t);
    },
    changeArea: function(a) {
        var t = this, n = a.currentTarget.dataset.id;
        this.data.lands.map(function(a, e) {
            n == a.id && (e <= 1 ? t.setData({
                scrollLeft: 0
            }) : 1 < e && e <= t.data.lands.length - 2 && t.setData({
                scrollLeft: 75 * (e - 1)
            }), t.setData({
                currentLand: a
            }));
        });
    },
    addArea: function(a) {
        var e = this, d = a.currentTarget.dataset.id;
        e.data.lands.map(function(a) {
            a.land.map(function(t) {
                if (t.id == d) if (0 < t.residue_area) if (t.selectArea = parseInt(t.selectArea) + 1, 
                t.area = parseInt(t.area) + 1, t.residue_area -= 1, e.data.currentLand.land.map(function(a) {
                    a.id == d && (a.area = parseInt(a.area) + 1, a.selectArea = parseInt(a.selectArea) + 1, 
                    a.residue_area -= 1);
                }), 0 == e.data.selectedLand.length) e.data.selectedLand.push(t); else {
                    var n = !1;
                    e.data.selectedLand.map(function(a, e) {
                        a.id == d && (a.selectArea = t.selectArea, n = !0);
                    }), n || e.data.selectedLand.push(t);
                } else wx.showModal({
                    title: "温馨提示",
                    content: "您选择的面积已超过剩余种植面积",
                    success: function(a) {
                        a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
                    }
                });
            });
        }), e.setData({
            currentLand: e.data.currentLand,
            lands: e.data.lands,
            selectedLand: e.data.selectedLand
        }), e.sumPrice(e);
    },
    reduceArea: function(a) {
        var t = this, n = a.currentTarget.dataset.id;
        t.data.lands.map(function(a) {
            a.land.map(function(a) {
                a.id == n && (a.selectArea -= 1, a.area -= 1, a.residue_area = parseInt(a.residue_area) + 1, 
                t.data.currentLand.land.map(function(a) {
                    a.id == n && (a.selectArea -= 1, a.area -= 1, a.residue_area = parseInt(a.residue_area) + 1);
                }), t.data.selectedLand.map(function(a, e) {
                    a.id == n && (a.selectArea -= 1, 0 == a.selectArea && t.data.selectedLand.splice(e, 1));
                }));
            });
        }), t.setData({
            currentLand: t.data.currentLand,
            lands: t.data.lands,
            selectedLand: t.data.selectedLand
        }), t.sumPrice(t);
    },
    sumPrice: function(a) {
        var e = 0, t = 0;
        a.data.selectedLand.map(function(a) {
            e += a.minPrice * a.selectArea, t += a.selectArea;
        }), a.setData({
            sumPrice: e.toFixed(2),
            sumNum: t
        });
    },
    Settlement: function() {
        if (0 != wx.getStorageSync("kundian_farm_uid")) {
            for (var a = this.data.selectedLand, e = new Array(), t = 0; t < a.length; t++) e.push(a[t].id);
            0 < e.length ? (wx.setStorageSync("Land", a), wx.navigateTo({
                url: "../../land/payFor/index?lid=" + e.join("_")
            })) : wx.showToast({
                title: "请选择地块！"
            });
        } else wx.navigateTo({
            url: "../../../login/index"
        });
    },
    preventTouchMove: function() {},
    hideModal: function() {
        this.setData({
            state: !1
        });
    },
    showModal: function() {
        0 < this.data.selectedLand.length && this.setData({
            state: !0
        }), console.log(this.data.selectedLand);
    },
    clearAll: function() {
        var a = this;
        a.data.lands.map(function(a) {
            a.land.map(function(a) {
                a.selectArea = 0;
            });
        }), a.data.currentLand.land.map(function(a) {
            a.selectArea = 0;
        }), a.setData({
            currentLand: a.data.currentLand,
            lands: a.data.lands,
            selectedLand: [],
            state: !1
        }), a.sumPrice(a);
    },
    onShareAppMessage: function() {
        var a = wx.getStorageSync("kundian_farm_setData");
        return {
            path: "/kundian_farm/pages/HomePage/index/index?&user_uid=" + wx.getStorageSync("kundian_farm_uid"),
            success: function(a) {},
            title: a.share_land_title
        };
    }
});