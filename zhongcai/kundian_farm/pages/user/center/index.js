var app = new getApp();

Page({
    data: {
        nickName: "",
        avatarUrl: "../../../images/icon/moren.png",
        back_img: "",
        noPayCount: 0,
        peiCount: 0,
        getCount: 0,
        back_color: "",
        is_admin: 2,
        setData: [],
        is_distributor: 0,
        aboutData: []
    },
    onLoad: function(a) {
        var n = this, t = wx.getStorageSync("kundian_farm_uid"), e = app.siteInfo.uniacid, i = wx.getStorageSync("kundian_farm_setData"), o = "#FC8535";
        i.center_back_color && (o = i.center_back_color), n.getCenterData(), t ? n.getUserData() : wx.navigateTo({
            url: "../../login/index"
        }), app.util.setNavColor(e), n.setData({
            setData: i,
            back_color: o
        });
    },
    getUserData: function() {
        var n = this, a = wx.getStorageSync("kundian_farm_uid"), t = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "getUserInfo",
                uid: a,
                uniacid: t
            },
            success: function(a) {
                a.data.userInfo.avatarurl && null != a.data.userInfo.avatarurl && n.setData({
                    nickName: a.data.userInfo.nickname,
                    avatarUrl: a.data.userInfo.avatarurl,
                    noPayCount: a.data.noPayCount,
                    peiCount: a.data.peiCount,
                    getCount: a.data.getCount,
                    is_admin: a.data.is_admin,
                    is_distributor: a.data.userInfo.is_distributor
                });
            }
        });
    },
    getCenterData: function() {
        var n = this, a = wx.getStorageSync("kundian_farm_uid"), t = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "getCenterData",
                uid: a,
                uniacid: t
            },
            success: function(a) {
                n.setData({
                    is_admin: a.data.is_admin,
                    aboutData: a.data.aboutData,
                    back_img: a.data.back_img,
                    page: a.data.page
                });
            }
        });
    },
    onShow: function(a) {
        var n = this, t = wx.getStorageSync("kundian_farm_uid"), e = (app.siteInfo.uniacid, 
        wx.getStorageSync("kundian_farm_setData"));
        if (t) {
            var i = wx.getStorageSync("kundian_farm_userInfo");
            i && n.setData({
                avatarUrl: i.avatar,
                nickName: i.nickname
            }), n.getUserData();
        } else n.setData({
            setData: e
        });
    },
    chooseAddress: function(a) {
        wx.chooseAddress({
            success: function(a) {}
        });
    },
    intoMyCart: function(a) {
        wx.navigateTo({
            url: "../../shop/buyCar/index"
        });
    },
    intoOrder: function(a) {
        var n = a.currentTarget.dataset.status;
        wx.navigateTo({
            url: "../../shop/orderList/index?status=" + n
        });
    },
    intoGroupShop: function(a) {
        wx.navigateTo({
            url: "../../shop/Group/index/index"
        });
    },
    intoIntegralShop: function(a) {
        wx.navigateTo({
            url: "../../shop/integral/exchange/index"
        });
    },
    intoGroupOrder: function(a) {
        wx.navigateTo({
            url: "../../shop/Group/orderList/index"
        });
    },
    intoMyAnimal: function(a) {
        wx.navigateTo({
            url: "../Animal/index"
        });
    },
    intoMyLand: function(a) {
        wx.navigateTo({
            url: "../land/personLand/index"
        });
    },
    updateUserInfo: function(a) {
        var o = this, r = getApp(), u = r.siteInfo.uniacid;
        r.util.getUserInfo(function(a) {
            r.globalData.userInfo = a.memberInfo, r.globalData.uid = a.memberInfo.uid, r.globalData.sessionid = a.sessionid, 
            wx.setStorageSync("kundian_farm_uid", a.memberInfo.uid), wx.setStorageSync("kundian_farm_userInfo", a.memberInfo), 
            wx.setStorageSync("kundian_farm_sessionid", a.sessionid);
            var n = a.memberInfo, t = n.avatar, e = n.nickname, i = n.uid;
            r.util.request({
                url: "entry/wxapp/index",
                data: {
                    op: "login",
                    avatar: t,
                    nickname: e,
                    uid: i,
                    uniacid: u
                },
                success: function(a) {
                    1 == a.data.code && (wx.showToast({
                        title: "操作成功"
                    }), o.setData({
                        nickName: e,
                        avatarUrl: t
                    }));
                }
            });
        }, a.detail);
    },
    onPullDownRefresh: function(a) {
        var n = this;
        if (app.globalData.userInfo.niackname) n.setData({
            nickName: app.globalData.userInfo.nickname,
            avatarUrl: app.globalData.userInfo.avatar
        }); else if (wx.getStorageSync("kundian_farm_userInfo")) {
            var t = wx.getStorageSync("kundian_farm_userInfo");
            n.setData({
                nickName: t.nickname,
                avatarUrl: t.avatar
            });
        } else if ("" != app.globalData.uid) {
            var e = app.globalData.uid;
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    op: "getUserInfo",
                    uid: e,
                    uniacid: unaicid
                },
                success: function(a) {
                    n.setData({
                        nickName: a.data.userInfo.nickname,
                        avatarUrl: a.data.userInfo.avatarurl
                    });
                }
            });
        }
        wx.stopPullDownRefresh();
    },
    intoCouponList: function(a) {
        wx.navigateTo({
            url: "../coupon/myCoupon/index"
        });
    },
    intoQuestion: function(a) {
        wx.navigateTo({
            url: "../../HomePage/issue/index"
        });
    },
    intoCard: function(a) {
        wx.navigateTo({
            url: "../addCard/index"
        });
    },
    intoDistribution: function(a) {
        var n = this.data.is_distributor;
        1 == n ? wx.navigateTo({
            url: "../../distribution/index/index"
        }) : 2 == n ? wx.navigateTo({
            url: "../../distribution/examine/index"
        }) : wx.navigateTo({
            url: "../../distribution/addinfo/index"
        });
    },
    intoAdmin: function(a) {
        wx.navigateTo({
            url: "../userCenter/index"
        });
    },
    callPhone: function(a) {
        var n = a.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: n
        });
    },
    intoWallet: function(a) {
        wx.navigateTo({
            url: "../wallet/index"
        });
    },
    intoMenuDetail: function(a) {
        var n = a.currentTarget.dataset.menutype, t = a.currentTarget.dataset.url;
        if ("center_address" == n) wx.chooseAddress({
            success: function(a) {}
        }); else if ("center_sale" == n) {
            var e = this.data.is_distributor;
            1 == e ? wx.navigateTo({
                url: "../../distribution/index/index"
            }) : 2 == e ? wx.navigateTo({
                url: "../../distribution/examine/index"
            }) : wx.navigateTo({
                url: "../../distribution/addinfo/index"
            });
        } else wx.navigateTo({
            url: "../../" + t
        });
    }
});