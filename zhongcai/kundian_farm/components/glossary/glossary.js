Component({
    properties: {
        styles: {
            type: Number,
            value: 1
        },
        titleSize: {
            type: Number,
            value: 30
        },
        titleColor: {
            type: String,
            value: "#000"
        },
        bgColor: {
            type: String,
            value: "#fff"
        },
        lists: {
            type: Array,
            value: []
        }
    },
    methods: {
        navToPage: function(e) {
            var i = e.currentTarget.dataset.linktype, a = e.currentTarget.dataset.linkparam;
            1 == i ? a ? wx.navigateTo({
                url: "../../land/landDetails/index?lid=" + a
            }) : wx.navigateTo({
                url: "../../user/land/selectionLands/index"
            }) : 2 == i ? a ? wx.navigateTo({
                url: "../../shop/AdoptRules/index?aid=" + a
            }) : wx.navigateTo({
                url: "../../shop/Adopt/index"
            }) : 3 == i ? wx.navigateTo({
                url: "../../shop/integral/index/index"
            }) : 4 == i ? wx.navigateTo({
                url: "../live/index"
            }) : 5 == i ? a && 0 != a ? wx.navigateTo({
                url: "../../shop/prodeteils/index?goodsid=" + a
            }) : wx.switchTab({
                url: "../../shop/index/index"
            }) : 6 == i ? a ? wx.navigateTo({
                url: "../../shop/Group/proDetails/index?goods_id=" + a
            }) : wx.navigateTo({
                url: "../../shop/Group/index"
            }) : 7 == i ? a ? wx.navigateTo({
                url: "../../shop/integral/exchangedetails/index?goods_id=" + a
            }) : wx.navigateTo({
                url: "../../shop/integral/exchange/index"
            }) : 8 == i ? a && 0 != a ? wx.navigateTo({
                url: "../../article/detail/index?aid=" + a
            }) : wx.navigateTo({
                url: "../../article/index/index"
            }) : 9 == i ? wx.navigateTo({
                url: "../../user/coupon/index/index"
            }) : 10 == i ? wx.navigateTo({
                url: "../issue/index"
            }) : 11 == i ? wx.navigateTo({
                url: "../../shop/buyCar/index"
            }) : 12 == i ? wx.navigateTo({
                url: "../../user/addCard/index"
            }) : 13 == i && (a && 0 != a ? wx.navigateTo({
                url: "../../funding/prodetail/index?pid=" + a
            }) : wx.navigateTo({
                url: "../../funding/index/index"
            }));
        }
    }
});