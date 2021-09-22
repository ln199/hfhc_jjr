// pages/periphery/periphery.js
const app = getApp();
var bmap = require('../../components/bmap-wx.min.js');
var wxMarkerData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    surrounding: ["交通", "教育", "医院", "银行", "购物"],
    indexs: 0,
    // 地图
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},
    address: wx.getStorageSync('nowAdress'),
    windowHeight: 0,
    scrollHeight: 0,
    custom: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })

    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: app.data.ak
    });
    this.setData({
      BMap: BMap
    })
    this.BaiduMap(BMap);

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
      var custom = wx.createSelectorQuery();
      custom.select('.address-type').boundingClientRect();
      custom.exec(function (rect) { if (rect[0] === null) return; that.setData({ custom: rect[0].height }) });
    }, 500)
    setTimeout(function () {
      var customHeight = that.data.custom;
      wx.getSystemInfo({
        success: function (res) {
          let scrollHeight = res.windowHeight;
          that.setData({
            scrollHeight: scrollHeight - customHeight
          })
        }
      })
    }, 1000)
  },
  // 点击周边
  clickEvent(e) {
    this.setData({
      indexs: e.currentTarget.dataset.index,
    })
    this.BaiduMap(this.data.BMap)
  },

  // 百度地图
  BaiduMap(BMap) {
    var that = this;
    var fail = function (data) {};
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    // 当前位置
    BMap.geocoding({
      address: that.data.address,
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
    });
    // 发起POI检索请求 
    BMap.search({
      "query": that.data.surrounding[that.data.indexs],
      fail: fail,
      success: success,
    });
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