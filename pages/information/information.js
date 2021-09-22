// pages/information/information.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
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

  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },

  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  // 跳转到详情页面
  intoDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../information_xq/information_xq?id=' + id,
    })
  },

  // 资讯列表
  getInformationList() {
    const _this = this;
    var data = {
      cid: wx.getStorageSync('cityId')
    }
    wx.request({
      url: _this.data.basicURL + '/front/hfzixun',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          var information = res.data.data;
          var industry = [];
          var other = [];
          industry = information.filter(function (element, index, all) {
            return element.tag == "2";
          })
          other = information.filter(function (element, index, all) {
            return element.tag == "1";
          })
          _this.setData({
            industry: industry,
            other: other
          })
        }
      }
    })
  },

  // 默认图片
  errDetails(e){
    var industry = this.data.industry;
    var default_img = e.currentTarget.dataset.img;
    var index = e.currentTarget.dataset.index;
    industry[index].img_url = default_img;
    this.setData({
      industry
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getInformationList()
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