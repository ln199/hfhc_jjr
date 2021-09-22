// pages/buytopping/buytopping.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    _num: 0,
    package: [
      {
        id: 1,
        name: "100好房币",
        value: 100,
        describe: "5次(送1次)",
        recommend: 0
      },
      {
        id: 2,
        name: "200好房币",
        value: 200,
        describe: "10次(送2次)",
        recommend: 0
      }, {
        id: 3,
        name: "300好房币",
        value: 300,
        describe: "15次(送3次)",
        recommend: 1
      }, {
        id: 4,
        name: "400好房币",
        value: 400,
        describe: "20次(送4次)",
        recommend: 0
      },
    ],
    checked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    });
  },

  // 获取任意金额
  anyCoin(e) {
    this.setData({
      package_money: e.detail.value
    })
  },

  // 选择套餐
  menuClick: function (e) {
    this.setData({
      _num: e.target.dataset.num,
      package_money: e.currentTarget.dataset.money,
      package_id: e.currentTarget.dataset.id
    })
  },

  // 同意协议
  checkChange() {
    this.setData({
      checked: !this.data.checked
    })
  },

  // 支付购买
  buy() {
    if (this.data.package_money == undefined) {
      this.data.package_money = this.data.package[0].package_money
    }
    if (this.data.package_id == undefined) {
      this.data.package_id = this.data.package[0].package_id
    }
    const _this = this;
    var data = {
      uid: this.data.user_id,
      amount: this.data.package_money,
      recharge: "好房好车",
      third_id: wx.getStorageSync('third_id'),
      taocan: this.data.package_id
    }
    // 是否同意协议
    if (!this.data.checked) {
      wx.showToast({
        title: '请仔细阅读并同意协议',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    // 支付购买
    wx.request({
      url: _this.data.basicURL + 'recharge/order',
      method: "POST",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.wxPay(res.data.data)
        }
      }
    })
  },

  // 微信支付
  wxPay(res) {
    wx.requestPayment({
      timeStamp: res.timeStamp,
      nonceStr: res.nonceStr,
      package: res.package,
      signType: res.signType,
      paySign: res.paySign,
      success(res) {
        wx.showToast({
          title: '支付成功',
          icon: "none",
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '../topping/topping',
          })
        }, 1500);
      },
      fail(res) {
        wx.showToast({
          title: '支付失败，请稍后重试',
          icon: "none",
          duration: 2000
        })
      }
    })

  },
  // 获取充值套餐
  getPayPackage() {
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'recharge/package',
      method: "POST",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            package: res.data.data
          })
        }
      }
    })
  },

  // 获取好房币余额
  getCoinDetails() {
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'my/get_coinlog',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            coinVal: res.data.data.coinval
          })
        }
      }
    })
  },

  // 获取用户信息
  getUserInfo() {
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
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserInfo();
    this.getCoinDetails();
    this.getPayPackage();
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