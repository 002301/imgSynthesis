// @ts-nocheck
/** 
 * canvas图片合并类
 * @class
 * @classdesc 
 * 通过传入多个文本或者图片合成一张jpg或者png图片
 * @author  maning
 * 
 * 
*/

class imgSynthesis {
  /**
   * 创建合成图片
   * @param {number} [w = 640] -图片宽度
   * @param {number} [h = 1236] -图片高度
   * @param {string} bg -设置背景
   * 
   * @example
   * let is = new imgSynthesis(100,100,"#ffffff");
   * let img = new images();
   * img.scr = is.getImg();
   */
  constructor(w = 640, h = 1236, bg="") {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = w;
    this.canvas.height = h;
    if(bg!=""){
      this.ctx.fillStyle = bg;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  /**
   * 
   * 批量传入图片或者文字
   * @param {array} [imgs] - 传入的图片数组
   * @returns {object} 返回 imgSynthesis 本身
   * 
   * @example
   * 
   * is.addImgs([
   *  ["测试1",10,10,{w:50,color:"#000000"}],
   *  ["测试2",10,40,{size:"30px",writingMode:"td"}],
   *  ["测试3",10,70,{size:"30px",w:300,algin:"center"}],
   * ])
   */

  async addImgs(imgs) {
    //批量添加图片
    if (imgs!=null){
      for (let i of imgs) {
        await this.addImg(...i);
      }
    }
    return this
  };
    /**
   * 
   * 批量传入文字
   * @param {array} [txts] - 传入的图片数组
   * @returns {object} 返回 imgSynthesis 本身
   * 
   * @example
   * 
   * is.addImgs([['千山鸟飞绝',0,400],['万径人踪灭',0,450]])
   */
  async addTxts(txts) {
    //批量添加文本
    if (txts != null) {
      for (let i of txts) {
        await this.addTxt(...i);
      }
    }
    return this
  };
  
  /**添加文本
  * 
  * 
  * @param {string} [text= "文本"] - 内容（必填）
  * @param {number} [x=0] - 设置x轴位置
  * @param {number} [y=0] - 设置y轴位置
  * @param {object} [opts] - 参数
  * @param {number} [opts.w = 156] - 设置宽度
  * @param {number} [opts.h = 50] - 设置高度
  * @param {string} [opts.size = '24px'] - 设置字号
  * @param {string} [opts.color='#ffffff'] - 颜色
  * @param {number} opts.writingMode - 传入'td'会以竖排方式显示
  * @param {string} [opts.align=left] - 对齐方式 left|center|right
  * 
  * @example
  * //添加文本
  * is.addTxt("文本")
  * //设置大小、颜色、对齐方式等等
  * is.addTxt("文本1",100,100,{size:"30px",color:"#e3e3e3",align:"center",w:400})
  */
  addTxt(text = "文本",x = 0, y = 0,opts={}) {
    return new Promise(res =>{
      this.setText();
      let {  w = 156, h=0, size = '24px',color = '#ffffff',writingMode = '', align = 'left' } = opts;
      this.ctx.font = size +"  Arial";
      this.ctx.textAlign = align;
      this.ctx.textBaseline = "top";
      this.ctx.fillStyle = color;
      if (writingMode == 'td') {
        this.ctx.fillTextVertical(String(text), x, y);
      } else {
        if(h==0){
          h = parseInt(size.replace(/px/,""))
        }
        this.ctx.wrapText(String(text), x, y, w,h);
      }
      res(this)
    })
    
  }
  /** 画一个矩形 
  * 
  * @param {number} x - 设置x轴位置
  * @param {number} y - 设置y轴位置
  * @param {number} w - 设置宽度
  * @param {number} h - 设置高度
  * @param {string} color - 颜色
  * 
  * @example
  * //设置一个宽高100的纯色方块
  * is.addRect(100,100,10,10)
  */
  addRect(w = 10, h = 10,x = 0, y = 0, color='#00ff00'){
    return new Promise(res=>{
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, w, h);
      res(this)
    })
  }
  /**添加图片
  * 
  * @param {string} src -  图片地址
  * @param {number} [x=0] - 设置x轴位置
  * @param {number} [y=0] - 设置y轴位置
  * @param {object} [opts] - 扩展参数
  * @param {string} [opts.algin =l] - 设置对齐方式 l|r
  * @param {string} [opts.w] -  设置宽度
  * @param {string} [opts.h] -  设置高度
  * 
  * @example
  * is.addImg('img.png',10,100，{w:100,h:100,algin:r})
  */
  addImg(src,x=0,y=0,opts={}) {
    return new Promise((resolve, reject) => {
      let img_bg = new Image();
      img_bg.setAttribute('crossOrigin', 'anonymous');
      // console.log(src)
      if (src) {
        img_bg.onload = () => {
          let {algin = 'l' } = opts;
            if (algin == 'r') {
              x = x - img_bg.width;
            }
          
          if (opts.w) {
            this.ctx.drawImage(img_bg, x, y, opts.w, opts.h);
          } else {
            this.ctx.drawImage(img_bg, x, y);
          }
          resolve(this);
        }
        img_bg.src = src;
      } else {
        reject('缺少src参数');
      }
    })
  }
  /**
   * 获取canvas图片内容<br>
   * https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL
   * @param {string} [str="image/png"] - 需要获取的图片类型"image/png"/"image/jpeg"/"image/webp"
   *
   * @example
   * //获取合成的图片
   * is.getImg("image/jpeg")
   */ 
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
export default imgSynthesis ;