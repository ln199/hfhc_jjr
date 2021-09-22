// pages/broker/broker.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicImg: app.data.basicImg,
    show: false,
    showBtn0: true,
    showBtn1: false,
    basicURL: app.data.basicURL,
    cityId: wx.getStorageSync('cityId'),
    indexc: 0,
    test: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      cityId: wx.getStorageSync('cityId'),
    })
  },
  // 搜索内容
  searchResult(e) {
    this.setData({
      txt: e.detail.value
    })
    this.searchCompany(e.detail.value)
  },
  // 查询经纪公司
  searchCompany(txt) {
    const _this = this;
    var data = {
      cid: this.data.cityId,
      txt: txt
    }
    if (txt = '') {
      wx.showToast({
        title: '请输入经纪公司',
        icon: "none",
        duration: 2000
      })
    } else {
      wx.request({
        url: _this.data.basicURL + 'ajax/auto_complete_company',
        method: "POST",
        data: data,
        header: {
          "XX-TOKEN": wx.getStorageSync('token'),
          "XX-DEVICE-TYPE": "jjr_dian",
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {
          if (res.data.code == 0) {
            _this.setData({
              companyList: res.data.data,
              show: true,
              showBtn1: true,
              showBtn0: false
            })
          }
        }
      })
    }
  },
  // 点击选择经纪公司
  selectCompany(e) {
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id
    this.setData({
      indexc: index,
      id: id
    })
  },
  // 绑定经纪公司
  submitCompany(e) {
    var id = this.data.id;
    wx.showModal({
      title: '绑定公司',
      content: '确定要绑定该公司吗?',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../induction/induction?id=' + id,
          })
        } else if (res.cancel) {

        }
      }
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