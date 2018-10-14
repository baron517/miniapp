Page({
  data: {
    selected: true,
    selected1: false,
    selected2: false

  },
  selected: function (e) {
    this.setData({
      selected: true,
      selected1: false,
      selected2: false
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
      selected1: true,
      selected2: false
    })
    wx.showToast({
      title: '加载中..',
      icon: 'loading',
      duration: 1000
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
    wx.showToast({
      title: '加载中..',
      icon: 'loading',
      duration: 1000
    })
  },
})