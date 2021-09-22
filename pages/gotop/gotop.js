// pages/gotop/gotop.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    details: wx.getStorageSync('details')
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

  // 立即置顶
  payToTop() {
    const _this = this;
    var data = {
      fyid:this.data.id
    }
      wx.request({
        url: _this.data.basicURL + 'fangyuanzhiding/zhiding',
        method: "POST",
        data: data,
        header: {
          "XX-TOKEN": wx.getStorageSync('token'),
          "XX-DEVICE-TYPE": "jjr_dian",
          "content-type":"application/x-www-form-urlencoded"
        },
        success(res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '置顶成功',
              icon:'none',
              duration:2000
            })
            wx.removeStorageSync('details');
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:"none",
              duration:2000
            })
          }
        }
      })
  },
  // 需要支付的好房币
  needCoin() {
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'fangyuanzhiding/zhidingcost',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            cost: res.data.data.cost,
            mycoin:res.data.data.mycoin,
            mybalance:res.data.data.mybalance
          })
        }
      }
    })
  },
  // 取消，不置顶
  backPage(){
    wx.navigateTo({
      url: '../houseresourcesxq/houseresourcesxq?id='+this.data.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.needCoin();
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