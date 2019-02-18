var app = new getApp();

Page({
    data: {
        state: !1,
        count: 1,
        adopTime: "",
        animalData: [],
        animalSpecItem: [],
        specVal: [],
        aid: "",
        sku_name: "",
        aboutData: [],
        farmSetData: [],
        isShow: !1
    },
    preventTouchMove: function() {},
    onLoad: function(a) {
        var t = this, e = a.aid, n = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/animal",
            data: {
                op: "getAnimalDetailData",
                aid: e,
                uniacid: n
            },
            success: function(a) {
                t.setData({
                    animalData: a.data.animalData,
                    animalSpecItem: a.data.animalSpecItem,
                    aid: e,
                    aboutData: a.data.aboutData
                });
            }
        });
        var i = a.user_uid, s = wx.getStorageSync("kundian_farm_uid");
        app.loginBindParent(i, s), null != i && 0 != i && t.setData({
            user_uid: i
        });
        var o = 0;
        -1 < app.globalData.sysData.model.indexOf("iPhone X") && (o = 68), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            bottom: o
        }), app.util.setNavColor(n);
    },
    onShow: function(a) {
        var t = this.data.user_uid, e = wx.getStorageSync("kundian_farm_uid");
        app.loginBindParent(t, e), null != t && 0 != t && that.setData({
            user_uid: t
        });
    },
    showMode: function() {
        var a = wx.getStorageSync("kundian_farm_uid");
        null != a && 0 != a ? this.setData({
            state: !0
        }) : wx.navigateTo({
            url: "../../login/index"
        });
    },
    hideModal: function() {
        this.setData({
            state: !1
        });
    },
    reduceNum: function() {
        1 != this.data.count && this.setData({
            count: this.data.count - 1
        });
    },
    addNum: function() {
        var a = this, t = a.data.count, e = a.data.specVal, n = a.data.animalData;
        1 == n.is_open_sku ? "" != e ? parseInt(t) + 1 > e.count ? wx.showToast({
            title: "库存不足"
        }) : a.setData({
            count: parseInt(t) + 1
        }) : wx.showToast({
            title: "请选择规格"
        }) : parseInt(t) + 1 > n.count ? wx.showToast({
            title: "库存不足"
        }) : a.setData({
            count: parseInt(t) + 1
        });
    },
    chooseNum: function(a) {
        this.setData({
            chooseNum: a.detail.value
        });
    },
    chooseSpec: function(a) {
        for (var i = this, t = i.data.aid, s = a.currentTarget.dataset.specid, o = a.currentTarget.dataset.valid, e = app.siteInfo.uniacid, u = i.data.animalSpecItem, c = new Array(), n = 0; n < u.length; n++) {
            s == u[n].id && (u[n].is_select = 1);
            for (var d = 0; d < u[n].specVal.length; d++) s == u[n].id && (u[n].specVal[d].is_select = 0), 
            o == u[n].specVal[d].id && (u[n].specVal[d].is_select = 1), 1 == u[n].specVal[d].is_select && c.push(u[n].specVal[d].id);
        }
        var l = c.join(",");
        i.setData({
            animalSpecItem: u
        }), app.util.request({
            url: "entry/wxapp/animal",
            data: {
                op: "getAnimalSpec",
                uniacid: e,
                spec_id: l,
                aid: t
            },
            success: function(a) {
                if (1 == a.data.code) i.setData({
                    specVal: a.data.specVal
                }); else if (2 == a.data.code) {
                    for (var t = 0; t < u.length; t++) {
                        u[t].id == s && (u[t].is_select = 1);
                        for (var e = 0; e < u[t].specVal.length; e++) {
                            u[t].specVal[e].id == o && (u[t].specVal[e].is_select = 0, u[t].specVal[e].is_count = 0);
                            for (var n = 0; n < c.length; n++) c[n] == o && c.splice(n, 1);
                        }
                    }
                    wx.showToast({
                        title: "库存不足"
                    }), i.setData({
                        specVal: []
                    });
                }
                i.setData({
                    animalSpecItem: u,
                    sku_name: a.data.sku_name_str,
                    count: 1
                });
            }
        });
    },
    goHome: function(a) {
        wx.switchTab({
            url: "../../HomePage/index/index"
        });
    },
    doCall: function(a) {
        var t = a.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    sureAnimal: function(a) {
        var t = this, e = t.data.aid, n = t.data.animalData, i = t.data.specVal, s = t.data.count;
        app.globalData.uid, app.siteInfo.uniacid;
        1 == n.is_open_sku ? "" != i ? parseInt(s) + 1 > i.count ? wx.showToast({
            title: "库存不足"
        }) : (wx.setStorageSync("kundian_farm_buy_animal_specVal", i), wx.setStorageSync("kundian_farm_buy_animal", n), 
        wx.navigateTo({
            url: "../confirmAdopt/index?count=" + s + "&aid=" + e + "&sku_name=" + this.data.sku_name
        })) : wx.showToast({
            title: "请选择规格"
        }) : parseInt(s) + 1 > n.count ? wx.showToast({
            title: "库存不足"
        }) : (wx.setStorageSync("kundian_farm_buy_animal", n), wx.navigateTo({
            url: "../confirmAdopt/index?count=" + s + "&aid=" + e
        }));
    },
    onShareAppMessage: function() {
        var a = wx.getStorageSync("kundian_farm_uid");
        return {
            path: "/kundian_farm/pages/shop/AdoptRules/index?aid=" + this.data.animalData.id + "&user_uid=" + a,
            success: function(a) {},
            title: this.data.animalData.animal_name,
            imageUrl: this.data.animalData.animal_src
        };
    },
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