// pages/synopsis/synopsis.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    intr:""
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
// 微店简介内容
readIntr(e){
  this.data.intr = e.detail.value
},
// 获取用户信息
getUserInfoAndSubmit(callback) {
  const _this = this;
  wx.request({
    url: _this.data.basicURL + 'my/info',
    method: "GET",
    header: {
      "XX-TOKEN": wx.getStorageSync('token'),
      "XX-DEVICE-TYPE": "jjr_dian"
    },
    success(res) {
      if (res.data.code == 0) {
        _this.setData({
          user_id: res.data.data.uid
        })
        _this.submitIntr(res.data.data.uid)        
      }
    }
  })
},
// 修改简介内容
submitIntr(user_id){
  const _this = this;
  var intr = this.data.intr;
  const token = wx.getStorageSync('token');
  var data = {
    intro:intr,
    xingming:"",
    dianhua:"",
    user_id
  }  
  wx.request({
    url: _this.data.basicURL+'weidian/update_info',
    method:"POST",
    data:data,
    header: {
      "XX-TOKEN": token,
      "XX-DEVICE-TYPE": "jjr_dian",
      "content-type":"application/x-www-form-urlencoded"
    },
    success(res){
      if(res.data.code ==0 ){
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