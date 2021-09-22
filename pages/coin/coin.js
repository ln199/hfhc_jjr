// pages/coin/coin.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    currentTab: 0,
    scrollHeight: 0,
    list: 0,
    showModal: false
  },

  // 去APP
  goApp: function () {
    wx.navigateTo({
      url: '../download/download'
    })
    // this.setData({
    //   showModal: true
    // })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
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
    setTimeout(function () {
      var list = wx.createSelectorQuery();
      list.select('.list').boundingClientRect();
      list.exec(function (rect) {
        if (rect[0] === null) return;
        that.setData({
          list: rect[0].height
        })
      });
    }, 1000)
    setTimeout(function () {
      var listHeight = that.data.list;
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            scrollHeight: listHeight
          })
        }
      })
    }, 1500)
  },

  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    this.getCoinData()
  },

  // 跳转好房币规则
  goRule: function (e) {
    wx.navigateTo({
      url: "../coinrule/coinrule"
    })
  },

  // 获取好房币中心数据
  getCoinData() {
    var stype = "";
    if (this.data.currentTab == 0) {
      stype = "all";
    } else if (this.data.currentTab == 1) {
      stype = 'income';
    } else {
      stype = 'output';
    }
    const _this = this;
    var data = {
      stype: stype
    }
    wx.request({
      url: _this.data.basicURL + 'my/get_coinlog',
      method: "POST",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        _this.setData({
          coinval: res.data.data.coinval,
          consume: res.data.data.consume,
          recordArr: res.data.data.data
        })
      }
    })
  },
  // 获取个人信息
  getInfo() {
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'my/info',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_mobile"
      },
      success(res) {
        _this.setData({
          avatar_url: res.data.data.avatar_url,
          ygmingcheng: res.data.data.ygmingcheng
        })
      }
    })
  },
  // 下载APP
  launchAppError(e) {
    wx.showToast({
      title: '请先下载APP',
      icon: "none",
      duration: 2000
    })
    setTimeout(() => {
      wx.navigateTo({
        url: '../download/download',
      })
    }, 1500)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCoinData();
    this.getInfo();
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