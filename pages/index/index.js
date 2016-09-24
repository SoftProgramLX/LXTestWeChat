//index.js
Page( {
  data: {
    datas: [],
    modalHidden: true,
    modalText: "",
  },

  //view加载
  onLoad: function() {
    console.log( 'onLoad' )
    var that = this

    //网络请求
    wx.request( {
      url: 'https://api.douban.com/v2/user',
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      data: {
        q: 'iOS',
        count: '30'
      },
      success: function( res ) {
        //获取到了数据
        var newData = res.data;
        console.log( newData.users );
        that.setData( {
          datas: newData.users
        })
        that.update()
      }
    });
  },

  //事件响应

  didSelectCell: function(prama) {
    var menuItem = this.data.datas[parseInt(prama.currentTarget.id)] 
    console.log(prama.currentTarget.id);

    this.setData({
      modalHidden: false,
      modalText:"点击了第" + prama.currentTarget.id + "位 姓名："+ menuItem.name
    })
  },

  modalChange: function(e) {
    this.setData({
      modalHidden: true
    })
  }

})
