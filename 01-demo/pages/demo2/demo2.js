// pages/demo2/demo2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   num:0
  },
  handleInput(e) {
    console.log(e.detail.value);
    this.setData({
      num:e.detail.value
    });
  },
  handleBtn(e){
    const operation=e.target.dataset.operation;
    console.log(operation)
    this.setData({
      num:this.data.num+operation
    })
  }
 

})