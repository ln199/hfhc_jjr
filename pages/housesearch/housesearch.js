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
    val: '',
    reqTask: null,
    timer: null,
    u: 'xiaoqu/autocomplete'
  },
  // xinloupan 新房接口路径
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    if (options.path == 'newhouse') {
      this.setData({
        u: 'xinloupan/autocomplete'
      })
    }
    this.setData({
      isIphoneX: isIphoneX,
      path: options.path
    })
  },
  goList(e) {
    // let path = this.data.path
    // wx.navigateTo({
    //   url: `../${path}/${path}?search=${e.currentTarget.dataset.xq}`
    // })
    var pages = getCurrentPages(); // 获取页面栈    
    
    var prevPage = pages[pages.length - 2]; // 上一个页面
    
    prevPage.setData({
      search: e.currentTarget.dataset.xq
    })
    
    wx.navigateBack({    
      delta: 1    
    })
  },
  // 搜索
  search(e) {    
    let _this = this
    this.setData({      
      val: e.detail.value
    })
    clearTimeout(this.data.timer)    
    this.data.timer = setTimeout(() => {
      if (this.data.reqTask) {
        this.data.reqTask.abort()
        this.data.reqTask = null
      }    
      wx.showLoading({
        title: '搜索中',
      })
      this.data.reqTask = wx.request({
        url: _this.data.basicAppURL + _this.data.u,
        method: "GET",
        data: {
          cid: wx.getStorageSync('cityId'),
          key: e.detail.value
        },
        header: {
          "XX-TOKEN": wx.getStorageSync('token'),
          "XX-DEVICE-TYPE": "jjr_dian"
        },
        success(res) {
          if (res.data.code == 0) {
            var result = res.data.data;
            _this.setData({
              list: result
            })
          }
          wx.hideLoading()                      
        },
        fail(){
          wx.hideLoading()
        }        
      })
    },600)    
    
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