

### 1.0.4 版本

添加文本竖向排版功能
txt参数添加 writingMode 属性 传入参数 'td' 文字就会已竖排形式排版
例如
txt':[
{x:558,y:755,text:rd,`writingMode:'td'`,color:'red',size:'18px'},
]

 # canvas图片合并类
// 传入参数只有src是必填，其他都可以不填，定位默认0，0

```js
  @width:Number //canvas宽度
  @height:Number //canvas高度
  @txt:Array //合成文本
      @text:String 合成内容
      @x:Number //x轴
      @y:Number //y轴
      @width:Number //文本的宽度
      @size:24 文本字号
      @color:'#000' //颜色
      @writingMode //writingMode:'td' //文字竖排显示，默认横排
  @img:Array //合并图片数组
      @src:String //图片地址(必填)
      @x:Number //图片x轴
      @y:Number //图片y轴
      @width:Number //图片宽度
      @height:Number //~~图片高度~~
```

#### 参数示例
```js
例1：
  imgSynthesis.set({width:100,height:100,'txt':[{text:'123',x:100,y:100,width:123,size:'60px'},{text:'123',x:100,y:100}],'img':[{x:0,y0,src:'123.jpg'},{x:0,y0,src:'123.jpg'}]}).then((e)=>{
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

#### vue 框架

> npm i img-synthesis
```js
//vue 框架示例
<template>
    <div class="app">
        <img :src="resultBase" class="result-img">
    </div>
</template>

<script>
    import imgSynthesis from 'img-synthesis';
    export default {
        data(){
            return{
                names:'1234',
                resultBase:null,
            }
        },
        mounted(){
            let ls =  new imgSynthesis();
            ls.set({
            'txt':{x:300,y:400,text:this.names},
            'img':[{src:img}]
            }).then((e)=>{
                this.resultBase = e;
            })
        },
    };
   let img ='data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAKAAD/4QNlaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IkQyMjBCNkNCRkJDNjBFQzJEM0JCREZBRTczRTk3OENEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE4REU4NDhCNjAxRTExRTk5NEI5RUFCNDkzN0FBN0U5IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE4REU4NDhBNjAxRTExRTk5NEI5RUFCNDkzN0FBN0U5IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MWIzMzZjNC0zOWFmLWIyNGEtYThhMC1hNDk1YTAyNDBlYzciIHN0UmVmOmRvY3VtZW50SUQ9IkQyMjBCNkNCRkJDNjBFQzJEM0JCREZBRTczRTk3OENEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAFBAQGRIZJxcXJzImHyYyLiYmJiYuPjU1NTU1PkRBQUFBQUFERERERERERERERERERERERERERERERERERERERAEVGRkgHCAmGBgmNiYgJjZENisrNkREREI1QkRERERERERERERERERERERERERERERERERERERERERERERERERE/8AAEQgDeAKAAwEiAAIRAQMRAf/EAEsAAQEAAAAAAAAAAAAAAAAAAAAGAQEAAAAAAAAAAAAAAAAAAAAAEAEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCM/9k='
</script>

<style lang="postcss" scoped>
.result-img{
	width:640px;
	height:1236px;
	position: absolute;
	z-index: 2;
}
</style>
```
