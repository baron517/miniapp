function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        currentIndex: 6,
        orderData: [],
        page: 1,
        order_type: 1
    },
    onLoad: function(a) {
        var t = this, e = a.order_type, r = t.data.currentIndex, d = t.data.page;
        t.getOrderData(r, uniacid, d, 0, e), t.setData({
            page: 1,
            order_type: e
        });
    },
    getOrderData: function(a, t, e, r, d) {
        var i, n = this, o = wx.getStorageSync("kundian_farm_uid"), u = n.data.orderData;
        app.util.request({
            url: "entry/wxapp/distribution",
            data: (i = {
                op: "getSaleOrder",
                uniacid: t,
                uid: o,
                status: a
            }, _defineProperty(i, "status", a), _defineProperty(i, "page", e), _defineProperty(i, "order_type", d), 
            i),
            success: function(a) {
                1 == r ? a.data.orderData && a.data.orderData.map(function(a) {
                    u.push(a);
                }) : u = a.data.orderData;
                n.setData({
                    orderData: u
                });
            }
        });
    },
    changeIndex: function(a) {
        var t = a.currentTarget.dataset.index, e = this.data.page, r = this.data.order_type;
        this.getOrderData(t, uniacid, e, 0, r), this.setData({
            page: 1,
            currentIndex: t
        });
    },
    isShow: function(a) {
        var e = a.currentTarget.dataset.id, t = this.data.orderData;
        t.map(function(a) {
            if (a.id == e) {
                var t = a.click;
                a.click = !t;
            }
        }), this.setData({
            orderData: t
        });
    },
    onReachBottom: function(a) {
        var t = this.data.currentIndex, e = parseInt(this.data.page) + 1, r = this.data.order_type;
        this.getOrderData(t, uniacid, e, 1, r), this.setData({
            page: e
        });
    }
});