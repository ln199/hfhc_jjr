// pages/reportcustomer/reportcustomer.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    winHeight: "",
    currentTab: 0,
    scrollLeft: 0,
    expertList: [],
    // 分页
    userList: [],
    page: 1,
    pageSize: 10,
    hasData: true,
  },
//   0-报备申请、            报备申请
//   1-报备成功、            已报备
//   2-报备无效（驻场）、	    无效
//   3-客户到场、            已到访 
//   4-报备过期、
//   5-到场过期、
//   6-成交、                已成交
//   7-报备无效（经纪人）、
//   8-已结佣                已结佣

//  已过期 待定
  // 滚动切换标签样式
  switchTab: function (e) {
    var status = '';
    switch (e.detail.current) {
      case 1:
        status = 0;
        break;
      case 2:
        status = 1;
        break;
      case 3:
        status = 3;
        break;
      case 4:
        status = 6;
        break;
      case 5:
        status = 2;
        break;
      case 6:
        status = 8;
        break;
      default:
        status = '';
        break;
    }
    this.setData({
      currentTab: e.detail.current,
      page: 1,
      userList:[]
    });    
    this.getReportList(status);
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    var status = '';
    switch (cur) {
      case '1':
        status = 0;
        break;
      case '2':
        status = 1;
        break;
      case "3":
        status = 3;
        break;
      case "4":
        status = 6;
        break;
      case "6":
        status = 7;
        break;
      default:
        status = '';
        break;
    }
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

  //报备
  report: function () {
    wx.navigateTo({
      url: "../report/report?into_type=1"
    })
  },

  //报备详情
  reportxq: function (e) {
    var qrcode = encodeURIComponent(e.currentTarget.dataset.qrcode);
    var report_id = e.currentTarget.dataset.id;
    var status_d = e.currentTarget.dataset.status_d;
    var visitors = JSON.stringify(e.currentTarget.dataset.visitors);
    var ysfy_id = e.currentTarget.dataset.ysfy_id;
    var xmbiaoti = e.currentTarget.dataset.xmbiaoti;
    var note = e.currentTarget.dataset.note;
    var daochang_tupian = e.currentTarget.dataset.daochang_tupian;
    var kehu_desc = e.currentTarget.dataset.kehu_desc;
    var visit_time = e.currentTarget.dataset.visit_time;
    wx.navigateTo({
      url: "../reportxq/reportxq?qrcode=" + qrcode+"&report_id="+report_id+"&status_d="+status_d+"&visitors="+visitors+"&ysfy_id="+ysfy_id+"&xmbiaoti="+xmbiaoti+"&note="+note+"&daochang_tupian="+daochang_tupian+"&kehu_desc="+kehu_desc+"&visit_time="+visit_time
    })
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
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  searchResult() {
    
  },
  // 获取报备列表
  getReportList(status) {    
    if (status == undefined) {
      status = ''
    }
    const _this = this;
    var data = {
      status: status,
      p: this.data.page
    }
    wx.request({
      url: _this.data.basicURL + 'my/getbaobei',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          var result = res.data.data.data;
          if (result.length < _this.data.pageSize) {
            _this.setData({
              userList: _this.data.userList.concat(result),
              hasData: false
            })
          } else {
            _this.setData({
              userList: _this.data.userList.concat(result),
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
    this.getReportList();
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
    // wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasData) {
      this.getReportList();
    } else {
      wx.showToast({
        title: '没有数据了',
        icon: 'none',
        duration: 2000
      })
    }
  },
  bottomSearch() {
    if (this.data.hasData) {
      this.getReportList();
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