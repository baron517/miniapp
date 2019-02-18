var app = new getApp(), order = [ "red", "yellow", "blue", "green", "red" ];

Page({
    data: {
        weather: [],
        weatherSet: [],
        farm_name: ""
    },
    onLoad: function(e) {
        var a = wx.getStorageSync("kundian_farm_weather"), t = JSON.parse(e.weatherSet);
        this.setData({
            weather: a,
            weatherSet: t,
            farm_name: e.farm_name
        }), app.util.setNavColor(app.siteInfo.uniacid);
    },
    intoFarmAddress: function(e) {
        var a = this.data.weatherSet;
        wx.openLocation({
            latitude: parseFloat(a.longitude),
            longitude: parseFloat(a.latitude),
            name: this.data.farm_name
        });
    }
});