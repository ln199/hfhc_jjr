// pages/citywide/citywide.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicAppURL: app.data.basicAppURL,
    basicImg: app.data.basicImg,
    href : ''
  },
  // 获取用户信息
  getUserInfo(callback) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'my/info',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_mobile"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            user_id: res.data.data.uid
          })
          callback()
        }
      },
      fail() {
        wx.hideLoading()
      }
    })
  },
  getUrl() {
    const _this = this;
    let user = wx.getStorageSync('user_info')
    let phone = user.dianhua
    wx.request({
      url: _this.data.basicAppURL + 'daxue/geturl',
      method: "POST",
      data: {
        uid: _this.data.user_id,
        dianhua: phone
      },
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        wx.hideLoading()
        if (res.data.code == 0) {
          _this.setData({
            href: res.data.data.data
          })          
        } else {
          if (res.data.msg == "该用户无权限访问大学") {
            wx.showToast({
              title: '您暂无权限访问',
              icon: 'none',
              duration: 2000
            })
          }
        }        
      },
      fail() {
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   href:decodeURIComponent(options.href)
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserInfo(this.getUrl)
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