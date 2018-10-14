var app = getApp()
Page({
  data: {
    items: [
        {content:"01.",name:"成都",man:"张雷"},
        {content:"02.",name:"成都",man:"张雷"},
        {content:"03.",name:"成都",man:"张雷"},
        {content:"04.",name:"成都",man:"张雷"},
        {content:"05.",name:"成都",man:"张雷"},
        {content:"06.",name:"成都",man:"张雷"},
        {content:"07.",name:"成都",man:"张雷"},
        {content:"08.",name:"成都",man:"张雷"},
        {content:"09.",name:"成都",man:"张雷"},
        {content:"10.",name:"成都",man:"张雷"},
        { content: "11.", name: "成都", man: "张雷" },
        { content: "12.", name: "成都", man: "张雷" },
        { content: "13.", name: "成都", man: "张雷" },
        { content: "14.", name: "成都", man: "张雷" },
        { content: "15.", name: "成都", man: "张雷" },
        { content: "16.", name: "成都", man: "张雷" }
    ],
    startX: 0, //开始坐标
    startY: 0,
  },
  // select_date: function (e) {
  //   this.setData({
  //     state: e.currentTarget.dataset.key,
  //   });
  // },
  // onLoad: function () {
  //   for (var i = 0; i < 10; i++) {
  //     this.data.items.push({
  //       content: i + 1,
  //       isTouchMove: false //默认全隐藏删除
  //     })
  //   };
  //   this.setData({
  //     items: this.data.items
  //   })
  // },
  //手指触摸动作开始 记录起点X坐标
  // touchstart: function (e) {
  //   //开始触摸时 重置所有删除
  //   this.data.items.forEach(function (v, i) {
  //     if (v.isTouchMove)//只操作为true的
  //       v.isTouchMove = false;
  //   })
  //   this.setData({
  //     startX: e.changedTouches[0].clientX,
  //     startY: e.changedTouches[0].clientY,
  //     items: this.data.items
  //   })
  // },
  // //滑动事件处理
  // touchmove: function (e) {

  //   var that = this,
  //     index = e.currentTarget.dataset.index,//当前索引
  //     startX = that.data.startX,//开始X坐标
  //     startY = that.data.startY,//开始Y坐标
  //     touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
  //     touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
  //     //获取滑动角度
  //     angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
  //   that.data.items.forEach(function (v, i) {
  //     v.isTouchMove = false
  //     //滑动超过30度角 return
  //     if (Math.abs(angle) > 30) return;
  //     if (i == index) {
  //       if (touchMoveX > startX) //右滑
  //         v.isTouchMove = false
  //       else //左滑
  //         v.isTouchMove = true
  //     }
  //   })
  //   //更新数据
  //   that.setData({
  //     items: that.data.items
  //   })
  // },
  // /**
  //  * 计算滑动角度
  //  * @param {Object} start 起点坐标
  //  * @param {Object} end 终点坐标
  //  */
  // angle: function (start, end) {
  //   var _X = end.X - start.X,
  //     _Y = end.Y - start.Y
  //   //返回角度 /Math.atan()返回数字的反正切值
  //   return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  // },
  //删除事件
  del: function (e) {
    this.data.items.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      items: this.data.items
    })
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 1000
    })
  }
  ,
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