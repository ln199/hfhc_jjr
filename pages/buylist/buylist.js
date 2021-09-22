// pages/buylist/buylist.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    basicAppURL: app.data.basicAppURL,
    page: 1,
    pageSize: 20,
    keyuan: [],
    hasData: true,
    user_id: '',
    timer: null,
    reqTask: null,
    array: ['二手房', '新房'],
    showModalHouse: false,    
    currentTab: 3,
    mmzl: 3,
    isQuerySelf: 'false'
  },
  changTab(event) {
    this.setData({
      currentTab: event.target.dataset.current,
      mmzl: event.target.dataset.current,
      page: 1,
      searchVal: '',
      hasData: true,
      keyuan:[]
    })
    if (this.data.reqTask) {
      this.data.reqTask.abort()
      this.data.reqTask = null
    }
    this.getUserLsit();
  },
  preventTouchMovetel(){},
  hideModalHouse: function () {
    this.setData({
      showModalHouse: false
    });
  },
  //添加客源-求购
  showHouseDialog: function () {
    this.setData({
      showModalHouse: true
    });    
  }, 
  addBuy(e) {
    let mmzl
    if (e.currentTarget.dataset.idx == 0) {//二手房
      mmzl = 1
    } else {// 新房
      mmzl = 3
    }
    wx.navigateTo({
      url: "../addbuy/addbuy?mmzl=" + mmzl
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      userList: options.userList,
      isQuerySelf: options.isQuerySelf
    })
  },
  // 获取搜索内容
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
      mmzl: this.data.mmzl,
      limit: this.data.pageSize,
      p: this.data.page,
      sousuo: this.data.searchVal,
      uid: this.data.user_id
    }
    // 首页的也只查询自己的
    // if (this.data.isQuerySelf == 'true') {
    //   data.uid = this.data.user_id
    // }
    this.data.reqTask = wx.request({
      url: _this.data.basicAppURL + 'keyuan/index',
      // url: "https://www.hfhchsh.com/api/brokerapp/keyuan/index",
      method: "POST",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {
          var result = res.data.data.keyuan;
          var keyuan = [];
          if (_this.data.userList) {
            keyuan = _this.data.userList;
          } else {
            keyuan = res.data.data.keyuan
          }
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
  // 跳转到客源详情
  customersDetail(e) {
    wx.navigateTo({
      url: '../customerxq/customerxq?id=' + e.currentTarget.dataset.id + "&private=" + e.currentTarget.dataset.private + "&user_id=" + this.data.user_id+"&mmzl="+this.data.mmzl,
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
        icon: "none",
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