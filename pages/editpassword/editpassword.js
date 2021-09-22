// pages/editpassword/editpassword.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
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
  // 修改密码
  updataPassword(e) {
    var pwd = e.detail.value.pwd;
    var new_pwd = e.detail.value.new_pwd;
    var new_pwd_c = e.detail.value.new_pwd_c;
    const _this = this;
    var data = {
      pwd: pwd,
      new_pwd: new_pwd,
      new_pwd_c: new_pwd_c
    }
    if (pwd == '') {
      wx.showToast({
        title: '请输入旧密码',
        icon: "none",
        duration: 2000
      })
    } else if (new_pwd == '') {
      wx.showToast({
        title: '请输入新密码',
        icon: "none",
        duration: 2000
      })
    } else if (new_pwd_c == '') {
      wx.showToast({
        title: '请再次输入新密码',
        icon: "none",
        duration: 2000
      })
    } else {
      wx.request({
        url: _this.data.basicURL + 'my/modify_pwd',
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
              title: '修改成功',
              icon: "none",
              duration: 2000
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000
            })
          }

        }
      })
    }
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