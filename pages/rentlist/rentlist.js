// pages/rentlist/rentlist.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    page: 1,
    pageSize: 9,
    keyuan: [],
    hasData: true,
    mmzl: 2,
    user_id: '',
    timer: null,
    reqTask: null,
    isQuerySelf: 'false' //标记是否只查询自己的客源
  },

  //添加客源-求租
  addRent: function () {
    wx.navigateTo({
      url: "../addrent/addrent"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      isQuerySelf: options ? options.isQuerySelf : 'false'
    })

  },
  // 获取表单中内容
  searchResult(e) {
    if (this.data.reqTask) {
      this.data.reqTask.abort()
      this.data.reqTask = null
    }
    this.setData({
      searchVal: e.detail.value,
      page: 1,
      keyuan:[]
    })        
    if (this.data.timer) {
      clearTimeout(this.data.timer)
      this.data.timer = null
    }
    if (!this.data.timer) {
      this.data.timer = setTimeout(()=> {
        this.getUserLsit();
      },200)
    } 
  },
  // 跳转到客源详情
  customersDetail(e) {
    wx.navigateTo({
      url: '../customerxq/customerxq?id=' + e.currentTarget.dataset.id + "&private=" + e.currentTarget.dataset.private+"&user_id="+this.data.user_id+"&mmzl="+this.data.mmzl,
    })
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
      }
    })
  },
  // 获取客源列表
  getUserLsit() {
    const _this = this;
    if (this.data.searchVal == undefined) {
      this.data.searchVal = ''
    }
    var data = {
      is_ajax: 1,
      p: this.data.page,
      mmzl: 2,
      limit: this.data.pageSize,
      keywords: this.data.searchVal,
      uid: this.data.user_id
    }
    // 首页也修改为只查询自己的
    // if (this.data.isQuerySelf == 'true') {
    //   data.uid = this.data.user_id
    // }
    wx.request({
      url: _this.data.basicURL + 'keyuan/index',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          var result = res.data.data.keyuan;
          if (result.length < _this.data.pageSize) {
            _this.setData({
              keyuan: _this.data.keyuan.concat(result),
              hasData: false
            })
          } else {
            _this.setData({
              keyuan: _this.data.keyuan.concat(result),
              page: _this.data.page + 1,
              hasData: true
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserInfo(this.getUserLsit)
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
    if (this.data.hasData) {
      this.getUserLsit();
    } else {
      wx.showToast({
        title: '没有数据了',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})