var api = require("../../api.js"), app = getApp(), is_loading_more = !1, is_no_more = !1;

Page({
    data: {
        page: 1,
        video_list: [],
        url: "",
        hide: "hide",
        show: !1,
        animationData: {}
    },
    onLoad: function(a) {
        app.pageOnLoad(this, a);

        this.setData({
            url: a.id
        });

    },
    onReady: function() {},
    onShow: function() {
        app.pageOnShow(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},

    play: function(a) {
        var o = a.currentTarget.dataset.index;
        console.log(o);

        wx.createVideoContext("video_" + this.data.show_video).pause();
    },
    onReachBottom: function() {
        is_no_more || this.loadMoreGoodsList();
    },
    more: function(a) {
        var o = this, t = a.target.dataset.index, i = o.data.video_list, e = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease"
        });
        this.animation = e, -1 != i[t].show ? (e.rotate(0).step(), i[t].show = -1) : (e.rotate(0).step(), 
        i[t].show = 0), o.setData({
            video_list: i,
            animationData: this.animation.export()
        });
    }
});