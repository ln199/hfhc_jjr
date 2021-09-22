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
  // 获取复选框
  check() {
    this.data.check = !this.data.check;
  },
  // 获取接口验证码
  getCode() {
    var _this = this;
    wx.request({
      url: _this.data.basicURL + 'user/smscode',
      method: 'POST',
      data: {
        mobile: _this.data.mobile
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
  // 点击注册
  regUser() {
    if (this.data.thirdId) {
      this.regUserWechat()
    } else {
      this.regUserNormal();
    }
  },
  // 正常注册
  regUserNormal() {
    var _this = this;
    var data = {
      mobile: this.data.mobile,
      password: this.data.password,
      smscode: this.data.code
    };
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    if (this.data.check == false) {
      wx.showToast({
        title: '请勾选协议',
        icon: 'none',
        duration: 2000
      })
    } else if (!reg.test(this.data.mobile)) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.mobile == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.password == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
    }else if(this.data.password.length<6){
      wx.showToast({
        title: '请输入至少六位密码',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.confirm_password != this.data.password) {
      wx.showToast({
        title: '两次密码请输入一致',
        icon: "none",
        duration: 2000
      })
    } else if (this.data.code == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: _this.data.basicURL + 'user/register',
        method: 'POST',
        data: data,
        header: {
          "XX-DEVICE-TYPE": " jjr_dian",
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(() => {
              wx.navigateTo({
                url: '../login/login'
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
  // 微信注册
  regUserWechat() {
    var _this = this;
    var data = {
      mobile: this.data.mobile,
      password: this.data.password,
      smscode: this.data.code,
      third_id: this.data.thirdId
    };
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    if (this.data.check == false) {
      wx.showToast({
        title: '请勾选协议',
        icon: 'none',
        duration: 2000
      })
    } else if (!reg.test(this.data.mobile)) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.mobile == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.password == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
    } else if(this.data.password.length<6){
      wx.showToast({
        title: '请输入至少六位密码',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.confirm_password != this.data.password) {
      wx.showToast({
        title: '两次密码请输入一致',
        icon: "none",
        duration: 2000
      })
    } else if (this.data.code == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: _this.data.basicURL + 'user/register2',
        method: 'POST',
        data: data,
        header: {
          "XX-DEVICE-TYPE": "jjr_dian",
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {
          if (res.code == 0) {
            wx.request({
              url: _this.data.basicURL + 'user/wxlogin2',
              method: "POST",
              data: {
                third_id: _this.data.thirdId
              },
              header: {
                "XX-DEVICE-TYPE": " jjr_dian",
                "content-type": "application/x-www-form-urlencoded"
              },
              success(res) {
                if (res.data.code == 0) {
                  wx.setStorageSync('third_id', _this.data.thirdId);
                  wx.setStorageSync('token', res.data.data.token);
                  wx.showToast({
                    title: '登陆成功',
                    icon: "none",
                    duration: 2000
                  })
                  wx.switchTab({
                    url: '../index/index',
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
  // 去登陆
  loginUser() {
    wx.navigateTo({
      url: '../login/login',
    })
  },

    // 用户协议
    userAgreement(e){
      let url = "https://www.hfhchsh.com/brokerweb/hfzixun/zxs1?id=13";
      url =encodeURIComponent(url);
      wx.navigateTo({
        url: '../agreement/agreement?url='+url,
      })
    },
    // 隐私政策
    privateAgreement(){
      let url = "https://www.hfhchsh.com/brokerweb/hfzixun/zxs1?id=14";
      url =encodeURIComponent(url);
      wx.navigateTo({
        url: '../agreement/agreement?url='+url,
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      thirdId: options.thirdId
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