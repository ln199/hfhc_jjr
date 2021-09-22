// pages/dealxq/dealxq.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicURL: app.data.basicURL,
    basicImg: app.data.basicImg,
    // 购房信息
    list01: [{ item_id: 1, type: '销售项目：', shu: '某某楼盘' },
    { item_id: 2, type: '认购房号：', shu: '001122334455' },
    { item_id: 3, type: '房源性质：', shu: '某性质' },
    { item_id: 4, type: '房屋面积：', shu: '100㎡' },
    { item_id: 5, type: '成交单价：', shu: '18,000元/㎡' },
    { item_id: 6, type: '成交总价：', shu: '1,800,000元' },
    { item_id: 7, type: '定金额度：', shu: '20,000元' },
    { item_id: 8, type: '首付额度：', shu: '400,000元' },
    { item_id: 9, type: '贷款额度：', shu: '600,000元' },
    { item_id: 10, type: '优惠政策：', shu: '无' },
    { item_id: 6, type: '付款方式：', shu: '某方式' },
    { item_id: 7, type: '签约日期：', shu: '2020-03-28' },
    { item_id: 8, type: '结佣标准：', shu: '佣金标准A' },
    { item_id: 9, type: '补充说明：', shu: '这是一条备注信息这是一条备注信息这 条备注信息这是一条备注信息这是一条 信息。' }],
    // 接待信息
    list02: [{ item_id: 1, type: '报备流程：', shu: '正常' },
    { item_id: 2, type: '甲方置业顾问：', shu: '张三' },
    { item_id: 3, type: '驻场经理：', shu: '李四' },
    { item_id: 4, type: '资源驻场经理: ', shu: '王五' }],
    // 佣金信息
    list03: [{ item_id: 1, type: '佣金标准：', shu: '佣金方案 A' },
    { item_id: 2, type: '管理费：', shu: '10,000元' },
    { item_id: 3, type: 'POS：', shu: '示例信息' },
    { item_id: 4, type: '销售折扣：', shu: '示例信息' },
    { item_id: 5, type: '业务平台：', shu: '某某平台' },
    { item_id: 6, type: '案场折扣：', shu: '示例信息' },
    { item_id: 7, type: '支付平台：', shu: '某某平台' },
    { item_id: 8, type: '分销佣金：', shu: '10,000元' },
    { item_id: 9, type: '服务费：', shu: '10,000元' },
    { item_id: 10, type: '开发票：', shu: '是' },
    { item_id: 11, type: '说明：', shu: '-' }],
    // 展开折叠
    selectedFlag: [true, true, true]
  },

  // 展开折叠选择  
  changeToggle: function (e) {
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }

    this.setData({
      selectedFlag: this.data.selectedFlag
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
  // 获取业绩详情
  getDetails() {
    const _this = this;
    var data = {
      yjid: this.data.id
    }
    wx.request({
      url: _this.data.basicURL + 'my/yejixiangqing',
      method: "POST",
      data: data,
      header: {
        "XX-TOKEN": wx.getStorageSync('token'),
        "XX-DEVICE-TYPE": "jjr_dian",
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.code == 0) {

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDetails();
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