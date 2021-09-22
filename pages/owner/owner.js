// pages/owner/owner.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL, 
    basicImg:app.data.basicImg,
    classes_array: [{
      name: '1',
      checked: true,
      value: '男'
    }, {
      name: '2',
      checked: false,
      value: '女'
    }],
    array: ['本人'],
    index: 0
  },

  //性别选择
  radioChange: function (res) {
    var arrs = this.data.classes_array;
    var that = this;
    var sex= ''
    for (const x in arrs) {
      if (arrs[x].name == res.detail.value) {
        arrs[x].checked = true;
      } else {
        arrs[x].checked = false;
      }
    }
    that.setData({
      classes_array: arrs,
      sex:res.detail.value
    })
  },

  //手机归属
  bindPickerChange: function (e) {
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
      id:options.id
    })
  },

  // 获取业主信息
  getUserInfo(){
    const _this = this;
    var arrs = this.data.classes_array;
  var data = {
    id:this.data.id,
    type:1
    }
  wx.request({
    url: _this.data.basicURL+'fyneirong/diaoqu',
    method:"GET",
    data:data,
    header: {
      "XX-TOKEN": wx.getStorageSync('token'),
      "XX-DEVICE-TYPE": "jjr_dian"
    },
    success(res){ 
      if(res.data.code == 0){
        for (const x in arrs) {
          if (arrs[x].name == res.data.data.diaoqu.yezhulx) {
            arrs[x].checked = true;
          }else if(res.data.data.diaoqu.yezhulx == null){
            arrs[x].checked = true;
          } else {
            arrs[x].checked = false;
          }
        }
      _this.setData({
        diaoqu:res.data.data.diaoqu,
        info:res.data.data.info,
        classes_array: arrs
      })
      if(res.data.data.info == "剩余调取数为0次"){
        wx.showToast({
          title: '您无权访问',
          icon:"none",
          duration:500
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '../houseresourcesxq/houseresourcesxq',
          })
        },500)
      }
      }
    }
  })
  },
  // 修改业主信息
  updataUserInfo(e){
    const _this = this;
    var data = {
      id:this.data.id,
      yezhu:e.detail.value.username,
      yezhulx:1,
      dianhua1:e.detail.value.mobile,
      personcardno:e.detail.value.number
      }
    if(e.detail.value.username == ''){
      wx.showToast({
        title: '请输入业主姓名',
        icon:"none",
        duration:2000
      })
    }else if (!(/^1[3456789]\d{9}$/.test(e.detail.value.mobile))) {
      wx.showToast({
        title: "请输入正确手机号",
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.number != "" && !(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(e.detail.value.number))) {
      wx.showToast({
        title: "请输入正确身份证号",
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.request({
        url: _this.data.basicURL+'fyneirong/xgzuodong',
        method:"POST",
        data:data,
        header: {
          "XX-TOKEN": wx.getStorageSync('token'),
          "XX-DEVICE-TYPE": "jjr_dian",
          "content-type":"application/x-www-form-urlencoded"
        },
        success(res){
          if(res.data.code == 0){
            wx.showToast({
              title: '保存成功',
              icon:"none",
              duration:2000
            })
            // wx.navigateTo({
            //   url: '../houseresourcesxq/houseresourcesxq',
            // })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:"none",
              duration:2000
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
    this.getUserInfo()
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