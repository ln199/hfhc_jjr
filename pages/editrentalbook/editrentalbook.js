// pages/rentalbook/rentalbook.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicAppURL: app.data.basicAppURL,    
    basicImg: app.data.basicImg,
    classes_array: [{
      name: '男',
      checked: true,
      value: '0'
    }, {
      name: '女',
      checked: false,
      value: '1'
    }],
    items: 0,
    array: ['本人'], //手机归属
    arrayt: [], //状态
    arrayj: [], //用途
    arrayfk: [], //付款方式
    arraykf: [], //出租方式
    arrayzq: [], //出租周期
    index: 0,
    indext: 0,
    indexj: 0,
    indexfk: 0,
    indexkf: 0,
    indexzq: 0,
    imgs: [],
    imgsHX: [],
    chooesVideo: '',
    ally: wx.getStorageSync('ally')
  },
  // 单选框
  radioChange(e) {
    this.setData({
      items: e.detail.value
    })
  },
  // 手机归属
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 用户名
  username(e) {
    this.setData({
      user: e.detail.value
    })
  },
  // 手机
  mobile(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 身份证
  idnum(e) {
    this.setData({
      idnumber: e.detail.value
    })
  },
  // 房源标题
  titles(e) {
    this.setData({
      titles: e.detail.value
    })
  },
  // 小区
  goVillage: function () {    
    wx.navigateTo({
      url: "../choosevillage/choosevillage?type=2"
    })
  },
  // 房屋状态
  bindPickerChanget(e) {
    this.setData({
      indext: e.detail.value,
    })
  },
  // 用途
  bindPickerChangej(e) {
    this.setData({
      indexj: e.detail.value
    })
  },
  // 出租周期
  bindPickerChangezq(e) {
    this.setData({
      indexzq: e.detail.value
    })
  },
  // 付款方式
  bindPickerChangefk(e) {
    this.setData({
      indexfk: e.detail.value
    })
  },
  // 出租方式
  bindPickerChangekf(e) {
    this.setData({
      indexkf: e.detail.value
    })
  },
  // 上传图片
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        that.setData({
          imgs: imgs
        });
      }
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgs = this.data.imgs;
    wx.previewImage({
      current: imgs[index],
      urls: imgs
    })
  },
  //户型图片
  chooseImgHX: function (e) {
    var that = this;
    var imgs = this.data.imgsHX;
    if (imgs.length >= 2) {      
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgsHX;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 2) {
            that.setData({
              imgsHX: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        that.setData({
          imgsHX: imgs
        });
      }
    });
  },
  // 删除图片 户型
  deleteImgHX: function (e) {
    var imgs = this.data.imgsHX;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgsHX: imgs
    });
  },
  // 预览图片 户型
  previewImgHX: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgs = this.data.imgsHX;
    wx.previewImage({
      current: imgs[index],
      urls: imgs
    })
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

  // 获取配置项
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
          arrayt: res.data.data.zhuangtai,
          arrayj: res.data.data.yongtu,
          arraykf: res.data.data.fychuzufs,//fychuzufs
          arrayfk: res.data.data.fukuan,
          arrayzq: res.data.data.fychuzuzhouqi
        })
      }
    })
  },
  // 下一步
  nextStep(e) {
    var value = e.detail.value;
    var fenyong = value.cent
    if (this.data.ally == 0) {
      fenyong = '';
    } else {
      fenyong = value.cent;
    }
    if (value.userName == '') {
      wx.showToast({
        title: '请输入业主姓名',
        icon: "none",
        duration: 2000
      })
    } else if (value.mobile == "") {
      wx.showToast({
        title: '请输入业主手机号',
        icon: "none",
        duration: 2000
      })
    } else if (!(/^1[3456789]\d{9}$/.test(value.mobile))) {
      wx.showToast({
        title: "请输入正确手机号",
        icon: 'none',
        duration: 2000
      })
    } else if (value.title == '') {
      wx.showToast({
        title: '请输入房源标题',
        icon: "none",
        duration: 2000
      })
    } else if (value.rent == '') {
      wx.showToast({
        title: '请输入租价',
        icon: "none",
        duration: 2000
      })
    } else if (value.minRent == '') {
      wx.showToast({
        title: '请输入出租底价',
        icon: "none",
        duration: 2000
      })
    } else if (value.deposit == '') {
      wx.showToast({
        title: '请输入出租押金',
        icon: "none",
        duration: 2000
      })
    } else if (value.idNUm != "" && !(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value.idNUm))) {
      wx.showToast({
        title: "请输入正确身份证号",
        icon: 'none',
        duration: 2000
      })
    } else if (value.cent == '') {
      wx.showToast({
        title: '请输入合作分佣',
        icon: "none",
        duration: 2000
      })
    } else if (this.data.imgs.length == 0) {
      wx.showToast({
        title: '请选择图片',
        icon: "none",
        duration: 2000
      })
    }
    else {
      var data = {
        xiaoquId: this.data.xiaoquId,
        userName: value.userName,
        sex: this.data.items,
        mobile: value.mobile,
        idNUm: value.idNUm,
        title: value.title,
        state: this.data.arrayt[this.data.indext].lxid,
        use: this.data.arrayj[this.data.indexj].lxid,
        rent: value.rent,
        minRent: value.minRent,
        deposit: value.deposit,
        cycle: this.data.arrayzq[this.data.indexzq].lxid,
        payWay: this.data.arrayfk[this.data.indexfk].lxid,
        seeWay: this.data.arraykf[this.data.indexkf].lxid,
        imgs: this.data.imgs,
        imgsHX: this.data.imgsHX,
        chooesVideo: this.data.chooesVideo,
        lianmenggx_yongjin: fenyong
      }
      wx.setStorageSync('data', data);
      wx.navigateTo({
        url: '../editrentalbook2/editrentalbook2?id=' + this.data.id,
      })
    }
  },
  // 选择视频
  chooseVideo: function () {
    let that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          chooesVideo: res.tempFilePath
        })
      }
    })
  },
  queryDetail() {
    const _this = this
    wx.request({
      url: _this.data.basicAppURL + 'fangyuan/edit_content',
      method: "POST",
      data: {
        id: this.data.id
      },
      header: {
        "XX-DEVICE-TYPE": "jjr_dian",
        "XX-TOKEN": wx.getStorageSync('token'),
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        _this.setData({
          fangyuan: res.data.data.fangyuan,
          xiangqing: res.data.data.xiangqing,
          user: res.data.data.fangyuan.yezhu, // 业主名字
          phone: res.data.data.fangyuan.yezhudianhua, // 手机号
          idnumber: res.data.data.fangyuan.personcardno, // 证件号
          items: Number(res.data.data.fangyuan.yezhulx) - 1, // 性别
          titles: res.data.data.xiangqing.fybiaoti,//房源名字
          indext: Number(res.data.data.fangyuan.zhuangtai) - 1,//状态索引
          indexj: Number(res.data.data.fangyuan.yongtu) - 1, // 用途索引          
          indexzq: Number(res.data.data.fangyuan.chuzuzhouqi) - 1, // 出租周期
          indexkf: Number(res.data.data.fangyuan.chuzufs) - 1, // 出租方式索引
          indexfk: Number(res.data.data.fangyuan.fukuanfs) - 1, // 付款方式索引
          
          xiaoquId: res.data.data.fangyuan.xiaoqu,// 小区ID
          xiaoqu: res.data.data.fangyuan.xiaoqum,
          realSex: Number(res.data.data.fangyuan.yezhulx) - 1,
          chooesVideo: res.data.data.fangyuan.shipin_url || ''
        })
        // 图片路径
        let imgs = res.data.data.xiangqing.img
        let imgsArr = [] 
        if (imgs) {
          imgs.forEach((item) => {
            imgsArr.push(item.img_path)
          })
        }
        _this.setData({
          imgs: imgsArr
        })
        // 图片路径 户型
        let hx_imgs = res.data.data.xiangqing.hx_img
        let hx_imgs_arr = [] 
        if (hx_imgs) {
          hx_imgs.forEach((item) => {
            hx_imgs_arr.push(item.img_path)
          })
        }
        _this.setData({
          imgsHX: hx_imgs_arr
        })
        wx.setStorageSync('edithousecheckin_fangyuan', res.data.data.fangyuan)
        wx.setStorageSync('edithousecheckin_xiangqing', res.data.data.xiangqing)                
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.queryDetail()
    this.getOptions();
    this.videoContext = wx.createVideoContext('prew_video');
  },

  /**
   * 全屏改变
   */
  bindVideoScreenChange: function (e) {
    var status = e.detail.fullScreen; //值true为进入全屏，false为退出全屏
    var play = {
      playVideo: false
    }
    if (status) {
      play.playVideo = true;
    } else {
      this.videoContext.pause();
    }
    this.setData(play);
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