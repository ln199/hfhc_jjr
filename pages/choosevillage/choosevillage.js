// pages/choosevillage/choosevillage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    isChecked: true,
    check: true,
    show: false
  },

  //input点击事件
  goSearch: function () {

  },

  //关闭
  close: function () {
    this.setData({
      isChecked: true,
      show: false
    })
  },

  //搜索结果
  reasult: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;

    this.setData({
      indexs: e.currentTarget.dataset.index
    })
  },
  // 确定
  submit() {
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。      
    let prevPage = pages[ pages.length - 2 ];        
    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。      
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      xiaoqu: this.data.community[this.data.indexs].xiaoqum,
      xiaoquId: this.data.community[this.data.indexs].id
    })
    wx.navigateBack({
      delta: 1  // 返回上一级页面。     
    })
    // if (this.data.type == 2) {
    //   wx.navigateTo({
    //     url: '../rentalbook/rentalbook?xiaoqu=' + this.data.community[this.data.indexs].xiaoqum + "&&xiaoquId=" +
    //       this.data.community[this.data.indexs].id,
    //   })
    // } else if (this.data.type == 3) {
    //   wx.navigateTo({
    //     url: '../housecheckin_mzf/housecheckin_mzf?xiaoqu=' + this.data.community[this.data.indexs].xiaoqum + "&&xiaoquId=" +
    //       this.data.community[this.data.indexs].id,
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '../housecheckin/housecheckin?xiaoqu=' + this.data.community[this.data.indexs].xiaoqum + "&&xiaoquId=" +
    //       this.data.community[this.data.indexs].id,
    //   })
    // }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      type: options.type
    });
  },
  // 获取搜索内容
  getData(e) {
    this.setData({
      search: e.detail.value
    })
    this.setData({
      isChecked: false,
      show: true
    })
    this.getVillage();
  },
  // 获取小区
  getVillage() {
    const _this = this;
    if (this.data.search == undefined) {
      this.data.search = '';
    }
    var data = {
      keywords: this.data.search,
      cid: wx.getStorageSync('cityId')
    }
    wx.request({
      url: _this.data.basicURL + 'ajax/get_xiaoqu_txt.html',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        _this.setData({
          community: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getVillage();
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