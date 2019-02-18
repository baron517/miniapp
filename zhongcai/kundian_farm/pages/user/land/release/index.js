var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        imgArr: [],
        currentIndexId: 0,
        isShow: !0,
        lid: "",
        plate: 1,
        adoptid: "",
        farmSetData: []
    },
    onLoad: function(a) {
        var t = a.plate;
        if (1 == t) {
            var i = a.lid;
            this.setData({
                lid: i,
                plate: t
            });
        } else {
            var e = a.adoptid;
            this.setData({
                adoptid: e,
                plate: t
            });
        }
        app.util.setNavColor(uniacid), this.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    addImg: function() {
        var e = this;
        wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                for (var t = a.tempFilePaths, i = 0; i < t.length; i++) e.data.imgArr.push(t[i]);
                e.setData({
                    imgArr: e.data.imgArr
                });
            }
        });
    },
    deleteImg: function(a) {
        var i = this, e = a.currentTarget.dataset.url;
        this.data.imgArr.map(function(a, t) {
            a == e && i.data.imgArr.splice(t, 1);
        }), this.setData({
            imgArr: this.data.imgArr
        });
    },
    checked: function(a) {
        var t = a.currentTarget.dataset.id, i = this.data.seedList;
        i.map(function(a) {
            a.select = !1, a.id == t && (a.select = !0);
        }), this.setData({
            seedList: i,
            currentIndexId: t
        });
    },
    isShow: function() {
        var a = this.data.isShow;
        this.setData({
            isShow: !a
        });
    },
    submitData: function(a) {
        var s, t, i = this, e = this.data.plate, n = app.siteInfo.siteroot, o = (n = n.replace("app/index.php", "web/index.php")) + "?i=" + app.siteInfo.uniacid + "&c=utility&a=file&do=upload&thumb=0", d = this.data.imgArr, r = new Array(), l = a.detail.value.txt;
        1 == e ? function() {
            var e = i.data.lid;
            if (wx.showToast({
                title: "正在上传...",
                icon: "loading",
                mask: !0,
                duration: 1e4
            }), 0 < d.length) for (t = s = 0; t < d.length; t++) wx.uploadFile({
                url: o,
                filePath: d[t],
                name: "file",
                formData: {
                    op: "upload_file"
                },
                success: function(a) {
                    s++, console.log(a);
                    var t = JSON.parse(a.data);
                    if (r.push(t.url), s == d.length) {
                        wx.hideToast();
                        var i = "";
                        0 < d.length && (i = JSON.stringify(r)), app.util.request({
                            url: "entry/wxapp/managerLand",
                            data: {
                                op: "status_save",
                                uniacid: uniacid,
                                txt: l,
                                src: i,
                                lid: e
                            },
                            method: "POST",
                            success: function(a) {
                                1 == a.data.code ? wx.showToast({
                                    title: a.data.msg,
                                    success: function() {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }
                                }) : wx.showToast({
                                    title: a.data.msg
                                });
                            }
                        });
                    }
                }
            });
        }() : function() {
            var e = i.data.adoptid;
            if (wx.showToast({
                title: "正在上传...",
                icon: "loading",
                mask: !0,
                duration: 1e4
            }), 0 < d.length) for (t = s = 0; t < d.length; t++) wx.uploadFile({
                url: o,
                filePath: d[t],
                name: "file",
                formData: {
                    op: "upload_file"
                },
                success: function(a) {
                    s++, console.log(a);
                    var t = JSON.parse(a.data);
                    if (r.push(t.url), s == d.length) {
                        wx.hideToast();
                        var i = "";
                        0 < d.length && (i = JSON.stringify(r)), app.util.request({
                            url: "entry/wxapp/managerAnimal",
                            data: {
                                op: "status_save",
                                uniacid: uniacid,
                                txt: l,
                                src: i,
                                adoptid: e
                            },
                            method: "POST",
                            success: function(a) {
                                1 == a.data.code ? wx.showToast({
                                    title: a.data.msg,
                                    success: function() {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }
                                }) : wx.showToast({
                                    title: a.data.msg
                                });
                            }
                        });
                    }
                }
            });
        }();
    }
});