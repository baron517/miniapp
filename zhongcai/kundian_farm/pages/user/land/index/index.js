var app = new getApp();

Page({
    data: {
        area: 10,
        currentState: "状态",
        currentVegetable: null,
        Vegetables: [],
        seeds: [],
        sumPrice: "",
        lid: "",
        mineLand: [],
        sendMine: [],
        landStatus: [],
        scrollLeft: 0,
        isShow: !1,
        deviceData: [],
        seedCount: 0,
        farmSetData: [],
        isLoading: !1,
        countDownNum: 30,
        close_type: 0
    },
    onLoad: function(e) {
        var t = this;
        t.data.Vegetables || wx.navigateTo({
            url: "../../land/selectionSeeds/index"
        });
        var a = e.lid, n = app.siteInfo.uniacid, i = app.globalData.uid, d = wx.getStorageSync("kundian_farm_setData");
        app.util.request({
            url: "entry/wxapp/land",
            data: {
                op: "getMineLandDetail",
                uniacid: n,
                uid: i,
                lid: a
            },
            success: function(e) {
                e.data.sendMine[0] && t.setData({
                    currentVegetable: e.data.sendMine[0]
                }), 1 == d.is_open_webthing && "" != e.data.mineLand.device_id && t.getDevice(e.data.mineLand.device_id, n, t), 
                t.setData({
                    mineLand: e.data.mineLand,
                    lid: a,
                    sendMine: e.data.sendMine,
                    landStatus: e.data.landStatus
                });
            }
        }), this.videoContext = wx.createVideoContext("myVideo", this), app.util.setNavColor(n), 
        wx.removeStorage({
            key: "seeds"
        }), this.setData({
            farmSetData: d
        });
    },
    getDevice: function(e, t, a) {
        var n = this;
        app.util.request({
            url: "entry/wxapp/webThing",
            data: {
                op: "index",
                web_did: e,
                uniacid: t
            },
            success: function(e) {
                console.log(e), n.setData({
                    deviceData: e.data.deviceData
                });
            }
        });
    },
    onShow: function() {
        var a = this, e = a.data.mineLand, t = e.count - e.can_seed_count, n = (this.data.seeds, 
        0);
        0 < t && wx.getStorage({
            key: "seeds",
            success: function(e) {
                var t = JSON.parse(e.data);
                console.log(t), t.map(function(e) {
                    n = parseInt(n) + e.num;
                }), a.setData({
                    seeds: t,
                    seedCount: n
                }), a.sumPrices();
            }
        });
    },
    changeState: function(e) {
        this.setData({
            currentState: e.currentTarget.dataset.state
        });
    },
    changeVegetable: function(e) {
        var a = this, n = e.currentTarget.dataset.id;
        a.data.sendMine.map(function(e, t) {
            n == e.id && (t <= 1 ? a.setData({
                scrollLeft: 0
            }) : 1 < t && t <= a.data.Vegetables.length - 2 && a.setData({
                scrollLeft: 90 * (t - 1)
            }), a.setData({
                currentVegetable: e
            }));
        });
    },
    selectionSeeds: function() {
        var e = this.data.lid, t = this.data.mineLand, a = t.count - t.can_seed_count;
        if (1 <= a) {
            var n = this.data.seeds;
            console.log(n);
            var i = 0;
            0 <= n.length ? (n.map(function(e) {
                i = parseInt(i) + e.num;
            }), a <= i ? wx.showModal({
                title: "提示",
                content: "当前种子已超过种植面积"
            }) : wx.navigateTo({
                url: "../../land/selectionSeeds/index?lid=" + e
            })) : wx.navigateTo({
                url: "../../land/selectionSeeds/index?lid=" + e
            });
        } else wx.showModal({
            title: "提示",
            content: "当前土地已经种满！"
        });
    },
    deletes: function(e) {
        var a = this, n = e.currentTarget.dataset.id, i = this.data.seedCount;
        a.data.seeds.map(function(e, t) {
            e.id == n && (e.num -= 1, 0 == e.num && a.data.seeds.splice(t, 1), i -= 1, a.setData({
                seeds: a.data.seeds,
                seedCount: i
            }), wx.setStorage({
                key: "seeds",
                data: JSON.stringify(a.data.seeds)
            }));
        }), a.sumPrices();
    },
    sumPrices: function() {
        var t = 0;
        this.data.seeds.map(function(e) {
            t += e.price * e.num;
        }), this.setData({
            sumPrice: t.toFixed(2)
        });
    },
    nowPay: function(e) {
        var t = this, a = (app.siteInfo.uniacid, app.globalData.uid, t.data.seeds);
        if (0 < a.length) {
            new Array(), new Array();
            var n = t.data.sumPrice, i = t.data.lid;
            wx.setStorageSync("kundian_farm_buy_seed", a), wx.navigateTo({
                url: "../confirm_seed/index?total_price=" + n + "&lid=" + i
            });
        } else wx.showModal({
            title: "提示",
            content: "请选择要购买的种子",
            showCancel: !1
        });
    },
    onShareAppMessage: function() {},
    getSeed: function(e) {
        var t = e.currentTarget.dataset.seedid, a = this.data.mineLand.id;
        wx.navigateTo({
            url: "../confirm_order/index?seed_id=" + t + "&mine_land_id=" + a
        });
    },
    showVideo: function() {
        this.setData({
            isShow: !0
        }), this.videoContext.play();
    },
    hiddenVideo: function() {
        this.setData({
            isShow: !1
        }), this.videoContext.pause();
    },
    LookImg: function(e) {
        for (var t = this.data.landStatus, a = e.currentTarget.dataset.id, n = (e.currentTarget.dataset.index, 
        new Array()), i = 0; i < t.length; i++) if (t[i].id == a) {
            n = t[i].src;
            break;
        }
        wx.previewImage({
            urls: n
        });
    },
    watering: function(e) {
        var t = this, a = t.data.mineLand, n = wx.getStorageSync("kundian_farm_uid"), i = app.siteInfo.uniacid, d = e.detail.formId;
        app.util.request({
            url: "entry/wxapp/webThing",
            data: {
                op: "watering",
                uniacid: i,
                uid: n,
                lid: a.id,
                web_did: a.device_id,
                formId: d
            },
            success: function(e) {
                1 == e.data.code ? (t.setData({
                    close_type: 1
                }), t.countDown(a.device_id, 1)) : wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    fertilization: function(e) {
        var t = this, a = t.data.mineLand, n = wx.getStorageSync("kundian_farm_uid"), i = app.siteInfo.uniacid, d = e.detail.formId;
        app.util.request({
            url: "entry/wxapp/webThing",
            data: {
                op: "fertilization",
                uniacid: i,
                uid: n,
                lid: a.id,
                web_did: a.device_id,
                formId: d
            },
            success: function(e) {
                1 == e.data.code ? (t.setData({
                    close_type: 2
                }), t.countDown(a.device_id, 2)) : wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    killVer: function(e) {
        var t = this, a = t.data.mineLand, n = wx.getStorageSync("kundian_farm_uid"), i = app.siteInfo.uniacid, d = e.detail.formId;
        app.util.request({
            url: "entry/wxapp/webThing",
            data: {
                op: "killVer",
                uniacid: i,
                uid: n,
                lid: a.id,
                web_did: a.device_id,
                formId: d
            },
            success: function(e) {
                1 == e.data.code ? (t.setData({
                    close_type: 3
                }), t.countDown(a.device_id, 3)) : wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    weeding: function(e) {
        var t = this.data.mineLand, a = wx.getStorageSync("kundian_farm_uid"), n = app.siteInfo.uniacid, i = e.detail.formId;
        app.util.request({
            url: "entry/wxapp/webThing",
            data: {
                op: "weeding",
                uniacid: n,
                uid: a,
                lid: t.id,
                formId: i
            },
            success: function(e) {
                wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    ceshi: function(e) {
        app.util.request({
            url: "entry/wxapp/webThing",
            data: {
                op: "ceshi",
                uniacid: app.siteInfo.uniacid,
                web_did: this.data.mineLand.device_id
            },
            success: function(e) {
                console.log(e);
            }
        });
    },
    countDown: function(e, t) {
        var a = this, n = 30;
        a.setData({
            isLoading: !0,
            countDownNum: 30
        }), a.setData({
            timer: setInterval(function() {
                n--, a.setData({
                    countDownNum: n
                }), 0 == n && (clearInterval(a.data.timer), console.log("995"), a.setData({
                    isLoading: !1
                }), a.closeDevice(e, t));
            }, 1e3)
        });
    },
    closeDevice: function(e, t) {
        var a = this, n = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/webThing",
            data: {
                op: "closeDevice",
                web_did: e,
                close_type: t,
                uniacid: n
            },
            success: function(e) {
                console.log(e), wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1
                }), a.setData({
                    close_type: 0
                });
            }
        });
    },
    submitData: function(e) {
        console.log(e);
    },
    addNum: function(e) {
        var t = 0, a = e.currentTarget.dataset.id, n = this.data.seeds, i = this.data.mineLand, d = i.count - i.seed_area;
        if (n.map(function(e) {
            t = parseInt(e.num) + t;
        }), d <= t) wx.showModal({
            title: "提示",
            content: "所选种子数量已超过土地最大种植面积",
            showCancel: !1
        }); else {
            var s = 0;
            n.map(function(e) {
                e.id === a && e.num++, s += parseInt(e.num);
            }), this.setData({
                seeds: n,
                seedCount: s
            }), wx.setStorage({
                key: "seeds",
                data: JSON.stringify(n)
            }), this.sumPrices();
        }
    },
    onUnload: function(e) {
        var t = this.data.close_type;
        if (1 == t || 2 == t || 3 == t) {
            var a = this.data.mineLand.device_id;
            this.closeDevice(a, t), clearInterval(this.data.timer);
        }
    }
});