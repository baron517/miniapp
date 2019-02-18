var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        height: 0,
        currentList: {},
        isShow: !1,
        animation1: {},
        animation2: {},
        animation3: {},
        animation4: {},
        landMine: [],
        currentDeviceInfo: [],
        farmSetData: [],
        isLoading: !1,
        countDownNum: 30,
        close_type: 0,
        bottom: 0
    },
    onLoad: function(t) {
        var i = this, e = wx.getStorageSync("kundian_farm_uid");
        e ? (app.util.request({
            url: "entry/wxapp/webThing",
            data: {
                op: "getAllMyLand",
                uniacid: uniacid,
                uid: e
            },
            success: function(t) {
                i.setData({
                    landMine: t.data.landMine,
                    currentList: t.data.landMine[0]
                }), i.createAnimations();
            }
        }), wx.getSystemInfo({
            success: function(t) {
                var e = t.windowHeight - 40;
                i.setData({
                    height: e
                });
            }
        })) : wx.navigateTo({
            url: "../../../login/index"
        });
        var a = 0;
        -1 < app.globalData.sysData.model.indexOf("iPhone X") && (a = 68), i.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            bottom: a
        });
    },
    createAnimations: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1e3,
            timingFunction: "ease",
            delay: 0
        }), e = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1e3,
            timingFunction: "ease",
            delay: 0
        }), i = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1e3,
            timingFunction: "ease",
            delay: 0
        }), a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1e3,
            timingFunction: "ease",
            delay: 0
        });
        if (1 == this.data.farmSetData.is_open_webthing && this.data.currentList.currentDeviceInfo && (t.width(this.data.currentList.currentDeviceInfo.watering + "%").step({
            duration: 1e3
        }), e.width(this.data.currentList.currentDeviceInfo.temp / 60 * 100 + "%").step({
            duration: 1e3
        }), i.width((this.data.currentList.currentDeviceInfo.co2 - 350) / 650 * 100 + "%").step({
            duration: 1e3
        }), a.width(this.data.currentList.currentDeviceInfo.illumination / 1e3 + "%").step({
            duration: 1e3
        }), this.setData({
            animation1: t.export(),
            animation2: e.export(),
            animation3: i.export(),
            animation4: a.export()
        })), 2 == this.data.farmSetData.is_open_webthing && this.data.currentList.device) {
            var n = this.data.currentList.device;
            n.temp && (t.width(n.temp.DevHumiValue + "%").step({
                duration: 1e3
            }), e.width(n.temp.DevTempValue / 60 * 100 + "%").step({
                duration: 1e3
            })), n.co2 && i.width((n.co2.DevHumiValue - 350) / 650 * 100 + "%").step({
                duration: 1e3
            }), n.light && a.width(n.light.DevHumiValue / 10 + "%").step({
                duration: 1e3
            }), this.setData({
                animation1: t.export(),
                animation2: e.export(),
                animation3: i.export(),
                animation4: a.export()
            });
        }
    },
    chooseItem: function(t) {
        var e = this, i = this, a = t.currentTarget.dataset.id;
        this.data.landMine.map(function(t) {
            t.id === a && (e.setData({
                currentList: t,
                isShow: !1
            }), t.device_num, i.createAnimations());
        });
    },
    select: function() {
        this.setData({
            isShow: !0
        });
    },
    close: function() {
        this.setData({
            isShow: !1
        });
    },
    gotoBuy: function(t) {
        wx.navigateTo({
            url: "../selectionLands/index"
        });
    },
    watering: function(t) {
        var e = this, i = e.data.currentList;
        if (i.device_num) {
            var a = wx.getStorageSync("kundian_farm_uid"), n = app.siteInfo.uniacid, o = t.detail.formId;
            app.util.request({
                url: "entry/wxapp/webThing",
                data: {
                    op: "watering",
                    uniacid: n,
                    uid: a,
                    lid: i.id,
                    web_did: i.device_num,
                    formId: o
                },
                success: function(t) {
                    1 == t.data.code ? (e.setData({
                        close_type: 1
                    }), e.countDown(i.device_num, 1)) : wx.showModal({
                        title: "提示",
                        content: t.data.msg,
                        showCancel: !1
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "当前土地未绑定设备",
            showCancel: !1
        });
    },
    fertilization: function(t) {
        var e = this, i = e.data.currentList;
        if (i.device_num) {
            var a = wx.getStorageSync("kundian_farm_uid"), n = app.siteInfo.uniacid, o = t.detail.formId;
            app.util.request({
                url: "entry/wxapp/webThing",
                data: {
                    op: "fertilization",
                    uniacid: n,
                    uid: a,
                    lid: i.id,
                    web_did: i.device_num,
                    formId: o
                },
                success: function(t) {
                    1 == t.data.code ? (e.setData({
                        close_type: 2
                    }), e.countDown(i.device_num, 2)) : wx.showModal({
                        title: "提示",
                        content: t.data.msg,
                        showCancel: !1
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "当前土地未绑定设备",
            showCancel: !1
        });
    },
    killVer: function(t) {
        var e = this, i = e.data.currentList, a = wx.getStorageSync("kundian_farm_uid"), n = app.siteInfo.uniacid, o = t.detail.formId;
        app.util.request({
            url: "entry/wxapp/webThing",
            data: {
                op: "killVer",
                uniacid: n,
                uid: a,
                lid: i.id,
                web_did: i.device_num,
                formId: o
            },
            success: function(t) {
                1 == t.data.code ? (e.setData({
                    close_type: 3
                }), e.countDown(i.device_num, 3)) : wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    weeding: function(t) {
        var e = this.data.currentList, i = wx.getStorageSync("kundian_farm_uid"), a = app.siteInfo.uniacid, n = t.detail.formId;
        app.util.request({
            url: "entry/wxapp/webThing",
            data: {
                op: "weeding",
                uniacid: a,
                uid: i,
                lid: e.id,
                formId: n
            },
            success: function(t) {
                wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    countDown: function(t, e) {
        var i = this, a = 30;
        i.setData({
            isLoading: !0,
            countDownNum: 30
        }), i.setData({
            timer: setInterval(function() {
                a--, i.setData({
                    countDownNum: a
                }), 0 == a && (clearInterval(i.data.timer), i.setData({
                    isLoading: !1
                }), i.closeDevice(t, e));
            }, 1e3)
        });
    },
    closeDevice: function(t, e) {
        var i = this, a = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/webThing",
            data: {
                op: "closeDevice",
                web_did: t,
                close_type: e,
                uniacid: a
            },
            success: function(t) {
                wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1
                }), i.setData({
                    close_type: 0
                });
            }
        });
    },
    onUnload: function(t) {
        var e = this.data.close_type, i = this.data.currentList;
        if (console.log(e), 1 == e || 2 == e || 3 == e) {
            var a = i.device_num;
            this.closeDevice(a, e), clearInterval(this.data.timer);
        }
    }
});