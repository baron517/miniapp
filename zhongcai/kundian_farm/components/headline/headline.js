Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        text: {
            type: String,
            value: "这不是标题，哈哈哈哈哈"
        },
        styles: {
            type: Number,
            value: 10
        },
        fontColor: {
            type: String,
            value: "#000"
        },
        fontSize: {
            type: Number,
            value: 30
        },
        bgColor: {
            type: String,
            value: "#000"
        },
        padTb: {
            type: Number,
            value: 0
        },
        padLr: {
            type: Number,
            value: 0
        },
        align: {
            type: String,
            value: "left"
        },
        link: {
            type: String,
            value: ""
        },
        icon: {
            type: String,
            value: ""
        }
    },
    methods: {}
});