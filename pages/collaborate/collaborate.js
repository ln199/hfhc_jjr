// pages/collaborate/collaborate.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    basicAppURL: app.data.basicAppURL,
    currentTab: 0,
    windowHeight: 0,
    scrollHeight: 0,
    tab: 0,
    fenyong: ''
  },

  //合作详情
  goXq: function (e) {
    wx.navigateTo({
      url: "../cooperate/cooperate?id=" + e.currentTarget.dataset.id + "&realtype=" + e.currentTarget.dataset.realtype
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX      
    });

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
      tab.exec(function (rect) {
        if (rect[0] === null) return;
        that.setData({
          tab: rect[0].height
        })
      });
    }, 500)
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
  // 获取用户信息
  getUserInfo(callback) {
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'my/info',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_mobile"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            user_id: res.data.data.uid
          })
          callback()
        }
      },
      fail() {
        wx.hideLoading()
      }
    })
  },
  // 合作列表
  getCooperationList() {
    const _this = this;
    var data = {
      p: 1
    }
    wx.request({
      url: _this.data.basicURL + 'fangyuanhezuo/myhezuo',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            doing: res.data.data.doing,
            finish: res.data.data.finish
          })         
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000
          })
        }
      },
      complete(){
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.getUserInfo(this.getCooperationList)
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