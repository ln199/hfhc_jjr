// pages/editi/editi.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    array: ['男', '女'],
    index: 0,
    indexs: 0,
  },

  // 性别
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    var num = null;
    if (e.detail.value == 0) {
      num = 1;
    } else {
      num = 2;
    }
    var data = {
      xingbie: num
    }
    this.updataInfo(data)
  },

  // 学历
  bindPickerChanges: function (e) {
    this.setData({
      indexs: e.detail.value
    })
    var data = {
      xueli: e.detail.value
    }
    this.updataInfo(data);
  },

  // 实名认证
  goRenzheng: function () {
    wx.navigateTo({
      url: "../attestation/attestation"
    })
  },

  // 经纪公司-未绑定
  goCompanyN: function () {
    wx.navigateTo({
      url: "../broker/broker"
    })
  },
  // 经纪公司-已绑定
  goCompanyF: function () {
    wx.navigateTo({
      url: "../brokered/brokered"
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
  },

  // 个人信息
  getInfo() {
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'my/info',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_mobile",
      },
      success(res) {
        if (res.data.data.xueli == 1) {
          _this.data.indexs = 1
        } else if (res.data.data.xueli == 2) {
          _this.data.indexs = 2
        } else if (res.data.data.xueli == 3) {
          _this.data.indexs = 3
        } else if (res.data.data.xueli == 4) {
          _this.data.indexs = 4
        } else if (res.data.data.xueli == 5) {
          _this.data.indexs = 5
        } else if (res.data.data.xueli == 6) {
          _this.data.indexs = 6
        } else if (res.data.data.xueli == 7) {
          _this.data.indexs = 7
        } else if (res.data.data.xueli == 8) {
          _this.data.indexs = 8
        } else {
          _this.data.indexs = 0
        }

        if (res.data.data.xingbie == 1) {
          _this.setData({
            index: 0
          })
        } else {
          _this.setData({
            index: 1
          })
        }
        _this.setData({
          avatar_url: res.data.data.avatar_url,
          ygmingcheng: res.data.data.ygmingcheng,
          dianhua: res.data.data.dianhua,
          xueliObj: res.data.data.options.xueli,
          xueli: res.data.data.xueli,
          xingbie: res.data.data.xingbie,
          idcard_total_verified: res.data.data.idcard_total_verified,
          gongsi: res.data.data.gongsi,
          gongsi_bind: res.data.data.gongsi_bind,
          comment: res.data.data.comment,
          indexs: _this.data.indexs
        })
      }
    })
  },
  // 昵称
  userName(e) {
    this.setData({
      userName: e.detail.value
    })
    var data = {
      ygmingcheng: e.detail.value
    }
    this.updataInfo(data)
  },
  //手机号
  moblie(e) {
    this.setData({
      mobile: e.detail.value
    })
    var data = {
      dianhua: e.detail.value
    }
    var reg = /^1[3|4|5|7|8][0-9]{9}$/
    if (e.detail.value == "") {
      wx.showToast({
        title: '请输入手机号',
        icon: "none",
        duration: 2000
      })
    } else if (!reg.test(e.detail.value)) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: "none",
        duration: 2000
      })
    } else {
      this.updataInfo(data)
    }
  },
  // 个人简介
  introduction(e) {
    this.setData({
      introduction: e.detail.value
    })
    var data = {
      comment: e.detail.value
    }
    this.updataInfo(data)
  },
  // 修改个人信息
  updataInfo(data) {
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'my/edit_info',
      method: "POST",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": " jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  // 修改头像
  chooseImg() {
    const _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: _this.data.basicURL + 'my/update_avatar',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "XX-TOKEN": wx.getStorageSync('token'),
            "XX-DEVICE-TYPE": " jjr_dian",
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            var data = JSON.parse(res.data);
            if (data.code == 1) {
              wx.showToast({
                title: data.msg,
                icon: 'none',
                duration: 2000
              })
            } else {
              _this.setData({
                avatar_url: data.data.avatar_url
              })
              wx.showToast({
                title: "更新成功",
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getInfo()
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