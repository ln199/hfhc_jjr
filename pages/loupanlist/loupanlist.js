// pages/bill/bill.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    domainURL: app.data.domainURL,
    basicAppURL: app.data.basicAppURL,
    loupanList: null,
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
  // 获取楼盘海报详情
  loufangSwiper() {
    let _this = this;
    wx.request({
      url: _this.data.basicAppURL + '/guanli/posterlist',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_mobile"
      },
      success(res) {
        if (res.data.data && res.data.data.length > 4) {
          _this.setData({
            loupanList: res.data.data
          })
        } else {
          _this.setData({
            loupanList: []
          })
         }
        }
      })
  },
  // 查看大图
  previewImg: function (e) {
    console.log(e);
    let imgpath = e.target.dataset.imgpath;
    wx.previewImage({
      current:imgpath,
      urls: [imgpath]
    })
  },
  
  // 复制文本
  copyText(e) {
    var text = e.currentTarget.dataset.text;
    wx.setClipboardData({
      data: text,
      success (res) {
        wx.getClipboardData({
          success (res) {
          
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.loufangSwiper()
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