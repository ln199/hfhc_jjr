// pages/runshop/runshop.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    currentTab: 0,
    houseArr: [],
    // 新房
    index_ysfy_o: 0,
    index_ysfy_t: 0,
    index_ysfy_th: 0,
    index_ysfy_f: 0,
    index_ysfy_fi: 0,
    // 二手房
    index_esfy_o: 0,
    index_esfy_t: 0,
    index_esfy_th: 0,
    index_esfy_f: 0,
    index_esfy_fi: 0,
    // 精装二手房
    index_mz_o: 0,
    index_mz_t: 0,
    index_mz_th: 0,
    index_mz_f: 0,
    index_mz_fi: 0,
    // 旅居房
    index_lj_o: 0,
    index_lj_t: 0,
    index_lj_th: 0,
    index_lj_f: 0,
    index_lj_fi: 0,

    portrait: "",
    intro: "",
    type: "", //选择哪个房子分类
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
  },

  //滑动切换
  swiperTab: function (e) {
    var that = this;
    var type = this.data.type
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.detail.current
      });
    }
  },
  clickTab: function (e) {
    var that = this;
    var type = this.data.type
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // 添加房产进微店
  setHouseTop(id, idx, type) {
    const _this = this;
    var data = {
      raw_id: id,
      wd_type: type,
      order_idx: idx
    }
    wx.request({
      url: _this.data.basicURL + 'weidian/add_item',
      method: "POST",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "Content-Type": "application/x-www-form-urlencoded",
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      dataType: 'json',
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },
  //新房推荐项目1
  bindPickerChange: function (e) {
    this.setData({
      index_ysfy_o: e.detail.value
    })
    this.setHouseTop(this.data.newHouse[this.data.index_ysfy_o].id, 1, 'ysfy')
  },
  //新房推荐项目2
  bindPickerChange_t(e) {
    this.setData({
      index_ysfy_t: e.detail.value
    })
    this.setHouseTop(this.data.newHouse[this.data.index_ysfy_t].id, 2, 'ysfy')
  },
  //新房推荐项目3
  bindPickerChange_th(e) {
    this.setData({
      index_ysfy_th: e.detail.value
    })
    this.setHouseTop(this.data.newHouse[this.data.index_ysfy_th].id, 3, 'ysfy')
  },
  //新房推荐项目4
  bindPickerChange_f(e) {
    this.setData({
      index_ysfy_f: e.detail.value
    })
    this.setHouseTop(this.data.newHouse[this.data.index_ysfy_f].id, 4, 'ysfy')
  },
  //新房推荐项目5
  bindPickerChange_fi(e) {
    this.setData({
      index_ysfy_fi: e.detail.value
    })
    this.setHouseTop(this.data.newHouse[this.data.index_ysfy_fi].id, 5, 'ysfy')
  },
  // 二手房推荐项目1
  bindPickerChange_e_o(e) {
    this.setData({
      index_esfy_o: e.detail.value
    })
    this.setHouseTop(this.data.secondList[this.data.index_esfy_o].id, 1, 'esfy')
  },
  // 二手房推荐项目2
  bindPickerChange_e_t(e) {
    this.setData({
      index_esfy_t: e.detail.value
    })
    this.setHouseTop(this.data.secondList[this.data.index_esfy_t].id, 2, 'esfy')
  },
  // 二手房推荐项目3
  bindPickerChange_e_th(e) {
    this.setData({
      index_esfy_th: e.detail.value
    })
    this.setHouseTop(this.data.secondList[this.data.index_esfy_th].id, 3, 'esfy')
  },
  // 二手房推荐项目4
  bindPickerChange_e_f(e) {
    this.setData({
      index_esfy_f: e.detail.value
    })
    this.setHouseTop(this.data.secondList[this.data.index_esfy_f].id, 4, 'esfy')
  },
  // 二手房推荐项目5
  bindPickerChange_e_fi(e) {
    this.setData({
      index_esfy_fi: e.detail.value
    })
    this.setHouseTop(this.data.secondList[this.data.index_esfy_fi].id, 5, 'esfy')
  },
  // 美妆房推荐项目1
  bindPickerChange_m_o(e) {
    this.setData({
      index_mz_o: e.detail.value
    })
    this.setHouseTop(this.data.fineList[this.data.index_mz_o].id, 1, 'meizhuang')
  },
  // 美妆房推荐项目2
  bindPickerChange_m_t(e) {
    this.setData({
      index_mz_o: e.detail.value
    })
    this.setHouseTop(this.data.fineList[this.data.index_mz_t].id, 2, 'meizhuang')
  },  // 美妆房推荐项目3
  bindPickerChange_m_th(e) {
    this.setData({
      index_mz_o: e.detail.value
    })
    this.setHouseTop(this.data.fineList[this.data.index_mz_th].id, 3, 'meizhuang')
  },  // 美妆房推荐项目4
  bindPickerChange_m_f(e) {
    this.setData({
      index_mz_o: e.detail.value
    })
    this.setHouseTop(this.data.fineList[this.data.index_mz_f].id, 4, 'meizhuang')
  },  // 美妆房推荐项目5
  bindPickerChange_m_fi(e) {
    this.setData({
      index_mz_o: e.detail.value
    })
    this.setHouseTop(this.data.fineList[this.data.index_mz_fi].id, 5, 'meizhuang')
  },
  // 旅居房推荐项目1
  bindPickerChange_l_o(e) {
    this.setData({
      index_lj_o: e.detail.value
    })
    this.setHouseTop(this.data.travelList[this.data.index_lj_o].id, 1, 'lvju')
  },
  // 旅居房推荐项目2
  bindPickerChange_l_t(e) {
    this.setData({
      index_lj_t: e.detail.value
    })
    this.setHouseTop(this.data.travelList[this.data.index_lj_t].id, 2, 'lvju')
  },  // 旅居房推荐项目3
  bindPickerChange_l_th(e) {
    this.setData({
      index_lj_th: e.detail.value
    })
    this.setHouseTop(this.data.travelList[this.data.index_lj_th].id, 3, 'lvju')
  },  // 旅居房推荐项目4
  bindPickerChange_l_f(e) {
    this.setData({
      index_lj_f: e.detail.value
    })
    this.setHouseTop(this.data.travelList[this.data.index_lj_f].id, 4, 'lvju')
  },  // 旅居房推荐项目5
  bindPickerChange_l_fi(e) {
    this.setData({
      index_lj_fi: e.detail.value
    })
    this.setHouseTop(this.data.travelList[this.data.index_lj_fi].id, 5, 'lvju')
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
          callback(res.data.data.uid)
        }
      }
    })
  },
  // 微店信息
  getShopData(user_id) {
    const _this = this;
    const token = wx.getStorageSync('token');
    wx.request({
      url: _this.data.basicURL + 'weidian/get',
      method: "POST",
      data: {
        user_id
      },
      header: {
        "XX-TOKEN": token,
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type":"application/x-www-form-urlencoded"
      },
      success(res) {
        _this.setData({
          portrait: res.data.data.avatar,
          intro: res.data.data.intro
        })
      }
    })
  },
  // 编辑微店简介
  shopIntr() {
    wx.navigateTo({
      url: '../synopsis/synopsis',
    })
  },
  // 获取新房列表
  getNewHouse() {
    const _this = this;
    var data = {
      cid: wx.getStorageSync('cityId')
    }
    wx.request({
      url: _this.data.basicURL + 'xinloupan/search',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            newHouse: res.data.data.data
          })
        }
      }
    })
  },

  // 获取二手房列表
  getSecondHouse() {
    const _this = this;
    var data = {
      cid: wx.getStorageSync('cityId')
    }
    wx.request({
      url: _this.data.basicURL + 'ershoufang/search',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            secondList: res.data.data.data
          })
        }
      }
    })
  },

  // 获取美妆房列表 
  getFineHouse() {
    const _this = this;
    var data = {
      cid: wx.getStorageSync('cityId')
    }
    wx.request({
      url: _this.data.basicURL + 'meizhuangfang/search',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            fineList: res.data.data.data
          })
        } 
      }
    })
  },
  // 获取旅居房列表     
  getTravelHouse() {
    const _this = this;
    var data = {
      cid: wx.getStorageSync('cityId'),
      leixing: 2
    }
    wx.request({
      url: _this.data.basicURL + 'xinloupan/search',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            travelList: res.data.data.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserInfo(this.getShopData);
    this.getNewHouse();
    this.getSecondHouse();
    this.getFineHouse();
    this.getTravelHouse();
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