function _defineProperty(t, a, i) {
    return a in t ? Object.defineProperty(t, a, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = i, t;
}

var app = new getApp();

Page(_defineProperty({
    data: {
        img_width_three: 60,
        img_width_one: 60,
        Adopt: [],
        currentImg: "",
        currentStyle: 1,
        showName: 0,
        setData: []
    },
    onLoad: function() {
        var a = this, i = (wx.getStorageSync("kundian_farm_uid"), wx.getStorageSync("kundian_farm_setData")), t = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/animal",
            data: {
                op: "index",
                uniacid: t
            },
            success: function(t) {
                a.setData({
                    Adopt: t.data.animalData,
                    currentImg: t.data.animalData[1].animal_src,
                    setData: i,
                    currentStyle: i.animal_list_style,
                    showName: 1 == i.animal_name_show ? 1 : 0
                });
            }
        }), app.util.setNavColor(t);
    },
    touchstart: function(t) {
        this.data.touchDot = t.touches[0].pageX;
        var a = this;
        this.data.interval = setInterval(function() {
            a.data.time += 1;
        }, 100);
    },
    touchmove: function(t) {
        var a = t.touches[0].pageX, i = this.data.touchDot;
        this.data.time;
        a - i <= -40 && !this.data.done && (this.data.done = !0, this.scrollLeft()), 40 <= a - i && !this.data.done && (this.data.done = !0, 
        this.scrollRight());
    },
    touchend: function(t) {
        clearInterval(this.data.interval), this.data.time = 0, this.data.done = !1;
    },
    Adopt: function(t) {
        console.log(t.currentTarget.dataset.id);
    },
    scrollLeft: function() {
        var t = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        }), a = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        }), i = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.setData({
            img_width_three: 200
        }), this.animation1 = t, this.animation2 = a, this.animation3 = i, this.animation1.translateX(-60).opacity(.5).step(), 
        this.animation2.translateX(-60).opacity(1).scale(.8, .8).step(), this.animation3.translateX(-60).opacity(.5).scale(1.2, 1.2).step(), 
        this.setData({
            animation1: t.export(),
            animation2: a.export(),
            animation3: i.export()
        });
        var n = this;
        setTimeout(function() {
            n.animation1.translateX(0).opacity(.5).step({
                duration: 0,
                timingFunction: "linear"
            }), n.animation2.translateX(0).opacity(1).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), n.animation3.translateX(0).opacity(.5).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), n.setData({
                animation1: t.export(),
                animation2: a.export(),
                animation3: i.export(),
                img_width_three: 60
            });
        }.bind(this), 300);
        var e = this.data.Adopt, o = e.shift();
        e.push(o), setTimeout(function() {
            this.setData({
                Adopt: e,
                currentImg: e[1].animal_src
            });
        }.bind(this), 195);
    },
    scrollRight: function() {
        var t = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        }), a = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        }), i = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        }), wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.setData({
            img_width_one: 200
        }), this.animation1 = t, this.animation2 = a, this.animation3 = i, this.animation1.translateX(60).opacity(.5).scale(1.2, 1.2).step(), 
        this.animation2.translateX(60).opacity(1).step(), this.animation3.translateX(60).opacity(.5).step(), 
        this.setData({
            animation1: t.export(),
            animation2: a.export(),
            animation3: i.export()
        });
        var n = this;
        setTimeout(function() {
            n.animation1.translateX(0).opacity(.5).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), n.animation2.translateX(0).opacity(1).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), n.animation3.translateX(0).opacity(.5).step({
                duration: 0,
                timingFunction: "linear"
            }), n.setData({
                animation1: t.export(),
                animation2: a.export(),
                animation3: i.export(),
                img_width_one: 60
            });
        }.bind(this), 300);
        var e = this.data.Adopt, o = e.pop();
        e.unshift(o), setTimeout(function() {
            this.setData({
                Adopt: e,
                currentImg: e[1].animal_src
            });
        }.bind(this), 195);
    }
}, "Adopt", function(t) {
    var a = t.currentTarget.dataset.id;
    wx.navigateTo({
        url: "../AdoptRules/index?aid=" + a
    });
}));