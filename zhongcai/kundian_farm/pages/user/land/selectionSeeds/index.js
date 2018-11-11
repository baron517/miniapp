var app = new getApp();

Page({
    data: {
        selectedSeed: [],
        seeds: [],
        area: 0,
        hidden: !0,
        lid: "",
        first:1,
        mineLand: [],
        farmSetData: []
    },
    onLoad: function(e) {
        var s = this, a = app.siteInfo.uniacid, t = e.lid, d = app.globalData.uid;
        app.util.request({
            url: "entry/wxapp/land",
            data: {
                op: "getSendList",
                uniacid: a,
                lid: t,
                uid: d
            },
            success: function(d) {
                wx.getStorage({
                    key: "seeds",
                    success: function(e) {
                        var t = JSON.parse(e.data), a = d.data.send;
                        a.map(function(a) {
                            t.map(function(e) {
                                a.id == e.id && (a.selected = !0);
                            });
                        }), s.setData({
                            selectedSeed: t,
                            seeds: a
                        });
                    },
                    fail: function() {
                        s.setData({
                            seeds: d.data.send
                        });
                    }
                }), s.setData({
                    lid: t,
                    mineLand: d.data.mineLand,
                    area: d.data.mineLand.count - d.data.mineLand.can_seed_count
                });
            }
        }), s.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        }), app.util.setNavColor(a);
    },
    checked: function(e) {
        console.log(this.data.selectedSeed);

        var count=0;
        for(var i=0;i<this.data.selectedSeed.length;i++)
        {
            count=count+this.data.selectedSeed[i].num;
        }

        if(count>=4)
        {
            wx.showToast({
                title: '不能超过4个',
                icon: 'none',
                duration: 1000,
                mask:true
            });

            return;
        }


        var a = this, d = e.currentTarget.dataset.id, t = 0;
        a.data.selectedSeed.map(function(e) {
            t = e.num + t;
        }), a.data.area > t ? a.data.seeds.map(function(e) {
            if (e.id == d) if (e.selected = !0, 0 == a.data.selectedSeed.length){
                a.data.selectedSeed.push(e);
            }
            else {
                var t = !1;
                a.data.selectedSeed.map(function(e, a) {
                    e.id == d && (e.num += 1, t = !0);
                }), t || a.data.selectedSeed.push(e);
            }



        }) : a.setData({
            hidden: !1
        }), a.sumPrice();
    },
    deletes: function(e) {
        var t = this, d = e.currentTarget.dataset.id;
        t.data.seeds.map(function(e, a) {
            e.id == d && (t.data.seeds.splice(a, 1), t.setData({
                seeds: t.data.seeds
            }));
        }), 0 < t.data.selectedSeed.length && t.data.selectedSeed.map(function(e, a) {
            e.id == d && (t.data.selectedSeed.splice(a, 1), t.setData({
                selectedSeed: t.data.selectedSeed
            }));
        });
    },
    deleteSelect: function(e) {
        var t = this, d = e.currentTarget.dataset.id;
        t.data.selectedSeed.map(function(e, a) {
            e.id == d && (e.num -= 1, 0 == e.num && (t.data.selectedSeed.splice(a, 1), t.data.seeds.map(function(e) {
                e.id == d && (e.selected = !1, t.setData({
                    seeds: t.data.seeds
                }));
            })), t.setData({
                selectedSeed: t.data.selectedSeed
            }));
        }), t.sumPrice();
    },
    submits: function() {
        var e = JSON.stringify(this.data.selectedSeed);
        wx.setStorage({
            key: "seeds",
            data: e,
            success: function(e) {
                wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    View: function(e) {
        var a = e.currentTarget.dataset.sid;
        wx.navigateTo({
            url: "../../land/seedDetails/index?sid=" + a
        });
    },
    cancel: function() {
        this.setData({
            hidden: !0
        });
    },
    sumPrice: function() {
        var e = this;
        e.data.selectedSeed.map(function(e) {
            e.totalPrice = (e.num * e.price).toFixed(2);
        }), e.setData({
            seeds: e.data.seeds,
            selectedSeed: e.data.selectedSeed
        });
    }
});