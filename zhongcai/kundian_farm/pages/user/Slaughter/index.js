Page({
    data: {
        imgs: [ {
            id: 1,
            src: "../../../images/banner/ji2.jpg"
        }, {
            id: 2,
            src: "../../../images/banner/ji2.jpg"
        }, {
            id: 3,
            src: "../../../images/banner/ji2.jpg"
        } ],
        adopt: [ {
            id: 1,
            time: 45,
            live: !0
        } ],
        Record: [ {
            id: 1,
            date: "2018/04/10 16:16",
            word: "重庆光华永胜资本管理有限公司是一家专业从事金融服务和资本管理的金融连锁企业，公司依托中国金融家的摇篮——西南财经大学专业金融教"
        }, {
            id: 2,
            date: "2018/04/08 16:16",
            word: "咋说看见爱好是广发卡脚后跟安居客噶科技嘎哈看见过哈看见过哈空间和噶空间和广发见客户个法师科",
            img: "../../../images/banner/ji3.jpg"
        }, {
            id: 3,
            date: "2018/03/06 15:15",
            img: "../../../images/banner/ji3.jpg"
        } ]
    },
    onLoad: function(i) {
        app.util.setNavColor(uniacid);
    },
    onShareAppMessage: function() {}
});