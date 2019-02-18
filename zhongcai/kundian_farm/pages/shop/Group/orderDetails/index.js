var app = new getApp();

Page({
    data: {
        borderImg: "../../../../images/icon/address-line.png",
        orderData: [],
        orderDetail: [],
        aboutData: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, r = a.order_id, o = app.globalData.uid, e = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "getOrderDetail",
                uid: o,
                uniacid: e,
                order_id: r
            },
            success: function(a) {
                t.setData({
                    orderData: a.data.orderData,
                    orderDetail: a.data.orderDetail,
                    aboutData: a.data.aboutData
                });
            }
        }), app.util.setNavColor(e);
        var d = wx.getStorageSync("kundian_farm_setData");
        wx.setNavigationBarColor({
            frontColor: d.front_color,
            backgroundColor: d.background_color
        }), t.setData({
            farmSetData: d
        });
    }
});