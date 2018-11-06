var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        plate: 1,
        mineid: "",
        landDetail: [],
        adopt_id: "",
        farmSetData: []
    },
    onLoad: function(a) {
        app.util.setNavColor(uniacid);
        var e = this, t = a.plate;
        if (1 == t) {
            var i = a.mineid;
            app.util.request({
                url: "entry/wxapp/managerLand",
                data: {
                    op: "getLandDetail",
                    mineid: i,
                    uniacid: uniacid
                },
                success: function(a) {
                    console.log(a), e.setData({
                        landDetail: a.data.landDetail,
                        mineid: i,
                        seedData: a.data.seedData,
                        seedOrder: a.data.seedOrder,
                        plate: t
                    });
                }
            });
        } else {
            var d = a.adoptid;
            app.util.request({
                url: "entry/wxapp/managerAnimal",
                data: {
                    op: "getAnimalDetail",
                    adoptid: d,
                    uniacid: uniacid
                },
                success: function(a) {
                    console.log(a), e.setData({
                        animalData: a.data.animalData,
                        adoptid: d,
                        animalOrder: a.data.animal_order,
                        plate: t
                    });
                }
            });
        }
        e.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    releases: function() {
        var a = this.data.plate;
        1 == a ? wx.navigateTo({
            url: "../release/index?lid=" + this.data.landDetail.id + "&plate=" + a
        }) : wx.navigateTo({
            url: "../release/index?adoptid=" + this.data.animalData.id + "&plate=" + a
        });
    }
});