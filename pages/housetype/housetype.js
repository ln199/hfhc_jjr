// pages/housetype/housetype.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL:app.data.basicURL,
    currentTab: 0,
    windowHeight: 0,
    scrollHeight: 0,
    tab: 0,
    shi:"-1"
  },

  calcHeight() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        let windowHeight = (res.windowHeight * (750 / res.windowWidth));
        //将高度乘以换算后的该设备的rpx与px的比例
        that.setData({
          windowHeight: windowHeight
        })
      }
    });

    setTimeout(function () {
      var tab = wx.createSelectorQuery();
      tab.select('.swiper-tab').boundingClientRect();
      tab.exec(function (rect) { if (rect[0] === null) return; that.setData({ tab: rect[0].height }) });
    }, 500);

    setTimeout(function () {
      var tabHeight = that.data.tab;
      wx.getSystemInfo({
        success: function (res) {
          let scrollHeight = res.windowHeight;
          that.setData({
            scrollHeight: scrollHeight - tabHeight
          })
        }
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      id:options.id
    });

    this.calcHeight();
  },

  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    this.calcHeight();
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        shi:e.currentTarget.dataset.shi
      })
    };
    this.calcHeight();
    this.getHouseList();
  },


  // 获取户型列表
  getHouseList(){
    const _this = this;
    var data = {
      ysid:this.data.id
    }
  wx.request({
    url: _this.data.basicURL+'xinloupan/huxing',
    method:"GET",
    data:data,
    header: {
      "XX-TOKEN": wx.getStorageSync('token'),
      "XX-DEVICE-TYPE": "jjr_dian"
    },
    success(res){
      var arr = res.data.data.ysfhx;
      var ysfhx =[];
      if(_this.data.shi == -1){
        ysfhx = res.data.data.ysfhx
      }else{
        ysfhx = arr.filter(function(element, index, all){
             return element.shi ==_this.data.shi;
           }) 
      }
      if(res.data.code == 0){
        _this.setData({
          hxjs:res.data.data.hxjs,
          ysfhx:ysfhx
        })
      
      }
    }
  })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getHouseList()
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