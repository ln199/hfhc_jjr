//app.js 测试地址 http://hfhc.lingrkj.cn;   生产地址 https://www.hfhchsh.com
App({
  data: {
    domainURL: "https://www.hfhchsh.com",
    basicURL: "https://www.hfhchsh.com/api/brokerdian/",
    basicAppURL: "https://www.hfhchsh.com/api/brokerapp/",
    basicImg:'https://www.hfhchsh.com/Upload/wximg',
    ak: '1rG3prA1btVigeGjSWr7ccza25MhMZ1c'    
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res.code);
    //     // wx.setStorageSync('logCode', res.code)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 获取用户信息
  getUserInfo() {
    const _this = this;
    wx.request({
      url: _this.data.basicAppURL + 'my/info',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_mobile"
      },
      success(res) {
        if (res.data.code == 0) { //还是登录状态 暂不需要做任何处理
          console.log("__------------");
          wx.reLaunch({
            url: '../index/index'
          })
        } else {//登录状态超时了
          console.log("33332232322");
          wx.clearStorageSync();
          wx.showModal({
            title: "温馨提示",
            content: "您登录已超时",
            showCancel: false,
            success (res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '../login/login'
                })
              }
            }
          })
        }
      }
    })
  },
  onShow: function () {
    let that = this;
    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.globalData.isIphoneX = true
        }

      }
    })
    // 检测登录状态
    let token = wx.getStorageSync('token');    
    if (token) {
      this.getUserInfo()
    } else {
      wx.clearStorageSync();
    }
  },
  globalData: {
    isIphoneX: false,
    userInfo: null,
    imIsReady: false
  }
})