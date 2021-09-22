// pages/followuprecord/followuprecord.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
  },

  //添加跟进
  addgen: function () {
    wx.navigateTo({
      url: "../addfollowup/addfollowup"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      id: options.id
    })
  },

  // 获取跟进记录
  getRecordList() {
    const _this = this;
    var data = {
      fyid: this.data.id
    }
    wx.request({
      url: _this.data.basicURL + 'fyneirong/genjinlist',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          var recordArr = res.data.data;
          recordArr[0].state = 1;
          _this.setData({
            recordArr: recordArr,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getRecordList()
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