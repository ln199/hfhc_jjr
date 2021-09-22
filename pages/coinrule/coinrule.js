// pages/coinrule/coinrule.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL:app.data.basicURL, 
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

  // 获取好房币规则

  getCoinDetail() {
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'coinrule/get',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          var qiandao = res.data.data.qiandao.join("/");
         _this.setData({
          chongzhi:res.data.data.chongzhi,
          zhuce:res.data.data.zhuce,
          shimingrenzheng:res.data.data.shimingrenzheng,
          qiandao:qiandao,
          fenxiangfangyuan:res.data.data.fenxiangfangyuan,
          fenxiangweidian:res.data.data.fenxiangweidian,
          baobei:res.data.data.baobei,
          shangchuanfangyuan:res.data.data.shangchuanfangyuan,
          hezuofangyuan:res.data.data.hezuofangyuan,
          chengjiao:res.data.data.chengjiao,
         })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCoinDetail()
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