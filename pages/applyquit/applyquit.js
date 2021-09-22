// pages/applyquit/applyquit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL, 
    basicImg:app.data.basicImg,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
  },
  // 离职表单内容
  departure(e) {
    this.setData({
      departure: e.detail.value
    })
  },
  //提交
  submitIntr: function () {
    const _this = this;
    var data = {
      resign_reason: this.data.departure,
      apply_out: 1
    }
    wx.request({
      url: _this.data.basicURL + 'yonghu/apply_resign',
      method: "POST",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            departureID: res.data.data
          })
          wx.showToast({
            title: '申请成功',
            icon:"none",
            duration:2000
          })
          wx.navigateTo({
            url: "../examine/examine"
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon:"none",
            duration:2000
          })
        }
      }
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