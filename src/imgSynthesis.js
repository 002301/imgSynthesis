
/** 
 * canvas图片合并类
 * 通过传入多个文本或者图片合成一张jpg或者png图片
 * 
 * @author  maning
 * @time 20190328
*/


class imgSynthesis {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext('2d');
  }
  /**
   * 初始化函数（异步函数）
   * 设置宽、高、背景颜色、批量传入图片或者文字
   * @param {object} obj - 传入一个对象
   * @param {number} obj.w -图片宽度
   * @param {number} obj.h -图片高度
   * @param {color} obj.bg - 设置背景颜色 #ffffff
   * @param {array} obj.txts - 传入的文字数组
   * @param {array} obj.imgs - 传入的图片数组
   * @returns {object} 返回 imgSynthesis 本身
   * 
   * 
   * 
   * 
   */

  async init({ w = 640, h = 1236, bg="", txts = null, imgs =null}) {
    // console.log(width, height)
    this.canvas.width = w;
    this.canvas.height = h;
    if(bg!=""){
      this.ctx.fillStyle = bg;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    // console.log(txt);
    //批量添加图片
    if (imgs!=null){
      for (let i of img) {
        await this.addImg(i);
      }
    }
    //批量添加文本
    if (txts != null) {
      for (let i of txt) {
        this.addTxt(i);
      }
      return this
    }

  };
  /**添加文本
  * @param {object} obj -  文本内容
  * @param {string} obj.text - 内容（必填）
  * @param {number} obj.x - 设置x轴位置
  * @param {number} obj.y - 设置y轴位置
  * @param {number} obj.w - 设置宽度
  * @param {string} obj.size - 设置字号
  * @param {string} obj.color - 颜色
  * @param {number} obj.writingMode - 传入'td'会以竖排方式显示
  * @param {string} obj.align - 对齐方式 left|center|right
  * 
  */
  addTxt(i) {
    this.setText();
    let { x = 0, y = 0, w = 156, size = '24px',text = null,color = '#000000',writingMode = '', align = 'center' } = i;
    this.ctx.font = size +"  Arial";
    this.ctx.textAlign = align;
    this.ctx.textBaseline = "bottom";
    this.ctx.fillStyle = color;
    // console.log(writingMode);
    if (writingMode == 'td') {
      this.ctx.fillTextVertical(String(text), x, y);
    } else {
      let MeasureWrapTextHeight = this.ctx.MeasureWrapTextHeight(text, width, size);
      this.ctx.wrapText(String(text), x, y, width, size);
    }
    // console.log('text', text)
    return this
  }
  /** 画一个矩形 
  * addRect({w,h,x,y,color})
  * @param {object} obj -  参数
  * @param {number} obj.x - 设置x轴位置
  * @param {number} obj.y - 设置y轴位置
  * @param {number} obj.w - 设置宽度
  * @param {number} obj.h - 设置高度
  * @param {string} obj.color - 颜色
  */
  addRect(i){
    return new Promise(res=>{
      let { x = 0, y = 0, w = 10, h = 10, color='#00ff00'} = i;
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, w, h);
      res(this)
    })
  }
  /**添加图片
  *  addImg({src,x,y,algin})
  * @param {object} obj -  参数
  * @param {number} obj.src - 图片地址
  * @param {number} obj.x - 设置x轴位置
  * @param {number} obj.y - 设置y轴位置
  * @param {string} obj.algin - 设置对齐方式 l|r
  * @param {string} obj.w -  设置宽度
  * @param {string} obj.h -  设置高度
   */
  addImg(i) {
    return new Promise((resolve, reject) => {
      let img_bg = new Image();
      img_bg.setAttribute('crossOrigin', 'anonymous');
      // console.log(i.src)
      if (i.src) {
        img_bg.onload = () => {
          let { x = 0, y = 0, algin = 'l' } = i;
          if (algin == 'r') {
            x = x - img_bg.width;
          }
          if (i.w != undefined) {
            this.ctx.drawImage(img_bg, x, y, i.w, i.h);
          } else {
            this.ctx.drawImage(img_bg, x, y);
          }
          resolve(this);
        }
        img_bg.src = i.src;
      } else {
        reject('缺少src参数');
      }
    })
  }
  /**
   * 获取canvas图片内容<br>
   * https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL
   * @param {string} str - 需要获取的图片类型默认"image/png" 或 "image/jpeg" 或 "image/webp"
   */
  //
  // 
  getImg(str='') {
    if(str!=''){
      return this.canvas.toDataURL(str);
    }else{
      return this.canvas.toDataURL();
    }
    
  }
  //文字设置 kongdejian
  setText() {
    // canvas 文字换行
    CanvasRenderingContext2D.prototype.wrapText = function (
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
    CanvasRenderingContext2D.prototype.MeasureWrapTextHeight = function (
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



    /**
     * 文本竖排显示
    * @author zhangxinxu(.com)
    * @licence MIT
    * @description http://www.zhangxinxu.com/wordpress/?p=7362
    */
    CanvasRenderingContext2D.prototype.fillTextVertical = function (text, x, y) {
      let context = this;
      let canvas = context.canvas;

      let arrText = text.split('');
      let arrWidth = arrText.map(function (letter) {
        return context.measureText(letter).width;
      });

      let align = context.textAlign;
      let baseline = context.textBaseline;

      if (align == 'left') {
        x = x + Math.max.apply(null, arrWidth) / 2;
      } else if (align == 'right') {
        x = x - Math.max.apply(null, arrWidth) / 2;
      }
      if (baseline == 'bottom' || baseline == 'alphabetic' || baseline == 'ideographic') {
        y = y - arrWidth[0] / 2;
      } else if (baseline == 'top' || baseline == 'hanging') {
        y = y + arrWidth[0] / 2;
      }

      context.textAlign = 'center';
      context.textBaseline = 'middle';

      // 开始逐字绘制
      arrText.forEach(function (letter, index) {
        // 确定下一个字符的纵坐标位置
        let letterWidth = arrWidth[index];
        // 是否需要旋转判断
        let code = letter.charCodeAt(0);
        if (code <= 256) {
          context.translate(x, y);
          // 英文字符，旋转90°
          context.rotate(90 * Math.PI / 180);
          context.translate(-x, -y);
        } else if (index > 0 && text.charCodeAt(index - 1) < 256) {
          // y修正
          y = y + arrWidth[index - 1] / 2;
        }
        context.fillText(letter, x, y);
        // 旋转坐标系还原成初始态
        context.setTransform(1, 0, 0, 1, 0, 0);
        // 确定下一个字符的纵坐标位置
        let letterWidth2 = arrWidth[index];
        y = y + letterWidth2;
      });
      // 水平垂直对齐方式还原
      context.textAlign = align;
      context.textBaseline = baseline;
    };
  }
}
module.exports = imgSynthesis;