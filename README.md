# LXTestWeChat
微信小程序” 也叫做“微信应用号”，对于用户，它就是在微信里使用应用的方式，点一个按钮、搜一搜、扫一扫、或者一条链接就能打开那个“应用”，不需要下载删除和跳离微信，体验和原生媲美。这对原生app产生了很大冲击，有替代App Store与安卓各大应用市场的趋势，这自然引发了程序员的很大响应，自然我做移动前端的更是按耐不住去尝试下它的魅力。

它是使用js脚本语言开发，微信提供了一套很优秀的组件供前端开发，集合html+css使用非常方便。但是不支持使用DOM操作，那给标签怎么刷新数据呢？接着往下看。

微信发布的小程序内测刚两天，目前只能通过破解版的微信web开发者工具0.9版本开发。工具集成了下列很好的插件：console（控制台）、source（查看源文件）、network（查看网络相关数据）、storage（缓存数据）、appdata（app的数据）、wxml（运行时边看边改css与标签）。亲自动手去体验下他们的功效吧。

开发环境配置略过，下面看下练习的网络开发实践demo界面。

![screen.png](http://upload-images.jianshu.io/upload_images/301102-b16a5acbbae0cf53.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
<br>

##代码解析：
为了熟悉开发环境以及API只写了一个动态界面。

#####一.wxml文件
```html
<!--index.wxml-->
<view class="container">
  <modal title="提示" confirm-text="确定" cancel-text="取消" hidden="{{modalHidden}}" mask bindconfirm="modalChange" bindcancel="modalChange">
            {{modalText}}
  </modal>

  <view class="listview">
    <block wx:for-items="{{datas}}" wx:for-item="item">
      <view id="{{index}}" class="cellview" bindtap="didSelectCell" >
        <image class="cellimage" mode="scaleToFill" src="{{item.large_avatar}}"/>
        <view class="celllabel">
          <text class="celltext" >{{item.name}}</text>
          <text class="celldetail">{{item.desc}}</text>
        </view>
      </view>
    </block>
  </view>
</view>
```
wxml类似于html文件，里面的标签全是微信提供的组件标签，里面嵌套了js的数据，这都是与html的区别所在。有个特别的标签block，他综合了html的table标签或安卓listview功能与for循环枚举特性，使用快捷。

#####二.wxss文件
```
/**index.wxss**/
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
}
.listview {
  width: 100%;
  background-color: lightgray;
}
.cellview {
  background-color: white;
  margin-top: 2rpx;
  padding: 28rpx;
  display: flex;
  flex-direction: row;
}
.cellimage{
  min-width: 120rpx;
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
}

.celllabel {
  display: flex;
  flex-direction: column;
  margin-left: 20rpx;
}
.celltext{
  font-size: 18px;
  margin-bottom: 16rpx;
}
.celldetail {
  font-size: 16px;
  max-height: 2em;
  color: grey;
  overflow:hidden;
}
```
漂亮的界面当然离不开css的渲染，这与html里的css一样，不作解释。

#####三.js文件
```JavaScript
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
```
data下的数据可在wxml里直接使用，所以我们通过这个通道给标签传输数据。app启动后会掉用onLoad方法，在这里进行网络请求获取数据列表展示到界面上。方法简单便于阅读。


##遇到的坑
#####1.使用网络请求时报错提示：”URL 域名不合法，请在 mp 后台配置后重试”
解决方法：修改asdebug.js的代码，文件位置在：应用程序/开发工具/显示包内容/Contents//Resources/app.nw/app/dist/weapp/appservice/asdebug.js。注释掉报错的地方，有两处，如下图
![AC8400AF-48E3-40B8-8A45-497F3E363F30.jpg](http://upload-images.jianshu.io/upload_images/301102-bd3abfa77c1ee9e0.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#####2.加载本地图片与网络图片资源无效
解决方法：必须在根目录新建文件夹“resources”，并添加一张图片，然后试用可行后，便可加载别的图片。

如有疑问请留言。

<br>
源码请点击[github地址](https://github.com/SoftProgramLX/LXTestWeChat)下载。
---
QQ:2239344645    [我的github](https://github.com/SoftProgramLX?tab=repositories)<br>
