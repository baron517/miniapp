Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' },
      { url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg' },
      { url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg' },
      { url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg' }
    ],
    circular: true,  //轮播循环播放
    musicList: [],
  },
  zanTap: function (e) {
    wx.showToast({
      title: '点赞成功',
      icon: 'success',
      duration: 500
    })
  },
  loadTap: function (e) {
    wx.showToast({
      title: '下载成功',
      icon: 'success',
      duration: 500
    })
  },
  addTap: function (e) {
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 500
    })
  },
  select_date: function (e) {
    this.setData({
      state: e.currentTarget.dataset.key,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (var i = 0; i < 20; i++) {
      this.data.musicList.push({
        itplaying: false,
        itplay: false,
        content: (i + 1) + ".",
        name: "成都",
        man: "赵雷",
        zanUrl: "https://www.easyicon.net/api/resizeApi.php?id=1153800&size=128",
        // loadUrl: "https://www.easyicon.net/api/resizeApi.php?id=1153737&size=128",
        addUrl: "https://www.easyicon.net/api/resizeApi.php?id=1141668&size=72",
        isTouchMove: false //默认全隐藏删除
      })
    };
    this.setData({
      musicList: this.data.musicList
    })
    wx.showToast({
      title: '加载中..',
      icon: 'loading',
      duration: 1000
    })

  },
  zanTap: function (event) {
    const vw = this;

    const _index = event.currentTarget.dataset.index;

    let _musicList = [...vw.data.musicList]; // msg的引用

    _musicList[_index]['itplay'] = !vw.data.musicList[_index]['itplay'];


    vw.setData({
      musicList: _musicList

    })
    wx.showToast({
      title: '点赞成功',
      icon: 'success',
      duration: 500
    })
  },
  zanTapa: function (event) {
    const vw = this;

    const _index = event.currentTarget.dataset.index;

    let _musicList = [...vw.data.musicList]; // msg的引用

    _musicList[_index]['itplay'] = !vw.data.musicList[_index]['itplay'];


    vw.setData({
      musicList: _musicList

    })
    wx.showToast({
      title: '取消成功',
      icon: 'success',
      duration: 500
    })
  },
  addTap: function (event) {

    const vm = this;

    const _index = event.currentTarget.dataset.index;

    let _musicList = [...vm.data.musicList]; // msg的引用

    _musicList[_index]['itplaying'] = !vm.data.musicList[_index]['itplaying'];


    vm.setData({
      musicList: _musicList

    })
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 500
    })
  },
  addTapa: function (event) {

    const vm = this;

    const _index = event.currentTarget.dataset.index;

    let _musicList = [...vm.data.musicList]; // msg的引用

    _musicList[_index]['itplaying'] = !vm.data.musicList[_index]['itplaying'];


    vm.setData({
      musicList: _musicList

    })
    wx.showToast({
      title: '取消成功',
      icon: 'success',
      duration: 500
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