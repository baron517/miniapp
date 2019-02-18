Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        column: {
            type: Number,
            value: 4
        },
        fontColor: {
            type: String,
            value: "#000"
        },
        fontSize: {
            type: Number,
            value: 32
        },
        radius: {
            type: String,
            value: "50%"
        },
        list: {
            type: Array,
            value: []
        }
    },
    data: {},
    methods: {
        intoDetail: function(t) {
            var e = t.currentTarget.dataset.url;
            wx.navigateTo({
                url: "../../" + e,
                fail: function(t) {
                    wx.switchTab({
                        url: "../../" + e
                    });
                }
            });
        }
    }
});