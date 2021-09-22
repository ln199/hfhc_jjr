// pages/commission/commission.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      { 
        "code": "住宅", 
        "text": "战略合作机构", 
        "type": "不支持", 
        "tiao": "不支持", 
        "yong": "2.375%", 
        "ti": "不支持", 
        "date": "2020-03-20" 
      },
      { 
        "code": "住宅", 
        "text": "战略合作机构", 
        "type": "不支持", 
        "tiao": "不支持", 
        "yong": "2.375%", 
        "ti": "不支持", 
        "date": "2020-03-20" 
      }
    ],
    listDatas: [
      {
        "code": "住宅",
        "text": "签约",
        "type": "不支持",
        "tiao": "不支持",
        "yong": "2019-08-08"
      }
    ],
    listDatass: [
      {
        "code": "住宅",
        "text": "战略合作机构",
        "type": "不支持",
        "tiao": "不支持",
        "yong": "2.375%",
        "ti": "不支持",
        "date": "2020-03-20"
      },
      {
        "code": "住宅",
        "text": "战略合作机构",
        "type": "不支持",
        "tiao": "不支持",
        "yong": "2.375%",
        "ti": "不支持",
        "date": "2020-03-20"
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    let yongjin = JSON.parse(options.list);
    this.setData({
      isIphoneX,
      yongjin
    })
    console.log(this.data.yongjin);
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