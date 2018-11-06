var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        statistics: [],
        total_user: 0,
        farmSetData: []
    },
    onLoad: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/manager",
            data: {
                op: "getStatisticsData",
                uniacid: uniacid
            },
            success: function(t) {
                a.setData({
                    statistics: t.data.statistics,
                    total_user: t.data.total_user
                });
            }
        }), app.util.setNavColor(uniacid), a.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    intoAdminShopOrder: function(t) {
        wx.navigateTo({
            url: "../../shop/sale/orderList/index?type=1"
        });
    },
    intoAdminGroupOrder: function(t) {
        wx.navigateTo({
            url: "../../shop/sale/orderList/index?type=2"
        });
    },
    intoAdminIntegralOrder: function(t) {
        wx.navigateTo({
            url: "../../shop/sale/orderList/index?type=3"
        });
    },
    intoAdminLandManager: function(t) {
        wx.navigateTo({
            url: "../land/myLandlist/index?plate=1"
        });
    },
    intoAdminAnimalManager: function(t) {
        wx.navigateTo({
            url: "../land/myLandlist/index?plate=2"
        });
    },
    getSiteInfo: function(t) {
        var a = app.siteInfo;
        console.log(a);
        var i = "站点信息：uniacid=" + a.uniacid + ";acid=" + a.acid + ";multiid=" + a.multiid + ";version=" + a.version + ";siteroot=" + a.siteroot;
        wx.showModal({
            title: "提示",
            content: i,
            showCancel: !1
        });
    },
    intoDevice: function(t) {
        wx.navigateTo({
            url: "../device/index"
        });
    },
    intoRelays: function(t) {
        wx.navigateTo({
            url: "../relays/index"
        });
    }
});