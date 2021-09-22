// pages/report/report.js
const app = getApp();
var dateTimePicker = require('../../utils/dataTime.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    date: '请选择预计到场时间',
    arrayqk: ['请选择客户性别', '男', '女'],
    arraykq: ['请选择客户性别', '男', '女'],
    indexqk: 0,
    indexkq: 0,
    second: false,
    add: true,
    // 六级联动
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    user: wx.getStorageSync('user'),
    users: wx.getStorageSync('users'),
    classes_array: [{
      name: '首访',
      checked: true,
      value: '0'
    }, {
      name: '复访',
      checked: false,
      value: '1'
    }],
    access: null,
    dianhua: '',
    into_type: 1
  },

  // 到访情况
  radioChange(e) {
    this.setData({
      access: e.detail.value
    })
  },

  // 增加
  addItem: function () {
    this.setData({
      second: true,
      add: false
    })
  },
  // 删除
  removeItem: function (e) {
    this.setData({
      second: false,
      add: true
    })
  },

  //预计到场
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  //客户性别
  bindPickerChangeqk: function (e) {
    this.setData({
      indexqk: e.detail.value
    })
  },
  bindPickerChangekq(e) {
    this.setData({
      indexkq: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    // 判断是否添加用户2
    if (options.second == 1) {
      this.setData({
        second: true,
        add: false
      })
    }
    this.setData({
      isIphoneX: isIphoneX,
      id: options.id,
      name: options.name,
      into_type: options.into_type,
      dianhua: options.dianhua,
      user: options.khxingming
    });
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });

  },
  changeDate(e) {
    this.setData({
      date: e.detail.value
    });
  },
  changeTime(e) {
    this.setData({
      time: e.detail.value
    });
  },
  changeDateTime(e) {
    const that = this;
    this.setData({
      dateTime: e.detail.value
    });
    var aaa1 = that.data.dateTime[0];
    var aaa2 = that.data.dateTime[1];
    var aaa3 = that.data.dateTime[2];
    var aaa4 = that.data.dateTime[3];
    var aaa5 = that.data.dateTime[4];
    var aaa6 = that.data.dateTime[5];

    var time1 = that.data.dateTimeArray[0][aaa1];
    var time2 = that.data.dateTimeArray[1][aaa2];
    var time3 = that.data.dateTimeArray[2][aaa3];
    var time4 = that.data.dateTimeArray[3][aaa4];
    var time5 = that.data.dateTimeArray[4][aaa5];
    var time6 = that.data.dateTimeArray[5][aaa6];
    var time = time1 + '-' + time2 + '-' + time3 + ' ' + time4 + ':' + time5 + ':' + time6;
    this.setData({
      selectTime: time
    });
  },
  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value
    });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  // 获取报备楼盘
  houseName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 获取用户名字1
  userName(e) {
    this.setData({
      user: e.detail.value
    })
  },
  // 获取用户名字2
  userNames(e) {
    this.setData({
      users: e.detail.value
    })
  },
  // 添加报备
  submitReport(e) {
    var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
    const _this = this;
    var v = e.detail.value;
    console.log(this.data.name)
    if (this.data.into_type == 1 && this.data.name == undefined || this.data.name == '') {
      wx.showToast({
        title: '请选择报备楼盘',
        icon: "none",
        duration: 2000
      })
    } else if (v.number == '') {
      wx.showToast({
        title: '请输入到场人数',
        icon: "none",
        duration: 2000
      })
    } else if (this.data.selectTime == undefined) {
      wx.showToast({
        title: '请选择到场时间',
        icon: "none",
        duration: 2000
      })
    } else if (this.data.access == null) {
      wx.showToast({
        title: '请选择到访情况',
        icon: "none",
        duration: 2000
      })
    } else if (this.data.user == '') {
      wx.showToast({
        title: '请输入用户姓名',
        icon: "none",
        duration: 2000
      })
    } else if (v.mobile_one == '') {
      wx.showToast({
        title: '请输入用户手机号',
        icon: "none",
        duration: 2000
      })
    } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(v.mobile_one)) && v.mobile_one != '') {
      wx.showToast({
        title: '请输入正确手机号',
        icon: "none",
        duration: 2000
      })
    } else if (this.data.arrayqk[this.data.indexqk] == '请选择客户性别') {
      wx.showToast({
        title: '请选择客户性别',
        icon: "none",
        duration: 2000
      })
    } else if (!reg.test(v.idcard) && v.idcard != '') {
      wx.showToast({
        title: '请输入用户正确身份证号',
        icon: "none",
        duration: 2000
      })
    } else if (this.data.users == '' && this.data.second == true) {
      wx.showToast({
        title: '请输入用户姓名',
        icon: "none",
        duration: 2000
      })
    } else if (v.mobile_two == '' && this.data.second == true) {
      wx.showToast({
        title: '请输入用户手机号',
        icon: "none",
        duration: 2000
      })
    } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(v.mobile_two)) && v.mobile_two != '' && this.data.second == true) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: "none",
        duration: 2000
      })
    } else if (this.data.arrayqk[this.data.indexkq] == '请选择客户性别' && this.data.second == true) {
      wx.showToast({
        title: '请选择客户性别',
        icon: "none",
        duration: 2000
      })
    } else if (!reg.test(v.idcards) && v.idcards != '' && this.data.second == true) {
      wx.showToast({
        title: '请输入用户正确身份证号',
        icon: "none",
        duration: 2000
      })
    } else {
      var visitors = []
      if (!this.data.second) {
        visitors = [{
          name: this.data.user,
          mobile: v.mobile_one,
          idcard: v.idcard,
          sex: v.sex_one
        }]
      } else {
        visitors = [{
          name: this.data.user,
          mobile: v.mobile_one,
          idcard: v.idcard,
          sex: v.sex_one
        },
        {
          name: this.data.users,
          mobile: v.mobile_two,
          idcard: v.idcards,
          sex: v.sex_two
        }
        ]
      }
      var data = {
        keyuan_id: 0,
        visit_type: this.data.access,   // 到访类型
        ysfy_id: this.data.id,   // 房源id
        visitor_count: v.number,   // 到访人数
        visit_time: this.data.selectTime,   //  到访时间
        note: v.note,      // 备注
        visitors: visitors    // 客户信息
      }
      wx.request({
        url: _this.data.basicURL + 'xinloupan/add_baobei',
        method: "POST",
        data: data,
        header: {
          "XX-TOKEN": wx.getStorageSync('token'),
          "XX-DEVICE-TYPE": "jjr_dian"
        },
        success(res) {
          if (res.data.code == 0) {
            wx.removeStorageSync('user');
            wx.removeStorageSync('users');
            wx.showToast({
              title: '报备成功',
              icon: "none",
              duration: 2000
            })
            wx.navigateBack({
              complete: (res) => {
                delta: 1
              },
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000
            })
          }
        }
      })
    }
  },
  // 通讯录
  getBook(e) {
    // 判断是否添加用户2
    var second;
    if (this.data.second) {
      second = 1;
    } else {
      second = 0;
    }
    // type=1是客户1的通讯录，type=2是客户2的通讯录
    wx.navigateTo({
      url: '../buylistuser/buylistuser?type=' + e.currentTarget.dataset.type + "&second=" + second + "&id=" + this.data.id,
    })
  },
  // 选择报备楼盘
  selectHouse() {
    wx.navigateTo({
      url: '../newhouse/newhouse?into_type='+this.data.into_type,
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
    this.setData({
      user: wx.getStorageSync('user') || this.data.user,
      users: wx.getStorageSync('users')
    })
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