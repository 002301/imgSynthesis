[![NPM](https://nodei.co/npm/img-synthesis.png?downloads=true)](https://www.npmjs.com/package/img-synthesis)
>npm i img-synthesis
### 2.0.1

修改了文本自动换行功能

```js
//可以传入h参数设置文本行间距，如果不传入默认为字号大小
await ls.addTxt('测试测试测试测试测试测试测试测试',120,120,{h:50});

```
### 2.0.0
此版本优化了很多参数，把必要的参数提出来，不必要的参数作为配置传入

安装方式npm
> npm i img-synthesis

使用方法
```html
<script  type="module">
   //导入库
    import imgSynthesis from '../src/imgSynthesis.js';
    //设置宽高和背景颜色
    let is = new imgSynthesis(400,400,"#0381ff");
    //设置文字
    is.addTxt("有人吗？",100,100);
    // 导出生成的图片
    let img = new Image();
    img.src = is.getImg();
    document.querySelector(".img").appendChild(img);
</script>

```
添加了测试用例
[测试用例](https://002301.github.io/imgSynthesis/example/index.html)

