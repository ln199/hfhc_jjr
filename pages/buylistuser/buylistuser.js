// pages/buylist/buylist.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    hasData: false,
    pageSize: 10
  },

  //添加客源-求购
  addBuy: function () {
    wx.navigateTo({
      url: "../addbuy/addbuy"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      type: options.type,
      second: options.second,
      id: options.id
    })
  },
  // 获取搜索内容
  searchResult(e) {
    this.setData({
      searchVal: e.detail.value
    })
  },
  // 获取客源列表
  getUserLsit() {
    const _this = this;
    if (this.data.searchVal == undefined) {
      this.data.searchVal = ''
    }
    var data = {
      is_ajax: 1,
      p: 1,
      limit: 10,
      keywords: this.data.searchVal
    }
    wx.request({
      url: _this.data.basicURL + 'keyuan/index',      
      method: "POST",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type":"application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            keyuan: res.data.data.keyuan
          })
        }
      }
    })
  },
  // 跳转到客源详情
  customersDetail(e) {
    if (this.data.type == 1) {
      wx.setStorageSync('user', e.currentTarget.dataset.name);
      wx.navigateBack({
        complete: (res) => {
          detal: 1
        },
      })
    } else {
      wx.setStorageSync('users', e.currentTarget.dataset.name)
      wx.navigateBack({
        complete: (res) => {
          detal: 1
        },
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserLsit()
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