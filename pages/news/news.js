const app = getApp();
import TIM from '../../utils/tim-wx';
import COS from "../../utils/cos-wx-sdk-v5";
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
      userData: wx.getStorageSync('user_info'),
      id: options.id
    })
  },

  // 跳转到消息详情
  intoDeails(e) {
    wx.navigateTo({
      url: '../newsxq/newsxq?friendId=' + e.currentTarget.dataset.friendid + "&conversationID=" + e.currentTarget.dataset.conversationid + "&friendName=" + e.currentTarget.dataset.friendname + "&friendAvatarUrl=" + e.currentTarget.dataset.friendavatarurl,
    })
  },

  // 跳转到系统消息列表
  intoSystemList() {
    wx.navigateTo({
      url: '../newslist/newslist',
    })
  },
  // 获取im信息
  getImUserInfo() {
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'my/info',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_mobile"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            im: res.data.data.im,
          })
          var user_id = res.data.data.im.user_id;
          _this.imRegistered(user_id, res.data.data.im.user_sign);
        }
      }
    })
  },
  // 获取未读消息列表
  getUnreadInfo() {
    const _this = this;
    wx.request({
      url: _this.data.basicURL + 'msg/msg_statistics',
      method: "GET",
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian"
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            total_msg: res.data.data.total,
            unread_msg: res.data.data.unread
          })
        }
      }
    })
  },
  // im初始化&登录
  imRegistered(id, sign) {
    const _this = this;
    let options = {
      SDKAppID: 1400371779 // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
    };
    // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
    let tim = TIM.create(options); // SDK 实例通常用 tim 表示

    // 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
    tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
    // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用

    // 注册 COS SDK 插件
    tim.registerPlugin({ 'cos-wx-sdk': COS });

    // 多端登录实例监测
    let onKickedOut = function (event) {

    };
    tim.on(TIM.EVENT.KICKED_OUT, onKickedOut);

    // 登录
    let promise = tim.login({ userID: id, userSig: sign });
    let readyFn = function() {
      // 更新客户端自己的资料
      // 修改个人标配资料
      let promise_update_info = tim.updateMyProfile({
        nick: _this.data.userData.ygmingcheng,
        avatar: _this.data.userData.avatar_url
      });
      promise_update_info.then(function(imResponse) {
        console.log(imResponse.data); // 更新资料成功
      }).catch(function(imError) {
        console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
      });

      app.globalData.imIsReady = true
      let promises = tim.getConversationList();
      promises.then(function (imResponse) {
        const conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
        for (let i = 0; i < conversationList.length; i++) {
          conversationList[i].lastMessage.lastTime = _this.timetrans(conversationList[i].lastMessage.lastTime);
          conversationList[i].lastMessage.show_short_info = _this.short_info(conversationList[i].lastMessage.messageForShow)
        }
        _this.setData({
          conversationList: conversationList
        })
      }).catch(function (imError) {

      });      
    }
    promise.then(function (imResponse) {
      if (app.globalData.imIsReady) {
        readyFn()
      } else {
        tim.on(TIM.EVENT.SDK_READY, readyFn)
      }
    }).catch(function (imError) {

    });
  },
  short_info(msg) {
    return msg.length > 10 ? msg.substring(0,8) + '...' : msg
  },
  // 时间戳转换
  timetrans(date) {
    if (date.toString().length == 10) {
      var date = new Date(date * 1000);//如果date为13位不需要乘1000
    }
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
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
    this.getImUserInfo();
    this.getUnreadInfo();
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