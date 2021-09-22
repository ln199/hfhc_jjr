// pages/beautyhousexq/beautyhousexq.js
var bmap = require('../../components/bmap-wx.min.js');
var wxMarkerData = [];
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
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
    current_index: 2,
    // 电话
    name: "",
    phone: '',
    // 联盟非联盟
    ally: wx.getStorageSync('ally'),
    token: ''
  },
  // 进入到周边地图
  intoMap() {
    wx.navigateTo({
      url: '../periphery/periphery',
    })
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

  //发起合作
  goFaqi: function () {
    this.setData({
      hiddenceng: !this.data.hiddenceng
    })
  },

  quxiao: function () {
    this.setData({
      hiddenceng: !this.data.hiddenceng
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
      token: options.token
    })
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: '1rG3prA1btVigeGjSWr7ccza25MhMZ1c'
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
      url: _this.data.basicURL + 'meizhuangfang/content',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": this.data.token,
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
          _this.setData({
            current_index: current_index,
            id: res.data.data.xiangqing.id,
            xiangqing: res.data.data.xiangqing,
            img: res.data.data.xiangqing.img,
            show_vr: res.data.data.xiangqing.vr_url,
            show_vedio: res.data.data.xiangqing.shipin_url,
            "movies[0].url": res.data.data.vr_url,
            "movies[1].url": res.data.data.shipin_url,
            xiaoqu: res.data.data.xiaoqu,
            dongtai: res.data.data.dongtai,
            zhoubian_ershoufang: res.data.data.zhoubian_ershoufang,
            zhoubian_xinfang: res.data.data.zhoubian_xinfang,
            name: res.data.data.xiangqing.weihuren.ygmingcheng,
            phone: res.data.data.xiangqing.weihuren.dianhua

          })
        }
      }
    })
  },
  // 在线沟通
  onlineContext() {
    let site = this.data.xiangqing.weihuren;
    let id = "jjr_" + site.id;
    let conversation = "C2Cjjr_" + site.id
    let name = site.ygmingcheng;
    let avatar = site.avatar;
    wx.navigateTo({
      url: '../newsxq/newsxq?friendId=' + id + "&conversationID=" + conversation + "&friendName=" + name + "&friendAvatarUrl=" + avatar,
    })
  },
  // 添加到收藏
  loveHouse() {
    const _this = this;
    var data = {
      id: this.data.id,
      stype: 'meizhuang'
    }
    wx.request({
      url: _this.data.basicURL + 'fangyuan/shoucang',
      method: "POST",
      data: data,
      header: {
        "XX-TOKEN": this.data.token,
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
        "XX-TOKEN": this.data.token,
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
  // 匹配客源
  matchUser() {
    const _this = this;
    var detail = this.data.xiangqing;
    var zhuangxiu;
    var chaoxiang;
    var yongtu;
    zhuangxiu = this.data.decorate.filter(function (element, index, all) {
      return element.lxming == detail.zhuangxiu;
    })
    chaoxiang = this.data.forwords.filter(function (element, index, all) {
      return element.lxming == detail.chaoxiang;
    })
    yongtu = this.data.useto.filter(function (element, index, all) {
      return element.lxming == detail.yongtu;
    })
    var data = {
      leixing: 1,
      chaoxiang: chaoxiang[0].lxid,
      shoujia: detail.shoujia,
      mianji: detail.mianji,
      louceng: detail.louceng,
      niandai: detail.niandai,
      yongtu: yongtu[0].lxid,
      xiaoqum: detail.xiaoqum,
      zhuangxiu: zhuangxiu[0].lxid
    }
    wx.request({
      url: _this.data.basicURL + 'fangyuan/ppky',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": this.data.token,
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.info == "匹配成功") {
          if (res.data.data.length == 0) {
            wx.showToast({
              title: '没有匹配到相关客源',
              icon: "none",
              duration: 2000
            })
          } else {
            wx.navigateTo({
              url: '../buylist/buylist?userList=' + res.data.data,
            })
          }
        }
      }
    })
  },
  // 默认图片--新房
  errDetails(e) {
    var zhoubian_xinfang = this.data.zhoubian_xinfang;
    var default_img = e.currentTarget.dataset.img;
    var index = e.currentTarget.dataset.index;
    zhoubian_xinfang[index].img = default_img;
    this.setData({
      zhoubian_xinfang
    })
  },
    // 默认图片--二手房
    errDetailssss(e) {
      var zhoubian_ershoufang = this.data.zhoubian_ershoufang;
      var default_img = e.currentTarget.dataset.img;
      var index = e.currentTarget.dataset.index;
      zhoubian_ershoufang[index].img = default_img;
      this.setData({
        zhoubian_ershoufang
      })
    },
  // 下载APP
  launchAppError(e) {

  },
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
  // 发起合作所需好房币
  getCoin() {
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'fangyuanhezuo/hezuocost',
      method: "GET",
      // data:data,
      header: {
        "XX-TOKEN": this.data.token,
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {

        }
      }
    })
  },

  // 发起合作
  startCooperation() {
    const _this = this;
    var data = {
      fyid: this.data.id,
      fenyong: 30
      // fenyong:this.data.xiangqing.lianmenggx_yongjin
    }
    wx.request({
      url: _this.data.basicURL + 'fangyuanhezuo/start',
      method: "POST",
      data: data,
      header: {
        "XX-TOKEN": this.data.token,
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {

        }
      }
    })
  },
  // 跳转新房
  houseList() {
    wx.navigateTo({
      url: '../newhouse/newhouse',
    })
  },
  // 跳转二手房
  houseList2() {
    wx.navigateTo({
      url: '../secondhouses/secondhouses',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDetail();
    this.getOptions();
    this.getCoin()
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
    // return {
    //   title: '好房好车',
    //   desc: '好房好车小程序',
    //   path: '/beautyhousexq/beautyhousexq?id='+this.data.id
    // }
  }
})