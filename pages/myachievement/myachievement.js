// pages/myachievement/myachievement.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    page: 1,
    pageSize: 5,
    results: [],
    hasData: true,
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

  //查看详情
  look: function (e) {
    wx.navigateTo({
      url: "../dealxq/dealxq?id=" + e.currentTarget.dataset.id
    })
  },

  // 业绩列表
  getList() {
    const _this = this;
    var data = {
      is_ajax: 1,
      p: this.data.page
    }
    wx.request({
      url: _this.data.basicURL + 'my/gryeji',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {
          var result = res.data.data.data;
          if (result.length < _this.data.pageSize) {
            _this.setData({
              results: _this.data.results.concat(result),
              hasData: false,
              sum: res.data.data.sum
            })
          } else {
            _this.setData({
              hasData: true,
              results: _this.data.results.concat(result),
              page: _this.data.page + 1,
              sum: res.data.data.sum
            })
          }
        }
      }
    })
  },
  // 获取个人信息
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
            avatar_url: res.data.data.avatar_url,
            ygmingcheng: res.data.data.ygmingcheng
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getList();
    this.getUserInfo();
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
    if(this.data.hasData){
      this.getList();
    }else{
      wx.showToast({
        title: '没有数据了',
        icon:"none",
        duration:2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})