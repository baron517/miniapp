var app = new getApp();

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        couponData: {
            type: Array,
            value: []
        }
    },
    data: {
        setData: wx.getStorageSync("kundian_farm_setData")
    },
    methods: {
        examineMoreCoupon: function(e) {
            wx.navigateTo({
                url: "../../user/coupon/index/index"
            });
        },
        getCoupon: function(e) {
            var t = e.currentTarget.dataset.type;
            wx.getStorageSync("kundian_farm_uid"), app.siteInfo.uniacid;
            wx.navigateTo({
                url: "../../user/coupon/index/index?type=" + t
            });
        }
    }
});