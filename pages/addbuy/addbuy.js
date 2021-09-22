// pages/addbuy/addbuy.js
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
    items: 1,
    array: [],
    index: 0,
    wx_check: false,
    mmzl: 1
  },

  //性别
  radioChange(e) {
    this.setData({
      items: e.detail.value
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
  // 客户来源
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      mmzl: options.mmzl      
    })
  },
  //下一步
  next: function (e) {
    var v = e.detail.value
    if (v.userName == "") {
      wx.showToast({
        title: '请输入用户姓名',
        icon: "none",
        duration: 2000
      })
    } else if (!(/^1[3456789]\d{9}$/.test(v.mobile))) {
      wx.showToast({
        title: "请输入正确手机号",
        icon: 'none',
        duration: 2000
      })
    } else {
      var buyData = {
        khxingming: v.userName,
        kehulx: Number(this.data.items),
        dianhua: v.mobile,
        weixin: v.weixin,
        khlaiyuan: Number(v.belong) + 1,
        beizhu: v.note,
        mmzl: this.data.mmzl,
        zhuangtai:1
      }
      wx.setStorageSync('buyData', buyData);
      wx.navigateTo({
        url: "../buycompletion/buycompletion?mmzl=" + this.data.mmzl
      })
    }
  },

  // 获取来源选项
  getOptions() {
    const _this = this;
    var data = {
      mmzl: this.data.mmzl
    }
    wx.request({
      url: _this.data.basicURL + 'keyuan/addkeyuan',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            array: res.data.data.laiyuan,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getOptions();
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