// pages/addfollowup/addfollowup.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL, 
    basicImg:app.data.basicImg,
    date: '请选择跟进日期',
    indexqk: 0
  },

  //跟进日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  //跟进类型
  bindPickerChangeqk: function (e) {
    this.setData({
      indexqk: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      id:options.id,
      bianhao:options.bianhao
    })
  },
  // 获取跟进类型列表
  getRecordList() {
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'fyneirong/genjinfs',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            type:res.data.data
          })
        }
      }
    })
  },
  // 跟进内容
  content(e){
    this.setData({
      content:e.detail.value
    })
  },
  // 下一步提交跟进
  submitRecord(){
    const _this = this;
  var data = {
    fyid:this.data.id,
    fybh: this.data.bianhao,
    genjinfs: this.data.type[this.data.indexqk].lxid,
    neirong: this.data.content,
    gjshijian: this.data.date
    }
    if(this.data.date == "请选择跟进日期"){
      wx.showToast({
        title: '请输入跟进日期',
        icon:"none",
        duration:2000
      })
    }else if(this.data.content == undefined){
      wx.showToast({
        title: '请输入跟进内容',
        icon:"none",
        duration:2000
      })
    }else{
      wx.request({
        url: _this.data.basicURL+'fyneirong/genjin',
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
            title: '添加成功',
            icon:"none",
            duration:2000
          })
          wx.navigateTo({
            url: '../followuprecord/followuprecord?id='+_this.data.id,
          })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:"none",
              duration:2000
            })
          }
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getRecordList();
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