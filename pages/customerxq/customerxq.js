// pages/customerxq/customerxq.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    basicAppURL: app.data.basicAppURL,
    user_id: '',
    mmzl: 3,
  },
  // 报备 
  baobei() {    
    wx.navigateTo({
      url: "../report/report?dianhua=" + this.data.ky.dianhua + "&&khxingming=" + this.data.ky.khxingming + "&into_type=2"
    })
  },
  //写跟进
  addgen: function () {
    wx.navigateTo({
      url: "../addfollow/addfollow?id=" + this.data.id
    })
  },

  //客源-客户信息编辑
  edit: function (e) {
    wx.navigateTo({
      url: "../customerxx/customerxx?id=" + e.currentTarget.dataset.id
    })
  },
  editIntention(e) {    
    wx.setStorageSync('buyIntentionUpdate', this.data.kyJson)
    wx.navigateTo({
      url: "../buyIntentionUpdate/buyIntentionUpdate?id=" + e.currentTarget.dataset.id+"&dianhua=" +e.currentTarget.dataset.dianhua+"&mmzl="+this.data.mmzl
    })
  },
  // 匹配房源
  matchHouse() {
    const _this = this;
    var data = {
      mmzl: this.data.mmzl,
      chaoxiang: this.data.chaoxiang,
      include_meizhuang: 1
    }
    wx.request({
      url: _this.data.basicURL + 'keyuan/ppfy',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        var housing = res.data.data;
        var house
        if (housing) {
          house = JSON.stringify(housing);
        } else {
          house = []
        }       
        wx.navigateTo({
          url: '../secondhouse/secondhouse?housing='+house,
        })
      }
    })
  },
  //报备客源
  report: function () {
    wx.navigateTo({
      url: "../reportcustomer/reportcustomer"
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
      private: options.private,
      user_id: options.user_id,
      mmzl: options.mmzl
    })    
  },

  // //客户详情 private =0
  // getDetail() {
  //   const _this = this;
  //   var data = {
  //     id: this.data.id
  //   }
  //   wx.request({
  //     url: _this.data.basicURL + 'keyuan/content',
  //     method: "GET",
  //     data: data,
  //     header: {
  //       "XX-TOKEN": wx.getStorageSync('token'),
  //       "XX-DEVICE-TYPE": "jjr_dian"
  //     },
  //     success(res) {
  //       if (res.data.code == 0) {
  //         var chaoxiang;
  //         chaoxiang = res.data.data.keyuan.chaoxiang
  //         _this.setData({
  //           ky: res.data.data.keyuan,
  //           chaoxiang: chaoxiang
  //         })
  //       }
  //     }
  //   })
  // },
  // //客户详情 private =1
  // getDetails() {
  //   const _this = this;
  //   var data = {
  //     id: this.data.id
  //   }
  //   wx.request({
  //     url: _this.data.basicURL + 'keyuan/content_private',
  //     method: "GET",
  //     data: data,
  //     header: {
  //       "XX-TOKEN": wx.getStorageSync('token'),
  //       "XX-DEVICE-TYPE": "jjr_dian"
  //     },
  //     success(res) {
  //       if (res.data.code == 0) {
  //         _this.setData({
  //           ky: res.data.data.keyuan,
  //           chaoxiang: res.data.data.keyuan.chaoxiang
  //         })
  //       }
  //     }
  //   })
  // },
  // 跟进记录
  getRecordList() {
    const _this = this;
    var data = {
      id: this.data.id,
      is_ajax: 1
    }
    wx.request({
      url: _this.data.basicURL + 'keyuan/kygenjin',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          var recordArr = res.data.data.kygenjin;
          if (recordArr.length != 0) {
            recordArr[recordArr.length - 1].state = 1;
            _this.setData({
              recordArr: recordArr.reverse()
            })
          }
        }
      }
    })
  },
  //http://www.hfhchsh.com/api/brokerapp/keyuan/ppky_content
  getDetail(cb) {
    const _this = this;
    var data = {
      kyid: this.data.id,
      uid: this.data.user_id,
    }
    wx.request({
      url: _this.data.basicAppURL + 'keyuan/ppky_content',
      method: "POST",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {
          var chaoxiang;
          chaoxiang = res.data.data.keyuan.chaoxiang
          _this.setData({
            ky: res.data.data.keyuan,
            kyJson: JSON.stringify(res.data.data.keyuan),
            chaoxiang: chaoxiang
          })
          cb(res.data.data.keyuan.xqxiaoqu)
        }
      }
    })
  },
  // 获取小区
  getCommunity(index) {
    const _this = this;
    var data = {
      mmzl: this.data.mmzl
    }
    wx.request({
      url: _this.data.basicURL + 'ajax/get_xiaoqu_txt',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        try {
          _this.setData({
            yxxiaoqu: res.data.data[index-1].xiaoqum
          }) 
        } catch (error) {
          _this.setData({
            yxxiaoqu: '--'
          }) 
        }        
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 不区分公还是私
    // if (this.data.private == 0) {
    //   this.getDetail();
    // } else {
    //   this.getDetails();
    // }
    this.getDetail(this.getCommunity);
    this.getRecordList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {    
    this.getDetail(this.getCommunity);
    this.getRecordList()
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