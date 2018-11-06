var app = new getApp();

Page({
    data: {
        buyList: [],
        checkAll: !1,
        sumPrice: 0,
        cart_id: [],
        page: 1,
        farmSetData: []
    },
    onLoad: function(t) {
        var a = this, i = app.globalData.uid, e = app.siteInfo.uniacid;
        0 != i ? app.util.request({
            url: "entry/wxapp/cart",
            data: {
                op: "cartList",
                uid: i,
                uniacid: e
            },
            success: function(t) {
                a.setData({
                    buyList: t.data.cartData
                });
            }
        }) : wx.redirectTo({
            url: "../../login/index"
        }), app.util.setNavColor(e), a.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    reduceNum: function(t) {
        var i = this, e = t.currentTarget.dataset.id, a = app.globalData.uid, c = app.siteInfo.uniacid, u = i.data.buyList;
        app.util.request({
            url: "entry/wxapp/cart",
            data: {
                op: "reducuCount",
                uid: a,
                uniacid: c,
                id: e
            },
            success: function(t) {
                if (1 == t.data.code) for (var a = 0; a < u.length; a++) u[a].id == e && (t.data.count ? u[a].count = t.data.count : u.splice(a, 1)); else wx.showToast({
                    title: "操作失败"
                });
                i.setData({
                    buyList: u
                });
            }
        });
    },
    addNum: function(t) {
        var i = this, e = t.currentTarget.dataset.id, a = app.globalData.uid, c = app.siteInfo.uniacid, u = i.data.buyList;
        app.util.request({
            url: "entry/wxapp/cart",
            data: {
                op: "addCount",
                uid: a,
                uniacid: c,
                id: e
            },
            success: function(t) {
                if (1 == t.data.code) for (var a = 0; a < u.length; a++) u[a].id == e && (u[a].count = t.data.count); else wx.showToast({
                    title: "操作失败"
                });
                i.setData({
                    buyList: u
                });
            }
        });
    },
    checked: function(t) {
        var a = this, i = t.currentTarget.dataset.id, e = 0, c = a.data.cart_id;
        a.data.buyList.map(function(t) {
            if (t.id == i) if (t.check = !t.check, t.check) c.push(i); else for (var a = 0; a < c.length; a++) c[a] == i && c.splice(a, 1);
            e += t.price * t.count;
        }), a.setData({
            buyList: a.data.buyList
        }), a.sumPrice(), e == a.data.sumPrice ? a.setData({
            checkAll: !0
        }) : a.setData({
            checkAll: !1
        });
    },
    sumPrice: function() {
        var a = 0;
        this.data.buyList.map(function(t) {
            t.goodsStock >= t.count && t.check && (a += t.count * t.price);
        }), this.setData({
            sumPrice: a.toFixed(2)
        });
    },
    checkAll: function() {
        for (var a = this, t = a.data.buyList, i = new Array(), e = 0; e < t.length; e++) 0 < t[e].goodsStock && i.push(t[e].id);
        a.data.buyList.map(function(t) {
            a.data.checkAll ? t.check = !1 : t.check = !0;
        }), a.setData({
            checkAll: !a.data.checkAll,
            buyList: a.data.buyList,
            cart_id: i
        }), a.sumPrice();
    },
    deleteItem: function(t) {
        var i = this, e = t.currentTarget.dataset.id, a = app.globalData.uid, c = app.siteInfo.uniacid;
        i.data.buyList;
        i.data.buyList.map(function(t, a) {
            t.id == e && i.data.buyList.splice(a, 1);
        }), i.setData({
            buyList: i.data.buyList
        }), 0 == i.data.buyList.length && i.setData({
            checkAll: !1
        }), app.util.request({
            url: "entry/wxapp/cart",
            data: {
                op: "deleteCart",
                uid: a,
                uniacid: c,
                id: e
            },
            success: function(t) {
                1 == t.data.code ? wx.showToast({
                    title: "已删除"
                }) : wx.showToast({
                    title: "操作失败"
                });
            }
        }), i.sumPrice();
    },
    intoJieSuan: function(t) {
        var a = this.data.cart_id, i = a.join("_");
        "" == a || 0 == a.length ? wx.showToast({
            title: "请选择商品"
        }) : wx.navigateTo({
            url: "../confrimOrder/index?cart_id=" + i
        });
    },
    onReachBottom: function(t) {
        var e = this, a = app.globalData.uid, i = app.siteInfo.uniacid, c = e.data.page, u = e.data.cartData;
        app.util.request({
            url: "entry/wxapp/cart",
            data: {
                op: "cartList",
                uid: a,
                uniacid: i,
                page: c
            },
            success: function(t) {
                if ("" != t.data.cartData) {
                    for (var a = t.data.cartData, i = 0; i < a.length; i++) u.push(a[i]);
                    e.setData({
                        buyList: u,
                        page: parseInt(c) + 1
                    });
                }
            }
        });
    },
    goBuyGoods: function(t) {
        wx.switchTab({
            url: "../index/index"
        });
    }
});