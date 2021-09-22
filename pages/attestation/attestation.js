// pages/attestation/attestation.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    tempFilePaths: '',
    hidden: true,
    buthidden: false,
    FilePaths: '../../img/my/btn_zm@2x.png',
    recitePaths: '../../img/my/btn_bm@2x.png',
    front: null,
    back: null,
    // 上传图片显示
    FilePaths: [],
    FilePath: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    });

    try {
      var res = wx.getSystemInfoSync()
      var platform = res.platform
      if (platform == 'ios') {
        util.msg("警告", "IOS系统暂不支持拍照，请从相册选择照片")
        this.setData({
          sourceType: ['album', 'camera']
        })
      }
    } catch (e) { }
  },

  // 提交
  submit() {
    if (this.data.front == 1 && this.data.back == 1) {
      wx.showToast({
        title: "提交成功",
        icon: 'none',
        duration: 2000
      })
      wx.switchTab({
        url: '../index/index',
      })
    } else if (this.data.front != 1) {
      wx.showToast({
        title: "请上传正面身份证",
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: "请上传反面身份证",
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 身份证前面
  frontimage: function () {
    var _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#333",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            wx.chooseImage({
              count: 1, // 默认9 
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有 
              success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
                _this.setData({
                  FilePaths: res.tempFilePaths
                })
                console.log(_this.data.FilePaths);
                var token = wx.getStorageSync('token');
                wx.showToast({
                  icon: "loading",
                  title: "正在上传"
                }),
                  wx.uploadFile({
                    url: _this.data.basicURL + 'yonghu/verify_idcard_front',
                    filePath: res.tempFilePaths[0],
                    name: 'file',
                    header: {
                      "XX-TOKEN": token,
                      "XX-DEVICE-TYPE": "jjr_dian",
                      "Content-Type": "multipart/form-data"
                    },
                    success: function (res) {
                      var data = JSON.parse(res.data)
                      if (data.code == 1) {
                        wx.showToast({
                          title: data.msg,
                          icon: 'none',
                          duration: 2000
                        })
                      } else {
                        wx.showToast({
                          title: "上传成功",
                          icon: 'none',
                          duration: 2000
                        })
                        _this.setData({
                          front: 1
                        })
                      }
                    }
                  })
              }
            })
          } else if (res.tapIndex == 1) {
            wx.chooseImage({
              count: 1, // 默认9 
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有 
              success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
                _this.setData({
                  FilePaths: res.tempFilePaths
                })
                var token = wx.getStorageSync('token');
                wx.showToast({
                  icon: "loading",
                  title: "正在上传"
                }),
                  wx.uploadFile({
                    url: _this.data.basicURL + 'yonghu/verify_idcard_front',
                    filePath: res.tempFilePaths[0],
                    name: 'file',
                    header: {
                      "XX-TOKEN": token,
                      "XX-DEVICE-TYPE": "jjr_dian",
                      "Content-Type": "multipart/form-data"
                    },
                    success: function (res) {
                      var data = JSON.parse(res.data)
                      if (data.code == 1) {
                        wx.showToast({
                          title: data.msg,
                          icon: 'none',
                          duration: 2000
                        })
                      } else {
                        wx.showToast({
                          title: "上传成功",
                          icon: 'none',
                          duration: 2000
                        })
                        _this.setData({
                          front: 1
                        })
                      }
                    }
                  })
              }
            })
          }
        }
      }
    })
  },

  // 身份证背面
  reciteimage: function () {
    var _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#333",
      success(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            wx.chooseImage({
              count: 1, // 默认9 
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
              sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有 
              success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
                _this.setData({
                  FilePath: res.tempFilePaths
                })
                wx.showToast({
                  icon: "loading",
                  title: "正在上传"
                })
                var token = wx.getStorageSync('token');
                wx.uploadFile({
                  url: _this.data.basicURL + 'yonghu/verify_idcard_back',
                  filePath: res.tempFilePaths[0],
                  name: 'file',
                  header: {
                    "XX-TOKEN": token,
                    "XX-DEVICE-TYPE": "jjr_dian",
                    "Content-Type": "multipart/form-data"
                  },
                  success: function (res) {
                    var data = JSON.parse(res.data)
                    if (data.code == 1) {
                      wx.showToast({
                        title: data.msg,
                        icon: 'none',
                        duration: 2000
                      })
                    } else {
                      wx.showToast({
                        title: "上传成功",
                        icon: 'none',
                        duration: 2000
                      })
                      _this.setData({
                        back: 1
                      })
                    }
                  }
                })
              }
            })
          } else if (res.tapIndex == 1) {
            wx.chooseImage({
              count: 1, // 默认9 
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
              sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有 
              success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
                _this.setData({
                  FilePath: res.tempFilePaths
                })
                wx.showToast({
                  icon: "loading",
                  title: "正在上传"
                })
                var token = wx.getStorageSync('token');
                wx.uploadFile({
                  url: _this.data.basicURL + 'yonghu/verify_idcard_back',
                  filePath: res.tempFilePaths[0],
                  name: 'file',
                  header: {
                    "XX-TOKEN": token,
                    "XX-DEVICE-TYPE": "jjr_dian",
                    "Content-Type": "multipart/form-data"
                  },
                  success: function (res) {
                    var data = JSON.parse(res.data)
                    if (data.code == 1) {
                      wx.showToast({
                        title: data.msg,
                        icon: 'none',
                        duration: 2000
                      })
                    } else {
                      wx.showToast({
                        title: "上传成功",
                        icon: 'none',
                        duration: 2000
                      })
                      _this.setData({
                        back: 1
                      })
                    }
                  }
                })
              }
            })
          }
        }
      }
    })

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