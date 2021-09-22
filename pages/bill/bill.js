// pages/bill/bill.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      id: options.id
    })
  },
  // 获取楼盘海报详情
  getHouseDetail() {
    const _this = this;
    var data = {
      ysid: this.data.id
    }
    wx.request({
      url: _this.data.basicURL + 'xinloupan/poster',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            postersArr: res.data.data
          })
        }
      }
    })
  },
  // 下载图片
  downImg(e) {
    var img_url = e.currentTarget.dataset.url;
    wx.showLoading({
      title: '保存中,请稍等',
    })
    wx.downloadFile({
      url: img_url, //仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.hideLoading();
              wx.showToast({
                title: '保存成功',
                icon:'none',
                duration:2000
              })
            }
          })
        }
      }
    })
  },
  // 复制文本
  copyText(e) {
    var text = e.currentTarget.dataset.text;
    wx.setClipboardData({
      data: text,
      success (res) {
        wx.getClipboardData({
          success (res) {
          
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getHouseDetail()
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