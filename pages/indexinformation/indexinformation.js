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
    informationList: [],
    pageNum:1,// 页码
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
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    console.log("-----------");
    this.onBottom();
  },
  // 响应触底函数
  onBottom() {
    let that = this;
    that.data.pageNum++;
    that.getInformationList();
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
    let data = {
      cid: wx.getStorageSync('cityId'),
      p:_this.data.pageNum
    }
    wx.request({
      url: _this.data.basicURL + '/front/hfzixun',
      // url: _this.data.basicURL + '/front/hfzixun',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          let information = res.data.data;
          if (_this.data.pageNum == 1) {
            _this.setData({
              informationList: information
            })
          } else {
            //获取原始列表
            let list = _this.data.informationList
            // 获取新列表
            let arr = res.data.data;
            //合并列表
            let newArr = list.concat(arr)
            _this.setData({
              informationList:newArr
            })
          }
         
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
