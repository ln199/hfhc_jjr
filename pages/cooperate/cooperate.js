// pages/cooperate/cooperate.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicAppURL: app.data.basicAppURL,
    basicImg: app.data.basicImg,
    hiddentip: true,
    phone: '400 616 59976552',
    phones: '123 456 78900',
    showModaltel: false,
    hidden: false,
    nocancel: false
  },

  // 终止合作
  stop: function () {
    this.setData({
      hidden: true
    });
  },
  clickMask: function () {
    this.setData({
      hidden: false
    });
  },
  cancel: function () {
    this.setData({
      hidden: false
    });
  },


  //跳转性情
  cooperate: function (e) {
    wx.navigateTo({
      url: '../secondhousexq/secondhousexq?id=' + e.currentTarget.dataset.id + "&completion=" + this.data.id,
    })
  },

  // Tooltips
  goTips: function (e) {
    this.setData({
      hiddentip: !this.data.hiddentip
    })
  },

  //电话弹窗
  tel: function () {
    this.setData({
      showModaltel: true
    })
  },
  preventTouchMovetel: function () { },
  hideModaltel: function () {
    this.setData({
      showModaltel: false
    });
  },
  onCanceltel: function () {
    this.hideModaltel();
  },

  //拨打电话
  call: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  calls: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phones,
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
      into_type: options.into_type,
      realtype: options.realtype
    })
  },

  // 获取合作详情
  getPartDetail() {
    const _this = this;
    var data = {
      hezuoid: this.data.id
    }
    wx.request({
      url: _this.data.basicURL + 'fangyuanhezuo/getdetails',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          var log = res.data.data.log;
          log[0].state = 1;
          _this.setData({
            details_type: res.data.data.type,
            duixiang: res.data.data.duixiang,
            fy: res.data.data.fangyuan,            
            name1: res.data.data.duixiang.ygmingcheng,
            name2: res.data.data.faqizhe.ygmingcheng,
            company1: res.data.data.duixiang.companyName,
            company2: res.data.data.faqizhe.companyName,
            dianhua1: res.data.data.duixiang.dianhua,
            dianhua2: res.data.data.faqizhe.dianhua,
            avatar1: res.data.data.duixiang.avatar,
            avatar2: res.data.data.faqizhe.avatar,
            log: log
          })          
          // 查询分佣比例
          wx.request({
            url: _this.data.basicAppURL + 'fangyuanhezuo/yongjinbili',
            method: "POST",
            data: {
              fyid: res.data.data.fangyuan.id
            },
            header: {
              "XX-TOKEN": wx.getStorageSync('token'),
              "XX-DEVICE-TYPE": "jjr_dian",
              "content-type":"application/x-www-form-urlencoded"
            },
            success(res) {
              if (res.data.code == 0) {
                _this.setData({                  
                  fenyong: res.data.data                  
                })
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
      }
    })
  },

  // 拒绝合作
  refused() {
    const _this = this;
    var data = {
      hezuoid: this.data.id
    }
    wx.request({
      url: _this.data.basicURL + 'fangyuanhezuo/reject',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '拒绝合作',
            icon: 'none',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              complete: (res) => {
                detal: 1
              },
            })
          }, 1500);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  // 接受合作
  accept() {
    const _this = this;
    var data = {
      hezuoid: this.data.id
    }
    wx.request({
      url: _this.data.basicURL + 'fangyuanhezuo/accept',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '合作成功',
            icon: "none",
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              complete: (res) => {
                detal: 1
              },
            })
          }, 1500);
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

  // 终止合作
  abort() {
    const _this = this;
    var data = {
      hezuoid: this.data.id
    }
    wx.request({
      url: _this.data.basicURL + 'fangyuanhezuo/abort',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '终止合作',
            icon: "none",
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              complete: (res) => {
                detal: 1
              },
            })
          }, 1500);
          _this.setData({
            hidden: false
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000
          })
          _this.setData({
            hidden: false
          });
        }
      }
    })
  },

  // 放弃合作
  giveUp() {
    const _this = this;
    var data = {
      hezuoid: this.data.id
    }
    wx.request({
      url: _this.data.basicURL + 'fangyuanhezuo/cancel',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '放弃合作',
            icon: "none",
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              complete: (res) => {
                detal: 1
              },
            })
          }, 1500);
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

  // 重启合作
  reset() {
    const _this = this;
    var data = {
      hezuoid: this.data.id
    }
    wx.request({
      url: _this.data.basicURL + 'fangyuanhezuo/restart',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '重启合作',
            icon: "none",
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              complete: (res) => {
                detal: 1
              },
            })
          }, 1500);
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

  // 在线沟通
  onlineContext() {
    let id = "jjr_" + this.data.duixiang.id;
    let conversation = "C2Cjjr_" + this.data.duixiang.id
    let name = this.data.duixiang.ygmingcheng;
    let avatar = this.data.duixiang.avatar;
    wx.navigateTo({
      url: '../newsxq/newsxq?friendId=' + id + "&conversationID=" + conversation + "&friendName=" + name + "&friendAvatarUrl=" + avatar,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getPartDetail()
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