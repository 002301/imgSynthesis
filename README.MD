
 ### canvas图片合并类
// 传入参数只有src是必填，其他都可以不填，定位默认0，0

```js
  @width:Number //canvas宽度
  @height:Number //canvas高度
  @msg:object //合成文本
      @text:String 合成内容
      @x:Number //x轴
      @y:Number //y轴
      @width:Number //文本的宽度
      @size:24 文本字号
      @color:'#000' //颜色
  @img:Array //合并图片数组
      @x:Number //图片x轴
      @y:Number //图片y轴
      @src:String //图片地址(必填)

例1：
  imgSynthesis.set({width:100,height:100,'msg':{text:'123',x:100,y:100,width:123,size:'60px'},'img':[{x:0,y0,src:'123.jpg'},{x:0,y0,src:'123.jpg'}]}).then((e)=>{
    let img = e;
  });
例2：
imgSynthesis.set({
    'msg':{x:300,y:400,text:this.names},
    'img':[{src:imgAssets[bgr]},{y:656,src:er}]
    }).then((e)=>{
        this.resultBase = e;
    })
```
