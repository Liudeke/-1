// pages/QRCode/QRCode.js
var QRCode = require('../../utils/weapp-qrcode.js')
var qrcode;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    text: 'https://github.com/tomfriwel/weapp-qrcode',
    image: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.code);
    qrcode = new QRCode('canvas', {
      // usingIn: this,
      // text: "https://github.com/tomfriwel/weapp-qrcode",
      text:options.code,
      image: '../../slices/bg.jpg',
      width: 250,
      height: 250,
      colorDark: "#1CA4FC",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  confirmHandler: function (e) {
    var value = e.detail.value
    qrcode.makeCode(value)
},
inputHandler: function (e) {
    var value = e.detail.value
    this.setData({
        text: value
    })
},
tapHandler: function () {
    // 传入字符串生成qrcode
    qrcode.makeCode(this.data.text)
},
// 长按保存
save: function () {
    console.log('save')
    wx.showActionSheet({
        itemList: ['保存图片'],
        success: function (res) {
            console.log(res.tapIndex)
            if (res.tapIndex == 0) {
                qrcode.exportImage(function (path) {
                    wx.saveImageToPhotosAlbum({
                        filePath: path,
                    })
                })
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