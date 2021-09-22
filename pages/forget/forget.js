// pages/registered/registered.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    check: false, //复选框
    mobile: "",
    password: "",
    code: "",
    remaining: 60,
    send_type: 1
  },
  // 获取表单手机号
  mobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  // 获取表单密码
  password(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 验证密码是否一样
  confirm(e) {
    this.setData({
      confirm_password: e.detail.value
    })
  },
  // 获取表单验证码
  code(e) {
    this.setData({
      code: e.detail.value
    })
  },
  // 获取接口验证码
  getCode() {
    var _this = this;
    wx.request({
      url: _this.data.basicURL + 'user/smscode',
      method: 'POST',
      data: {
        mobile: _this.data.mobile,
        yongtu: "xiugaimima"
      },
      header: {
        "XX-DEVICE-TYPE": " jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '已发送，请注意查收',
            icon: 'none',
            duration: 2000
          })
          _this.setData({
            send_type: 0
          })
          setTimeout(() => {
            _this.setData({
              send_type: 1
            })
          }, 60000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  // 修改密码
  forget() {
    if (this.data.mobile == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (!/^[1]([3-9])[0-9]{9}$/.test(this.data.mobile) && this.data.mobile != '') {
      wx.showToast({
        title: '请输入正确手机号',
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (this.data.confirm_password != this.data.password) {
      wx.showToast({
        title: '两次密码请输入一致',
        icon: "none",
        duration: 2000
      })
      return;
    }
    const _this = this;
    var data = {
      mobile: this.data.mobile,
      smscode: this.data.code,
      password: this.data.password
    }
    wx.request({
      url: _this.data.basicURL + 'user/wangjimima',
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
            title: '修改成功',
            icon: 'none',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '../login/login',
            })
          }, 1500)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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