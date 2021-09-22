// pages/secondhouse/secondhouse.js
var cityData = require('../../utils/city.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    content: ['请选择', '1室', '2室', '3室', '4室', '5室', '6室', '7室'],
    contents: ['默认排序', '录入时间升序', '录入时间降序', '均价升序', '均价降序', '售价升序', '售价降序', '面积升序', '面积降序', '其它'], //排序列表内容
    show: false,
    qyopen: false, //点击区域筛选滑动弹窗显示效果，默认不显示
    qyshow: true, //用户点击闭关区域的弹窗设置，默认不显示
    nzopen: false, //价格筛选弹窗
    nzshow: true,
    pxopen: false, //排序筛选弹窗
    pxshow: true,
    hxopen: false, //户型筛选弹窗
    hxshow: true,
    isfull: false,
    cityleft: [{
      name: "城区",
    },
    {
      name: "地铁",
    },
    ], //获取区域的下拉框筛选项内容
    areaId: null,
    subwayId: null,
    citycenter: {}, //选择区域左边筛选框后的显示的中间内容部分
    select1: 0, //区域选中后的第二个子菜单，默认显示地铁下的子菜单
    select2: '', //区域选择部分的中间
    shownavindex: '',
    pxIndex: 0, //排序内容下拉框，默认第一个
    hxIndex: 0,
    priceleft: [{
      name: "单价",
    }
    ], //价格
    select4: 0,
    select5: '',
    name1: '区域',
    name2: '价格',
    name3: '户型',
    name4: '排序',
    hidden: false,
    // 分页
    page: 1,
    pageSize: 9,
    houseList: [],
    hasData: true,
    showData: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX      
    });
    if(options.housing) {
      let houseArr = JSON.parse(options.housing)      
      this.setData({
        houseList: houseArr,
        showData: houseArr.length > 0 ? true: false
      })
    }
    
    this.setData({
      citycenter: this.data.cityleft['地铁'],
      priceright: this.data.priceleft['总价']
    })
  },
  // 最低总价
  min_price(e) {
    this.setData({
      minPrice: e.detail.value
    })
  },
  // 最高总价
  max_price(e) {
    this.setData({
      maxPrice: e.detail.value
    })
  },
  // 最低单价
  min_price_d(e) {
    this.setData({
      minPrice_d: e.detail.value
    })
  },
  // 最高总价
  max_price_d(e) {
    this.setData({
      maxPrice_d: e.detail.value
    })
  },
  // 二手房源列表
  getHouseList() {
    if (this.data.areaId == null) {
      this.data.areaId = ''
    }
    if (this.data.subwayId == null) {
      this.data.subwayId = ''
    }
    if (this.data.priceId == undefined) {
      this.data.priceId = ''
    }
    if (this.data.search == undefined) {
      this.data.search = ''
    }
    if (this.data.hxIndex == 0) {
      this.data.hxIndex = ''
    }
    if (this.data.minPrice == undefined) {
      this.data.minPrice = ''
    }
    if (this.data.maxPrice == undefined) {
      this.data.maxPrice = ''
    }
    if (this.data.minPrice_d == undefined) {
      this.data.minPrice_d = ''
    }
    if (this.data.maxPrice_d == undefined) {
      this.data.maxPrice_d = ''
    }
    if (this.data.pxId == undefined) {
      this.data.pxId = 0
    }
    const _this = this;

    if (this.data.search == undefined) {
      this.data.search = ''
    }
    if (this.data.pxId == undefined) {
      this.data.pxId = 0
    }
    var data = {
      cid: wx.getStorageSync('cityId'),
      leixing: 1,
      p: this.data.page,
      sousuo: this.data.search,
      quyu: this.data.areaId,
      ditie: this.data.subwayId,
      jiage: this.data.minPrice_d + "," + this.data.maxPrice_d,
      huxing: this.data.hxIndex,
      sort: this.data.pxId
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
        if (res.data.code == 0) {
          var houseList = [];
          var result = res.data.data.data;
          for (let i = 0; i < result.length; i++) {
            if (result[i].biaoqian.length != 0) {
              result[i].biaoqian = result[i].biaoqian.slice(0, 3);
            }
          }
          if (_this.data.houseList) {
            houseList = _this.data.housing;
          } else {
            houseList = res.data.data.data
          }
          if (result.length < _this.data.pageSize) {
            _this.setData({
              hasData: false,
              houseList: _this.data.houseList.concat(result)
            })
          } else {
            _this.setData({
              hasData: true,
              houseList: _this.data.houseList.concat(result),
              page: _this.data.page + 1
            })
          }
        }
      }
    })
  },
  // 搜索
  search(e) {
    this.setData({
      houseList:[],
      search: e.detail.value
    })
    this.getHouseList();
  },
  // 进入详情页面
  hrefDetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../houseresourcesxq/houseresourcesxq?id=' + id,
    })
  },
  // 添加房源
  addHouse() {
    wx.navigateTo({
      url: '../housecheckin/housecheckin',
    })
  },
  // 默认图片
  errDetails(e) {
    var houseList = this.data.houseList;
    var default_img = e.currentTarget.dataset.img;
    var index = e.currentTarget.dataset.index;
    houseList[index].img = default_img;
    this.setData({
      houseList
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getHouseList();
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
    wx.removeStorageSync('housing');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasData) {
      this.getHouseList();
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

  },
  // 获取配置项
  getOptions() {
    const _this = this;
    var data = {
      cid: wx.getStorageSync('cityId')
    }
    wx.request({
      url: _this.data.basicURL + 'front/lpoptions',
      method: "POST",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        // 价格筛选过滤  ++ 格式初始化
        var oneArr = [];
        oneArr = res.data.data.esfprice.filter(function (element, index, all) {
          return element.leixing == 1;
        })
        for (let i = 0; i < oneArr.length; i++) {
          oneArr[i].name = oneArr[i].min + "-" + oneArr[i].max + "万"
        }
        var twoArr = [];
        twoArr = res.data.data.esfprice.filter(function (element, index, all) {
          return element.leixing == 2;
        })
        for (let i = 0; i < twoArr.length; i++) {
          twoArr[i].name = twoArr[i].min + "-" + twoArr[i].max + "万"
        }
        if (res.data.code == 0) {
          var contents = res.data.data.esfsort;
          var obj = {
            id: 0,
            comment: "默认排序"
          }
          contents.unshift(obj);
          _this.setData({
            "cityleft[0].item": res.data.data.xingzhengqu,
            "cityleft[1].item": res.data.data.ditie,
            "priceleft[0].item": oneArr,
            contents: contents
          })
        }
      }
    })
  },

  // 区域列表下拉框是否隐藏
  listqy: function (e) {
    if (this.data.qyopen) {
      this.setData({
        qyopen: false,
        nzopen: false,
        pxopen: false,
        hxopen: false,
        nzshow: true,
        pxshow: true,
        pxshow: true,
        qyshow: false,
        isfull: false,
        shownavindex: 0,
        hidden: false
      })
    } else {
      this.setData({
        qyopen: true,
        pxopen: false,
        nzopen: false,
        hxopen: false,
        nzshow: true,
        pxshow: true,
        hxshow: true,
        qyshow: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav,
        hidden: true
      })
    }

  },

  // 价格下拉框是否隐藏
  list: function (e) {
    if (this.data.nzopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        hxopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        hxshow: true,
        isfull: false,
        shownavindex: 0,
        hidden: false
      })
    } else {
      this.setData({
        nzopen: true,
        pxopen: false,
        qyopen: false,
        hxopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        hxshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav,
        hidden: true
      })
    }
  },

  // 户型下拉框是否隐藏
  listhx: function (e) {
    if (this.data.hxopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        hxopen: false,
        nzshow: true,
        pxshow: true,
        qyshow: true,
        hxshow: false,
        isfull: false,
        shownavindex: 0,
        hidden: false
      })
    } else {
      this.setData({
        content: this.data.content,
        nzopen: false,
        pxopen: false,
        qyopen: false,
        hxopen: true,
        nzshow: true,
        pxshow: true,
        qyshow: true,
        hxshow: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav,
        hidden: true
      })
    }
  },

  // 排序下拉框是否隐藏
  listpx: function (e) {
    if (this.data.pxopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        hxopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        hxshow: true,
        isfull: false,
        shownavindex: 0,
        hidden: false
      })
    } else {
      this.setData({
        contents: this.data.contents,
        nzopen: false,
        pxopen: true,
        qyopen: false,
        hxopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        hxshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav,
        hidden: true
      })
    }
  },

  // 区域第一栏选择内容
  selectleft: function (e) {
    this.setData({
      citycenter: this.data.cityleft[e.currentTarget.dataset.city],
      select1: e.target.dataset.city,
      select2: '',
      show: true
    });
  },

  // 区域中间栏选择的内容
  selectcenter: function (e) {
    if (this.data.select1 == 0) {
      var areaId = e.currentTarget.dataset.id;
      this.setData({
        areaId
      })
    } else {
      var subwayId = e.currentTarget.dataset.id;
      this.setData({
        subwayId
      })
    }
    this.setData({
      select2: e.target.dataset.city
    });
  },
  // 区域清空筛选项
  quyuEmpty: function () {
    this.setData({
      select1: 0,
      houseList:[],
      page:1,
      select2: '',
      areaId: '',
      subwayId: '',
      name1: '区域',
      hidden: false,
      qyopen: false,
      isfull: false
    })
    this.getHouseList()
  },
  // 区域选择筛选项后，点击提交
  submitFilter: function (e) {    
    // 隐藏区域下拉框
    this.setData({
      houseList:[],
      page:1,
      name1: this.data.cityleft[this.data.select1].item[this.data.select2].name,
      qyopen: false,
      nzopen: false,
      pxopen: false,
      hxopen: false,
      nzshow: true,
      pxshow: true,
      hxshow: true,
      qyshow: false,
      isfull: false,
      shownavindex: 0,
      hidden: false
    })
    this.getHouseList()
  },
  // 价格第一栏选择内容
  selectprice: function (e) {
    this.setData({
      priceright: this.data.priceleft[e.currentTarget.dataset.price],
      select4: e.target.dataset.price,
      select5: ''
    });
  },
  // 价格右侧栏选择的内容
  selectpr: function (e) {
    this.data.minPrice_d = e.currentTarget.dataset.min;
    this.data.maxPrice_d = e.currentTarget.dataset.max;
    this.setData({
      select5: e.target.dataset.price,
      minPrice_d: this.data.minPrice_d,
      maxPrice_d: this.data.maxPrice_d
    });
  },

  // 点击灰色背景隐藏所有的筛选内容
  hidebg: function (e) {
    this.setData({
      qyopen: false,
      nzopen: false,
      pxopen: false,
      hxopen: false,
      nzshow: true,
      pxshow: true,
      qyshow: true,
      hxshow: true,
      isfull: false,
      shownavindex: 0,
    })
  },

  // 价格筛选框重置内容
  PriceEmpty: function () {
    this.setData({
      select4: 0,
      houseList:[],
      page:1,
      name2: '价格',
      select5: '',
      minPrice: "",
      maxPrice: "",
      minPrice_d: "",
      maxPrice_d: "",
      nzopen: false,
      hidden: false,
      isfull: false
    });
    this.getHouseList()
  },
  // 价格筛选框提交内容
  submitPrice: function () {
    
    // 隐藏价格下拉框选项
    this.setData({
      houseList:[],
      page:1,
      name2: this.data.priceleft[this.data.select4].item[this.data.select5].name,
      nzopen: false,
      pxopen: false,
      qyopen: false,
      hxopen: false,
      nzshow: false,
      pxshow: true,
      qyshow: true,
      hxshow: true,
      isfull: false,
      shownavindex: 0,
      hidden: false
    })
    this.getHouseList()
  },

  //户型筛选重置内容
  hxEmpty: function () {
    this.setData({
      hxIndex: 0,
      houseList:[],
      page:1,
      name3: "户型",
      hxopen: false,
      hidden: false,
      isfull: false
    })
    this.getHouseList()
  },
  //户型筛选提交内容
  submithx: function () {
    // 隐藏户型下拉框
    this.setData({
      houseList:[],
      page:1,
      name3: this.data.content[this.data.hxIndex],
      qyopen: false,
      nzopen: false,
      pxopen: false,
      hxopen: false,
      nzshow: true,
      pxshow: true,
      hxshow: false,
      qyshow: true,
      isfull: false,
      shownavindex: 0,
      hidden: false
    })
    this.getHouseList()
  },
  //排序筛选重置内容
  typeEmpty: function () {
    this.setData({
      name4: "排序",
      houseList:[],
      page:1,
      pxIndex: 0,
      pxopen: false,
      hidden: false,
      isfull: false,
      pxId: 0
    });
    this.getHouseList()
  },
  //排序筛选提交内容
  submittype: function (e) {
    // 隐藏排序下拉框
    this.setData({
      houseList:[],
      page:1,
      name4: this.data.contents[this.data.pxIndex].comment,
      qyopen: false,
      nzopen: false,
      pxopen: false,
      hxopen: false,
      nzshow: true,
      pxshow: false,
      hxshow: true,
      qyshow: true,
      isfull: false,
      shownavindex: 0,
      hidden: false
    })
    this.getHouseList()
  },

  // 排序内容下拉框筛选
  selectPX: function (e) {
    this.setData({
      pxIndex: e.currentTarget.dataset.index,
      pxId: e.currentTarget.dataset.id,
    });
  },

  // 户型内容下拉筛选
  selectHX: function (e) {
    this.setData({
      hxIndex: e.currentTarget.dataset.index,
    });
  }
})