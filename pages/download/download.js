// pages/download/download.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    downLoadUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sys = wx.getSystemInfoSync()
    if (sys.platform == 'ios') {
      this.setData({
        downLoadUrl: 'https://apps.apple.com/cn/app/%E5%A5%BD%E6%88%BF%E5%A5%BD%E8%BD%A6%E7%BB%8F%E7%BA%AA%E4%BA%BA/id1531985488'
      })
    } else {
      this.setData({
        downLoadUrl: 'http://zhushou.360.cn/detail/index/soft_id/4554249?recrefer=SE_D_%E5%A5%BD%E6%88%BF%E5%A5%BD%E8%BD%A6'
      })
    }
  },

  // 复制链接
  copyUrl(e) {
    var text = this.data.downLoadUrl;
    // text是点击的这一项的内容
    wx.setClipboardData({
      data: text,
      success(res) {
        wx.getClipboardData({
          success(res) {

          }
        })
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