// pages/topping/topping.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    currentTab: 0,
    windowHeight: 0,
    scrollHeight: 0,
    tab: 0,
    endedTime: '',
    array: [
      {
        id: 1,
        name: "1小时"
      },
      {
        id: 2,
        name: "2小时"
      }, {
        id: 3,
        name: "3小时"
      }, {
        id: 4,
        name: "4小时"
      }, {
        id: 5,
        name: "5小时"
      }
    ],
    index: 0,
    arrays: [
      {
        id: 1,
        name: "1次"
      }, {
        id: 2,
        name: "2次"
      }, {
        id: 3,
        name: "3次"
      }, {
        id: 4,
        name: "4次"
      }, {
        id: 5,
        name: "5次"
      },
      {
        id: 6,
        name: "6次"
      }
    ],
    indexs: 0,
    switch_state: 0
  },

  //去购买
  goBuy: function () {
    wx.navigateTo({
      url: '../buytopping/buytopping',
    })
  },

  //时间间隔
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  //每天次数
  bindPickerChanges: function (e) {
    this.setData({
      indexs: e.detail.value
    })
  },

  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  //时间插件
  onPickerChange3: function (e) {
    this.setData({
      endedTime: e.detail.dateString
    })
  },
  toDouble: function (num) {
    if (num >= 10) {//大于10
      return num;
    } else {//0-9
      return '0' + num
    }
  },
  getToday: function () {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + '-' + this.toDouble(month) + '-' + this.toDouble(day)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      id: options.id
    });

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        let windowHeight = (res.windowHeight * (750 / res.windowWidth));
        that.setData({
          windowHeight: windowHeight
        })
      }
    });

    setTimeout(function () {
      var tab = wx.createSelectorQuery();
      tab.select('.swiper-tab').boundingClientRect();
      tab.exec(function (rect) { if (rect[0] === null) return; that.setData({ tab: rect[0].height }) });
    }, 500)

    setTimeout(function () {
      var tabHeight = that.data.tab;

      wx.getSystemInfo({
        success: function (res) {
          let scrollHeight = res.windowHeight;
          that.setData({
            scrollHeight: scrollHeight - tabHeight + 112
          })
        }
      })
    }, 1000);


    let dayTime = this.getToday();
    let dayHour = "18:00";
    let endedTime1 = dayTime + " " + dayHour;
    this.setData({
      endedTime: endedTime1
    })
  },

  // 开关变化函数
  switchChange(e) {
    let value = e.detail.value;
    let switch_state = this.data.switch_state;
    if (value) {
      switch_state = 1;
    } else {
      switch_state = 0;
    }
    this.setData({
      switch_state: switch_state
    })
  },
  // 返回上一页
  backPage() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 置顶
  payAndSubmit() {
    var type = this.data.currentTab;
    const _this = this;
    if (this.data.balance <= 0) {
      wx.showToast({
        title: '置顶余额不足，请充值',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '../buytopping/buytopping',
        })
      }, 1500)
      return;
    }
    if (type == 0) {
      let data = {
        fyid: this.data.id
      }
      // 立即置顶
      wx.request({
        url: _this.data.basicURL + 'fangyuanzhiding/zhiding',
        method: "POST",
        data: data,
        header: {
          "XX-TOKEN": wx.getStorageSync('token'),
          "XX-DEVICE-TYPE": "jjr_dian",
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '置顶成功',
              icon: 'none',
              duration: 2000
            })
            setTimeout(() => {
              wx.navigateBack({
                complete: (res) => { detal: 1 },
              })
            }, 1500)
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    } else if (type == 1) {
      // 预约置顶
      console.log(this.data.id);
      let data = {
        fyid: this.data.id,
        type: this.data.switch_state,
        start_time: this.data.endedTime,
        refresh_interval: this.data.array[this.data.index].id,
        refresh_count: this.data.arrays[this.data.indexs].id,
      }
      wx.request({
        url: _this.data.basicURL + 'fangyuanzhiding/autozhiding',
        method: "POST",
        data: data,
        header: {
          "XX-TOKEN": wx.getStorageSync('token'),
          "XX-DEVICE-TYPE": "jjr_dian",
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res);
          if (res.data.code == 0) {
            wx.showToast({
              title: '设置成功',
              icon: 'none',
              duration: 2000
            })
            setTimeout(() => {
              wx.navigateBack({
                complete: (res) => { detal: 1 },
              })
            }, 1500)
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },
  // 获取用户置顶次数
  getTopNum() {
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'fangyuanzhiding/zhidingbalance',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            balance: res.data.data.balance
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTopNum();
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