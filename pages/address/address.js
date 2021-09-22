var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    city: [],
    mycity: wx.getStorageSync('city')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },
  //城市列表
  cityArr() {
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'pub/city_choice',
      method: "GET",
      success(res) {
        var data = res.data.data;
        var cityArr = [];
        for (let i = 0; i < data.length; i++) {
          data[i].key = data[i].sign.substr(0, 1).toUpperCase();
        }
        // 过滤器热门城市
        function filterHot() {
          var arr = [];
          arr = data.filter(function (element, index, all) {
            return element.name == "上海市" || element.name == "北京市" || element.name == "广州市" ||
              element.name == "深圳市"
          })
          cityArr[0] = {
            title: "热门城市",
            item: arr
          };
        }
        filterHot()
        // 过滤器字母
        function filterEvent(num, title) {
          var arr = []
          arr = data.filter(function (element, index, all) {
            return element.key == title;
          })
          cityArr[num] = {
            title: title,
            item: arr
          };
        }
        filterEvent(1, "A");
        filterEvent(2, "B");
        filterEvent(3, "C");
        filterEvent(4, "D");
        filterEvent(5, "E");
        filterEvent(6, "F");
        filterEvent(7, "G");
        filterEvent(8, "H");
        filterEvent(9, "J");
        filterEvent(10, "K");
        filterEvent(11, "L");
        filterEvent(12, "M");
        filterEvent(13, "N");
        filterEvent(14, "P");
        filterEvent(15, "Q");
        filterEvent(16, "R");
        filterEvent(17, "S");
        filterEvent(18, "T");
        filterEvent(19, "W");
        filterEvent(20, "X");
        filterEvent(21, "Y");
        filterEvent(22, "Z");
        _this.setData({
          city: cityArr
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.cityArr()
  },
  bindtap: function (e) {
    app.globalData.address = e.detail.name;
    wx.navigateBack({
      delta: 1
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