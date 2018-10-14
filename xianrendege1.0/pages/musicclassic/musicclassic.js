Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList:[
      {
        itplaying: false,
        itplay: true,
        content: 1,
        name: "成都",
        man: "赵雷",
        upUrl: "https://www.easyicon.net/api/resizeApi.php?id=10939&size=72",
        musicNum: "157%",
    },
      {
        itplaying: false,
        itplay: false,
        content: 2,
        name: "成都",
        man: "赵雷",
        upUrl: "https://www.easyicon.net/api/resizeApi.php?id=10939&size=72",
        musicNum: "157%",
      },
      {
        itplaying: false,
        itplay: false,
        content: 3,
        name: "成都",
        man: "赵雷",
        upUrl: "https://www.easyicon.net/api/resizeApi.php?id=10939&size=72",
        musicNum: "157%",
      },
      {
        itplaying: false,
        itplay: false,
        content: 4,
        name: "成都",
        man: "赵雷",
        upUrl: "https://www.easyicon.net/api/resizeApi.php?id=10939&size=72",
        musicNum: "157%",
      },
      {
        itplaying: false,
        itplay: false,
        content: 5,
        name: "成都",
        man: "赵雷",
        upUrl: "https://www.easyicon.net/api/resizeApi.php?id=10939&size=72",
        musicNum: "157%",
      },
      {
        itplaying: false,
        itplay: false,
        content: 6,
        name: "成都",
        man: "赵雷",
        upUrl: "https://www.easyicon.net/api/resizeApi.php?id=10939&size=72",
        musicNum: "157%",
      },
      {
        itplaying: false,
        itplay: false,
        content: 7,
        name: "成都",
        man: "赵雷",
        upUrl: "https://www.easyicon.net/api/resizeApi.php?id=10939&size=72",
        musicNum: "157%",
      },
      {
        itplaying: false,
        itplay: false,
        content: 8,
        name: "成都",
        man: "赵雷",
        upUrl: "https://www.easyicon.net/api/resizeApi.php?id=10939&size=72",
        musicNum: "157%",
      },
      {
        itplaying: false,
        itplay: false,
        content: 9,
        name: "成都",
        man: "赵雷",
        upUrl: "https://www.easyicon.net/api/resizeApi.php?id=10939&size=72",
        musicNum: "157%",
      },
    ],
    select: "",
    itlyric: true,
  },
  select_date: function (e) {
    this.setData({
      state: e.currentTarget.dataset.key,
    });
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //   for (var i = 0; i < 20; i++) {
    //   this.data.musicList.push({
    //   itplaying: false,
    //   content: (i + 1)+".",
    //   name:"成都",
    //   man:"赵雷",
    //   upUrl:"https://www.easyicon.net/api/resizeApi.php?id=10939&size=72",
    //   musicNum:"157%",
    //   zanUrl:"https://www.easyicon.net/api/resizeApi.php?id=1153800&size=128",
    //   addUrl: "https://www.easyicon.net/api/resizeApi.php?id=1141668&size=72",
    //   addUrla:"https://www.easyicon.net/api/resizeApi.php?id=1603&size=72",
      
    //     isTouchMove: false //默认全隐藏删除
    //   })
    // };
    this.setData({
      musicList: this.data.musicList
    })
    wx.showToast({
      title: '加载中..',
      icon: 'loading',
      duration: 1000
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
  }
})