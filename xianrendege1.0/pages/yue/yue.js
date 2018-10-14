// pages/yue/yue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      Listmodel:[
          {
           url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533898389487&di=a078c60f508d3f6d0871796cba278655&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01384558fefc65a801214550ba0a78.jpg%402o.jpg',
          hande:'鹿晗全国巡回演唱会 北京站',
          time:'2018.09.09 18:30',
          live:'北京·北京五棵松体育馆',
          num:'￥600-2000'
          },
           {
          url: 'http://img2.imgtn.bdimg.com/it/u=2938590335,4255745983&fm=27&gp=0.jpg',
          hande: '汪峰世界巡回演唱会 北京站',
          time: '2018.09.28 17:30',
          live: '北京·北京五棵松体育馆',
          num: '￥600-2000'
        },
         {
           url: 'http://img2.imgtn.bdimg.com/it/u=1242857347,3044502157&fm=27&gp=0.jpg',
          hande: '张学友世界巡回演唱会 北京站',
          time: '2018.09.09 18:30',
          live: '北京·北京五棵松体育馆',
          num: '￥600-2000'
        },
         {
           url: 'http://img0.imgtn.bdimg.com/it/u=1142254877,3871915517&fm=11&gp=0.jpg',
          hande: '张杰世界巡回演唱会 北京站',
          time: '2018.09.09 18:30',
          live: '北京·北京五棵松体育馆',
          num: '￥600-2000'
        },
         {
           url: 'http://img4.imgtn.bdimg.com/it/u=3736353991,2126859739&fm=27&gp=0.jpg',
          hande: '毛阿敏演唱会 北京站',
          time: '2018.09.09 18:30',
          live: '北京·北京五棵松体育馆',
          num: '￥600-2000'
        },
         {
           url: 'http://img1.imgtn.bdimg.com/it/u=416899417,3062675778&fm=27&gp=0.jpg',
          hande: '陈奕迅世界巡回演唱会 北京站',
          time: '2018.09.09 18:30',
          live: '北京·北京五棵松体育馆',
          num: '￥600-2000'
        },
         {
           url: 'http://img0.imgtn.bdimg.com/it/u=868043757,274336959&fm=27&gp=0.jpg',
          hande: '王力宏世界巡回演唱会 北京站',
          time: '2018.09.09 18:30',
          live: '北京·北京五棵松体育馆',
          num: '￥600-2000'
        },
         {
           url: 'http://img1.imgtn.bdimg.com/it/u=599561209,3934967266&fm=27&gp=0.jpg',
          hande: '光良全国巡回演唱会 北京站',
          time: '2018.09.09 18:30',
          live: '北京·北京五棵松体育馆',
          num: '￥600-2000'
        },
         {
           url: 'http://img4.imgtn.bdimg.com/it/u=3281198786,461138126&fm=27&gp=0.jpg',
          hande: '周杰伦世界巡回演唱会（地表最强） 北京站',
          time: '2018.09.09 18:30',
          live: '北京·北京五棵松体育馆',
          num: '￥600-2000'
        }

      ],
      Listpage:[
        {
          url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1912746886,2044191943&fm=27&gp=0.jpg',
          hande: '狐朋狗友聚一聚   西安',
          time: '2018.09.09 18:30',
          live: '西安·西安回民街',
          num: '限时免费申请'
        },
        {
          url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=561037495,3589426811&fm=27&gp=0.jpg',
          hande: '以酒会友    西安',
          time: '2018.09.09 18:30',
          live: '西安·西安赛格',
          num: '限时免费申请'
        },
        {
          url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1531170546,3683119952&fm=27&gp=0.jpg',
          hande: '复古音乐派对   西安',
          time: '2018.09.09 18:30',
          live: '西安·西安赛格',
          num: '限时免费申请'
        }
      ],

    selected: true,
    selected1: false
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
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      wx.showLoading({
        title: '加载中...',
        duration: 1000
      })


  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})