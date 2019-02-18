var WxParse = require("../../../../../wxParse/wxParse.js"), app = new getApp();

Page({
    data: {
        goodsid: "",
        goodsData: [],
        specItem: [],
        is_show: 1,
        count: 1,
        price: "",
        spec_src: "",
        spec_id: "",
        farmSetData: []
    },
    onLoad: function(a) {
        var t = a.goods_id, e = this, s = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/integral",
            data: {
                op: "getIntegralGoodsDetail",
                uniacid: s,
                goods_id: t
            },
            success: function(a) {
                e.setData({
                    goodsData: a.data.goodsData,
                    specItem: a.data.specItem,
                    goodsid: t
                }), "" != a.data.goodsData.goods_desc && WxParse.wxParse("article", "html", a.data.goodsData.goods_desc, e, 5);
            }
        }), app.util.setNavColor(s);
        var o = 0;
        -1 < app.globalData.sysData.model.indexOf("iPhone X") && (o = 68), e.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            bottom: o
        });
    },
    hideModal: function() {
        this.setData({
            is_show: 1
        });
    },
    reduceNum: function() {
        1 != this.data.count && this.setData({
            count: this.data.count - 1
        });
    },
    addNum: function() {
        this.setData({
            count: this.data.count + 1
        });
    },
    chooseNum: function(a) {
        this.setData({
            count: a.detail.value
        });
    },
    doExchange: function(a) {
        var t = this, e = wx.getStorageSync("kundian_farm_uid");
        if (null != e && 0 != e) {
            var s = t.data.goodsData, o = t.data.goodsid, d = t.data.count;
            1 == s.is_open_sku ? t.setData({
                is_show: 2
            }) : wx.navigateTo({
                url: "../orderConfrim/index?goodsid=" + o + "&count=" + d
            });
        } else wx.navigateTo({
            url: "../../../login/index"
        });
    },
    selectSpec: function(a) {
        for (var t = this, e = app.siteInfo.uniacid, s = t.data.goodsid, o = a.currentTarget.dataset.specid, d = a.currentTarget.dataset.valid, i = t.data.specItem, c = new Array(), n = 0; n < i.length; n++) {
            i[n].id == o && (i[n].select_spec = 1);
            for (var r = 0; r < i[n].specVal.length; r++) i[n].id == o && (i[n].specVal[r].select_val = 0), 
            i[n].specVal[r].id == d && (i[n].specVal[r].select_val = 1), 1 == i[n].specVal[r].select_val && c.push(i[n].specVal[r].id);
        }
        var u = c.join(",");
        app.util.request({
            url: "entry/wxapp/integral",
            data: {
                op: "getSpec",
                uniacid: e,
                spec_id: u,
                goodsid: s
            },
            success: function(a) {
                a.data.specVal ? t.setData({
                    price: a.data.specVal.price,
                    spec_src: a.data.specVal.spec_src,
                    spec_id: a.data.specVal.id,
                    specItem: i
                }) : t.setData({
                    specItem: i
                });
            }
        });
    },
    sureGoods: function(a) {
        var t = this, e = t.data.goodsid, s = t.data.spec_id, o = t.data.count;
        if (1 == t.data.goodsData.is_open_sku) {
            if ("" == s && 0 == s.length) return wx.showToast({
                title: "请选择规格"
            }), !1;
            wx.navigateTo({
                url: "../orderConfrim/index?goodsid=" + e + "&spec_id=" + s + "&count=" + o
            });
        } else wx.navigateTo({
            url: "../orderConfrim/index?goodsid=" + e + "&count=" + o
        });
    }
});