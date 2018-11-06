var app = new getApp(), util = require("../../../../utils/util.js");

Page({
    data: {
        types: [],
        exchanges: [],
        userData: [],
        slideData: [],
        arr: [],
        scrollTop: 0,
        tarrHight: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, e = wx.getStorageSync("kundian_farm_uid"), i = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/integral",
            data: {
                op: "getIntrgralData",
                uid: e,
                uniacid: i
            },
            success: function(a) {
                t.setData({
                    types: a.data.typeData,
                    userData: a.data.userData,
                    exchanges: a.data.recommendData,
                    slideData: a.data.slideData
                }), util.computeHeight(t, a.data.recommendData, 2);
            }
        }), app.util.setNavColor(i), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    exchanges: function() {},
    onPageScroll: function(a) {
        for (var t = this, e = a.scrollTop, i = t.data.arr, n = t.data.tarrHight, r = 0; r < t.data.exchanges.length; r++) n[r] < e && 0 == i[r] && (i[r] = !0);
        t.setData({
            arr: i,
            scrollTop: e
        });
    },
    intoDetail: function(a) {
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../exchangedetails/index?goods_id=" + t
        });
    },
    intoExchangeList: function(a) {
        var t = a.currentTarget.dataset.typeid;
        wx.navigateTo({
            url: "../exchange_list/index?type_id=" + t
        });
    },
    intoIntegralRecord: function(a) {
        wx.navigateTo({
            url: "../orderList/index"
        });
    },
    intoDetailSlide: function(a) {
        var t = a.currentTarget.dataset.linktype, e = a.currentTarget.dataset.linkparam;
        1 == t ? wx.navigateTo({
            url: "../../../land/landList/index"
        }) : 2 == t ? 0 != e ? wx.navigateTo({
            url: "../../AdoptRules/index?aid=" + e
        }) : wx.navigateTo({
            url: "../../Adopt/index"
        }) : 3 == t ? wx.navigateTo({
            url: "../../integral/index/index"
        }) : 4 == t ? wx.navigateTo({
            url: "../../../live/index"
        }) : 5 == t ? 0 != e ? wx.navigateTo({
            url: "../../prodeteils/index?goodsid=" + e
        }) : wx.switchTab({
            url: "../../index/index"
        }) : 6 == t ? 0 != e ? wx.navigateTo({
            url: "../../Group/proDetails/index?goods_id=" + e
        }) : wx.navigateTo({
            url: "../../Group/index"
        }) : 8 == t && (0 != e ? wx.navigateTo({
            url: "../../../article/detail/index?aid=" + e
        }) : wx.navigateTo({
            url: "../../../article/index/index"
        }));
    },
    intoIntegral: function(a) {
        wx.navigateTo({
            url: "../record/index"
        });
    }
});