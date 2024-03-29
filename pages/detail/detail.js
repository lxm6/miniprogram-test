// pages/detail/detail.js
let datas = require('../../datas/list-data');
let appData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    isCollected: false,
    index: 0,
    isPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取传递过来的数据，更新当前的data
    this.setData({
      detailObj: datas.list_data[options.id],
      index: options.id
    });
    // 获取本地存储数据
    let storageObj = wx.getStorageSync('isCollected');
    console.log(storageObj);
    // 判断是否存储过数据
    if (!storageObj) {
      storageObj = {};
      wx.setStorage({
        key: 'isCollected',
        data: storageObj
      });
    } else {
      // 根据是否收藏当前页面文章的的标识动态生成isCollected
      let isCollected = storageObj[options.id] ? true : false;
      // 更新isCollected的值。
      this.setData({
        isCollected
      });
    }
    // 判断当前页面音乐是否播放
    if (appData.globalData.isMusicPlay && appData.globalData.playPageIndex === this.data.index) {
      this.setData({
        isPlay: true
      })
    }
    // 监听背景音乐的播放
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlay: true
      })
      appData.globalData.isMusicPlay = true;
      appData.globalData.playPageIndex = this.data.index;
    })
    // 监听音乐暂停。
    wx.onBackgroundAudioPause(() => {
      // console.log('音乐暂停');
      this.setData({
        isPlay: false
      })
    })
  },
  //点击分享按钮
  handleShare() {
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到qq空间', '分享到微信好友'],
      itemColor: '#666'
    })
  },
  // 控制音乐播放
  musicControl() {
    let isPlay = !this.data.isPlay;
    let {
      dataUrl,
      title,
      coverImgUrl
    } = this.data.detailObj.music;
    if (isPlay) {
      wx.playBackgroundAudio({
        dataUrl,
        title,
        coverImgUrl
      })
    } else {
      wx.pauseBackgroundAudio()
    }
    this.setData({
      isPlay
    });

  },
  handleCollection() {
    let isCollected = !this.data.isCollected;

    // 存储之前先获取之前的数据
    let obj = wx.getStorageSync('isCollected');
    obj[this.data.index] = isCollected;
  console.log(obj);
    // 提示用户收藏的状态
    let title = isCollected ? '收藏成功' : '取消收藏';
    wx.showToast({
      title: title,
      icon: 'success'
    })
    wx.setStorage({
      key: 'isCollected',
      data: obj,
    })
    this.setData({
      isCollected
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})