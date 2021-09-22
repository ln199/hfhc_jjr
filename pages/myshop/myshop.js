// pages/myshop/myshop.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicAppURL:app.data.basicAppURL,
    basicImg:app.data.basicImg,
    visitors: [],
    total_access:"",
    total_share:"",
    current_month_access:"" ,
    current_month_share: "",
    intro:'',
    dianhua:'',
    avatar:'',
    xingming:'',
    ysfyArr:[],
    hasData: true,
    pageSize: 9,
    page:1,
    user_id: '',
    avatar: '',
    name:"",
    mobile:"",
    company: "",
    aboutShopList: [
      {
        imgYrl: '',
        itemName: '微店预览',
        url:''
      },
      {},
      {
        imgYrl: '',
        itemName: '微店分享',
        url:''
      },
      {},
      {
        imgYrl: '',
        itemName: '微店管理',
        url:''
      }
    ]
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
            user_id: res.data.data.uid,
            avatar: res.data.data.avatar_url,
            name:res.data.data.ygmingcheng,
            mobile: res.data.data.dianhua,
            company:res.data.data.gongsi,
          })
          callback(res.data.data.uid)          
        }
      },
      fail() {
        wx.hideLoading()
      }
    })
  },
  // 获取微店信息
  getShopData(user_id) {
    const _this = this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: _this.data.basicAppURL + 'weidian/get',
      method: "POST",
      data: {
        user_id,
        token:wx.getStorageSync('token')
      },
      header: {
        "XX-TOKEN": token,
        "XX-DEVICE-TYPE": "jjr_mobile",
        "content-type":"application/x-www-form-urlencoded"
      },
      success(res) {
        _this.setData({
          intro: res.data.data.intro,
          dianhua: res.data.data.dianhua,
          avatar: res.data.data.avatar || _this.data.avatar,
          xingming: res.data.data.xingming
        })
        _this.setData({
          weidainObj: res.data.data,
          total_access: res.data.data.total_access,
          total_share: res.data.data.total_share,
          current_month_access: res.data.data.current_month_access,
          current_month_share: res.data.data.current_month_share,
          visitors: res.data.data.vistor
        })
      },
      complete(){
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.getUserInfo(this.getShopData)
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
    const token = wx.getStorageSync('token');
    const cid =  wx.getStorageSync('cityId');
    const share = true
    return {
      title: '好房好车',
      desc: '好房好车小程序',
      path: '/pages/previewshop/previewshop'+"?intro="+this.data.intro +'&dianhua='+this.data.dianhua+'&avatar='+this.data.avatar+"&xingming="+this.data.xingming+ '&user_id=' + this.data.user_id +'&token='+token+'&cid='+cid+'&share='+share,
      imageUrl:'../../img/public/cover.jpg'
    }
  }
})