// pages/iteminfo/iteminfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemheight: "190px",
    isShowDel: true,
    isCollected: false,
    itemData: {
      id: "",
      name: "125",
      Savetime: "2452"
    },
    myItems: [],

    //收藏记录数据
    collectDatas: [],
    lastValue: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myThis = this;
    if (options.code != null) {
      let dataobj = JSON.parse(options.code);
      this.setData({
        itemData: dataobj
      })
      if (options.delete == 'false') {
        this.setData({
          isShowDel: false
        })
      }
    }
    //初始化我的预置位数据
    try {
      var value = wx.getStorageSync('myItems')
      if (value) {
        this.setData({
          myItems: value
        })
      }


    } catch (e) {

    }
    //  wx.setStorageSync('collectDatas', [])

    //初始化收藏数据
    try {
      var value = wx.getStorageSync('collectDatas')
      if (value) {
        this.setData({
          collectDatas: value
        })
      }


    } catch (e) {

    }
    this.data.collectDatas.forEach((item, index) => {

      if (item.Savetime == this.data.itemData.Savetime) {
        this.setData({
          isCollected: item.isCollected
        })
      }
    })
    // console.log(this.data.collectDatas.length+'--length')
    if (this.data.isShowDel) {
      this.setData({
        itemheight: "110px"
      })

    } else {

    }

  },
  ExportQRCode: function (data) {
    var txtdata = JSON.stringify(this.data.itemData);
    console.log(txtdata);

    wx.navigateTo({
      url: "/pages/QRCode/QRCode?code=" + txtdata,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  EditorTxt: function (data) {
    wx.navigateTo({
      url: "/pages/editorName/editorName?code=" + this.data.itemData.name,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
    console.log("51561")
  },
  CollectionData: function (data) {
    let ishave = false;

    this.data.collectDatas.forEach((item, index) => {
      if (item.Savetime == this.data.itemData.Savetime) {
        ishave = true;
        item.isCollected = true
        this.setData({
          collectDatas: this.data.collectDatas

        })

      }
    });

    if (ishave == false) {
      let savetime = this.data.itemData.Savetime
      let rsualt = {
        isCollected: true,
        Savetime: savetime
      }
      let list = this.data.collectDatas.concat([rsualt])
      this.setData({
        collectDatas: list
      })
    }
    console.log(this.data.collectDatas.length + '--length')
    wx.setStorageSync('collectDatas', this.data.collectDatas)

    this.setData({
      isCollected: true
    })
  },
  DoneCollectionData: function () {
    this.data.collectDatas.forEach((item, index) => {
      if (item.Savetime == this.data.itemData.Savetime) {
        this.data.collectDatas.splice(index, 1);
        this.setData({
          collectDatas: this.data.collectDatas

        })
        console.log(this.data.collectDatas.length + '--length')

        wx.setStorageSync('collectDatas', this.data.collectDatas)
      }
    });
    this.setData({
      isCollected: false
    })
  },
  DeleteData: function (data) {
    //删除预置位数据
    this.data.myItems.forEach((item, index) => {
      if (item.Savetime == this.data.itemData.Savetime) {
        this.data.myItems.splice(index, 1);
        this.setData({
          myItems: this.data.myItems
        })
        wx.setStorageSync('myItems', this.data.myItems)
        wx.switchTab({
          url: "/pages/home/home",
          success: (result) => {

          },
          fail: () => { },
          complete: () => { }
        });
      }
    });
    //删除收藏数据
    this.data.collectDatas.forEach((item, index) => {
      if (item.Savetime == this.data.itemData.Savetime) {
        this.data.collectDatas.splice(index, 1);
        this.setData({
          collectDatas: this.data.collectDatas

        })
      }
    });
    wx.setStorageSync('collectDatas', this.data.collectDatas)

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
    console.log(this.data.lastValue)
    if (this.data.lastValue == "")
      return;
    //删除预置位数据
    this.data.myItems.forEach((item, index) => {
      if (item.Savetime == this.data.itemData.Savetime) {
        item.name = this.data.lastValue;
        this.data.itemData.name = this.data.lastValue;
        this.setData({
          myItems: this.data.myItems,
          itemData: this.data.itemData

        })

        wx.setStorageSync('myItems', this.data.myItems)

      }
    });
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