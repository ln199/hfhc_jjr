// pages/mycollect/mycollect.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    currentTab: 0,
    scrollHeight: 0,
    cell: 0,
    // 分页
    page: 1,
    pageSize: 9,
    loveDataX: [],
    loveDataE: [],
    loveDataM: [],
    loveDataC: [],
    loveDataL: [],
    hasData: true,
    reqTask: null
  },

  //滑动切换
  swiperTab: function (e, s) {
    if (e.detail.source != 'touch') return
    let curr = e.detail.current
    this.setData({
      currentTab: curr
    });
    var type = ''
    if (curr == 0) {
      type = "ysfy"
    } else if (curr == 1) {
      type = "esfy"
    } else if (curr == 2) {
      type = "meizhuang"
    } else if (curr == 3) {
      type = "zufang"
    } else if (curr == 4) {
      type = "lvju"
    }
    this.setData({
      loveDataX: [],
      loveDataE: [],
      loveDataM: [],
      loveDataC: [],
      loveDataL: [],
      page: 1,
      hasData: true
    })
    if (this.data.reqTask) {
      this.data.reqTask.abort()
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.getLoveList(type);    
  },
  // 点击切换
  clickTab: function (e) {
    var that = this;
    var type = ''
    if (e.target.dataset.current == 0) {
      type = "ysfy"
    } else if (e.target.dataset.current == 1) {
      type = "esfy"
    } else if (e.target.dataset.current == 2) {
      type = "meizhuang"
    } else if (e.target.dataset.current == 3) {
      type = "zufang"
    } else if (e.target.dataset.current == 4) {
      type = "lvju"
    }    
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    this.setData({
      loveDataX: [],
      loveDataE: [],
      loveDataM: [],
      loveDataC: [],
      loveDataL: [],
      page: 1,
      hasData: true
    })
    if (this.data.reqTask) {
      this.data.reqTask.abort()
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.getLoveList(type)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    });

    this.setData({
      slideButtons: [{
        type: 'warn',
        text: '取消收藏',
        extClass: 'test'
      }],
    });

  },

  // 滑动删除
  slideButtonTap(e) {
    const _this = this;
    let type = '', url =_this.data.basicURL + 'fangyuan/noshoucang'
    if (e.target.dataset.type == 1) {
      type = "ysfy"
      url = _this.data.basicURL + 'xinloupan/remove_fav'
    } else if (e.target.dataset.type == 2) {
      type = "esfy"      
    } else if (e.target.dataset.type == 3) {
      type = "meizhuang"
    } else if (e.target.dataset.type == 4) {
      type = "zufang"
    } else if (e.target.dataset.type == 5) {
      type = "lvju"
      url = _this.data.basicURL + 'xinloupan/remove_fav'            
    }
    var data = {
      id: e.currentTarget.dataset.id,
      stype: type
    }    
    wx.request({
      url: url,
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
            title: '取消收藏成功',
            icon: "none",
            duration: 2000
          })
          setTimeout(()=>{
            _this.setData({
              loveDataX: [],
              loveDataE: [],
              loveDataM: [],
              loveDataC: [],
              loveDataL: [],
              page: 1,
              hasData: true
            })
            wx.showLoading({
              title: '加载中',
              mask: true
            })
            try {
              wx.pageScrollTo({
                scrollTop: 0
              }) 
            } catch (error) {
              
            }            
            _this.getLoveList(type);
          },1500)          
        } else {
          wx.showToast({
            title: res.data.msg || '取消收藏失败',
            icon: "none",
            duration: 2000
          })
        }
      }
    })
  },
  // 获取收藏列表
  getLoveList(type) {    
    if (type == undefined) {
      type = "ysfy"
    }    
    const _this = this;
    var data = {
      stype: type,
      p: this.data.page
    }    
    this.data.reqTask = wx.request({
      url: _this.data.basicURL + 'fyfav/my',
      method: "GET",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {        
        if (res.data.code == 0) {
          if (type == 'ysfy') {
            var loveDataX_result = res.data.data.data;
            for (let i = 0; i < loveDataX_result.length; i++) {
              if (loveDataX_result[i].tese.length != 0) {
                loveDataX_result[i].tese = loveDataX_result[i].tese.slice(0, 3);
              }
            }
            if (loveDataX_result.length < _this.data.pageSize) {
              _this.setData({
                loveDataX: _this.data.loveDataX.concat(loveDataX_result),
                hasData: false,
                cellLength: loveDataX_result.length
              })
            } else {
              _this.setData({
                page: _this.data.page + 1,
                hasData: true,
                loveDataX: _this.data.loveDataX.concat(loveDataX),
                cellLength: loveDataX_result.length
              })
            }
          } else if (type == 'esfy') {
            var loveDataE_result = res.data.data.data;
            for (let i = 0; i < loveDataE_result.length; i++) {
              if (loveDataE_result[i].biaoqian.length != 0) {
                loveDataE_result[i].biaoqian = loveDataE_result[i].biaoqian.slice(0, 3);
              }
            }
            if (loveDataE_result.length < _this.data.pageSize) {
              _this.setData({
                loveDataE: _this.data.loveDataE.concat(loveDataE_result),
                hasData: false,
                cellLength: loveDataE_result.length
              })
            } else {
              _this.setData({
                page: _this.data.page + 1,
                hasData: true,
                loveDataE: _this.data.loveDataE.concat(loveDataE_result),
                cellLength: loveDataE_result.length
              })
            }
          } else if (type == 'meizhuang') {
            var loveDataM_result = res.data.data.data;
            for (let i = 0; i < loveDataM_result.length; i++) {
              if (loveDataM_result[i].biaoqian.length != 0) {
                loveDataM_result[i].biaoqian = loveDataM_result[i].biaoqian.slice(0, 3);
              }
            }
            if (loveDataM_result.length < _this.data.pageSize) {
              _this.setData({
                loveDataM: _this.data.loveDataM.concat(loveDataM_result),
                hasData: false,
                cellLength: loveDataM_result.length
              })
            } else {
              _this.setData({
                page: _this.data.page + 1,
                hasData: true,
                loveDataM: _this.data.loveDataM.concat(loveDataM_result),
                cellLength: loveDataM_result.length
              })
            }
          } else if (type == 'zufang') {
            var loveDataC_result = res.data.data.data;
            for (let i = 0; i < loveDataC_result.length; i++) {
              if (loveDataC_result[i].biaoqian.length != 0) {
                loveDataC_result[i].biaoqian = loveDataC_result[i].biaoqian.slice(0, 3);
              }
            }
            if (loveDataC_result.length < _this.data.pageSize) {
              _this.setData({
                loveDataC: _this.data.loveDataC.concat(loveDataC_result),
                hasData: false,
                cellLength: loveDataC_result.length
              })
            } else {
              _this.setData({
                page: _this.data.page + 1,
                hasData: true,
                loveDataC: _this.data.loveDataC.concat(loveDataC_result),
                cellLength: loveDataC_result.length
              })
            }
          } else if (type == 'lvju') {
            var loveDataL_result = res.data.data.data;
            for (let i = 0; i < loveDataL_result.length; i++) {
              if (loveDataL_result[i].biaoqian && loveDataL_result[i].biaoqian.length != 0) {
                loveDataL_result[i].biaoqian = loveDataL_result[i].biaoqian.slice(0, 3);
              }
            }
            if (loveDataL_result.length < _this.data.pageSize) {
              _this.setData({
                loveDataL: _this.data.loveDataL.concat(loveDataL_result),
                hasData: false,
                cellLength: loveDataL_result.length
              })
            } else {
              _this.setData({
                page: _this.data.page + 1,
                hasData: true,
                loveDataL: _this.data.loveDataL.concat(loveDataL_result),
                cellLength: loveDataL_result.length
              })
            }
          }
        }
      },
      complete(){
        wx.hideLoading()
      }
    })
  },

  // 跳转详情
  intoDetails(e) {
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    if (type == 1) {
      wx.navigateTo({
        url: '../newhousexq/newhousexq?id=' + id,
      })
    } else if (type == 2) {
      wx.navigateTo({
        url: '../secondhousexq/secondhousexq?id=' + id,
      })
    } else if (type == 3) {
      wx.navigateTo({
        url: '../beautyhousexq/beautyhousexq?id=' + id,
      })
    } else if (type == 4) {
      wx.navigateTo({
        url: '../rentxq/rentxq?id=' + id,
      })
    } else if (type == 5) {
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
    this.getLoveList();
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
    if (this.data.hasData) {
      this.getLoveList();
    } else {
      wx.showToast({
        title: '没有数据了',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})