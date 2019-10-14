/**
 * @description: rem 设置  1rem 约等于 100px
 * @param {type} 
 * @return: 
 */
(function(doc, win) {
  let docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function() {
        let clientWidth = docEl.clientWidth;
        if(!clientWidth) return;
        if(clientWidth >= 750) {
          docEl.style.fontSize = '100px';
        } else {
          docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
        }
      };
  if(!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
  

  let dpr, scale = null
  if (!dpr && !scale) {
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
      // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3;
      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
        dpr = 2;
      } else {
        dpr = 1;
      }
    } else {
      // 其他设备下，仍旧使用1倍的方案
      dpr = 1;
    }
    scale = 1 / dpr;
  }
  document.documentElement.setAttribute('data-dpr', dpr);
})(document, window);