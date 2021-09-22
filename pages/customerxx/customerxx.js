// pages/customerxx/customerxx.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    classes_array: [{
      name: '先生',
      checked: true,
      value: '1'
    }, {
      name: '女士',
      checked: false,
      value: '2'
    }],
    items: 0,
    array: [],
    index: 0,
    arraygt: [],
    indexgt: 0,
    arrayky: [],
    indexky: 0,
    arrayln: [],
    indexln: 0,
    indexly: 0,
    arrayly: [],
    wx_check: false
  },

  //性别
  radioChange(e) {
    this.setData({
      items: e.detail.value
    })
  },

  // 需求付款
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },

  // 沟通阶段
  bindPickerChangegt(e) {
    this.setData({
      indexgt: e.detail.value
    })
  },

  // 客源等级
  bindPickerChangeky(e) {
    this.setData({
      indexky: e.detail.value
    })
  },

  // 消费理念
  bindPickerChangeln(e) {
    this.setData({
      indexln: e.detail.value
    })
  },
  // 来源
  bindPickerChangely(e) {
    this.setData({
      indexly: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      id: options.id
    })
  },

  // 获取客户信息 
  getUserInfo() {
    const _this = this;
    var data = {
      id: this.data.id
    }
    wx.request({
      url: _this.data.basicURL + 'keyuan/editkeyuan',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          // 判断性别
          if (res.data.data.keyuan.kehulx == 1) {
            _this.setData({              
              "classes_array[0].checked": true,
              "classes_array[1].checked": false
            })
          } else {
            _this.setData({
              "classes_array[1].checked": true,
              "classes_array[0].checked": false
            })
          }
          // 数组追加选择字符串
          res.data.data.fukuan.unshift({
            lxid: '0',
            lxming: "请选择需求付款"
          });
          res.data.data.gtjieduan.unshift({
            lxid: '0',
            lxming: "请选择沟通阶段"
          });
          res.data.data.kydengji.unshift({
            lxid: '0',
            lxming: "请选择客源等级"
          });
          res.data.data.xflinian.unshift({
            lxid: '0',
            lxming: "请选择消费理念"
          });
          res.data.data.laiyuan.unshift({
            lxid: '0',
            lxming: "请选择客户来源"
          });
          if (res.data.data.keyuan.fukuan == null) {
            res.data.data.keyuan.fukuan = 0
          }
          if (res.data.data.keyuan.gtjieduan == null) {
            res.data.data.keyuan.gtjieduan = 0
          }
          if (res.data.data.keyuan.kydengji == null) {
            res.data.data.keyuan.kydengji = 0
          }
          if (res.data.data.keyuan.xflinian == null) {
            res.data.data.keyuan.xflinian = 0
          }
          if (res.data.data.keyuan.khlaiyuan == null) {
            res.data.data.keyuan.khlaiyuan = 0
          }
          _this.setData({
            items: res.data.data.keyuan.kehulx,
            index: res.data.data.keyuan.fukuan,   // 需求付款
            indexgt: res.data.data.keyuan.gtjieduan,  //沟通阶段
            indexky: res.data.data.keyuan.kydengji,   //客源等级
            indexln: res.data.data.keyuan.xflinian,  //消费理念
            indexly: res.data.data.keyuan.khlaiyuan,  //客户来源
            array: res.data.data.fukuan,
            arraygt: res.data.data.gtjieduan,
            arrayky: res.data.data.kydengji,
            arrayln: res.data.data.xflinian,
            arrayly: res.data.data.laiyuan,
            keyuan: res.data.data.keyuan,
            xqysfy: res.data.data.keyuan.xqysfy,
            mobileVal: res.data.data.keyuan.dianhua, // 手机号 
            wxVal: res.data.data.keyuan.weixin, // 微信号
            beizhu: res.data.data.keyuan.beizhu
          })
        }
      }
    })
  },

  // 修改用户信息
  updataDetails(e) {
    var v = e.detail.value;
    const _this = this;
    var data = {
      id: this.data.id,
      khxingming: v.username,
      kehulx: this.data.items,
      dianhua: v.mobile,
      weixin: v.weixin,
      fukuan: v.pay,
      gtjieduan: v.communication,
      kydengji: v.level,
      xflinian: v.concept,
      khlaiyuan: v.source,
      beizhu: v.note
    }
    let obj = Object.assign({
        xqjiage1: this.data.keyuan.xqjiage1,
        xqjiage2: this.data.keyuan.xqjiage2,
        xqmianji1: this.data.keyuan.xqmianji1,
        xqmianji2: this.data.keyuan.xqmianji2,
        xqhuxing1: this.data.keyuan.xqhuxing1,
        xqhuxing2: this.data.keyuan.xqhuxing2,
        louceng1: this.data.keyuan.louceng1,
        louceng2: this.data.keyuan.louceng2,
        zhuangxiu: this.data.keyuan.zhuangxiu,
        chaoxiang: this.data.keyuan.chaoxiang,
        xqyongtu: this.data.keyuan.xqyongtu,
        xqquyu: this.data.keyuan.xqquyu,
        xqysfy: this.data.keyuan.xqysfy,
        xqxiaoqu: this.data.keyuan.xqxiaoqu  
    },data)
    wx.request({
      url: _this.data.basicURL + 'keyuan/editkeyuan',
      method: "POST",
      data: obj,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '修改成功',
            icon: "none",
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000
          })
        }
      }
    })
  },
  // 获取手机号
  getMobile(e){
    this.setData({
      mobileVal:e.detail.value
    })
  },
  // 选择微信同手机号
  selectWx() {
    this.setData({
      wx_check:!this.data.wx_check
    })
    let mobileVal = this.data.mobileVal;
    let wxVal = ''
    if(this.data.wx_check){
      wxVal = mobileVal
    }else{
      wxVal = ''
    }
    this.setData({
      wxVal
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserInfo();
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