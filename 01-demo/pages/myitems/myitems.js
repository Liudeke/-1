// pages/myitems/myitems.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    itemObj: {},
    IsShowCount: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {

      var value = wx.getStorageSync('myItems')
      if (value) {
        this.setData({
          list: value
        })
      }
      if (!value) {
        this.setData({
          list: []
        })
      }

    } catch (e) {

    }
  },
  previewImg: function (data) {
    let myThis = this;
    // console.log(data.currentTarget.dataset.operation);//currentTarget:dataset
    let savename = data.currentTarget.dataset.operation;


    var txtdata = JSON.stringify(savename);
    console.log(txtdata);

    wx.navigateTo({
      url: "/pages/QRCode/QRCode?code=" + txtdata,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  itemInfo: function (data) {
    //console.log("147")
    var txtdata = JSON.stringify(data.currentTarget.dataset.operation);
    wx.navigateTo({
      url: "/pages/iteminfo/iteminfo?code=" + txtdata + "&delete=true",
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
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
    try {

      var value = wx.getStorageSync('myItems')
      if (value) {
        this.setData({
          list: value
        })
      }
      if (!value) {
        this.setData({
          list: []
        })
      }

    } catch (e) {

    }
    if (this.data.list.length == 0) {
      this.setData({
        IsShowCount: true
      })
    } else {
      this.setData({
        IsShowCount: false
      })
    }

  },
  ScanAdd: function () {
    wx.switchTab({
      url: "/pages/home/home"
    })
  },
  bindinputEvent: function (e) {
    let content = e.detail.value;
    if (content == null || content == "") {
      try {

        var value = wx.getStorageSync('myItems')
        if (value) {
          this.setData({
            list: value
          })
        }
        if (!value) {
          this.setData({
            list: []
          })
        }

      } catch (e) {

      }
    }
    let searchList = [];
    this.data.list.forEach((item, index) => {

      if (item.name.indexOf(content) >= 0) {
        searchList = searchList.concat([item]);
        console.log(searchList.length)
      }

    });
    this.setData({
      list: searchList
    })
  },
  bindblurEvent: function () {
    console.log("bindblurEvent")
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