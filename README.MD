###2.0 
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
添加了说明文档
[说明文档](./docs/imgSynthesis.html)

添加了测试用例
[测试用例](./example/index.html)

