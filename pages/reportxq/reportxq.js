// pages/reportxq/reportxq.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
  },

  // 二维码图片点击放大 
  previewImgs: function (e) {
    var src = e.currentTarget.dataset.src;
    var imgList = [e.currentTarget.dataset.effect_pic];
    wx.previewImage({
      current: src,
      urls: imgList
    })
  },

  // 到场图片放大
  previewImg: function (e) {
    let index = e.currentTarget.dataset.i;
    let imgArr = e.currentTarget.dataset.imgs;
    let imgs = []
    imgArr.forEach((obj) => {
      imgs.push(obj.vistor_imgs)
    });
    wx.previewImage({
      current: imgs[index],     //当前图片地址
      urls: imgs,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //报备
  report: function () {
    wx.navigateTo({
      url: "../report/report"
    })
  },
  queryDetail(id) {
    let self = this
    wx.request({
      url: this.data.basicURL + 'my/getdetail',
      method: "POST",
      data: {
        'baobei_id': id,
      },
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type":"application/x-www-form-urlencoded"
      },
      success(res) {        
        if (res.data.code == 0) {
          let data = res.data.data[0]
          let map = {
            '0': '报备申请',
            '1': '已报备',
            '2': '无效',
            '3': '已到访',
            '4': '报备过期',// 搜索时暂无
            '5': '到场过期',// 搜索时暂无
            '6': '已成交',
            '7': '报备无效',// 搜索时暂无
            '8': '已结佣'
          }
          let zhuchang_names = ''
          data.zhuchang.forEach(obj => {
            zhuchang_names += obj.username
            zhuchang_names += ' '
          })
          self.setData({      
            qrcode: decodeURIComponent(data.qrcode),
            report_id: data.id,
            status_d: map[data.status],
            visitors: data.visitors,
            ysfy_id: data.ysfy_id,
            xmbiaoti: data.xmbiaoti,
            note: data.note,
            daochang_tupian: data.visitor_images,
            // kehu_desc: data.kehu_desc,
            visit_time: data.visit_time,
            zhuchang_names
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon:"none",
            duration:2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //   0-报备申请、            报备申请
  //   1-报备成功、            已报备
  //   2-报备无效（驻场）、	    无效
  //   3-客户到场、            已到访 
  //   4-报备过期、
  //   5-到场过期、
  //   6-成交、                已成交
  //   7-报备无效（经纪人）、
  //   8-已结佣                已结佣
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })        
    this.queryDetail(options.report_id)    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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