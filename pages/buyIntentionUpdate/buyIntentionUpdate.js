// pages/buycompletion/buycompletion.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    array: [],
    index: 0,
    arraycx: [],
    indexcx: 0,
    arrayyt: [],
    indexyt: 0,
    arrayxq: [],
    indexxq: 0,
    arrayyx: ['请选择意向楼盘', '楼盘1'],
    indexyx: 0,
    arrayx: ['请选择意向小区', '小区1'],
    indexx0: 0,
    keyuan: [],
    dianhua:'',
    mmzl: 3 //
  },

  // 装修
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },

  // 朝向
  bindPickerChangecx(e) {
    this.setData({
      indexcx: e.detail.value
    })
  },

  // 用途
  bindPickerChangeyt(e) {
    this.setData({
      indexyt: e.detail.value
    })
  },

  // 需求区域
  bindPickerChangexqO(e) {    
    this.setData({
      indexx0: e.detail.value
    })
  },
  bindPickerChangexqT(e) {
    this.setData({
      indexx1: e.detail.value
    })
  },  bindPickerChangexqTH(e) {
    this.setData({
      indexx2: e.detail.value
    })
  },  bindPickerChangexqF(e) {
    this.setData({
      indexx3: e.detail.value
    })
  },  bindPickerChangexqFi(e) {
    this.setData({
      indexx4: e.detail.value
    })
  },
  // 意向楼盘
  bindPickerChangeyx(e) {
    this.setData({
      indexyx: e.detail.value
    })
  },

  // 意向小区
  bindPickerChangex(e) {
    this.setData({
      indexx: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      id: options.id,
      dianhua:options.dianhua,
      ky: JSON.parse(wx.getStorageSync('buyIntentionUpdate')),
      mmzl: options.mmzl
    })
  },
  // 获取选项
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
            array: res.data.data.zhuangxiu,
            arraycx: res.data.data.chaoxiang,
            arrayyt: res.data.data.yongtu
          })
        }
      }
    })
  },
  // 修改用户信息
  complete(e) {
    var v = e.detail.value;
    const _this = this;    
    let data = {
      id: this.data.id,
      dianhua: this.data.dianhua,
      khxingming: this.data.ky.khxingming,
      kehulx: this.data.ky.kehulx,      
      weixin: this.data.ky.weixin,                        
      khlaiyuan: this.data.ky.khlaiyuan,
      beizhu: this.data.ky.beizhu_d,
      //本次上送字段
      xqjiage1: v.min_price,
      xqjiage2: v.max_price,
      xqmianji1: v.min_area,
      xqmianji2: v.max_area,
      xqhuxing1: v.min_house,
      xqhuxing2: v.max_house,
      louceng1: v.min_step,
      louceng2: v.max_step,
      zhuangxiu: this.data.array[this.data.index].lxid,
      chaoxiang: this.data.arraycx[this.data.indexcx].lxid,
      xqyongtu: this.data.arrayyt[this.data.indexyt].lxid,
      xqquyu: v.area,
      xqysfy: this.data.array[this.data.index].lxid,
      xqxiaoqu: this.data.arrayx[this.data.indexx0].id,
    }    
    wx.request({
      url: _this.data.basicURL + 'keyuan/editkeyuan',
      method: "POST",
      data: data,
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
  // 获取楼盘
  getBuilding() {
    const _this = this;
    var data = {
      mmzl: this.data.mmzl
    }
    wx.request({
      url: _this.data.basicURL + 'ajax/get_ysfang',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {

        }
      }
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
          _this.setData({            
            keyuan: res.data.data.keyuan,
            index: (parseInt(res.data.data.keyuan.zhuangxiu) && res.data.data.keyuan.zhuangxiu - 1) || 0, // 装修
            indexcx: (parseInt(res.data.data.keyuan.chaoxiang) && res.data.data.keyuan.chaoxiang - 1) || 0,// 朝向
            indexyt: (parseInt(res.data.data.keyuan.xqyongtu) && res.data.data.keyuan.xqyongtu - 1) || 0, //用途
            indexx0: (parseInt(res.data.data.keyuan.xqxiaoqu) && res.data.data.keyuan.xqxiaoqu - 1) || 0 //意向小区
          })
        }
      }
    })
  },
  // 获取小区
  getCommunity() {
    const _this = this;
    var data = {
      mmzl: this.data.mmzl
    }
    wx.request({
      url: _this.data.basicURL + 'ajax/get_xiaoqu_txt',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        _this.setData({
          arrayx: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getOptions();
    this.getBuilding();
    this.getCommunity();
    this.getUserInfo();
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