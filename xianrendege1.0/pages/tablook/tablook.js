Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    local_databases: [
      {
        date: "Nov 10 2016",
        biao: "/images/bofang.png",
        imgSrc: "/images/post/crab.png",
        avatar: "/images/avatar/1.png",
        content: "视频标题及其简介",
        reading: "92",
        collection: "65",
        view_img: "/images/xin.png",
        collect_img: "/images/zan.png",
      },
      {
        date: "Nov 20 2016",
        biao: "/images/bofang.png",
        imgSrc: "/images/post/bl.png",
        avatar: "/images/avatar/2.png",
        content: "视频标题及其简介",
        reading: "88",
        collection: "66",
        view_img: "/images/xin.png",
        collect_img: "/images/zan.png",
      },
      {
        date: "Nov 25 2016",
        biao: "/images/bofang.png",
        imgSrc: "/images/post/cat.png",
        avatar: "/images/avatar/3.png",
        content: "视频标题及其简介",
        reading: "123",
        collection: "55",
        view_img: "/images/xin.png",
        collect_img: "/images/zan.png",
      }
    ],
    
    local_database: [
      {
        date: "Nov 10 2016",
        title: "小螃蟹",
        imgSrc: "/images/post/crab.png",
        avatar: "/images/avatar/1.png",
        content: "文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介",
        reading: "92",
        collection: "65",
        view_img: "/images/xin.png",
        collect_img: "/images/zan.png",
      },
      {
        date: "Nov 20 2016",
        title: "一周电影推荐",
        imgSrc: "/images/post/bl.png",
        avatar: "/images/avatar/2.png",
        content: "文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介",
        reading: "88",
        collection: "66",
        view_img: "/images/xin.png",
        collect_img: "/images/zan.png",
      },
      {
        date: "Nov 25 2016",
        title: "可爱的猫",
        imgSrc: "/images/post/cat.png",
        avatar: "/images/avatar/3.png",
        content: "文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介",
        reading: "123",
        collection: "55",
        view_img: "/images/xin.png",
        collect_img: "/images/zan.png",
      }
    ],
    selected: true,
    circular: true,  //轮播循环播放
    selected1: false

  },
  onShow: function () {
    wx.showLoading({
      title: '加载中...',
      duration: 1000
    })
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    }),
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000
    })
  
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
    wx.showToast({
      title: '加载中..',
      icon: 'loading',
      duration: 1000
    })
  },

})