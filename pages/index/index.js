//index.js
const app = getApp()
var bmap = require('../../components/bmap-wx.min.js');
var wxMarkerData = []; //定位成功回调对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size: 14,//宽度即文字大小
    marqueeW: 0,
    moveTimes: 8,//一屏内容滚动时间为8s
    allT: "0s",  // 动画完成需要时间
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    basicAppURL: app.data.basicAppURL,
    imgUrls: [
      '../../img/index/banner.png',
      '../../img/index/banner.png',
      '../../img/index/banner.png'
    ],
    imgUrl: [],// 首页头部轮播
    loupanImgUrl:[],//中间部分楼盘海报
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 800,
    swiperCurrent: 0,
    currentIndex: 1,
    firstList: [],
    secondList: ["b"],
    city: "大连市",//默认大连
    cityId: "",
    cityName: '',
    // 百度地图
    ak: app.data.ak, //填写申请到的ak
    markers: [],
    tips: true,
    showModal: false,
    qhouseArr: [],
    avatar: '',
    name:'',
  },

  //热门查看
  goMore: function (e) {
    let path = e.currentTarget.dataset.path
    wx.navigateTo({
      url: `../${path}/${path}`
    })
  },

  // 替换默认图片
  errDetails(e) {
    var firstList = this.data.firstList;
    var default_img = e.currentTarget.dataset.img;
    var index = e.currentTarget.dataset.index;
    firstList[index].img_url = default_img;
    this.setData({
      firstList
    })
  },
  errDetailsHouseQF(e) {
    var houseArr = this.data.qhouseArr;
    var default_img = e.currentTarget.dataset.img;
    var index = e.currentTarget.dataset.index;
    houseArr[index].img = default_img;
    this.setData({
      qhouseArr
    })
  },
  errDetailsHouse(e) {
    var houseArr = this.data.houseArr;
    var default_img = e.currentTarget.dataset.img;
    var index = e.currentTarget.dataset.index;
    houseArr[index].img = default_img;
    this.setData({
      houseArr
    })

  },
  //行业资讯查看
  goMores: function () {
    wx.navigateTo({
      url: '../information/information',
    })
  },

  // 轮播图
  swiperChange(e) {
    let current = e.detail.current;
    let that = this;
    that.setData({
      swiperCurrent: current,
    })
  },
  // 中间轮播图更多
  loupanMore() {
    wx.navigateTo({
      url: "../loupanlist/loupanlist"
    })
  },
  

  //tab
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex      
      this.setData({
        currentIndex: currentPageIndex,
        houseArr: []
      })
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      this.getHotHouse(currentPageIndex)
    }
  },
  titleClick: function (e) {    
      this.setData({
        currentIndex: e.currentTarget.dataset.idx,
        houseArr: []
      })
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      this.getHotHouse(e.currentTarget.dataset.idx)
  },
  defaultHdl(fns){
    if (fns) {
      fns.forEach((fn) => {
        if (Object.prototype.toString.call(fn) === '[object Function]') {
         fn()
        }
      })
    }
  },
  // 百度地图定位
  baiduMap(fns) {    
    if (wx.getStorageSync('cityId')) {
      this.defaultHdl(fns)
      return      
    }
    var that = this;
    /* 获取定位地理位置 */
    // 新建bmap对象 
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function (data) {
      wx.setStorageSync('cityId', '415');
      that.defaultHdl(fns)
    };
    

    var success = function (data) {      
      wx.request({
        url: that.data.basicURL + 'pub/city_choice',
        method: "GET",
        success(res) {
          let d = res.data.data;
          let flag = false, real_code = ''
          d.forEach((item) => {
            if (item.city_code == data.originalData.result.cityCode) {
              flag = true    
              real_code = item.id          
            }            
          })
          if (flag) {
            //返回数据内，已经包含经纬度
            //使用wxMarkerData获取数据
            wxMarkerData = data.wxMarkerData;
            //把所有数据放在初始化data内
            that.setData({
              markers: wxMarkerData,
              address: wxMarkerData[0].address,
              city: data.originalData.result.addressComponent.city
            });
            wx.setStorageSync('city', data.originalData.result.addressComponent.city);
            wx.setStorageSync('nowAdress', that.data.address);
            wx.setStorageSync('cityId', real_code);            
          } else {
            wx.setStorageSync('cityId', '415');            
          }
          that.defaultHdl(fns)
        },
        fail() {
          wx.setStorageSync('cityId', '415');
          that.defaultHdl(fns)
        }
      })           
    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
    })
    this.baiduMap([this.getSwiper]);
    if (wx.getStorageSync('user_info')) {
      this.setData({
        avatar: wx.getStorageSync('user_info').avatar_url,
        name:wx.getStorageSync('user_info').ygmingcheng,
      })
     }
    
  },
  // 城市选择
  citySelect() {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  // 跳转到详情页面
  intoDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../information_xq/information_xq?id=' + id,
    })
  },
  // 跳转到二手房详情
  hrefDetails(e) {
    let path = e.currentTarget.dataset.path
    wx.navigateTo({
      url: `../${path}/${path}?id=${e.currentTarget.dataset.id}`,
    })
  },
  // 首页精选二手房源
  getHotHouse(index) {
    const _this = this;
    console.log(index)
    let catalog = ''
    if (index == '1') {
      catalog = 'xinloupan/search'
    } else if (index == '2') {
      catalog = 'ershoufang/search'
    } else if (index == '3') {
      catalog = 'meizhuangfang/search'
    } else {
      catalog = 'chuzufang/search'      
    }
    var data = {
      cid: wx.getStorageSync('cityId'),
      p: 1,
      tuijian: 1,
      tjbiaoqian:1,
      limit: 10
    }
    wx.request({
      url: _this.data.basicURL + catalog,
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_mobile"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            houseArr: res.data.data.data
          })          
        }
        wx.hideLoading()
      },
      fail() {
        wx.hideLoading()
      }
    })
  },
  // 首页轮播跳转至广告页面
  advertising(e) {
   
    var action = e.currentTarget.dataset.action;
    var newAction = JSON.parse(action.replace(/'/g, '"'));
    var href = encodeURIComponent(newAction.val);
    wx.navigateTo({
      url: '../advertising/advertising?href=' + href,
    })
  },
 
  // 首页轮播
  getSwiper() {
    const _this = this;
    var data = {
      cid: wx.getStorageSync('cityId')
    }
    wx.request({
      url: _this.data.basicURL + '/pub/front_ads',
      method: "GET",
      data: data,
      success(res) {
        _this.setData({
          imgUrl: res.data.data
        })
      }
    })
  },
  //楼房海报
  loufangSwiper() {
    let _this = this;
    wx.request({
      url: _this.data.basicAppURL + '/guanli/posterlist',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_mobile"
      },
      success(res) {
        if (res.data.data && res.data.data.length > 4) {
          _this.setData({
            loupanImgUrl: res.data.data.slice(0, 4)
          })
        } else {
          _this.setData({
            loupanImgUrl: []
          })
         }
        }
      })
  },
  // 首页行业资讯精选
  getInformation() {
    var _this = this;
    var data = {
      cid: wx.getStorageSync('cityId'),
      p:0
    }
    wx.request({
      url: _this.data.basicURL + 'front/hfzixun',
      method: 'GET',
      data: data,
      success(res) {
        _this.setData({
          zixun: res.data.data
        })
      }
    })
  },
  // 资讯更多
  zixunMore() {
    wx.navigateTo({
      url: "../indexinformation/indexinformation"
    })
  },
  // 头条信息
  // getHouseNews() {
  //   const _this = this;
  //   var data = {
  //     cid: wx.getStorageSync('cityId')
  //   }
  //   wx.request({
  //     url: _this.data.basicURL + 'front/hftoutiao',
  //     method: "GET",
  //     data: data,
  //     header: {
  //       "XX-TOKEN": wx.getStorageSync('token'),
  //       "XX-DEVICE-TYPE": "jjr_dian"
  //     },
  //     success(res) {
  //       if (res.data.code == 0) {
         
  //         var text = "";
  //         for (let i = 0; i < res.data.data.length; i++) {
  //           text += res.data.data[i].title + " ";
  //         }
  //         console.log(text);
  //         var screenW = wx.getSystemInfoSync().windowWidth;//获取屏幕宽度
  //         var contentW = text.length * _this.data.size;//获取文本宽度（大概宽度）
  //         var allT = (contentW / screenW) * _this.data.moveTimes;//文字很长时计算有几屏
  //         allT = allT < 10 ? 10 : allT;//不够一平-----最小滚动一平时间
  //         _this.setData({
  //           textNews: text,
  //           marqueeW: -contentW + "px",
  //           allT: allT + "s"
  //         })
  //       }
  //     }
  //   })
  // },
  getHouseNews() {
    const _this = this;
    var data = {
      cid: wx.getStorageSync('cityId')
    }
    wx.request({
      url: _this.data.basicURL + 'front/hftoutiao',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          var text = "";
          for (let i = 0; i < res.data.data.length; i++) {
            text += res.data.data[i].title + " ";
          }
          var screenW = wx.getSystemInfoSync().windowWidth;//获取屏幕宽度
          var contentW = text.length * _this.data.size;//获取文本宽度（大概宽度）
          var allT = (contentW / screenW) * _this.data.moveTimes;//文字很长时计算有几屏
          allT = allT < 10 ? 10 : allT;//不够一平-----最小滚动一平时间
          _this.setData({
            textNews: text,
            marqueeW: -contentW + "px",
            allT: allT + "s"
          })
        }
      }
    })
  },
  // 查询抢客源
  queryCus() {
    const _this = this;
    var data = {
      cid: wx.getStorageSync('cityId'),
      id:5,
      p: 1,
      limit: 10
    }
    wx.request({
      url: _this.data.basicAppURL + 'qkeyuan/front',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        console.log(res.data.data.data)
        if (res.data.code == 0) {
          // _this.setData({
          //   qhouseArr: res.data.data.data
          // })
        }
      }
    })
  },
  // 查询抢房源
  queryGC() {    
    const _this = this;
    var data = {
      cid: wx.getStorageSync('cityId'),
      id:5,
      p: 1,
      limit: 10
    }
    wx.request({
      url: _this.data.basicAppURL + 'qfangyuan/qiang',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        console.log(res.data.data.data)
        if (res.data.code == 0) {
          _this.setData({
            qhouseArr: res.data.data.data
          })
        }
      }
    })
  },
  // 下载APP
  launchAppError(e) {
    console.log(e);

    wx.showToast({
      title: '请先下载APP',
      icon: "none",
      duration: 2000
    })
    setTimeout(() => {
      wx.navigateTo({
        url: '../download/download',
      })
    }, 1500)

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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.baiduMap([this.getHotHouse(1), this.getHouseNews])
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {    
    this.setData({
      cityId: wx.getStorageSync('cityId'),
      cityName: wx.getStorageSync('cityName')
    })    
    this.baiduMap([this.getInformation, this.getSwiper,this.loufangSwiper,this.getHouseNews,this.getHotHouse(1)])
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