// pages/houseresourcesxqs/houseresourcesxqs.js
var bmap = require('../../components/bmap-wx.min.js');
var wxMarkerData = [];
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domainURL: app.data.domainURL,
    basicURL: app.data.basicURL,
    basicAppURL: app.data.basicAppURL,
    basicImg: app.data.basicImg, 
    tips_1: "联盟共享",
    tips_2: "外网同步",
    movies: [{
      url: ''
    }, {
      url: ''
    }],
    indicatorDots: false,
    autoplay: false,
    interval: 4000,
    duration: 800,
    currentTab: 0,
    hiddentip: true,
    hiddenceng: true,
    tips: true,
    current_index: 2,
    // 地图
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},
    address: wx.getStorageSync('nowAdress'),
    surrounding: ["交通", "教育", "医院", "银行", "购物"],
    indexs: 0,
    showModal: false,
    showModals: false,
    showModaltel: false,
    // 电话
    name: "",
    phone: '',
    // 联盟非联盟
    ally: wx.getStorageSync('ally')
  },

  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // 分享
  onShareAppMessage: function () {

  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  // Tooltips
  goTips: function (e) {
    this.setData({
      hiddentip: !this.data.hiddentip
    })
  },

  // 点击周边
  clickEvent(e) {
    this.setData({
      indexs: e.currentTarget.dataset.index,
    })
    this.BaiduMap(this.data.BMap)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      id: options.id,
      user_id: options.user_id
    })    
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: app.data.ak
    });
    this.setData({
      BMap: BMap
    })
    this.BaiduMap(BMap)
  },
  // 百度地图
  BaiduMap(BMap) {
    var that = this;
    var fail = function (data) { };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    // 当前位置
    BMap.geocoding({
      address: that.data.address,
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
    });
    // 发起POI检索请求 
    BMap.search({
      "query": that.data.surrounding[that.data.indexs],
      fail: fail,
      success: success,
    });
  },
  // 详情数据
  getDetail() {
    const _this = this;
    var data = {
      id: this.data.id
    }
    wx.request({
      url: _this.data.basicURL + 'ershoufang/content',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          var current_index = _this.data.current_index;
          if (!res.data.data.xiangqing.vr_url && res.data.data.xiangqing.shipin_url) {
            current_index = 1;
          } else if (!res.data.data.xiangqing.shipin_url && res.data.data.xiangqing.vr_url) {
            current_index = 1;
          } else if (!res.data.data.xiangqing.vr_url && !res.data.data.xiangqing.shipin_url) {
            current_index = 0;
          }
          wx.setStorageSync('details', res.data.data.xiangqing);
            // tips_2
            if (res.data.data.xiangqing.waiwangtb == 0) {
              _this.setData({
                tips_2: "外网同步"
              })
            } else {
              _this.setData({
                tips_2: "取消外网同步"
              })
            }
            // tips_1
            if (res.data.data.xiangqing.lianmenggx == 0) {
              _this.setData({
                tips_1: "联盟共享"
              })
            } else {
              _this.setData({
                tips_1: "取消联盟共享"
              })
            }
          _this.setData({
            current_index: current_index,
            imgsHX: res.data.data.xiangqing.hx_img,
            show_vedio: res.data.data.xiangqing.shipin_url,
            show_vr: res.data.data.xiangqing.vr_url,
            bianhao: res.data.data.xiangqing.bianhao,
            id: res.data.data.xiangqing.id,
            xiangqing: res.data.data.xiangqing,
            img: res.data.data.xiangqing.img,
            "movies[0].url": res.data.data.vr_url,
            "movies[1].url": res.data.data.shipin_url,
            xiaoqu: res.data.data.xiaoqu,
            dongtai: res.data.data.dongtai,
            huxing: res.data.data.xiangqing.huxing,
            zhoubian_ershoufang: res.data.data.zhoubian_ershoufang,
            zhoubian_xinfang: res.data.data.zhoubian_xinfang,
            name: res.data.data.xiangqing.weihuren.ygmingcheng,
            phone: res.data.data.xiangqing.weihuren.dianhua,
            peitao: res.data.data.xiangqing.peitao,
            fangyuan: res.data.data.fangyuan
          })
        }
      }
    })
  },

  // 添加到收藏
  loveHouse() {
    const _this = this;
    var data = {
      id: this.data.id,
      stype: "esfy"
    }
    wx.request({
      url: _this.data.basicURL + 'fangyuan/shoucang',
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
  // 获取配置项
  getOptions() {
    const _this = this;
    var data = {
      cid: wx.getStorageSync('cityId')
    }
    wx.request({
      url: _this.data.basicURL + 'front/lpoptions',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            forwords: res.data.data.chaoxiang,
            decorate: res.data.data.zhuangxiu,
            useto: res.data.data.yongtu
          })
        }
      }
    })
  },

  // 联盟共享
  unionShare(e) {
    const _this = this;
    var data = {
      id: this.data.id
    }
    let type = e.currentTarget.dataset.type;
    if (this.data.ally != 1) {
      wx.showToast({
        title: '当前账号不允许发布到联盟',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (type == 0) {
      wx.request({
        url: _this.data.basicURL + 'fyneirong/lianmenggx',
        method: "GET",
        data: data,
        header: {
          "XX-TOKEN": wx.getStorageSync('token'),
          "XX-DEVICE-TYPE": "jjr_dian"
        },
        success(res) {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000
          })
        }
      })
    } else if (type == 1) {
      wx.request({
        url: _this.data.basicURL + 'fyneirong/nolianmenggx',
        method: "GET",
        data: data,
        header: {
          "XX-TOKEN": wx.getStorageSync('token'),
          "XX-DEVICE-TYPE": "jjr_dian"
        },
        success(res) {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000
          })
        }
      })
    }
  },

  // 外网同步
  synchronous(e) {
    const _this = this;
    let type = e.currentTarget.dataset.type;
    var data = {
      id: this.data.id
    }
    if (this.data.ally != 1) {
      wx.showToast({
        title: '当前账号不允许发布到联盟',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (type == 0) {
      wx.request({
        url: _this.data.basicURL + 'fyneirong/waiwangtb',
        method: "GET",
        data: data,
        header: {
          "XX-TOKEN": wx.getStorageSync('token'),
          "XX-DEVICE-TYPE": "jjr_dian"
        },
        success(res) {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000
          })
        }
      })
    } else if (type == 1) {
      wx.request({
        url: _this.data.basicURL + 'fyneirong/nowaiwangtb',
        method: "GET",
        data: data,
        header: {
          "XX-TOKEN": wx.getStorageSync('token'),
          "XX-DEVICE-TYPE": "jjr_dian"
        },
        success(res) {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000
          })
        }
      })
    }

  },

  // 删除房源
  delHouse() {
    const _this = this;
    var data = {
      id: this.data.id
    }
    wx.request({
      url: _this.data.basicAppURL + 'ershoufang/delete',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {        
        if (res.data.code == 0) {
          wx.showToast({
            title: '删除成功',
            icon: 'none',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        } else {
          wx.showToast({
            title: '删除失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  editHouse() {
    wx.navigateTo({
      url: '../editrentalbook/editrentalbook?id=' + this.data.id,
    })
  },
  // 下载APP
  launchAppError(e) { },
  // 关闭标签
  closeTips() {
    this.setData({
      tips: false
    })
  },

  // 去APP
  goAPP() {
    wx.navigateTo({
      url: '../download/download'
    })
    // this.setData({
    //   showModal: true
    // })
  },

  // 业主信息
  userInfo() {
    wx.navigateTo({
      url: '../owner/owner?id=' + this.data.id,
    })
  },
  // 写跟进
  write() {
    wx.navigateTo({
      url: '../addfollowup/addfollowup?id=' + this.data.id + "&bianhao=" + this.data.bianhao,
    })
  },
  // 跟进记录
  record() {
    wx.navigateTo({
      url: '../followuprecord/followuprecord?id=' + this.data.id,
    })
  },

  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () { },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },

  // 分享
  enjoy: function () {
    this.setData({
      showModals: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMoves: function () { },
  /**
   * 隐藏模态对话框
   */
  hideModals: function () {
    this.setData({
      showModals: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancels: function () {
    this.hideModals();
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
  // 跳转到二手房
  hrefSecond(e) {
    wx.navigateTo({
      url: '../secondhousexq/secondhousexq?id=' + e.currentTarget.dataset.id,
    })
  },
  // 跳转到新房
  hrefNew(e) {
    wx.navigateTo({
      url: '../newhousexq/newhousexq?id=' + e.currentTarget.dataset.id,
    })
  },

  // 跳转到置顶
  setTop(e) {
    wx.navigateTo({
      url: '../topping/topping?id=' + this.data.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDetail();
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
  onUnload: function (options) {
    
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
    let user = wx.getStorageSync('user_info')
    let sharename = user.ygmingcheng, sharephone = user.dianhua
    let imgUrl = '', photo = this.data.img
    if (photo && photo.length > 0) {
      imgUrl = photo[0].img_path
    }
    let title = this.data.xiangqing.fybiaoti
    return {
      title: title,
      imageUrl: imgUrl,
      path: '/pages/houseresourcesxqs/houseresourcesxqs?id='+this.data.id + '&sharename=' + sharename + '&sharephone=' + sharephone
    }
  }
})