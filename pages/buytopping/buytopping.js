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

  // 选择套餐
  menuClick: function (e) {
    this.setData({
      _num: e.target.dataset.num
    })
  },

  // 跳转充值页面
  intoPayCoin() {
    wx.navigateTo({
      url: '../paycoin/paycoin',
    })
  },

  // 同意协议
  checkChange() {
    this.setData({
      checked: !this.data.checked
    })
  },

  // 取消支付
  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 支付购买
  buy(e) {
    let amount = this.data.package[this.data._num].value;
    const _this = this;
    var data = {
      coin: amount
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
    // 需要支付的金额
    if (this.data.coinVal < amount) {
      wx.showToast({
        title: '好房币不足',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    // 支付购买
    wx.request({
      url: _this.data.basicURL + 'fangyuanzhiding/charge',
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

  // 获取置顶套餐
  getTopPackage() {
    const _this = this;
    var data = {

    }
    wx.request({
      url: _this.data.basicURL + 'fangyuanzhiding/getsuits',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res);
        if (res.data.code == 0) {

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCoinDetails();
    this.getTopPackage();
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