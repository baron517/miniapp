function _defineProperty(a, e, n) {
    return e in a ? Object.defineProperty(a, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = n, a;
}

var WxParse = require("../../../../../wxParse/wxParse.js"), app = new getApp();

Page(_defineProperty({
    data: {
        aboutData: []
    },
    onLoad: function(a) {
        var e = this, n = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/sign",
            data: {
                op: "getSignRule",
                uniacid: n
            },
            success: function(a) {
                e.setData({
                    aboutData: a.data.aboutData
                }), "" != a.data.aboutData.sign_rule && WxParse.wxParse("article", "html", a.data.aboutData.sign_rule, e, 5);
            }
        }), app.util.setNavColor(n);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
}, "onShareAppMessage", function() {}));