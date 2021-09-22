// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    mobile: "", //手机
    password: "", //密码
    code: "", //微信登录code
    tokenShow: false,
    tokenHide: true,
    portrait: "",
    userName: "",
    company: ""
  },
  // 跳转到注册页面
  regPage: function () {
    wx.navigateTo({
      url: '../registered/registered'
    })
  },
  // 跳转到忘记密码
  intoForget() {
    wx.navigateTo({
      url: '../forget/forget'
    })
  },
  // 手机号
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value,
    })
  },
  // 密码
  password(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 登录
  login() {
    if (this.data.thirdId) {
      this.loginWeixin()
    } else {
      this.loginGeneral()
    }
  },
  // 普通登录
  loginGeneral() {
    var _this = this;
    var data = {
      username: this.data.mobile,
      password: this.data.password
    }
    if(this.data.password.length < 6){
      wx.showToast({
        title: '请输入至少六位密码',
        icon:"none",
        duration:2000
      })
      return;
    }
    wx.request({
      url: _this.data.basicURL + 'user/login',
      method: "POST",
      data: data,
      header: {
        "XX-DEVICE-TYPE": "jjr_mobile",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {
          wx.setStorageSync('IM', res.data.data.im);
          wx.setStorageSync('user_info', res.data.data.user_info);
          wx.setStorageSync('token', res.data.data.token);
          wx.setStorageSync('gongsiid', res.data.data.user_info.gongsiid);
          wx.setStorageSync('ally', res.data.data.company.is_ally);
          wx.setStorageSync('companyName', res.data.data.company.companyName);
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 2000
          })          
          wx.request({
            url: _this.data.basicURL + 'yonghu/get_verify_info',
            method: 'POST',
            header: {
              "XX-TOKEN": res.data.data.token,
              "XX-DEVICE-TYPE": "jjr_dian",
              "content-type": "multipart/form-data"
            },
            success(res) {              
              if (res.data.code == 0) {
                if (res.data.data.total_verified == 1) {
                  wx.switchTab({
                    url: '../index/index',
                  })
                } else {
                  // wx.navigateTo({
                  //   url: '../completion/completion',
                  // })
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              } else {
                // wx.navigateTo({
                //   url: '../completion/completion',
                // })
                wx.switchTab({
                  url: '../index/index',
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
  },
  // 点击登录绑定微信
  loginWeixin() {
    var _this = this;
  
    wx.request({
      url: _this.data.basicURL + 'user/login2',
      method: "POST",
      data: {
        third_id: this.data.thirdId,
        username: this.data.mobile,
        password: this.data.password
      },
      header: {
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {
          wx.setStorageSync('third_id', res.data.data.thirdId);
          wx.setStorageSync('token', res.data.data.token);
          wx.setStorageSync('ally', res.data.data.company.is_ally);
          wx.setStorageSync('companyName', res.data.data.company.companyName);
          wx.showToast({
            title: '登录成功',
            icon: "none",
            duration: 2000
          })
          wx.request({
            url: _this.data.basicURL + 'yonghu/get_verify_info',
            method: 'POST',
            header: {
              "XX-TOKEN": res.data.data.token,
              "XX-DEVICE-TYPE": "jjr_dian",
              "content-type": "multipart/form-data"
            },
            success(res) {
              if (res.data.code == 0) {
                if (res.data.data.total_verified == 1) {
                  wx.switchTab({
                    url: '../index/index',
                  })
                } else {
                  wx.navigateTo({
                    url: '../completion/completion',
                  })
                }
              }
            }
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
    // if (wx.getStorageSync('token')) {
    this.setData({
      tokenShow: true,
      tokenHide: false,
      thirdId: options.thirdId,
      code: options.code
    })
    // }
  },

  // 获取用户信息
  getUserInfo() {
    const _this = this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: _this.data.basicURL + 'my/info',
      method: "GET",
      header: {
        "XX-TOKEN": token,
        "XX-DEVICE-TYPE": "jjr_mobile"
      },
      success(res) {
        _this.setData({
          portrait: res.data.data.avatar_url,
          userName: res.data.data.ygmingcheng,
          company: res.data.data.gongsi,
          is_ally: res.data.data.is_ally
        })
      }
    })
  },
  // 授权手机号登录
  getPhoneNumber(e) {
    console.log(e.detail)
    if(e.detail.errMsg == "getPhoneNumber:ok") {
      this.weChatLogin(e.detail.encryptedData,e.detail.iv)
    } else {
      // 参考贝壳 不做处理
    }
  },
  // 用户授权登录
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    // 允许/拒绝授权
    if (e.detail.errMsg == "getUserInfo:ok") {
      //this.weChatLogin()
    } else {
      wx.showToast({
        title: '拒绝授权，登录失败',
        icon: "none",
        duration: 2000
      })
    }
  },
  // 点击下方微信按钮进行微信登录
  weChatLogin(encryptedData, iv) {
    const _this = this;
    wx.login({
      success: res => {
        _this.setData({
          code: res.code
        })
        var data = {
          code: res.code,
          encryptedData,
          iv
        }
        wx.request({
          url: _this.data.basicURL + 'user/wxlogin2',
          method: "POST",
          data: data,
          header: {
            "XX-DEVICE-TYPE": "jjr_dian",
            "content-type": "application/x-www-form-urlencoded"
          },
          success(res) {
            wx.setStorageSync('token', res.data.data.token);
            _this.setData({
              thirdId: res.data.data.thirdId
            })
            if (res.data.code == 0) {
              wx.showToast({
                title: '登录成功',
                icon: "none",
                duration: 2000
              })
              _this.setData({
                tokenShow: true,
                tokenHide: false
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
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserInfo();
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