// pages/home/home.js
const app = getApp()
var selecteddatasTemp = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: "Hi欢迎使用数字人高清解剖台",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    selecteddatas: [
      {
        id: "1",
        name: "李四",
        Savetime: "2019-11-12"
      },
      {
        id: "1",
        name: "王五",
        Savetime: "2019-11-13"
      }
    ],
    myItems: [],
    dataobj: {
      name: "147"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setStorageSync('myItems', [])

    //初始化我的预置位数据
    try {

      var value = wx.getStorageSync('myItems')
      if (value) {
        this.setData({
          myItems: value
        })
      }
      if (!value) {
        this.setData({
          myItems: []
        })
      }

    } catch (e) {

    }
    var strdat = JSON.stringify(this.data.selecteddatas);


    
    console.log(this.data.myItems) 
    wx.setStorageSync('selecteddatas', this.data.selecteddatas)

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  selectedpage: function () {
    wx.navigateTo({
      url: "/pages/selected/selected",
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  myitemspage: function () {
    wx.navigateTo({
      url: "/pages/myitems/myitems",
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  importitempage: function () {



    var myThis = this;
    let result = {
      id: "1",
      name: "张三8989",
      Savetime: "2019-11-12"
    };
    // wx.setStorageSync('myItems', [])

    wx.scanCode({
      success(res) {
        /* let resulttemp = {
          id: "1",
          name: "张三8989",
          Savetime: "2019-11-12"
        }; */
        var result = JSON.parse(res.result)
        let isExist = false;
        for (let index = 0; index < myThis.data.myItems.length; index++) {
          // console.log(myThis.data.myItems[index].name)
          // console.log(result.name)
          if (myThis.data.myItems[index].Savetime == result.Savetime) {
            isExist = true;
            wx.showToast({
              title: "已添加",
              icon: 'success',
              duration: 2000
            })
          }
        }

        if (isExist == false) {
          let list = myThis.data.myItems.concat([result])
          myThis.setData({
            myItems: list
          })
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          wx.setStorageSync('myItems', myThis.data.myItems)
          wx.navigateTo({
            url: "/pages/myitems/myitems",
            success: (result) => {

            },
            fail: () => { },
            complete: () => { }
          });
        }
        console.log(myThis.data.myItems)
      },
      fail() {

      },
      complete() {

      }

    })
  },
  mulupage:function(){

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

  },
  //字符串转json 

  stringToJson: function (data) {

    return JSON.parse(data);

  },

  //  json转字符串

  jsonToString: function (data) {

    return JSON.stringify(data);

  }
})