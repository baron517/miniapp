Component({
    properties: {
        height: {
            type: Number,
            value: 0
        },
        adLists: {
            type: Array,
            value: []
        }
    },
    data: {},
    methods: {
        navToPage: function(e) {
            var a = e.currentTarget.dataset.linktype, i = e.currentTarget.dataset.linkparam;
            1 == a ? i ? wx.navigateTo({
                url: "../../land/landDetails/index?lid=" + i
            }) : wx.navigateTo({
                url: "../../user/land/selectionLands/index"
            }) : 2 == a ? i ? wx.navigateTo({
                url: "../../shop/AdoptRules/index?aid=" + i
            }) : wx.navigateTo({
                url: "../../shop/Adopt/index"
            }) : 3 == a ? wx.navigateTo({
                url: "../../shop/integral/index/index"
            }) : 4 == a ? wx.navigateTo({
                url: "../live/index"
            }) : 5 == a ? i ? wx.navigateTo({
                url: "../../shop/prodeteils/index?goodsid=" + i
            }) : wx.switchTab({
                url: "../../shop/index/index"
            }) : 6 == a ? i ? wx.navigateTo({
                url: "../../shop/Group/proDetails/index?goods_id=" + i
            }) : wx.navigateTo({
                url: "../../shop/Group/index"
            }) : 7 == a ? i ? wx.navigateTo({
                url: "../../shop/integral/exchangedetails/index?goods_id=" + i
            }) : wx.navigateTo({
                url: "../../shop/integral/exchange/index"
            }) : 8 == a ? i && 0 != i ? wx.navigateTo({
                url: "../../article/detail/index?aid=" + i
            }) : wx.navigateTo({
                url: "../../article/index/index"
            }) : 9 == a ? wx.navigateTo({
                url: "../../user/coupon/index/index"
            }) : 10 == a ? wx.navigateTo({
                url: "../issue/index"
            }) : 11 == a ? wx.navigateTo({
                url: "../../shop/buyCar/index"
            }) : 12 == a ? wx.navigateTo({
                url: "../../user/addCard/index"
            }) : 13 == a && (i && 0 != i ? wx.navigateTo({
                url: "../../funding/prodetail/index?pid=" + i
            }) : wx.navigateTo({
                url: "../../funding/index/index"
            }));
        }
    }
});