// pages/rentalbooks/rentalbooks.js
const app = getApp();
const qiniuUploader = require("../../utils/qiniuUploader");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicAppURL: app.data.basicAppURL,
    basicImg: app.data.basicImg,
    storgeData: {},
    storgeDataOther: {},
    dataArr: [],
    arrayqk: [], //房屋类型
    indexqk: 0,
    arrayjg: [],
    indexjg: 0,
    arrayqc: [], //等级
    indexqc: 0,
    arraydy: [], //产权证
    indexdy: 0,
    arrayly: [], //不动产证
    indexly: 0,
    arraytd: [], //土地证
    indextd: 0,
    arraycx: [], //地铁站
    indexcx: 0,
    arraycq: [], //产权性质
    indexcq: 0,
    date: '2020-01-01'
  },

  //房屋类型
  bindPickerChangeqk: function (e) {
    this.setData({
      indexqk: e.detail.value
    })
  },
  bindPickerChangejg: function (e) {
    this.setData({
      indexjg: e.detail.value
    })
  },
  //等级
  bindPickerChangeqc: function (e) {
    this.setData({
      indexqc: e.detail.value
    })
  },

  //产权证
  bindPickerChangedy: function (e) {
    this.setData({
      indexdy: e.detail.value
    })
  },

  //不动产证
  bindPickerChangely: function (e) {
    this.setData({
      indexly: e.detail.value
    })
  },

  //土地证
  bindPickerChangetd: function (e) {
    this.setData({
      indextd: e.detail.value
    })
  },

  //地铁站
  bindPickerChangecx: function (e) {
    this.setData({
      indexcx: e.detail.value
    })
  },

  //产证日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  //产权性质
  bindPickerChangecq: function (e) {
    this.setData({
      indexcq: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      storgeData: wx.getStorageSync('data'),
      storgeDataOther: wx.getStorageSync('dataOther')
    })
    let fangyuan = wx.getStorageSync('edithousecheckin_fangyuan')
    let xiangqing = wx.getStorageSync('edithousecheckin_xiangqing')
    this.setData({
      id: options.id,
      fangyuan: fangyuan,
      xiangqing: xiangqing,
      indexqk: Number(fangyuan.fwleixing) - 1,//房屋类型
      indexjg: Number(fangyuan.jiegou) - 1, //建筑结构
      indexqc: Number(fangyuan.fydengji) - 1, //等级
      indexdy: Number(fangyuan.chanquanzheng) - 1, // 产权证
      indexly: Number(fangyuan.budongchanzheng) - 1, // 不动产证
      indextd: Number(fangyuan.tudizheng) - 1,// 土地证
      indexcx_id: Number(fangyuan.ditiezhan),// 地铁站id 实际索引需要匹配
      indexcq:  Number(fangyuan.cqxingzhi) - 1, //产权性质 
      date: fangyuan.czriqi //产证日期
    })
  },

  // 获取表单配置项
  getOptions() {
    const _this = this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: _this.data.basicURL + 'chuzufang/options',
      method: "GET",
      header: {
        "XX-DEVICE-TYPE": "jjr_dian",
        "XX-TOKEN": token
      },
      success(res) {
        _this.setData({
          arrayqk: res.data.data.fwleixing,
          arrayjg: res.data.data.jiegou,
          arrayqc: res.data.data.fydengji,
          arraycq: res.data.data.chanquan,
          arraydy: res.data.data.iszheng,
          arraytd: res.data.data.iszheng,
          arrayly: res.data.data.iszheng,
          arraycx: res.data.data.ditiezhan
        })
        // 循环获取id 匹配索引
        let dtz = res.data.data.ditiezhan || []        
        if (dtz) {
          for (let i = 0;i < dtz.length;i += 1) {
            if (dtz[i].id == _this.data.indexcx_id) {
              _this.setData({
                indexcx: i
              })
              break;
            }
          }
        }  
      }
    })
  },
  // 下一步
  nextStep(e) {
    var v = e.detail.value;
    var storgeData = this.data.storgeData;
    // 获取图片地址和视频地址
    var imgs = storgeData.imgs;
    var video = storgeData.chooesVideo;
    var storgeDataOther = this.data.storgeDataOther;
    // 判断true|false来传值1|0
    function judge(parameter) {
      var num = null
      if (parameter == true) {
        num = 1
      } else {
        num = 0
      }
      return num;
    }
    var ally = wx.getStorageSync('ally');
    var data = {
      fyid: this.data.id,
      lianmenggx: this.data.fangyuan.lianmenggx,
      waiwangtb: this.data.fangyuan.waiwangtb,
      leixing: 2,
      lianmenggx_yongjin: storgeData.lianmenggx_yongjin,
      xiaoqu: storgeData.xiaoquId,
      yezhu: storgeData.userName,
      yezhulx: storgeData.sex,
      yezhudianhua: storgeData.mobile,
      personcard: 2,
      personcardno: storgeData.idNUm,
      fybiaoti: storgeData.title,
      zhuangtai: storgeData.state,
      yongtu: storgeData.use,
      zujia: storgeData.rent,
      chuzudj: storgeData.minRent,
      chuzuyajin: storgeData.deposit,
      chuzuzhouqi: storgeData.cycle,
      chuzufs: storgeData.seeWay,
      fukuanfs: storgeData.payWay,
      zuodong: storgeDataOther.building,
      danyuan: storgeDataOther.unit,
      fanghao: storgeDataOther.num,
      louceng: storgeDataOther.inStep,
      zlouceng: storgeDataOther.totalStep,
      ti: storgeDataOther.stepNum,
      hu: storgeDataOther.stepUser,
      shi: storgeDataOther.houseRoom,
      ting: storgeDataOther.houseHall,
      wei: storgeDataOther.houseToilet,
      yangtai: storgeDataOther.houseBalcony,
      mianji: storgeDataOther.areaHouse,
      symianji: storgeDataOther.areaCover,
      chaoxiang: storgeDataOther.direction,
      zhuangxiu: storgeDataOther.decorate,
      xianzhuang: storgeDataOther.shape,
      laiyuan: storgeDataOther.source,
      peitao: storgeDataOther.config,
      fybiaoqian: storgeDataOther.label,
      fwleixing: this.data.arrayqk[this.data.indexqk].lxid,
      jiegou: this.data.arrayjg[this.data.indexjg].lxid,
      niandai: v.years,
      fydengji: this.data.arrayqc[this.data.indexqc].lxid,
      ditiezhan: this.data.arraycx[this.data.indexcx].id,
      wushui: judge(v.noTax),
      geshui: judge(v.personalTax),
      zengshui: judge(v.addedTax),
      beizhu: v.note
    };
    const _this = this;
    wx.request({
      url: _this.data.basicAppURL + 'fangyuan/update',
      method: "POST",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {
          console.log(res);
          _this.setData({
            bianhao: _this.data.fangyuan.bianhao,
            id: res.data.data.id
          })
          _this.uploadImg();
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

  // 上传图片
  uploadImg() {
    wx.showLoading({
      title: '提交中',
    })
    var storgeData = this.data.storgeData;
    // 获取图片地址
    var imgs = storgeData.imgs;
    var video = storgeData.chooesVideo;

    // 处理现有图片 添加时候的图片集合
    let oldImgs = this.data.xiangqing.img
    let files = [],deleteFiles = [], flag = true
    for (let i = 0;i < oldImgs.length;i += 1) {
      for (let j = 0;j < imgs.length;j += 1) {
        // 路径相同说明没有删除 但是添加的时候不需要上送已经存在的图片
        if (imgs[j] == oldImgs[i].img_path) {
          imgs.splice(j, 1)
          flag = false
          break
        }        
      }
      if (flag) {
        deleteFiles.push(oldImgs[i])
      }
      flag = true
    }
    files = imgs

    var uploads = [];
    const _this = this;
    for (let i = 0; i < files.length; i++) {
      uploads[i] = new Promise((resolve, reject) => {
        wx.uploadFile({
          url: _this.data.basicURL + 'fangyuanimg/add',
          filePath: files[i],
          name: 'file',
          formData: {
            fybh: _this.data.bianhao
          },
          header: {
            "XX-TOKEN": wx.getStorageSync('token'),
            "XX-DEVICE-TYPE": "jjr_dian",
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            resolve(res)
          }
        })
      })
    }
    // 删除图片
    deleteFiles.forEach((item) => {
      uploads.push(
        new Promise((resolve, reject) => {
          wx.request({
            url: _this.data.basicAppURL + 'fangyuan/delphoto',
            method: "POST",
            data: {
              fybh: _this.data.bianhao,
              id: item.id
            },
            header: {
              "XX-TOKEN": wx.getStorageSync('token'),
              "XX-DEVICE-TYPE": "jjr_dian",
              "content-type": "application/x-www-form-urlencoded"
            },
            success(res) {
              resolve(res)
            }
          })
        })
      )
    })

    // 户型图 处理
    var imgsHX = storgeData.imgsHX;//更新图片路径数组    
    // 处理现有图片 添加时候的图片集合
    let oldImgsHX = this.data.xiangqing.hx_img
    let filesHX = [],deleteFilesHX = [], flagHX = true
    for (let i = 0;i < oldImgsHX.length;i += 1) {
      for (let j = 0;j < imgsHX.length;j += 1) {
        // 路径相同说明没有删除 但是添加的时候不需要上送已经存在的图片
        if (imgsHX[j] == oldImgsHX[i].img_path) {
          imgsHX.splice(j, 1)
          flagHX = false
          break
        }        
      }
      if (flagHX) {
        deleteFilesHX.push(oldImgsHX[i])
      }
      flagHX = true
    }
    filesHX = imgsHX
    let j = uploads.length
    for (let i = 0;i < imgsHX.length;i += 1) {
      uploads[j + i] = new Promise((resolve, reject) => {
        wx.uploadFile({
          url: _this.data.basicAppURL + 'fangyuanimg/add_hx',
          filePath: filesHX[i],
          name: 'file',
          formData: {
            fybh: _this.data.bianhao
          },
          header: {
            "XX-TOKEN": wx.getStorageSync('token'),
            "XX-DEVICE-TYPE": "jjr_dian",
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            resolve(res)
          }
        })
      })
    }
    // 删除图片 户型图
    deleteFilesHX.forEach((item) => {
      uploads.push(
        new Promise((resolve, reject) => {
          wx.request({
            url: _this.data.basicAppURL + 'fangyuan/delhxphoto',
            method: "POST",
            data: {
              fybh: _this.data.bianhao,
              id: item.id
            },
            header: {
              "XX-TOKEN": wx.getStorageSync('token'),
              "XX-DEVICE-TYPE": "jjr_dian",
              "content-type": "application/x-www-form-urlencoded"
            },
            success(res) {
              resolve(res)
            }
          })
        })
      )
    })

    Promise.all(uploads).then((result) => {
      if (video && video != _this.data.fangyuan.shipin_url) {
        wx.request({
          url: _this.data.basicURL + 'fangyuan/get_shipin_uploadtoken',
          method: "GET",
          data: {
            id: _this.data.id
          },
          header: {
            "XX-TOKEN": wx.getStorageSync('token'),
            "XX-DEVICE-TYPE": "jjr_dian",
          },
          success(res) {
            _this.setData({
              qiNiuToken: res.data.data
            })
            qiniuUploader.upload(video, res => {
              _this.setData({
                tempFilePaths: video
              })
              wx.request({
                url: _this.data.basicURL + 'fyneirong/editshipin',
                method: "POST",
                data: {
                  shipin_url: res.fileURL,
                  id: _this.data.id
                },
                header: {
                  "XX-TOKEN": wx.getStorageSync('token'),
                  "XX-DEVICE-TYPE": "jjr_dian",
                  "content-type": "application/x-www-form-urlencoded"
                },
                success(res) {
                  if (res.data.code == 0) {
                    wx.showToast({
                      title: '发布成功',
                      icon: "none",
                      duration: 2000
                    })
                    setTimeout(() => {
                      // wx.reLaunch({
                      //   url: '../rentfylists/rentfylists',
                      // })
                      wx.navigateBack({
                        delta: 5
                      })
                      wx.hideLoading()
                    }, 1500)
                    wx.removeStorageSync('data');
                    wx.removeStorageSync('dataOther');
                  } else {
                    wx.showToast({
                      title: res.data.msg,
                      icon: "none",
                      duration: 2000
                    })
                    wx.removeStorageSync('data');
                    wx.removeStorageSync('dataOther');
                  }
                }
              })

            },
              (error) => {
              }, {
              uploadURL: 'https://up-z2.qiniup.com',
              domain: 'http://qiniu.lingrkj.cn',
              uptoken: _this.data.qiNiuToken,
              region: 'SCN',
            })

          },
        })
      } else {
        wx.showToast({
          title: '发布成功',
          icon: 'none',
          duration: 2000
        })
        wx.removeStorageSync('data');
        wx.removeStorageSync('dataOther');
        setTimeout(() => {
          // wx.reLaunch({
          //   url: '../rentfylists/rentfylists',
          // })
          wx.navigateBack({
            delta: 5
          })
          wx.hideLoading()
        }, 1500)
      }

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getOptions();
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