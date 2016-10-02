/**
 * 触摸或鼠标事件
 * @type {{start: string, move: string, end: string}}
 */
mdui.touchEvents = {
  start: mdui.support.touch ? 'touchstart' : 'mousedown',
  move: mdui.support.touch ? 'touchmove' : 'mousemove',
  end: mdui.support.touch ? 'touchend' : 'mouseup'
};

/**
 * 判断窗口大小
 * @type {{xs: mdui.screen.xs, sm: mdui.screen.sm, md: mdui.screen.md, lg: mdui.screen.lg, xl: mdui.screen.xl, xsDown: mdui.screen.xsDown, smDown: mdui.screen.smDown, mdDown: mdui.screen.mdDown, lgDown: mdui.screen.lgDown, xlDown: mdui.screen.xlDown, xsUp: mdui.screen.xsUp, smUp: mdui.screen.smUp, mdUp: mdui.screen.mdUp, lgUp: mdui.screen.lgUp, xlUp: mdui.screen.xlUp}}
 */
mdui.screen = {
  xs: function () {
    return window.innerWidth < 600;
  },
  sm: function () {
    return window.innerWidth >= 600 && window.innerWidth < 1024;
  },
  md: function () {
    return window.innerWidth >= 1024 && window.innerWidth < 1440;
  },
  lg: function () {
    return window.innerWidth >= 1440 && window.innerWidth < 1920;
  },
  xl: function () {
    return window.innerWidth >= 1920;
  },

  xsDown: function () {
    return window.innerWidth < 600;
  },
  smDown: function () {
    return window.innerWidth < 1024;
  },
  mdDown: function () {
    return window.innerWidth < 1440;
  },
  lgDown: function () {
    return window.innerWidth < 1920;
  },
  xlDown: function () {
    return true;
  },

  xsUp: function () {
    return true;
  },
  smUp: function () {
    return window.innerWidth >= 600;
  },
  mdUp: function () {
    return window.innerWidth >= 1024;
  },
  lgUp: function () {
    return window.innerWidth >= 1440;
  },
  xlUp: function () {
    return window.innerWidth >= 1920;
  }
};

/**
 * 创建遮罩层并显示
 * @param zIndex 遮罩层的 z_index
 * @returns {Element}
 */
mdui.showOverlay = function (zIndex) {
  var overlay = $.dom('<div class="md-overlay">')[0];
  document.body.appendChild(overlay);

  // 使动态添加的元素的 transition 动画能生效
  $.getStyle(overlay, 'opacity');

  if (typeof zIndex === 'undefined') {
    zIndex = 100;
  }
  overlay.style['z-index'] = zIndex;
  overlay.classList.add('md-overlay-show');

  return overlay;
};

/**
 * 隐藏遮罩层
 * @param overlay 指定遮罩层元素，若没有该参数，则移除所有遮罩层
 */
mdui.hideOverlay = function (overlay) {
  var overlays;
  if (typeof overlay === 'undefined') {
    overlays = $.queryAll('.md-overlay');
  } else {
    overlays = [overlay];
  }
  $.each(overlays, function (i, overlay) {
    overlay.classList.remove('md-overlay-show');
    $.transitionEnd(overlay, function () {
      overlay.parentNode.removeChild(overlay);
    });
  });
};

/**
 * 锁定屏幕
 */
mdui.lockScreen = function () {
  var body = document.body;
  var oldWindowWidth = body.clientWidth;

  // 不直接把 body 设为 box-sizing: border-box，避免污染全局样式
  var oldBodyPaddingLeft = $.getStyle(body, 'padding-left').replace('px', '');
  var oldBodyPaddingRight = $.getStyle(body, 'padding-right').replace('px', '');

  document.body.classList.add('md-locked');
  document.body.style.width = oldWindowWidth - oldBodyPaddingLeft - oldBodyPaddingRight + 'px';
};

/**
 * 解除屏幕锁定
 */
mdui.unlockScreen = function () {
  document.body.classList.remove('md-locked');
  document.body.style.width = '';
};

/**
 * 函数节流
 * @param fn
 * @param delay
 * @returns {Function}
 */
mdui.throttle = function (fn, delay) {
  var timer = null;

  return function () {
    var context = this;
    var args = arguments;

    if (timer === null) {
      timer = setTimeout(function () {
        fn.apply(context, args);
        timer = null;
      }, delay);
    }
  };
};

/**
 * 生成唯一 id
 * @param pluginName 插件名，若传入该参数，guid 将以该参数作为前缀
 * @returns {string}
 */
mdui.guid = function (pluginName) {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  var guid = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  if (pluginName) {
    guid = 'md-' + pluginName + '-' + guid;
  }
  return guid;
};


$.ready(function () {
  // 避免页面加载完后直接执行css动画
  // https://css-tricks.com/transitions-only-after-page-load/

  setTimeout(function () {
    document.body.classList.add('md-loaded');
  }, 0);

});
