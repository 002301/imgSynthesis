// canvas图片合并类
// 传入参数只有src是必填，其他都可以不填，定位默认0，0
// 20190328  maning
/*
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
*/

class imgSynthesis{
  constructor(){
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext('2d');
  }
  async set({width=640,height=1236,msg=null,img}){
    this.canvas.width = width;
    this.canvas.height = height;
      for(let i of img){ 
        let img_bg = new Image();
        img_bg.setAttribute('crossOrigin', 'anonymous');
        await  new Promise((resolve,reject)=>{
          if(i.src){
            img_bg.onload = ()=>{
              let {x=0,y=0} = i;
              this.ctx.drawImage(img_bg,x,y);
              resolve();
            }
            img_bg.src=i.src;
          }else{
            reject('缺少src参数');
          }
          
        })
      }
      if(msg){
        this.setText();
        let {text='',size='24px',width=156,color='#000000',x=0,y=0} = msg;
        this.ctx.font = size+" bold Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "bottom";
        this.ctx.fillStyle = color;
        let MeasureWrapTextHeight = this.ctx.MeasureWrapTextHeight(text,width,size);
        this.ctx.wrapText(text,x,y,width,size);
      }
      return this.canvas.toDataURL();
    };
  setText(){
    // canvas 文字换行
    CanvasRenderingContext2D.prototype.wrapText = function(
      text,
      x,
      y,
      maxWidth,
      lineHeight
    ) {
      if (typeof text != "string" || typeof x != "number" || typeof y != "number") {
        return;
      }
      const context = this;
      const canvas = context.canvas;
      if (typeof maxWidth == "undefined") {
        maxWidth = (canvas && canvas.width) || 300;
      }
      if (typeof lineHeight == "undefined") {
        lineHeight =
          (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) ||
          parseInt(window.getComputedStyle(document.body).lineHeight);
      }
      // 字符分隔为数组
      let arrText = text.split("");
      let line = "";
      for (let n = 0; n < arrText.length; n++) {
        const testLine = line + arrText[n];
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          context.fillText(line, x, y);
          line = arrText[n];
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      context.fillText(line, x, y);
    };
    // 测量文字高度
    CanvasRenderingContext2D.prototype.MeasureWrapTextHeight = function(
      text,
      maxWidth,
      lineHeight
    ) {
      if (typeof text != "string") {
        return;
      }
      const context = this;
      const canvas = context.canvas;
      if (typeof maxWidth == "undefined") {
        maxWidth = (canvas && canvas.width) || 300;
      }
      if (typeof lineHeight == "undefined") {
        lineHeight =
          (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) ||
          parseInt(window.getComputedStyle(document.body).lineHeight);
      }
      let strHeight = lineHeight;

      // 字符分隔为数组
      let arrText = text.split("");
      let line = "";
      for (let n = 0; n < arrText.length; n++) {
        const testLine = line + arrText[n];
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          line = arrText[n];
          strHeight += lineHeight;
        } else {
          line = testLine;
        }
      }
      return strHeight;
    };
  }
}

export default new imgSynthesis();