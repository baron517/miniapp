Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        imgUrl: {
            type: Array,
            value: []
        },
        focus: {
            type: Boolean,
            value: !1
        },
        focusColor: {
            type: String,
            value: "#000"
        },
        swiperHeight: {
            type: Number,
            value: 250
        }
    },
    data: {},
    methods: {
        intoDetailSlide: function(e) {
            var i = e.currentTarget.dataset.linktype, a = e.currentTarget.dataset.linkparam;
            1 == i ? wx.navigateTo({
                url: "../../user/land/selectionLands/index"
            }) : 2 == i ? a ? wx.navigateTo({
                url: "../../shop/AdoptRules/index?aid=" + a
            }) : wx.navigateTo({
                url: "../../shop/Adopt/index"
            }) : 3 == i ? wx.navigateTo({
                url: "../../shop/integral/index/index"
            }) : 4 == i ? wx.navigateTo({
                url: "../live/index"
            }) : 5 == i ? 0 != a ? wx.navigateTo({
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
            }) : 13 == i && (a && 0 != a ? wx.navigateTo({
                url: "../../funding/prodetail/index?pid=" + a
            }) : wx.navigateTo({
                url: "../../funding/index/index"
            }));
        }
    }
});