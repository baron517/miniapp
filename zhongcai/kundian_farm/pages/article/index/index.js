var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        typeData: [],
        articleData: [],
        typeid: 0,
        page: 1,
        farmSetData: []
    },
    onLoad: function(a) {
        this.getData(1, 0), this.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    getData: function(e, i, n) {
        var r = this;
        app.util.request({
            url: "entry/wxapp/article",
            data: {
                op: "getArticleData",
                uniacid: uniacid,
                page: e,
                type_id: i
            },
            success: function(a) {
                if (1 == n) {
                    var t = r.data.articleData;
                    a.data.articleData.map(function(a) {
                        t.push(a);
                    }), r.setData({
                        articleData: t,
                        page: e
                    });
                } else 0 == i ? r.setData({
                    typeData: a.data.typeData,
                    articleData: a.data.articleData
                }) : r.setData({
                    articleData: a.data.articleData
                });
            }
        });
    },
    changeType: function(a) {
        var t = a.currentTarget.dataset.typeid;
        this.getData(1, t), this.setData({
            typeid: t
        });
    },
    onPullDownRefresh: function(a) {
        var t = this.data.typeid;
        this.getData(1, t);
    },
    onReachBottom: function(a) {
        var t = this.data.typeid, e = parseInt(this.data.page) + 1;
        this.getData(e, t, 1);
    },
    intoArticleDetail: function(a) {
        var t = a.currentTarget.dataset.aid;
        wx.navigateTo({
            url: "../detail/index?aid=" + t
        });
    }
});