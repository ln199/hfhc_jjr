// pages/newhouse/newhouse.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicAppURL: app.data.basicAppURL,
    basicImg: app.data.basicImg,
    city: wx.getStorageSync('city'),
    cityName: wx.getStorageSync('cityName'),    
    contents: [], //排序列表内容
    show: false,
    // 分页
    page: 1,
    pageSize: 9,
    houseList: [],
    hasData: true,
    timer: null,
    reqTask: null
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


  // 新房源列表
  getHouseList() {    
    let _this = this
    var data = {
      cid: wx.getStorageSync('cityId'),
      p: this.data.page,
      limit: this.data.pageSize
    }
    this.data.reqTask = wx.request({
      url: _this.data.basicAppURL + 'qfangyuan/search',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          var result = res.data.data;          
          if (result.length < _this.data.pageSize) {
            _this.setData({
              hasData: false,
              houseList: _this.data.houseList.concat(result),              
            })
          } else {
            _this.setData({
              hasData: true,
              houseList: _this.data.houseList.concat(result),
              page: _this.data.page + 1,              
            })
          }
        }
      }
    })
  },  
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getHouseList();    
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
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasData) {
      this.getHouseList();
    } else {
      wx.showToast({
        title: '没有数据了',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})