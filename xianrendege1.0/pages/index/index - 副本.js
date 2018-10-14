Page({
  data: {
     imgUrls: [
     'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg' ,
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg' ,
       'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg' 
    ],
     movies: [
       { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
       { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
       { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
       { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' },
       { url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'} ,
       { url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'},
       { url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'}
     ],
     photoList: [
       { url: '../../images/7.png', name: '热歌排行', musicurl:  '../musicclassic/musicclassic'},
       { url: '../../images/8.png', name: '全部歌曲', musicurl: '../musicwhole/musicwhole'},
       { url: '../../images/10.png', name: '我的歌单', musicurl: '../musicList/musicList' },
       { url: 'https://www.easyicon.net/api/resizeApi.php?id=517254&size=72', name: '音乐资讯', musicurl: '../musicvideo/musicvideo'}, 
       { url: 'https://www.easyicon.net/api/resizeApi.php?id=1197051&size=128', name: '最近播放', musicurl: '../musicdownload/musicdownload' },
       { url: '../../images/img123.png', name: '西安音乐人', musicurl: '../musicLove/musicLove'},
     ],
     local_database:[
       {
         date: "Nov 10 2016",
         title: "小螃蟹",
         imgSrc: "/images/post/crab.png",
         avatar: "/images/avatar/1.png",
         content: "文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介",
         reading: "92",
         collection: "65",
         view_img: "/images/icon/chat.png",
         collect_img: "/images/icon/view.png",
       },
       {
         date: "Nov 20 2016",
         title: "一周电影推荐",
         imgSrc: "/images/post/bl.png",
         avatar: "/images/avatar/2.png",
         content: "文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介",
         reading: "88",
         collection: "66",
         view_img: "/images/icon/chat.png",
         collect_img: "/images/icon/view.png",
       },
       {
         date: "Nov 25 2016",
         title: "可爱的猫",
         imgSrc: "/images/post/cat.png",
         avatar: "/images/avatar/3.png",
         content: "文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介",
         reading: "123",
         collection: "55",
         view_img: "/images/icon/chat.png",
         collect_img: "/images/icon/view.png",
       }
     ],
     circular: true,  //轮播循环播放
     isplaying: true,
     islyric: false,
  },
  // onLoad: function (options) {
  //   wx.showLoading({
  //     title: '加载中...',
  //     duration: 1000
  //   })
  // },
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