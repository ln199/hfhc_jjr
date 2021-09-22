// pages/historycustomes/historycustomes.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    swiperTab: ["求购", "求租"],
    currentTab: 0,
    keyuan: [],
    page: 1,
    hasData: true,
    pageSize: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          windowHeight: res.windowHeight - 120
        })
      }
    });
  },

  // 点击tab
  clickTab(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
  },
  // tab改变事件
  swiperTab(e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  // 获取客源列表
  getUserLsit() {
    const _this = this;
    if (this.data.searchVal == undefined) {
      this.data.searchVal = ''
    }
    var data = {
      is_ajax: 1,
      mmzl: 1,
      p: this.data.page,
      keywords: this.data.searchVal
    }
    wx.request({
      url: _this.data.basicURL + 'keyuan/index',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          var result = res.data.data.keyuan;
          if (result.length < _this.data.pageSize) {
            _this.setData({
              keyuan: _this.data.keyuan.concat(result),
              hasData: false
            })
          } else {
            _this.setData({
              keyuan: _this.data.keyuan.concat(result),
              page: _this.data.page + 1,
              hasData: true
            })
          }
        }
      }
    })
  },
  // scroll-view触底事件
  bindscrolltolower(e) {
    if (this.data.hasData) {
      this.getUserLsit();
    } else {
      wx.showToast({
        title: '没有数据了',
        icon: "none",
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserLsit();
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