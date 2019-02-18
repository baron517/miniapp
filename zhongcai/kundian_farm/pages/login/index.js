var app = new getApp();

Page({
    data: {},
    onLoad: function(n) {
        app.util.setNavColor(app.siteInfo.uniacid);
    },
    updateUserInfo: function(n) {
        var e = new getApp(), t = e.siteInfo.uniacid;
        e.util.getUserInfo(function(n) {
            e.globalData.userInfo = n.memberInfo, e.globalData.uid = n.memberInfo.uid, e.globalData.sessionid = n.sessionid, 
            wx.setStorageSync("kundian_farm_uid", n.memberInfo.uid), wx.setStorageSync("kundian_farm_userInfo", n.memberInfo), 
            wx.setStorageSync("kundian_farm_sessionid", n.sessionid);
            var a = n.memberInfo, o = {
                avatar: a.avatar,
                uid: a.uid,
                nickname: a.nickname,
                uniacid: t,
                op: "login"
            };
            e.util.request({
                url: "entry/wxapp/index",
                data: o,
                success: function(n) {
                    1 == n.data.code ? wx.showToast({
                        title: "登陆成功",
                        success: function(n) {
                            wx.navigateBack({
                                delta: 1
                            });
                        }
                    }) : wx.showToast({
                        title: "登录失败"
                    });
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});