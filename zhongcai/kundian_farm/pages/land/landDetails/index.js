var WxParse = require("../../../../wxParse/wxParse.js"), app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        selectLandSpec: [],
        isReturn: !1,
        isShow: !1,
        seedData: [],
        landSpec: [],
        landLimit: [],
        total_price: 0,
        farmSetData: wx.getStorageSync("kundian_farm_setData")
    },
    onLoad: function(a) {
        var e = this, t = a.lid;
        app.util.request({
            url: "entry/wxapp/land",
            data: {
                op: "getLandDetail",
                uniacid: uniacid,
                lid: t
            },
            success: function(a) {
                var t = 0;
                -1 < app.globalData.sysData.model.indexOf("iPhone X") && (t = 68), e.setData({
                    landDetail: a.data.landDetail,
                    seedData: a.data.seedData,
                    landSpec: a.data.landSpec,
                    landLimit: a.data.landLimit,
                    bottom: t
                }), a.data.landDetail.land_desc && WxParse.wxParse("article", "html", a.data.landDetail.land_desc, e, 5);
            }
        });
    },
    selectArea: function(a) {
        var t = this, e = a.currentTarget.dataset.areaid;
        this.data.landSpec.map(function(a) {
            e == a.id && t.setData({
                selectLandSpec: a
            });
        });
    },
    onPageScroll: function(a) {
        var t = !1;
        200 < a.scrollTop && (t = !0), this.setData({
            isReturn: t
        });
    },
    returnTop: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },
    showVideo: function() {
        this.setData({
            isShow: !0
        });
    },
    hideVideo: function() {
        this.setData({
            isShow: !1
        });
    },
    select: function(a) {
        var e = a.currentTarget.dataset.id, t = this.data.landSpec;
        t.map(function(a) {
            if (a.id === e) {
                var t = a.select;
                a.select = !t;
            } else a.select = !1;
        }), this.setData({
            landSpec: t
        }), this.getTotalPrice();
    },
    getTotalPrice: function(a) {
        var t = this.data.landSpec, e = this.data.landLimit, i = 0;

        t.map(function(a) {

            a.select && (i = parseFloat(i) + parseFloat(a.price));

            console.log(i);

        }), this.setData({
            total_price: i.toFixed(2)
        });

    },
    toPay: function(a) {
        var t = this.data.landDetail, e = this.data.landSpec, i = new Array();
        if (e.map(function(a) {
            a.select && i.push(a);
        }), !(0 < i.length)) return wx.showModal({
            title: "提示",
            content: "请选择土地面积",
            showCancel: !1
        }), !1;
        wx.setStorageSync("selectSpec", i), wx.navigateTo({
            url: "../../user/land/payFor/index?land_id=" + t.id + "&land_method=2"
        });
    },
    intoSeedDetail: function(a) {
        var t = a.currentTarget.dataset.sid;
        wx.navigateTo({
            url: "../../user/land/seedDetails/index?sid=" + t
        });
    }
});