// pages/newsxq/newsxq.js
const app = getApp();
import TIM from '../../utils/tim-wx';
import COS from "../../utils/cos-wx-sdk-v5";
let recorderManager = wx.getRecorderManager();
// 录音部分参数 小程序文档
const recordOptions = {
  duration: 60000, // 录音的时长，单位 ms，最大值 600000（10 分钟）
  sampleRate: 44100, // 采样率
  numberOfChannels: 1, // 录音通道数
  encodeBitRate: 192000, // 编码码率
  format: 'aac' // 音频格式，选择此格式创建的音频消息，可以在即时通信 IM 全平台（Android、iOS、微信小程序和Web）互通
};
let option = {
  SDKAppID: 1400371779  // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
};
// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
let tim = TIM.create(option); // SDK 实例通常用 tim 表示
// 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
tim.setLogLevel(1); // 普通级别，日志量较多，接入时建议使用
// tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
// 注册 COS SDK 插件
tim.registerPlugin({
  'cos-wx-sdk': COS
});
Page({
  data: {
    basicImg: app.data.basicImg,
    friendId: '',
    friendName: '',
    friendAvatarUrl: '',
    messages: [], // 消息集合
    complete: 0, // 是否还有历史消息可以拉取，1 - 表示没有，0 - 表示有
    content: '', // 输入框的文本值
    lock: false, // 发送消息锁 true - 加锁状态 false - 解锁状态
    emojiChar: ["😠", "😩", "😲", "😞", "😵", "😰", "😒", "😍", "😤", "😜", "😝", "😋", "😘", "😚", "😷", "😳", "😃", "😅", "😆", "😁", "😂", "😊", "😄", "😢", "😭", "😨", "😣", "😡", "😌", "😖", "😔", "😱", "😪", "😏", "😓", "😥", "😫", "😉", "✊", "✋", "✌", "👊", "👍", "☝", "👆", "👇", "👈", "👉", "👋", "👏", "👌", "👎", "👐", "🍉", "🍓", "🍒", "🍌", "🍎", "🍊", "🍓", "🍆", "🍈", "🍍", "🍇", "🍑", "🍏", "👀", "", "👂", "👃", "👄", "👅", "💄", "💆", "👤", "👦", "👧", "👨", "👩", "👪", "👫", "👮", "👯", "👰", "👱", "👲", "👳", "👴", "👵", "👶", "👷", "👸", "👻", "👼", "👽", "👾", "👿", "💀", "💃", "🐌", "🐍", "🐎", "🐔", "🐗", "🐫", "🐘", "🐨", "🐒", "🐑", "🐙", "🐚", "🐛", "🐜", "🐝", "🐞", "🐠", "🐡", "🐢", "🐤", "🐥", "🐦", "🐣", "🐧", "🐩", "🐟", "🐬", "🐭", "🐯", "🐱", "🐳", "🐴", "🐵", "🐶", "🐷", "🐻", "🐹", "🐺", "🐮", "🐰", "🐸", "🐾", "🐲", "🐼", "🐽", "🙈", "🙊", "🙉", "🙋", "🙌", "🙍", "🙎", "🙏", "💊", "💉", "🔱", "🔥", "📞", "☎", "❤", "💓", "💔", "💕", "💖", "💗", "💘", "💙", "💚", "💛", "💜", "💝", "💞", "💟"],   // 表情数组
    scroll_height: wx.getSystemInfoSync().windowHeight - 55,
    reply_height: 0,
    moreShow: true,
    moreShow_en: true,
    userData: [],
    audioPng: "../image/audio-play.png",
    audioGif: "../image/audio-play.gif",
    audioState: true,
    /**
     * 历史消息消息集合（结构如下）：
     * nextReqMessageID 用于续拉，分页续拉时需传入该字段。
     * isCompleted 表示是否已经拉完所有消息。
     */
    nextReqMessageID: "",
    isCompleted: "",
    isFirstGetList: true,
    audioContext: null,
    opration: true,
    touchBtn: false,
    recording: false,
    stopflag: false,
    cancelRecord: false,
    refreshTime: '',
    ScrollLoading: 0,
    audioIndex: null,
    sendBtn: true    
  },
  onLoad: function (options) {
    // 接收上一页面的值
    this.setData({
      friendId: options.friendId,
      friendName: options.friendName,
      friendAvatarUrl: options.friendAvatarUrl,
      userData: wx.getStorageSync('user_info'),
      conversationID: options.conversationID
    })
    // 获取登录接口返回的IM信息
    let jjr_im = wx.getStorageSync('IM')
    let option = {
      SDKAppID: 1400371779  // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
    };
    // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
    let tim = TIM.create(option); // SDK 实例通常用 tim 表示
    // 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
    tim.setLogLevel(1); // 普通级别，日志量较多，接入时建议使用
    // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
    // 注册 COS SDK 插件
    tim.registerPlugin({
      'cos-wx-sdk': COS
    });

    wx.setNavigationBarTitle({
      title: options.friendName
    })
    var that = this
    that.data.messages = [] // 清空历史消息
    let audioContext = wx.createInnerAudioContext()
    this.setData({
      audioContext
    })
    
    let promise = tim.login({userID: jjr_im.user_id, userSig: jjr_im.user_sign});
    
    wx.showLoading({
      title: '加载中',
      mask: true
    })  
    let readyFn = function() {
      // 更新客户端自己的资料
      // 修改个人标配资料
      let promise_update_info = tim.updateMyProfile({
        nick: that.data.userData.ygmingcheng,
        avatar: that.data.userData.avatar_url
      });
      promise_update_info.then(function(imResponse) {
        console.log(imResponse.data); // 更新资料成功
      }).catch(function(imError) {
        console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
      });
      app.globalData.imIsReady = true
      wx.hideLoading()
      that.getMessageList();
      // 将某会话下所有未读消息已读上报      
      let promiseInner = tim.setMessageRead({ conversationID: options.conversationID });
      promiseInner.then(function (imResponse) {
        // 已读上报成功
      }).catch(function (imError) {
        // 已读上报失败
      });
    } 
    // 获取当前聊天的历史列表    
    promise.then(function(imResponse) {
      if (app.globalData.imIsReady) {
        readyFn()
      } else {
        tim.on(TIM.EVENT.SDK_READY, readyFn)
      }           
      // console.log(imResponse.data); // 登录成功
      if (imResponse.data.repeatLogin === true) {
        // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
        //console.log(imResponse.data.errorInfo);
      }
    }).catch(function(imError) {
      wx.hideLoading()
      console.warn('login error:', imError); // 登录失败的相关信息
    });  
  },
  onShow: function () {
    let that = this;
    
    that.scrollToBottom();
    // 获取收到的单聊信息
    let onMessageReceived = function (event) {
      // event.data - 存储 Message 对象的数组 - [Message]
      let msgList = that.data.messages;

      handlerHistoryMsgs(event.data, that)
      that.scrollToBottom();
    };
    tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived)
    // 监听录音结束
    recorderManager.onStop(function (res) {
      if (that.data.recording) {
        if (that.data.cancelRecord) {
          wx.hideToast()
          that.setData({
            cancelRecord: false
          })
        } else {
          // 创建消息实例，接口返回的实例可以上屏
          const message = tim.createAudioMessage({
            to: that.data.friendId,
            conversationType: TIM.TYPES.CONV_C2C,
            payload: {
              file: res
            },
            onProgress: function (event) { }
          });
          //  发送消息
          let promise = tim.sendMessage(message);
          promise.then(function (imResponse) {
            // 发送成功
            that.addMessage(imResponse.data.message, that)
          }).catch(function (imError) {
            // 发送失败
          });
          that.setData({
            recording: false
          })
        }
      } else {
        wx.showToast({
          title: '说话时间太短',
          duration: 1000,
          image: '../image/err.png'
        })
      }
    });
  },
  onUnload: function () {
  },
  /**
   * 获取消息列表
   */
  getMessageList() {
    let that = this;            
    let cb = tim.getMessageList({
      conversationID: that.data.conversationID,  //会话列表传递过来的参数
      count: 15
    })
    cb.then(function (imResponse) {
      const messageList = imResponse.data.messageList; // 消息列表。
      console.log(messageList);

      const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
      that.setData({
        nextReqMessageID: nextReqMessageID,
        isCompleted: isCompleted
      })
      handlerHistoryMsgs(messageList, that);
      that.scrollToBottom();
    });
  },
  /**
   * 获取文本的消息
   */
  getContent: function (e) {
    if (e.detail.value == "") {
      this.setData({ sendBtn: true })
    } else {
      this.setData({ sendBtn: false })
    }
    var that = this;
    that.setData({
      content: e.detail.value
    })
  },
  /**
   * 发送消息
   */
  sendMsg: function (e) {
    if (this.data.content == "") {
      wx.showToast({
        title: '请输入内容',
        duration: 1000,
        icon: 'none'
      })
      return
    }
    var that = this

    
    // 发送文本消息，Web 端与小程序端相同
    // 1. 创建消息实例，接口返回的实例可以上屏
    let message = tim.createTextMessage({
      to: that.data.friendId,
      conversationType: TIM.TYPES.CONV_C2C,
      payload: {
        text: that.data.content
      }
    });
    // 2. 发送消息
    let promise = tim.sendMessage(message);
    promise.then(function (imResponse) {
      // 发送成功
      that.addMessage(imResponse.data.message, that)
      that.setData({ sendBtn: true })
    }).catch(function (imError) {
      // 发送失败
    });         
  },
  /**
   * 刷新文本消息
   */
  addMessage: function (msg, that) {
    var messages = that.data.messages;
    messages.push(msg);
    that.setData({
      messages: messages,
      content: '' // 清空输入框文本
    })
    that.scrollToBottom();
  },
  /**
   * 发送图片消息
   */
  sendImg() {
    let that = this;
    wx.chooseImage({
      sourceType: ['album'], // 从相册选择
      count: 1, // 只选一张，目前 SDK 不支持一次发送多张图片
      success: function (res) {
        // 2. 创建消息实例，接口返回的实例可以上屏
        let message = tim.createImageMessage({
          to: that.data.friendId,
          conversationType: TIM.TYPES.CONV_C2C,
          payload: {
            file: res
          },
          onProgress: function (event) {
          }
        });
        // 3. 发送图片
        let promise = tim.sendMessage(message);
        promise.then(function (imResponse) {
          // 发送成功
          that.addMessage(imResponse.data.message, that)
        }).catch(function (imError) {
          // 发送失败
        });
      }
    })
  },
  scrollToBottom: function () {
    this.setData({
      toView: 'row_' + (this.data.messages.length - 1)
    });
  },
  previewImage(e) {
    let src = '';
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src]
    })
  },
  // 录制语音
  startAudio: function () {
    wx.showToast({
      title: '上滑取消发送',
      duration: 10000,
      image: '../image/cancel.png'
    })
    this.setData({
      touchBtn: true
    })
    if (this.data.stopFlag) {
      return;
    }
    recorderManager.start(recordOptions);
    recorderManager.onError(function (errMsg) {
    });
  },
  // # 利用长按判断录音是否太短
  onLongpress() {
    this.setData({
      recording: true
    })
  },
  // 发送录音
  onTouchEnd: function () {
    wx.hideToast()
    let that = this;
    that.setData({
      touchBtn: false
    })
    if (that.data.stopFlag) {
      return;
    }
    if (that.data.recording) {
      recorderManager.stop();
    } else {
      that.setData({
        stopFlag: true
      })
      setTimeout(() => {
        recorderManager.stop();
        that.setData({
          stopFlag: false
        })
      }, 400);
    }
  },
  // 播放语音
  openAudio(audio) {
    let index = audio.currentTarget.dataset.eventid
    this.setData({
      audioIndex: index
      // audioState:false
    })
    this.data.audioContext.src = audio.currentTarget.dataset.comkey
    this.data.audioContext.autoplay = true;
    this.data.audioContext.play()
    this.data.audioContext.onPlay((res) => {
    })
    this.data.audioContext.onEnded(() => {
      wx.hideToast()
      this.setData({
        audioIndex: null
      })
    })
    this.data.audioContext.onError((res) => {
    })
  },
  // 上滑取消
  onTouchMove(e) {
    if (e.touches[0].clientY < 520) {
      // # 取消发送
      this.setData({
        cancelRecord: true
      });
      wx.showToast({
        title: '松开，取消发送',
        duration: 10000,
        image: '../image/cancel.png'
      })
    } else {
      // # 不取消
      wx.hideToast()
      wx.showToast({
        title: '上滑取消发送',
        duration: 10000,
        image: '../image/cancel.png'
      })
      this.setData({
        cancelRecord: false
      })
    }
  },
  // 下拉加载聊天记录
  refresh: function (e) {
    let that = this
    if (that.data.ScrollLoading == 1) { //防止多次触发
      return false
    }
    if (e.detail.scrollTop < 1) {
      that.setData({ ScrollLoading: 1 })
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(() => {
        let promise = tim.getMessageList({ conversationID: that.data.conversationID, nextReqMessageID: that.data.nextReqMessageID, count: 15 });
        promise.then(function (imResponse) {
          const newMessageList = imResponse.data.messageList; // 消息列表。
          const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
          const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
          that.setData({
            nextReqMessageID: nextReqMessageID,
            isCompleted: isCompleted,
            messages: newMessageList.concat(that.data.messages)
          })
          wx.hideLoading()
          that.setData({ ScrollLoading: 0 })
        });
      }, 800);
    }
  },
  // 切换
  Audio() {
    this.setData({
      opration: false,
      moreShow: true,
      moreShow_en: true,
      reply_height: 0,
      scroll_height: wx.getSystemInfoSync().windowHeight - 55
    })
  },
  keyboard() {
    this.setData({
      opration: true
    })
  },
  // 显示相册
  moreClick() {
    if (this.data.moreShow) {
      this.setData({
        moreShow: false,
        moreShow_en: true,
        reply_height: 92
      })
    }
  },
  // 表情选择
  selectEmoji(e) {
    this.setData({
      content: this.data.content + e.currentTarget.dataset.text,
      isShowModelUp: false
    })
  },
  // 显示表情
  moreClick_en() {
    if (this.data.moreShow_en) {
      this.setData({
        moreShow_en: false,
        moreShow: true,
        reply_height: 92
      })
    }
  },
  bindfocus() {
    this.setData({
      moreShow: true,
      moreShow_en: true,
      reply_height: 0,
      scroll_height: wx.getSystemInfoSync().windowHeight - 55
    })
  }
})
/**
 * 处理历史消息 
 */
function handlerHistoryMsgs(result, that) {
  var historyMsgs = that.data.messages;
  result.forEach(item => {
    historyMsgs.push(item)
  })
  // historyMsgs.push(result[0])
  that.setData({
    messages: historyMsgs,
  })
  // 将某会话下所有未读消息已读上报
  let promise = tim.setMessageRead({ conversationID: that.data.conversationID });
  promise.then(function (imResponse) {
    // 已读上报成功
  }).catch(function (imError) {
    // 已读上报失败
  });
}