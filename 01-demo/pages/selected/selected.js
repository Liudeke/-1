// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /* list: [{
      name: "李四",
      Savetime: "2019-11-12"
    }, {
      name: "王五",
      Savetime: "2019-11-12"
    }
    ], */
    list: [],
    toView: 'green'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var listdata;
    try {
      var value = wx.getStorageSync('selecteddatas')
      //console.log('value')

      if (value) {
        // Do something with return value
        // console.log(value)
        this.setData({
          list: value
        })
      }
    } catch (e) {
      // Do something when catch error
    };
    let abc = "大王胆";
    console.log(abc.valueOf('王'))
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
  bindinputEvent: function (e) {
    let content = e.detail.value;
    if (content == null || content == "") {
      console.log('e.detail.value')
      try {
        var value = wx.getStorageSync('selecteddatas')
        //console.log('value')
  
        if (value) {
          // Do something with return value
          // console.log(value)
          this.setData({
            list: value
          })
        }
      } catch (e) {
        // Do something when catch error
      };
    }
    let searchList = [];
    this.data.list.forEach((item, index) => {

      if (item.name.indexOf(content) >=0) {
        searchList = searchList.concat([item]);
        console.log(searchList.length)
      }

    });
    this.setData({
      list:searchList
    })
  },
  bindblurEvent: function () {
    console.log("bindblurEvent")
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
    // this.clickScanCode();
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
    var that = this;
    var show;

    let result = {
      name: "张三",
      Savetime: "2019-11-12"
    };
    // let strdata=stringToJson("")
    for (let index = 0; index < that.data.list.length; index++) {
      if (that.data.list[index].name == result.name) {
        wx.showToast({
          title: '名称已存在'
        })
        return;
      }

    }
    let list = that.data.list.concat([result]);

    that.setData({
      list
    })
    console.log(that.data.list);
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })

  },
  onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
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