// pages/newslist/newslist.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    page: 1,
    pageSize: 10,
    list: [],
    hasData: true,
    type: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    wx.createSelectorQuery().select(".list").boundingClientRect(function (rect) {
      _this.setData({
        height: rect.height
      })
    }).exec()
  },

  // 获取系统消息列表
  getSystemList() {
    const _this = this;
    var data = {
      p: this.data.page,
      limit: 10
    }
    wx.request({
      url: _this.data.basicURL + 'msg/get_msg',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          var result = res.data.data.data;
          if (_this.data.type == 0) {
            if (result.length < _this.data.pageSize) {
              if (_this.data.hasData) {
                _this.setData({
                  list: _this.data.list.concat(result),
                  hasData: false
                })
              }
            } else {
              _this.setData({
                list: _this.data.list.concat(result)
              })
            }
          } else {
            _this.setData({
              list: result
            })
          }
        }
      }
    })
  },

  // 读取消息
  readMsg(e) {
    this.setData({
      type: 1
    })
    const _this = this;
    var id = e.currentTarget.dataset.id;
    var data = {
      id
    }
    wx.request({
      url: _this.data.basicURL + 'msg/read_msg',
      method: "POST",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res);
        if (res.data.code == 0) {
          _this.getSystemList();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  // 读取全部未读消息
  readAll() {
    this.setData({
      type: 1
    })
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'msg/read_all_msg',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        console.log(res);
        if (res.data.code == 0) {
          wx.showToast({
            title: '读取成功',
            icon: 'none',
            duration: 2000
          })
          _this.getSystemList();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getSystemList();
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
    this.setData({
      type: 0,
      page: this.data.page + 1
    })
    this.getSystemList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      type: 0,
      page: this.data.page + 1
    })
    this.getSystemList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})