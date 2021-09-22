// pages/rentcompletion/rentcompletion.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    basicAppURL: app.data.basicAppURL,
    array: [],
    index: 0,
    arraycx: [],
    indexcx: 0,
    arrayyt: [],
    indexyt: 0,
    arrayxq: [],
    indexxq: 0,
    arrayx: [],
    indexx: 0,
    list: [],
    idx: 0
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
  bindPickerChangexq(e) {
    this.setData({
      indexxq: e.detail.value
    })
  },

  // 意向小区
  bindPickerChangex(e) {
    this.setData({
      indexx: e.detail.value
    })
  },

  //配套设施
  goIndex(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      idx: index,
      peitao_lxid: e.currentTarget.dataset.lxid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      obj: JSON.parse(options.obj)
    })
  },

  // 获取选项
  getOptions() {
    const _this = this;
    var data = {
      mmzl: 2
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
          console.log(res);
          _this.setData({
            array: res.data.data.zhuangxiu,
            arraycx: res.data.data.chaoxiang,
            arrayyt: res.data.data.yongtu,
            list: res.data.data.peitao
          })
        }
      }
    })
  },
  // 获取楼盘
  getBuilding() {
    const _this = this;
    var data = {
      mmzl: 2
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
  // 获取小区
  getCommunity() {
    const _this = this;
    var data = {
      mmzl: 2
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
  // 添加客源
  addUser(e) {
    var type = e.detail.target.dataset.type;
    var obj = this.data.obj;
    var v = e.detail.value;
    const _this = this;
    if (this.data.peitao_lxid == undefined) {
      this.data.peitao_lxid = 1
    }
    var data_obj = {
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
      xqquyu: v.need_area,
      xqxiaoqu: this.data.arrayx[this.data.indexx].id,
      peitao: this.data.peitao_lxid      
    }
    var data = Object.assign(data_obj, obj);
    // type==0 --> 跳过  ||  type==1 -->完成
    if (type == 0) {
      wx.request({
        url: _this.data.basicAppURL + 'keyuan/addkeyuan?XDEBUG_SESSION_START=11932',
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
              title: '添加成功',
              icon: "none",
              duration: 2000
            })
            setTimeout(() => {
              // 上一页
              // wx.navigateBack({
              //   complete: (res) => {
              //     detal: 2
              //   },
              // })
              // 列表页
              wx.navigateTo({
                url: '../rentlist/rentlist',
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
    } else {
      wx.request({
        url: _this.data.basicAppURL + 'keyuan/addkeyuan?XDEBUG_SESSION_START=11932',
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
              title: '添加成功',
              icon: "none",
              duration: 2000
            })
            setTimeout(() => {
              // 返回上一页 添加页面
              // wx.navigateBack({
              //   complete: (res) => {
              //     detal: 2
              //   },
              // })
              // 列表页
              wx.navigateTo({
                url: '../rentlist/rentlist',
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
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getOptions();
    this.getBuilding();
    this.getCommunity();
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