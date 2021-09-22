// pages/previewshop/previewshop.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    imgUrl: 'https://www.hfhchsh.com',
    currentTab: 0,
    intro: '',
    dianhua: "",
    avatar: "",
    xingming: "",
    // 分页
    page: 1,
    pageSize: 9,
    ysfyArr: [],
    esfyArr: [],
    meizhuangArr: [],
    lvjuArr: [],
    hasData: true,
    userID: '', //记录当前页面获取的 非分享传递的    
    share: false, // 是否分享页面跳转
    tips: false // 根据分享状态确定是否展示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
    if (options && options.token) {      
      this.setData({
        intro: options.intro,
        dianhua: options.dianhua,
        avatar: options.avatar,
        xingming: options.xingming,
        user_id:options.user_id,
        cid: options.cid,
        token:options.token,
        share: options.share
      })
      if (options.share) {
        this.setData({
          tips: true
        })
      }     
      //this.getShopList()
    }
    // 自适应高度
    var _this = this;

  },
  // 关闭标签 为了分享页面
  closeTips() {
    this.setData({
      tips: false
    })
  },
  //滑动切换
  swiperTab: function (e) {
    if (e.detail.source != 'touch') return
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    this.setData({
      ysfyArr: [],
      esfyArr: [],
      meizhuangArr: [],
      lvjuArr: [],
      page: 1,
      pageSize: 9,
      hasData: true
    })
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.getShopList()
  },
  clickTab: function (e) {
    var that = this;    
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    this.setData({
      ysfyArr: [],
      esfyArr: [],
      meizhuangArr: [],
      lvjuArr: [],
      page: 1,
      pageSize: 9,
      hasData: true
    })
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.getShopList()
  },
  // 获取用户信息
  getUserInfo(callback1,callback2) {
    const _this = this;
    const token = this.data.share ? this.data.token : wx.getStorageSync('token');
    wx.request({
      url: _this.data.basicURL + 'my/info',
      method: "GET",
      header: {
        "XX-TOKEN": token,
        "XX-DEVICE-TYPE": "jjr_mobile"
      },
      success(res) {
        if (res.data.code == 0) {     
          _this.setData({
            userID: res.data.data.uid
          })     
          callback1(res.data.data.uid)
          callback2(res.data.data.uid)          
        } else {
          
        }
      },
      fail() {
        wx.hideLoading()
      }
    })
  },
  // 微店信息
  getShopInfo(user_id) {
    const _this = this;
    const token = this.data.share ? this.data.token : wx.getStorageSync('token');
    wx.request({
      url: _this.data.basicURL + 'weidian/get',
      method: "POST",
      data: {
        user_id: this.data.user_id || this.data.userID || user_id
      },
      header: {
        "XX-TOKEN": token,
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type":"application/x-www-form-urlencoded"
      },
      success(res) {
        _this.setData({
          intro: res.data.data.intro,
          dianhua: res.data.data.dianhua,
          avatar: res.data.data.avatar,
          xingming: res.data.data.xingming
        })       
      },
      complete() {
        
      }
    })
  },

  // 加载默认图片--新房
  errDetails(e) {
    var ysfyArr = this.data.ysfyArr;
    var default_img = e.currentTarget.dataset.img;
    var index = e.currentTarget.dataset.index;
    ysfyArr[index].img = default_img;
    this.setData({
      ysfyArr
    })
  },
  errDetails_esf(e) {
    var esfyArr = this.data.esfyArr;
    var default_img = e.currentTarget.dataset.img;
    var index = e.currentTarget.dataset.index;
    esfyArr[index].img = default_img;
    this.setData({
      esfyArr
    })
  },
  errDetails_mzf(e) {
    var meizhuangArr = this.data.meizhuangArr;
    var default_img = e.currentTarget.dataset.img;
    var index = e.currentTarget.dataset.index;
    meizhuangArr[index].img = default_img;
    this.setData({
      meizhuangArr
    })
  },
  errDetails_lvf(e) {
    var lvjuArr = this.data.lvjuArr;
    var default_img = e.currentTarget.dataset.img;
    var index = e.currentTarget.dataset.index;
    lvjuArr[index].img = default_img;
    this.setData({
      lvjuArr
    })
  },

  // 获取房子列表/api/brokerapp/weidian/get_items?wd_type="+type+"&p="+page。
  getShopList(user_id) {    
    if (!this.data.hasData) return
    const _this = this;
    const token = this.data.share ? this.data.token : wx.getStorageSync('token');
    const path = this.data.share ? 'weidian1/get_items' : 'weidian/get_items'    
    var type = '';
    if (this.data.currentTab == 0) {
      type = "ysfy"
    } else if (this.data.currentTab == 1) {
      type = "esfy"
    } else if (this.data.currentTab == 2) {
      type = "meizhuang"
    } else {
      type = "lvju"
    }
    var data = {
      wd_type: type,
      cid: wx.getStorageSync('cityId') || this.data.cid,
      p: this.data.page,
      user_id: this.data.user_id || this.data.userID || user_id
    }
    wx.request({
      url: _this.data.basicURL + path,
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": token,
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          if (type == 'ysfy') {
            var ysfy_result = res.data.data.data;
            for (let i = 0; i < ysfy_result.length; i++) {
              if (ysfy_result[i].entity.tese) {
                ysfy_result[i].entity.tese = ysfy_result[i].entity.tese.slice(0, 3);
              }
            }
            if (ysfy_result.length < _this.data.pageSize) {
              _this.setData({
                ysfyArr: _this.data.ysfyArr.concat(ysfy_result),
                hasData: false
              })
            } else {
              _this.setData({
                ysfyArr: _this.data.ysfyArr.concat(ysfy_result),
                page: _this.data.page + 1,
                hasData: true
              })
            }
          } else if (type == 'esfy') {
            var esfy_result = res.data.data.data;
            for (let i = 0; i < esfy_result.length; i++) {
              if (esfy_result[i].entity.biaoqian) {
                esfy_result[i].entity.biaoqian = esfy_result[i].entity.biaoqian.slice(0, 3);
              }
            }
            if (esfy_result.length < _this.data.pageSize) {
              _this.setData({
                esfyArr: _this.data.esfyArr.concat(esfy_result),
                hasData: false
              })
            } else {
              _this.setData({
                esfyArr: _this.data.esfyArr.concat(esfy_result),
                page: _this.data.page + 1,
                hasData: true
              })
            }
          } else if (type == 'meizhuang') {
            var mzf_result = res.data.data.data;
            for (let i = 0; i < mzf_result.length; i++) {
              if (mzf_result[i].entity.biaoqian) {
                mzf_result[i].entity.biaoqian = mzf_result[i].entity.biaoqian.slice(0, 3);
              }
            }
            if (mzf_result.length < _this.data.pageSize) {
              _this.setData({
                meizhuangArr: _this.data.meizhuangArr.concat(mzf_result),
                hasData: false
              })
            } else {
              _this.setData({
                meizhuangArr: _this.data.meizhuangArr.concat(mzf_result),
                page: _this.data.page + 1,
                hasData: true
              })
            }
          } else if (type == 'lvju') {
            var lvf_result = res.data.data.data;
            for (let i = 0; i < lvf_result.length; i++) {
              if (lvf_result[i].entity.tese) {
                lvf_result[i].entity.tese = lvf_result[i].entity.tese.slice(0, 3);
              }
            }
            if (lvf_result.length < _this.data.pageSize) {
              _this.setData({
                lvjuArr: _this.data.lvjuArr.concat(lvf_result),
                hasData: false
              })
            } else {
              _this.setData({
                lvjuArr: _this.data.lvjuArr.concat(lvf_result),
                page: _this.data.page + 1,
                hasData: true
              })
            }
          }
        } else {
          wx.showToast({
            title: '' + res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      // fail() {
      //   wx.showToast({
      //     title: '请求出错了',
      //     icon: 'none',
      //     duration: 3000
      //   })
      // },
      complete(){
        wx.hideLoading()
      }
    })
  },

  // scroll-view---滚到底部刷新
  bindscrolltolower() {
    if (this.data.hasData) {
      this.getShopList();
    } else {
      wx.showToast({
        title: '没有数据了',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 新房进入详情页面 
   */
  intoDetailsYsfynew(e){
    let id = e.currentTarget.dataset.id;
    if (this.data.share) {
      // wx.navigateTo({
      //   url: '../sharenewhousexq/sharenewhousexq?id=' + id + '&token=' + this.data.token,
      // })
      wx.navigateToMiniProgram({
        appId:'wx78e67549e62320bf',
        path:'pages/newhousexq/newhousexq?id=' + id + '&jjr_id=' + this.data.user_id,
        envVersion: 'trial'
      })
    } else {
      wx.navigateTo({
        url: '../newhousexq/newhousexq?id=' + id,
      })
    }    
  },
  hrefDetailSecond(e){
    let id = e.currentTarget.dataset.id;
    if (this.data.share) {
      // wx.navigateTo({
      //   url: '../sharesecondhousexq/sharesecondhousexq?id=' + id + '&token=' + this.data.token,
      // })
      wx.navigateToMiniProgram({
        appId:'wx78e67549e62320bf',
        path:'pages/secondhousexq/secondhousexq?id=' + id + '&jjr_id=' + this.data.user_id,
        envVersion: 'trial'
      })
    } else {
      wx.navigateTo({
        url: '../secondhousexq/secondhousexq?id=' + id,
      })
    } 
  },
  hrefDetailMz(e){
    let id = e.currentTarget.dataset.id;
    if (this.data.share) {
      // wx.navigateTo({
      //   url: '../sharebeautyhousexq/sharebeautyhousexq?id=' + id + '&token=' + this.data.token,
      // })
      wx.navigateToMiniProgram({
        appId:'wx78e67549e62320bf',
        path:'pages/beautyhousexq/beautyhousexq?id=' + id + '&jjr_id=' + this.data.user_id,
        envVersion: 'trial'
      })
    } else {
      wx.navigateTo({
        url: '../beautyhousexq/beautyhousexq?id=' + id,
      })
    } 
  },
  intoDetailsYsfyLj(e){
    let id = e.currentTarget.dataset.id;
    if (this.data.share) {
      // wx.navigateTo({
      //   url: '../sharesojournxq/sharesojournxq?id=' + id + '&token=' + this.data.token,
      // })
      wx.navigateToMiniProgram({
        appId:'wx78e67549e62320bf',
        path:'pages/sojournxq/sojournxq?id=' + id + '&jjr_id=' + this.data.user_id,
        envVersion: 'trial'
      })
    } else {
      wx.navigateTo({
        url: '../sojournxq/sojournxq?id=' + id,
      })
    } 
  },  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })    
    if (this.data.share) {            
      this.getShopList()
    } else {      
      this.getUserInfo(this.getShopInfo, this.getShopList);
    }    
  },
  // 联系TA
  contact() {
    wx.makePhoneCall({
      phoneNumber: this.data.dianhua
    })
  },
  // 跳转好房好车客户端
  goApp() {
    wx.navigateToMiniProgram({
      appId:'wx78e67549e62320bf',
      path:'pages/index/index' + '?jjr_id=' + this.data.user_id,
      envVersion: 'trial'
    })
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