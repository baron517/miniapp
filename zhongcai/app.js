App({
    onLaunch: function() {
        var i = this, n = this;
        wx.getStorageSync("kundian_farm_uid") && (n.globalData.uid = wx.getStorageSync("kundian_farm_uid"), 
        n.globalData.sessionid = wx.getStorageSync("kundian_farm_sessionid"), n.globalData.userInfo = wx.getStorageSync("kundian_farm_userInfo")), 
        wx.getSystemInfo({
            success: function(n) {
                i.globalData.sysData = n;
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onError: function(n) {},
    util: require("we7/resource/js/util.js"),
    loginBindParent: function(n, i) {
        null != i && 0 != i && null != n && 0 != n && this.bindParent(n, i);
    },
    bindParent: function(n, i) {
        null == n && 0 == n || this.util.request({
            url: "entry/wxapp/distribution",
            data: {
                op: "bindParent",
                user_uid: n,
                uniacid: this.siteInfo.uniacid,
                uid: i
            },
            success: function(n) {
                console.log(n);
            },
            error: function(n) {
                console.log(n);
            }
        });
    },
    globalData: {
        userInfo: null,
        uid: "",
        sessionid: "",
        sysData: {}
    },
    siteInfo: require("siteinfo.js")
});