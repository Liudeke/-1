// pages/search/search.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    IsShowCount: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  itemInfo: function (data) {
    //console.log("147")
    var txtdata = JSON.stringify(data.currentTarget.dataset.operation);
    wx.navigateTo({
      url: "/pages/iteminfo/iteminfo?code=" + txtdata + "&delete=false",
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },

  previewImg: function (data) {
    console.log(data.currentTarget.dataset.operation);//currentTarget:dataset
    var txtdata = JSON.stringify(data.currentTarget.dataset.operation);
    console.log(txtdata);

    wx.navigateTo({
      url: "/pages/QRCode/QRCode?code=" + txtdata,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  clickScanCode: function () {

  }
  ,

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
      list: []
    })
    let twolist = []
    //初始化精选预置位数据
    try {
      var value = wx.getStorageSync('selecteddatas')
      if (value) {
        twolist = twolist.concat(value)
      }


    } catch (e) {

    }
    //初始化我的预置位数据
    try {
      var value = wx.getStorageSync('myItems')
      if (value) {
        twolist = twolist.concat(value)
      }


    } catch (e) {

    }
    //init collection data
    let collection = []
    try {
      var value = wx.getStorageSync('collectDatas')
      if (value) {
        collection = collection.concat(value)
      }

    } catch (e) {

    }

    let myThis = this;
    collection.forEach((item, index) => {

      twolist.forEach((item1, index1) => {
        if (item.Savetime == item1.Savetime) {
          myThis.data.list = myThis.data.list.concat(item1);

        }
      })


    })
    console.log(this.data.list.length)

    myThis.setData({
      list: this.data.list
    })
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
  onShareAppMessage() {

  },

  //字符串转json 

  stringToJson: function (data) {

    return JSON.parse(data);

  },

  //  json转字符串

  jsonToString: function (data) {

    return JSON.stringify(data);

  },

  //  map转为json

  mapToJson: function (map) {

    return JSON.stringify(strMapToObj(map));

  },

  //  json转为map

  jsonToMap: function (jsonStr) {

    return objToStrMap(JSON.parse(jsonStr));

  },

  //  map转化为对象

  strMapToObj: function (strMap) {

    let obj = Object.create(null);

    for (let [k, v] of strMap) {

      obj[k] = v;

    }

    return obj;

  },

  //  对象转化为map

  objToStrMap: function (obj) {

    let strMap = new Map();

    for (let k of Object.keys(obj)) {

      strMap.set(k, obj[k]);

    }

    return strMap;

  }
})