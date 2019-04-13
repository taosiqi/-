# Flexible

原文地址：<a href="<http://vue.ydui.org/docs/#/flexible>" target="_blank">传送门</a>

##  1、注意！！！

### 文字较多，看前请喝水；

##  2、rem是什么？

### 2.1、rem (font size of the root element) 是相对根元素 <html> 的字体大小变化而变化的css单位，实现强大的屏幕适配布局是它的优势；

 所以不同屏幕大小的终端，它的根元素 <html> 的字体大小是需要相应变化的，一般由 JS 控制或者 media query 控制；

 本文不考虑 media query 方式，因为Android太多分辨率了，嗯~ 不说了...

### 2.2、既然 rem 是一个css单位，编写样式的时肯定得将设计图中的px转为rem，怎么转换取决于你的脚本怎么控制，于是有了本文；

##  3、需要解决的问题

### 3.1、如何根据不同大小的屏幕修改根元素 <html> 的字体大小？

### 3.2、写样式时，如何将设计MM给的图轻松转换为css对应的rem？

##  4、解决方案

### 4.1、ydui.flexible.js 是处理移动端 rem 自适应（可伸缩布局方案）的类库，无须第三方工具（如Sass/Less方法、Gulp、Sublime插件），轻松口算设计稿对应rem值；

### 4.2、ydui.flexible.js 源码：

```
/*
 * @Author: Ooo_My_God 
 * @Date: 2019-04-13 14:36:01 
 * @Last Modified by: 陶思淇
 * @Last Modified time: 2019-04-13 14:37:09
 * tip rem计算方式：设计图尺寸px / 100 = 实际rem  【例: 100px = 1rem，32px = .32rem】
 */
!function (window) {

    /* 设计图文档宽度 */
    var docWidth = 750;

    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = (function refreshRem () {
        var clientWidth = docEl.getBoundingClientRect().width;

        /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
        docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

        return refreshRem;
    })();

    /* 添加倍屏标识，安卓为1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /* 添加IOS标识 */
        doc.documentElement.classList.add('ios');
        /* IOS8以上给html添加hairline样式，以便特殊处理 */
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
            doc.documentElement.classList.add('hairline');
    }

    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

}(window);
```

##  5、啰嗦几句

### 5.1、ydui.flexible.js 简单粗暴，建议对需要响应页面大小的任何元素都使用 rem 作为单位来定义（除第七点注明的一些CSS属性外）；

 啊啊啊，那字体字号不是会出现13、15px啦？那不是很奇葩？立马掏出我的测试JJ看看，嗯~还是非常美好的！

### 5.2、对于倍图，争议较多，因为如果要做到对应倍图的话，意味着图片都需要做三份，成本太高了，所以只取2倍图；

 实在是非常低成本还原的方案，未尝不可；

 当然也提供了data-dpr标识；

### 5.3、写死viewport，采用scale=1.0，IOS和安卓一视同仁；

 实际使用时，百度地图或者第三方地图也是不支持高清方案的；

 处理1像素边框采用 transform: scale(0.5); 方式实现，IOS8及以上直接使用0.5px边框；

### 5.4、图标方面，单色图标尽量使用 字体图标；多色图标使用 单张图片，不使用雪碧图（也没发现淘宝触屏版哪里用了雪碧图^_^）；

### 5.5、对于 大于320px且小于420px 宽度的设备进行 *等比缩放*，其他宽度的设备 *不做缩放处理*；

 若未设置页面最大宽和最小宽，字体过大或过小会导致页面丑陋，比如在pad或PC上，但实际手机尺寸也不会过大或过小；

##  6、使用方法

### 6.1、在所有资源前加载 ydui.flexible.js；

 在入口页面的 head 标签内引入（不建议在入口文件 main.js 中引入）；

### 6.2、把视觉稿中的px转换成rem；

 rem计算方式：设计图尺寸px / 100 = 实际rem 【例: 100px = 1rem，32px = 0.32rem】；

 特别注意：是不需要再除以2的！！！

### 6.3、无论设计图什么尺寸，算法一致。但需修改 ydui.flexible.js 中 docWidth 变量为设计图宽度；默认设计图文档宽度为750px；

##  7、一些不使用rem的CSS属性

### 7.1、包括但不限于：border-width、border-radius、box-shadow、transform、background-size；

##  8、与淘宝lib-flexible的区别

### 8.1、计算方面，淘宝把视觉稿分成100份来看待，为了以后兼容vh，vw单位，但是计算相对麻烦；

 例如：设计图文档宽度为750px，按钮高度为80px，对应rem则为 80 / 75 ≈ 1.0666666667rem，不借助第三方工具的话，计算还是有一定难度；

### 8.2、处理字号方面，淘宝不推荐用rem作为字号单位，配合用data-dpr属性来区分不同dpr下的字体大小，但手写这些差异肯定不现实，得依赖第三方工具；

 来自淘宝 [lib-flexible](https://github.com/amfe/lib-flexible)：“针对OS 9_3的UA，做临时处理，强制dpr为1，即scale也为1，虽然牺牲了这些版本上的高清方案，但是也只能这么处理了”；

### 8.3、采用动态修改 viewport 中 scale 的值达到缩放效果，但在PC上浏览就会出现轻度模糊；

 你有病啊？不是移动端开发么？但个人调试代码还是在PC上，强迫症患者难受啊！

##  9、总结

### 9.1、编写样式时，只需将设计MM给的图中各元素尺寸的 px 除以 100 得到 rem 写进你的样式文件里即可；

 前提需保证 ydui.flexible.js 中 docWidth 变量与设计图宽度一致；

### 9.2、以上纯属个人观点，如有错误，欢迎指正。Date：2016/03/05