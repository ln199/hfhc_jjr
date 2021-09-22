// pages/feedback/feedback.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL:app.data.basicURL,
    opinion:""
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
// 意见反馈
opinion(e){
  this.setData({
    opinion:e.detail.value
  })
},
submit(){
  const _this = this;
  var data = {
    content:this.data.opinion
  }
  wx.request({
    url: _this.data.basicURL+'jjfk/create',
    method:"POST",
    data:data,
    header: {
      "XX-TOKEN": wx.getStorageSync('token'),
      "XX-DEVICE-TYPE": "jjr_dian",
      "content-type":"application/x-www-form-urlencoded"
    },
    success(res){
      if(res.data.code == 0){
        wx.showToast({
          title: '提交成功',
          icon:"none",
          duration:2000
        })
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