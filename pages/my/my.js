// pages/my/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    basicAppURL:app.data.basicAppURL,
    portrait: "",
    userName: "",
    company: "",
    tokenShow: false,
    tokenHide: true,
    myList: [],
    testArr: [{
      name: '房源', image: 'https://www.hfhchsh.com/Upload/wximg/my/fangyuan.png', navi: "../mysecondhouse/mysecondhouse"
    }, {
      name: '客源', image: 'https://www.hfhchsh.com/Upload/wximg/my/keyuan.png', navi: "../buylist/buylist?isQuerySelf=true"
    }, {
      name: '打卡', image: 'https://www.hfhchsh.com/Upload/wximg/my/daka.png', navi: ""
    },
    {
      name: '报备', image: 'https://www.hfhchsh.com/Upload/wximg/my/keyuan.png', navi: "../reportcustomer/reportcustomer"
    },
    {
      name: '大学', image: 'https://www.hfhchsh.com/Upload/wximg/my/daxue.png', navi: "../citywide/citywide"
    }],
    aboutMeList: [{
      name: '我的微店', image: 'https://www.hfhchsh.com/Upload/wximg/my/weidian.png', navi: "/pages/myshop/myshop"
    },
    {
      name: '经纪公司', image: 'https://www.hfhchsh.com/Upload/wximg/my/company.png', navi: ""
    }, {
      name: '我的业绩', image: 'https://www.hfhchsh.com/Upload/wximg/my/yeji.png', navi: "/pages/myachievement/myachievement"
    },
    {
      name: '历史客户', image: 'https://www.hfhchsh.com/Upload/wximg/my/lishikehu.png', navi: "/pages/historycustomes/historycustomes"
    },
    {
      name: '我的合作', image: 'https://www.hfhchsh.com/Upload/wximg/my/hezuo.png', navi: "/pages/collaborate/collaborate"
    },

    ],
    aboutMeListSecond: [
      {
        name: '我的收藏', image: 'https://www.hfhchsh.com/Upload/wximg/my/shoucang.png', navi: "/pages/mycollect/mycollect"
      },
      {
        name: '我的展位', image: 'https://www.hfhchsh.com/Upload/wximg/my/myshow.png', navi: ""
      }, {
        name: '我的帖子', image: 'https://www.hfhchsh.com/Upload/wximg/my/tiezi.png', navi: ""
      },
      {
        name: '意见反馈', image: 'https://www.hfhchsh.com/Upload/wximg/my/feedback.png', navi: "/pages/feedback/feedback"
      },
      {
        name: '个人信息', image: 'https://www.hfhchsh.com/Upload/wximg/my/myinfo.png', navi: ""
      }
    ],
    manageList: [
      {
        name: '成交管理', image: 'https://www.hfhchsh.com/Upload/wximg/my/deallist.png', navi: "/pages/mycollect/mycollect"
      },
      {
        name: '员工管理', image: 'https://www.hfhchsh.com/Upload/wximg/my/yuangonglist.png', navi: ""
      }, {
        name: '入职管理', image: 'https://www.hfhchsh.com/Upload/wximg/my/entrymanage.png', navi: ""
      },
      {
        name: '离职管理', image: 'https://www.hfhchsh.com/Upload/wximg/my/leavemanage.png', navi: "/pages/feedback/feedback"
      },
    ],//管理员要显示的列表
    uType: '',//类型
    uRole: '',// 用户角色
    weekData: '',//任务
    monthData:'',//任务
    quarterData:'',// 任务
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
    if (wx.getStorageSync('user_info')) {
      this.setData({
        uType: wx.getStorageSync('user_info').u_type,
        uRole :wx.getStorageSync('user_info').u_role
      })
    }
    if (wx.getStorageSync('token')) {
      this.setData({
        tokenShow: true,
        tokenHide: false
      })
    }
  },

  // 切换用户
  changeUser() {
    wx.clearStorageSync();
    wx.navigateTo({
      url: '../login/login',
    })
  },
  // 获取用户信息
  getUserInfo() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    const _this = this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: _this.data.basicURL + 'my/info',
      method: "GET",
      header: {
        "XX-TOKEN": token,
        "XX-DEVICE-TYPE": "jjr_mobile"
      },
      success(res) {
        if (res.data.code == 10001) {
          _this.setData({
            tokenShow: false,
            tokenHide: true
          })
          wx.removeStorageSync('token');
        } else {
          _this.setData({
            portrait: res.data.data.avatar_url,
            userName: res.data.data.ygmingcheng,
            company: res.data.data.gongsi,
            position: res.data.data.position,
            is_ally: res.data.data.is_ally
          })
        }
      },
      complete() {
        wx.hideLoading()
      }
    })
  },
  // 获取个人中心任务数量
  // renwu/index_renwu
  renwuNum() {
    let _this = this
    let data = {
      uid: wx.getStorageSync('user_info').id,
      token:wx.getStorageSync('token')
    }
    wx.request({
      url: _this.data.basicAppURL + 'renwu/index_renwu',
      method: "POST",
      data: data,
      header: {
        "content-type":"application/x-www-form-urlencoded",
        "XX-token":wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_mobile"
      },
      success(res) {
        console.log(res);
        if (res.statusCode==200) {
          
          let week = [];
          week.push({
            name: '新增二手房源',
            num:res.data.w_renwu.esfy_c_w
          },
          {
            name: '新增出租房源',
            num:res.data.w_renwu.cz_c_w
          },{
            name: '新增美装房源',
            num:res.data.w_renwu.mz_c_w
          },{
            name: '房源跟进',
            num:res.data.w_renwu.gjkyc_w
          }
          )
          let month = []
          month.push(
            
            {
              name: '新增新客房源',
              num:res.data.w_renwu.newkyc_w
            },{
              name: '新增二手房源',
              num:res.data.w_renwu.erkyc_w
            },{
              name: '新增租赁客源',
              num:res.data.w_renwu.zkyc_w
          },
          {
            name: '房源实勘',
            num:res.data.w_renwu.skc_w
          },
          )
          let quarter = [];
          quarter.push(
            {
              name: '客源跟进',
              num:res.data.w_renwu.gjkyc_w
            },{
              name: '带看',
              num:res.data.w_renwu.dkkyc_w
            },{
              name: '成交',
              num:res.data.w_renwu.cjkyc_w
            }
          )
          _this.setData({
            weekData: week,
            monthData: month,
            quarterData:quarter
          })
        }

      },
    })
  },

  // 跳转好房币规则
  goCoin: function (e) {
    wx.navigateTo({
      url: "../coin/coin"
    })
  },
  // 跳转到个人信息
  hrefMyInfo: function (e) {
    wx.navigateTo({
      url: '../editi/editi',
    })
  },
  // 查询好房币余额
  searchCoin() {
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'my/get_coinlog',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            coinval: res.data.data.coinval
          })
        }
      }
    })
  },
  // 用户授权登陆
  bindGetUserInfo(e) {
    // 允许/拒绝授权
    if (e.detail.errMsg == "getUserInfo:ok") {
      // this.weChatLogin()
      this.changeUser()
    } else {
      wx.showToast({
        title: '拒绝授权，登陆失败',
        icon: "none",
        duration: 2000
      })
    }
  },
  // 微信授权登陆
  weChatLogin() {
    const _this = this;
    wx.login({
      success: res => {
        _this.setData({
          code: res.code
        })
        var data = {
          code: res.code
        }
        wx.request({
          url: _this.data.basicURL + 'user/wxlogin2',
          method: "POST",
          data: data,
          header: {
            "XX-DEVICE-TYPE": "jjr_dian",
            "content-type": "application/x-www-form-urlencoded"
          },
          success(res) {
            if (res.data.code == 0) {
              wx.setStorageSync('third_id', res.data.data.thirdId);
              wx.setStorageSync('token', res.data.data.token);
              wx.setStorageSync('ally', res.data.data.company.is_ally);
              wx.setStorageSync('companyName', res.data.data.company.companyName);
              wx.showToast({
                title: '登陆成功',
                icon: "none",
                duration: 2000
              })
              _this.setData({
                tokenShow: true,
                tokenHide: false,
                thirdId: res.data.data.thirdId
              })
              wx.switchTab({
                url: '../index/index',
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: "none",
                duration: 2000
              })
              wx.navigateTo({
                url: '../login/login?thirdId=' + res.data.data.thirdId,
              })
            }
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  // 注销登陆
  exitUser(e) {
    if (wx.getStorageSync('token')) {
      wx.clearStorageSync();
      this.setData({
        tokenShow: false,
        tokenHide: true
      })
      wx.showToast({
        title: '注销成功',
        icon: "none",
        duration: 2000
      })
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      wx.clearStorageSync();
      wx.redirectTo({
        url: '../login/login',
      })
      // wx.showToast({
      //   title: '请先登陆',
      //   icon: 'none',
      //   duration: 2000
      // })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserInfo();
    this.searchCoin();
    this.renwuNum();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('token')) {
      this.setData({
        tokenShow: true,
        tokenHide: false
      })
    }
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