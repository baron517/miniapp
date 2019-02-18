var app = new getApp(), uniacid = app.siteInfo.uniacid, mudule_name = "kundian_farm_plugin_funding";

Page({
    data: {
        page: 1,
        project: [],
        farmSetData: wx.getStorageSync("kundian_farm_setData"),
        currentIndex: 1
    },
    onLoad: function(t) {
        this.getProjectData(1, 1, 0);
    },
    getProjectData: function(t, e, n) {
        var r = this, i = r.data.project, a = app.util.url("entry/wxapp/project") + "m=" + mudule_name;
        wx.request({
            url: a,
            data: {
                op: "getProject",
                uniacid: uniacid,
                page: e,
                current: t
            },
            success: function(t) {
                if (t.data.project) {
                    var a = t.data.project;
                    console.log(a), 1 == n ? (a.map(function(t) {
                        i.push(t);
                    }), e = parseInt(e) + 1) : (i = a, e = 1), r.setData({
                        project: i,
                        page: e
                    });
                }
            }
        });
    },
    onPullDownRefresh: function(t) {
        var a = parseInt(this.data.page), e = this.data.currentIndex;
        this.getProjectData(e, a, 1);
    },
    intoProjectDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../prodetail/index?pid=" + a
        });
    },
    changeIndex: function(t) {
        var a = t.currentTarget.dataset.index;
        this.getProjectData(a, 1, 0), this.setData({
            currentIndex: a
        });
    }
});