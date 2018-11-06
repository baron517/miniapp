var _calendarTemplate = require("../../../template/calendarTemplate/calendarTemplate"), _calendarTemplate2 = _interopRequireDefault(_calendarTemplate);

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var app = new getApp();

Page({
    data: {
        bg: "http://ozt9rm7rf.bkt.clouddn.com/images/17/2018/04/l0WW0r0Z12IlAhwJPqUbN0UeBirAJb.png",
        date: 3,
        userInfo: [],
        userData: [],
        is_sign: 2,
        aboutData: []
    },
    onLoad: function(a) {
        (0, _calendarTemplate2.default)();
        var i = this, t = app.globalData.uid, d = wx.getStorageSync("userInfo"), e = app.siteInfo.uniacid, s = this.data.calendar, n = this.data.calendar.curYear, r = this.data.calendar.curMonth, o = wx.getStorageSync("kundian_farm_setData");
        i.setData({
            sign_title: o.sign_title
        }), 0 != t ? app.util.request({
            url: "entry/wxapp/sign",
            data: {
                op: "getSignData",
                uid: t,
                uniacid: e,
                year: n,
                month: r
            },
            success: function(a) {
                if (a.data.signData) {
                    for (var t = a.data.signData, e = 0; e < t.length; e++) for (var n = 0; n < s.days.length; n++) s.days[n].day == t[e].day && (s.days[n].choosed = !0, 
                    s.days[n].sign = !0);
                    i.setData({
                        calendar: s
                    });
                }
                i.setData({
                    userInfo: d.memberInfo,
                    userData: a.data.userData,
                    is_sign: a.data.is_sign,
                    aboutData: a.data.aboutData,
                    bg: a.data.aboutData.sign_banner
                });
            }
        }) : wx.redirectTo({
            url: "../../../login/index"
        }), app.util.setNavColor(e);
    },
    intoIntegral: function(a) {
        wx.navigateTo({
            url: "../exchange/index"
        });
    },
    intoRecord: function(a) {
        wx.navigateTo({
            url: "../record/index"
        });
    },
    addSign: function(a) {
        var t = app.globalData.uid, e = app.siteInfo.uniacid, n = this, i = n.data.calendar.days;
        app.util.request({
            url: "entry/wxapp/sign",
            data: {
                op: "addSign",
                uid: t,
                uniacid: e
            },
            success: function(a) {
                if (1 == a.data.code) {
                    wx.showToast({
                        title: "签到成功"
                    });
                    for (var t = 0; t < i.length; t++) i[t].day == a.data.day && (i[t].choosed = !0);
                    n.setData({
                        userData: a.data.userData,
                        is_sign: 1,
                        "calendar.days": i
                    });
                } else 2 == a.data.code ? wx.showToast({
                    title: "签到失败"
                }) : 3 == a.data.code ? wx.showToast({
                    title: "今日已签到"
                }) : wx.showToast({
                    title: "签到失败1"
                });
            }
        });
    },
    intoSignRule: function(a) {
        wx.navigateTo({
            url: "../sign_rule/index"
        });
    },
    onShareAppMessage: function() {},
    signCard: function() {
        var a = app.globalData.uid, t = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/sign",
            data: {
                op: "signCard",
                uid: a,
                uniacid: t
            },
            success: function(a) {
                console.log(a);
            }
        });
    }
});