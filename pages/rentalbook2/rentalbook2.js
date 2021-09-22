// pages/rentalbook2/rentalbook2.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    arrayl: [], //朝向
    arrayt: [], //装修
    arrayj: [], //现状
    arrayly: [], //来源
    indexly: 0,
    indexl: 0,
    indext: 0,
    indexj: 0,
    //房屋配套
    list: [],
    idx: 0,
    //房源标签
    lists: [],
    idxs: 0,
  },

  //朝向
  bindPickerChangel: function (e) {
    this.setData({
      indexl: e.detail.value
    })
  },

  //装修
  bindPickerChanget: function (e) {
    this.setData({
      indext: e.detail.value
    })
  },

  //现状
  bindPickerChangej: function (e) {
    this.setData({
      indexj: e.detail.value
    })
  },

  //来源
  bindPickerChangely: function (e) {
    this.setData({
      indexly: e.detail.value
    })
  },

  //房屋配套
  goIndex(e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.list;
    var states = list[index].states;
    var idsArr = [];
    var idss = [];
    var ids = "";
    // 设置多选条件
    if (states == undefined || states == 0) {
      list[index].states = 1;
    } else {
      list[index].states = 0;
    }
    // 筛选值
    idsArr = list.filter(function (element, index, all) {
      return element.states == 1;
    })
    for (let i = 0; i < idsArr.length; i++) {
      idss.push(Number(idsArr[i].lxid))
    }
    ids = idss.join(",");
    this.setData({
      list: list,
      select_id: ids
    })
  },

  //房源标签
  goIndexs(e) {
    var index = e.currentTarget.dataset.index;   
    var lists = this.data.lists;    
    var states = lists[index].states;  
    var idsArr = [];   
    var idss = [];      
    var ids = "";       
    // 设置多选条件
    if (states == undefined || states == 0) {
      lists[index].states = 1;
    } else {
      lists[index].states = 0;
    }
    // 筛选值
    idsArr = lists.filter(function (element, index, all) {
      return element.states == 1;
    })
    for (let i = 0; i < idsArr.length; i++) {
      idss.push(Number(idsArr[i].lxid))
    }
    ids = idss.join(",");
    this.setData({
      lists: lists,
      select_ids: ids
    })
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

  //获取配置项
  getOptions() {
    const _this = this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: _this.data.basicURL + 'chuzufang/options',
      method: "GET",
      header: {
        "XX-DEVICE-TYPE": "jjr_dian",
        "XX-TOKEN": token
      },
      success(res) {
        var lists = res.data.data.fybiaoqian;
        var list = res.data.data.peitao;
        for (let i = 0; i < list.length; i++) {
          list[0].states = 1;
        }
        for (let j = 0; j < lists.length; j++) {
          lists[0].states = 1
        }
        _this.setData({
          arrayl: res.data.data.chaoxiang,
          arrayt: res.data.data.zhuangxiu,
          arrayj: res.data.data.xianzhuang,
          arrayly: res.data.data.laiyuan,
          list: list,
          lists: lists
        })
      }
    })
  },
  // 下一步
  nextStep(e) {
    var v = e.detail.value;
    if (v.building == "") {
      wx.showToast({
        title: '请输入所在栋',
        icon: "none",
        duration: 2000
      })
    } else if (v.unit == "") {
      wx.showToast({
        title: '请输入所在单元',
        icon: "none",
        duration: 2000
      })
    } else if (v.num == '') {
      wx.showToast({
        title: '请输入所在门牌号',
        icon: "none",
        duration: 2000
      })
    } else if (v.inStep == '') {
      wx.showToast({
        title: '请输入所在楼层',
        icon: "none",
        duration: 2000
      })
    } else if (v.totalStep == '') {
      wx.showToast({
        title: '请输入总楼层',
        icon: "none",
        duration: 2000
      })
    } else if (v.houseRoom == '') {
      wx.showToast({
        title: '请输入共几室',
        icon: "none",
        duration: 2000
      })
    } else if (v.houseHall == '') {
      wx.showToast({
        title: '请输入共几厅',
        icon: "none",
        duration: 2000
      })
    } else if (v.houseToilet == '') {
      wx.showToast({
        title: '请输入共几卫',
        icon: "none",
        duration: 2000
      })
    } else if (v.houseBalcony == '') {
      wx.showToast({
        title: '请输入共几阳台',
        icon: "none",
        duration: 2000
      })
    } else if (v.areaHouse == '') {
      wx.showToast({
        title: '请输入建筑面积',
        icon: "none",
        duration: 2000
      })
    }
    else if (v.areaCover == '') {
      wx.showToast({
        title: '请输入套内面积',
        icon: "none",
        duration: 2000
      })
    } else {
      var dataOther = {
        building: v.building,
        unit: v.unit,
        num: v.num,
        inStep: v.inStep,
        totalStep: v.totalStep,
        stepNum: v.stepNum,
        stepUser: v.stepUser,
        houseRoom: v.houseRoom,
        houseHall: v.houseHall,
        houseToilet: v.houseToilet,
        houseBalcony: v.houseBalcony,
        areaHouse: v.areaHouse,
        areaCover: v.areaCover,
        direction: this.data.arrayl[this.data.indexl].lxid,
        decorate: this.data.arrayt[this.data.indext].lxid,
        shape: this.data.arrayj[this.data.indexj].lxid,
        source: this.data.arrayly[this.data.indexly].lxid,
        config: this.data.select_id,
        label: this.data.select_ids
      }
      wx.setStorageSync('dataOther', dataOther);
      wx.navigateTo({
        url: '../rentalbooks/rentalbooks',
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getOptions()
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