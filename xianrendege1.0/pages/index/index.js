const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
//获取应用实例
const app = getApp()

Page({
  data: {
     imgUrls: [
    
    ],
     movies: [
       
     ],
     photoList: [
       { url: '../../images/7.png', name: '热歌排行', musicurl: '../musicclassic/musicclassic' },
       { url: '../../images/8.png', name: '全部歌曲', musicurl: '../musicwhole/musicwhole' },
       { url: '../../images/10.png', name: '我的歌单', musicurl: '../musicList/musicList' },
       { url: 'https://www.easyicon.net/api/resizeApi.php?id=517254&size=72', name: '音乐资讯', musicurl: '../musicvideo/musicvideo' },
       { url: 'https://www.easyicon.net/api/resizeApi.php?id=1197051&size=128', name: '最近播放', musicurl: '../musicdownload/musicdownload' },
       { url: '../../images/img123.png', name: '西安音乐人', musicurl: '../musicLove/musicLove' },
     ],
     local_database:[
       {
         date: "Nov 10 2016",
         title: "小螃蟹",
         imgSrc: "/images/post/crab.png",
         avatar: "/images/avatar/1.png",
         content: "文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介",
         reading: "92",
         collection: "65",
         view_img: "/images/icon/chat.png",
         collect_img: "/images/icon/view.png",
       }
     ],
     circular: true,  //轮播循环播放
     isplaying: true,
     islyric: false,
  },
  onShareAppMessage: function () {
    return {
      title: '西安人的歌',
      desc: '西安人的歌小程序',
      path: '/pages/index/index'
    }
  }, onPullDownRefresh() {
    // 增加下拉刷新数据的功能
    var self = this;
    this.getIndexData();
  },
  getIndexData: function () {
    let that = this;
    var data = new Object();
    util.request(api.IndexUrlNewGoods).then(function (res) {
      if (res.errno === 0) {
        data.newGoods = res.data.newGoodsList
        that.setData(data);
      }
    });
    util.request(api.IndexUrlHotGoods).then(function (res) {
      if (res.errno === 0) {
        data.hotGoods = res.data.hotGoodsList
        that.setData(data);
      }
    });
    util.request(api.IndexUrlTopic).then(function (res) {
      if (res.errno === 0) {
        data.topics = res.data.topicList
        that.setData(data);
      }
    });
    util.request(api.IndexUrlBrand).then(function (res) {
      if (res.errno === 0) {
        data.brand = res.data.brandList
        that.setData(data);
      }
    });
    util.request(api.IndexUrlCategory).then(function (res) {
      if (res.errno === 0) {
        data.floorGoods = res.data.categoryList
        that.setData(data);
      }
    });
    util.request(api.IndexUrlBanner).then(function (res) {
      //debugger
      if (res.errno === 0) {
        data.movies = res.data.banner
        that.setData(data);
      }
    });
    util.request(api.IndexUrlChannel).then(function (res) {
      if (res.errno === 0) {
        data.channel = res.data.channel
        that.setData(data);
      }
    });

  },
  onLoad: function (options) {
    this.getIndexData();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    wx.showLoading({
      title: '加载中...',
      duration: 1000
    })
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  audioPlay: function () {
    this.setData({
      isplaying: true
    })
  },
  audioPause: function () {
    this.setData({
      isplaying: false
    })
  }
})