// pages/newhousexq/newhousexq.js
const app = getApp();
var bmap = require('../../components/bmap-wx.min.js');
var wxMarkerData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    movies: [{ url: '' }, { url: '' }],
    img: "",
    indicatorDots: false,
    autoplay: false,
    interval: 4000,
    duration: 800,
    currentTab: 0,
    hiddentip: true,
    showModal: false,
    currentTabs: 0,
    hiddenTiao: true,
    showModals: false,
    windowHeight: 0,
    scrollHeight: 0,
    dynamic: 0,
    groupd: 0,
    groupe: 0,
    bill: 0,
    highlights: 0,
    clause: 0,
    commission: 0,
    rule: 0,
    booth: 0,
    housetype: 0,
    building: 0,
    showModaltel: false,
    phone: '400 616 59976552',
    phones: '123 456 78900',
    companyName: wx.getStorageSync('companyName'),
    current_index: 2,
    // 地图
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},
    address: wx.getStorageSync('nowAdress'),
    surrounding: ["交通", "教育", "医院", "银行", "购物"],
    indexs: 0,
    token: ''
  },
  // 进入到周边地图
  intoMap() {
    wx.navigateTo({
      url: '../periphery/periphery',
    })
  },
  //佣金更多
  commission: function () {
    wx.navigateTo({
      url: "../commission/commission"
    })
  },

  //户型更多
  housetype: function () {
    wx.navigateTo({
      url: "../housetype/housetype?id=" + this.data.id
    })
  },

  //海报
  bill: function () {
    wx.navigateTo({
      url: "../bill/bill?id=" + this.data.id
    })
  },

  //动态
  dynamic: function () {
    wx.navigateTo({
      url: "../dynamic/dynamic?id=" + this.data.id
    })
  },

  //周边
  periphery: function () {
    wx.navigateTo({
      url: "../periphery/periphery"
    })
  },

  //报备
  baobei: function () {
    wx.navigateTo({
      url: "../report/report?id=" + this.data.id + "&&name=" + this.data.ysfang.xmbiaoti
    })
  },


  // 点击周边
  clickEvent(e) {
    this.setData({
      indexs: e.currentTarget.dataset.index,
    })
    this.BaiduMap(this.data.BMap)
  },
  //轮播滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //轮播点击切换
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

  //TAB滑动切换
  swiperTabs: function (e) {
    var that = this;
    that.setData({
      currentTabs: e.detail.current
    });
    this.calcHeight();
  },
  //TAB点击切换
  clickTabs: function (e) {
    var that = this;
    if (this.data.currentTabs === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTabs: e.target.dataset.current
      })
    }
    this.calcHeight();
  },

  //未绑定经纪公司
  bang: function () {
    wx.navigateTo({
      url: "../broker/broker"
    })
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

  //入驻
  settled: function () {
    this.setData({
      hiddenTiao: !this.data.hiddenTiao
    })
  },

  // 去APP
  goApp: function () {
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
  preventTouchMove: function () {
  },
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
  // 新房列表
  houstList() {
    wx.navigateTo({
      url: '../newhouse/newhouse',
    })
  },
  // 新房详情
  intoDetails(e) {
    wx.navigateTo({
      url: '../newhousexq/newhousexq?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMoves: function () {
  },
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

  calcHeight() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        let windowHeight = (res.windowHeight * (750 / res.windowWidth));
        that.setData({
          windowHeight: windowHeight
        })
      }
    });

    setTimeout(function () {
      var dynamic = wx.createSelectorQuery();

      var groupd = wx.createSelectorQuery();
      var groupe = wx.createSelectorQuery();

      var bill = wx.createSelectorQuery();
      var highlights = wx.createSelectorQuery();
      var clause = wx.createSelectorQuery();

      var commission = wx.createSelectorQuery();
      var rule = wx.createSelectorQuery();
      var booth = wx.createSelectorQuery();
      var housetype = wx.createSelectorQuery();
      var building = wx.createSelectorQuery();

      dynamic.select('.dynamic').boundingClientRect();

      groupd.select('.groupd').boundingClientRect();
      groupe.select('.groupe').boundingClientRect();

      bill.select('.bill').boundingClientRect();
      highlights.select('.highlights').boundingClientRect();
      clause.select('.clause').boundingClientRect();

      commission.select('.commission').boundingClientRect();
      rule.select('.rule').boundingClientRect();
      booth.select('.booth').boundingClientRect();
      housetype.select('.housetype').boundingClientRect();
      building.select('.building').boundingClientRect();

      dynamic.exec(function (rect) { if (rect[0] === null) return; that.setData({ dynamic: rect[0].height }) });
      groupd.exec(function (rect) { if (rect[0] === null) return; that.setData({ groupd: rect[0].height }) });
      groupe.exec(function (rect) { if (rect[0] === null) return; that.setData({ groupe: rect[0].height }) });
      bill.exec(function (rect) { if (rect[0] === null) return; that.setData({ bill: rect[0].height }) });
      highlights.exec(function (rect) { if (rect[0] === null) return; that.setData({ highlights: rect[0].height }) });
      clause.exec(function (rect) { if (rect[0] === null) return; that.setData({ clause: rect[0].height }) });
      commission.exec(function (rect) { if (rect[0] === null) return; that.setData({ commission: rect[0].height }) });
      rule.exec(function (rect) { if (rect[0] === null) return; that.setData({ rule: rect[0].height }) });
      booth.exec(function (rect) { if (rect[0] === null) return; that.setData({ booth: rect[0].height }) });
      housetype.exec(function (rect) { if (rect[0] === null) return; that.setData({ housetype: rect[0].height }) });
      building.exec(function (rect) { if (rect[0] === null) return; that.setData({ building: rect[0].height }) });

    }, 500)

    setTimeout(function () {
      var dynamicHeight = that.data.dynamic;

      var groupdHeight = that.data.groupd;
      var groupeHeight = that.data.groupe;

      var billHeight = that.data.bill;
      var highlightsHeight = that.data.highlights;
      var clauseHeight = that.data.clause;

      var commissionHeight = that.data.commission;
      var ruleHeight = that.data.rule;
      var boothHeight = that.data.booth;
      var housetypeHeight = that.data.housetype;
      var buildingHeight = that.data.building;

      wx.getSystemInfo({
        success: function (res) {
          let scrollHeight = res.windowHeight;
          var currentTabs = that.data.currentTabs;
          if (currentTabs == 0) {
            that.setData({
              scrollHeight: commissionHeight + ruleHeight + boothHeight + housetypeHeight + buildingHeight + 20
            })
          } else if (currentTabs == 1) {
            that.setData({
              scrollHeight: billHeight + highlightsHeight + clauseHeight + 12
            })
          } else if (currentTabs == 2) {
            that.setData({
              scrollHeight: groupdHeight + groupeHeight + 8
            })
          } else if (currentTabs == 3) {
            that.setData({
              scrollHeight: dynamicHeight
            })
          }
        }
      })
    }, 1000)
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
  call: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mobile,
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
      token: options.token
    });
    this.calcHeight();

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
    var fail = function (data) {
    };
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
      url: _this.data.basicURL + 'xinloupan/content',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": this.data.token,
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          var current_index = _this.data.current_index;
          if (!res.data.data.ysfang.url && res.data.data.ysfang.vedio_url) {
            current_index = 1;
          } else if (!res.data.data.ysfang.vedio_url && res.data.data.ysfang.url) {
            current_index = 1;
          } else if (!res.data.data.ysfang.url && !res.data.data.ysfang.vedio_url) {
            current_index = 0;
          }
          _this.setData({
            current_index:current_index,
            "movies[0].url": res.data.data.ysfang.url,
            "movies[1].url": res.data.data.ysfang.vedio_url,
            show_vr:res.data.data.ysfang.url,
            show_vedio:res.data.data.ysfang.vedio_url,
            ysfang: res.data.data.ysfang,
            ysfhx: res.data.data.ysfhx,
            ysfdt: res.data.data.ysfdt,
            photo: res.data.data.photo,
            tjysf: res.data.data.tjysf,
            weihuren: res.data.data.ysfang.weihuren,
            weihurendh: res.data.data.ysfang.weihurendh,
            zhuchang: res.data.data.ysfang.zhuchang
          })
        }
      }
    })
  },
    // 在线沟通
    onlineContext() {
      let site = this.data.ysfang.zhuchang[0];
      let id = "zc_" + site.user_id;
      let conversation = "C2Czc_" + site.user_id
      let name = site.nickname;
      let avatar = site.avatar;
      wx.navigateTo({
        url: '../newsxq/newsxq?friendId=' + id + "&conversationID=" + conversation + "&friendName=" + name + "&friendAvatarUrl=" + avatar,
      })
    },
  // 收藏
  love() {
    const _this = this;
    var data = {
      stype: "lvju",
      id: this.data.id
    }
    wx.request({
      url: _this.data.basicURL + 'xinloupan/add_fav',
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
            title: '收藏成功',
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
    // 加载默认图片 --新房
    errDetails(e) {
      var zhoubian_xinfang = this.data.zhoubian_xinfang;
      var default_img = e.currentTarget.dataset.img;
      var index = e.currentTarget.dataset.index;
      zhoubian_xinfang[index].img = default_img;
      this.setData({
        zhoubian_xinfang
      })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDetail()
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
    //   path: '/sojournxq/sojournxq?id='+this.data.id
    // }
  }
})