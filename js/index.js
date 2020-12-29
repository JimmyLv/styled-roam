// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/hotkeys-js/dist/hotkeys.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * hotkeys-js v3.8.1
 * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
 * 
 * Copyright (c) 2020 kenny wong <wowohoo@qq.com>
 * http://jaywcjlove.github.io/hotkeys
 * 
 * Licensed under the MIT license.
 */
var isff = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase().indexOf('firefox') > 0 : false; // 绑定事件

function addEvent(object, event, method) {
  if (object.addEventListener) {
    object.addEventListener(event, method, false);
  } else if (object.attachEvent) {
    object.attachEvent("on".concat(event), function () {
      method(window.event);
    });
  }
} // 修饰键转换成对应的键码


function getMods(modifier, key) {
  var mods = key.slice(0, key.length - 1);

  for (var i = 0; i < mods.length; i++) {
    mods[i] = modifier[mods[i].toLowerCase()];
  }

  return mods;
} // 处理传的key字符串转换成数组


function getKeys(key) {
  if (typeof key !== 'string') key = '';
  key = key.replace(/\s/g, ''); // 匹配任何空白字符,包括空格、制表符、换页符等等

  var keys = key.split(','); // 同时设置多个快捷键，以','分割

  var index = keys.lastIndexOf(''); // 快捷键可能包含','，需特殊处理

  for (; index >= 0;) {
    keys[index - 1] += ',';
    keys.splice(index, 1);
    index = keys.lastIndexOf('');
  }

  return keys;
} // 比较修饰键的数组


function compareArray(a1, a2) {
  var arr1 = a1.length >= a2.length ? a1 : a2;
  var arr2 = a1.length >= a2.length ? a2 : a1;
  var isIndex = true;

  for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) isIndex = false;
  }

  return isIndex;
}

var _keyMap = {
  backspace: 8,
  tab: 9,
  clear: 12,
  enter: 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  '⇪': 20,
  ',': 188,
  '.': 190,
  '/': 191,
  '`': 192,
  '-': isff ? 173 : 189,
  '=': isff ? 61 : 187,
  ';': isff ? 59 : 186,
  '\'': 222,
  '[': 219,
  ']': 221,
  '\\': 220
}; // Modifier Keys

var _modifier = {
  // shiftKey
  '⇧': 16,
  shift: 16,
  // altKey
  '⌥': 18,
  alt: 18,
  option: 18,
  // ctrlKey
  '⌃': 17,
  ctrl: 17,
  control: 17,
  // metaKey
  '⌘': 91,
  cmd: 91,
  command: 91
};
var modifierMap = {
  16: 'shiftKey',
  18: 'altKey',
  17: 'ctrlKey',
  91: 'metaKey',
  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91
};
var _mods = {
  16: false,
  18: false,
  17: false,
  91: false
};
var _handlers = {}; // F1~F12 special key

for (var k = 1; k < 20; k++) {
  _keyMap["f".concat(k)] = 111 + k;
}

var _downKeys = []; // 记录摁下的绑定键

var _scope = 'all'; // 默认热键范围

var elementHasBindEvent = []; // 已绑定事件的节点记录
// 返回键码

var code = function code(x) {
  return _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
}; // 设置获取当前范围（默认为'所有'）


function setScope(scope) {
  _scope = scope || 'all';
} // 获取当前范围


function getScope() {
  return _scope || 'all';
} // 获取摁下绑定键的键值


function getPressedKeyCodes() {
  return _downKeys.slice(0);
} // 表单控件控件判断 返回 Boolean
// hotkey is effective only when filter return true


function filter(event) {
  var target = event.target || event.srcElement;
  var tagName = target.tagName;
  var flag = true; // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>

  if (target.isContentEditable || (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') && !target.readOnly) {
    flag = false;
  }

  return flag;
} // 判断摁下的键是否为某个键，返回true或者false


function isPressed(keyCode) {
  if (typeof keyCode === 'string') {
    keyCode = code(keyCode); // 转换成键码
  }

  return _downKeys.indexOf(keyCode) !== -1;
} // 循环删除handlers中的所有 scope(范围)


function deleteScope(scope, newScope) {
  var handlers;
  var i; // 没有指定scope，获取scope

  if (!scope) scope = getScope();

  for (var key in _handlers) {
    if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
      handlers = _handlers[key];

      for (i = 0; i < handlers.length;) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);else i++;
      }
    }
  } // 如果scope被删除，将scope重置为all


  if (getScope() === scope) setScope(newScope || 'all');
} // 清除修饰键


function clearModifier(event) {
  var key = event.keyCode || event.which || event.charCode;

  var i = _downKeys.indexOf(key); // 从列表中清除按压过的键


  if (i >= 0) {
    _downKeys.splice(i, 1);
  } // 特殊处理 cmmand 键，在 cmmand 组合快捷键 keyup 只执行一次的问题


  if (event.key && event.key.toLowerCase() === 'meta') {
    _downKeys.splice(0, _downKeys.length);
  } // 修饰键 shiftKey altKey ctrlKey (command||metaKey) 清除


  if (key === 93 || key === 224) key = 91;

  if (key in _mods) {
    _mods[key] = false; // 将修饰键重置为false

    for (var k in _modifier) {
      if (_modifier[k] === key) hotkeys[k] = false;
    }
  }
}

function unbind(keysInfo) {
  // unbind(), unbind all keys
  if (!keysInfo) {
    Object.keys(_handlers).forEach(function (key) {
      return delete _handlers[key];
    });
  } else if (Array.isArray(keysInfo)) {
    // support like : unbind([{key: 'ctrl+a', scope: 's1'}, {key: 'ctrl-a', scope: 's2', splitKey: '-'}])
    keysInfo.forEach(function (info) {
      if (info.key) eachUnbind(info);
    });
  } else if (_typeof(keysInfo) === 'object') {
    // support like unbind({key: 'ctrl+a, ctrl+b', scope:'abc'})
    if (keysInfo.key) eachUnbind(keysInfo);
  } else if (typeof keysInfo === 'string') {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    } // support old method
    // eslint-disable-line


    var scope = args[0],
        method = args[1];

    if (typeof scope === 'function') {
      method = scope;
      scope = '';
    }

    eachUnbind({
      key: keysInfo,
      scope: scope,
      method: method,
      splitKey: '+'
    });
  }
} // 解除绑定某个范围的快捷键


var eachUnbind = function eachUnbind(_ref) {
  var key = _ref.key,
      scope = _ref.scope,
      method = _ref.method,
      _ref$splitKey = _ref.splitKey,
      splitKey = _ref$splitKey === void 0 ? '+' : _ref$splitKey;
  var multipleKeys = getKeys(key);
  multipleKeys.forEach(function (originKey) {
    var unbindKeys = originKey.split(splitKey);
    var len = unbindKeys.length;
    var lastKey = unbindKeys[len - 1];
    var keyCode = lastKey === '*' ? '*' : code(lastKey);
    if (!_handlers[keyCode]) return; // 判断是否传入范围，没有就获取范围

    if (!scope) scope = getScope();
    var mods = len > 1 ? getMods(_modifier, unbindKeys) : [];
    _handlers[keyCode] = _handlers[keyCode].map(function (record) {
      // 通过函数判断，是否解除绑定，函数相等直接返回
      var isMatchingMethod = method ? record.method === method : true;

      if (isMatchingMethod && record.scope === scope && compareArray(record.mods, mods)) {
        return {};
      }

      return record;
    });
  });
}; // 对监听对应快捷键的回调函数进行处理


function eventHandler(event, handler, scope) {
  var modifiersMatch; // 看它是否在当前范围

  if (handler.scope === scope || handler.scope === 'all') {
    // 检查是否匹配修饰符（如果有返回true）
    modifiersMatch = handler.mods.length > 0;

    for (var y in _mods) {
      if (Object.prototype.hasOwnProperty.call(_mods, y)) {
        if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1) {
          modifiersMatch = false;
        }
      }
    } // 调用处理程序，如果是修饰键不做处理


    if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === '*') {
      if (handler.method(event, handler) === false) {
        if (event.preventDefault) event.preventDefault();else event.returnValue = false;
        if (event.stopPropagation) event.stopPropagation();
        if (event.cancelBubble) event.cancelBubble = true;
      }
    }
  }
} // 处理keydown事件


function dispatch(event) {
  var asterisk = _handlers['*'];
  var key = event.keyCode || event.which || event.charCode; // 表单控件过滤 默认表单控件不触发快捷键

  if (!hotkeys.filter.call(this, event)) return; // Gecko(Firefox)的command键值224，在Webkit(Chrome)中保持一致
  // Webkit左右 command 键值不一样

  if (key === 93 || key === 224) key = 91;
  /**
   * Collect bound keys
   * If an Input Method Editor is processing key input and the event is keydown, return 229.
   * https://stackoverflow.com/questions/25043934/is-it-ok-to-ignore-keydown-events-with-keycode-229
   * http://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html
   */

  if (_downKeys.indexOf(key) === -1 && key !== 229) _downKeys.push(key);
  /**
   * Jest test cases are required.
   * ===============================
   */

  ['ctrlKey', 'altKey', 'shiftKey', 'metaKey'].forEach(function (keyName) {
    var keyNum = modifierMap[keyName];

    if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {
      _downKeys.push(keyNum);
    } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {
      _downKeys.splice(_downKeys.indexOf(keyNum), 1);
    } else if (keyName === 'metaKey' && event[keyName] && _downKeys.length === 3) {
      /**
       * Fix if Command is pressed:
       * ===============================
       */
      if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
        _downKeys = _downKeys.slice(_downKeys.indexOf(keyNum));
      }
    }
  });
  /**
   * -------------------------------
   */

  if (key in _mods) {
    _mods[key] = true; // 将特殊字符的key注册到 hotkeys 上

    for (var k in _modifier) {
      if (_modifier[k] === key) hotkeys[k] = true;
    }

    if (!asterisk) return;
  } // 将 modifierMap 里面的修饰键绑定到 event 中


  for (var e in _mods) {
    if (Object.prototype.hasOwnProperty.call(_mods, e)) {
      _mods[e] = event[modifierMap[e]];
    }
  }
  /**
   * https://github.com/jaywcjlove/hotkeys/pull/129
   * This solves the issue in Firefox on Windows where hotkeys corresponding to special characters would not trigger.
   * An example of this is ctrl+alt+m on a Swedish keyboard which is used to type μ.
   * Browser support: https://caniuse.com/#feat=keyboardevent-getmodifierstate
   */


  if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState('AltGraph')) {
    if (_downKeys.indexOf(17) === -1) {
      _downKeys.push(17);
    }

    if (_downKeys.indexOf(18) === -1) {
      _downKeys.push(18);
    }

    _mods[17] = true;
    _mods[18] = true;
  } // 获取范围 默认为 `all`


  var scope = getScope(); // 对任何快捷键都需要做的处理

  if (asterisk) {
    for (var i = 0; i < asterisk.length; i++) {
      if (asterisk[i].scope === scope && (event.type === 'keydown' && asterisk[i].keydown || event.type === 'keyup' && asterisk[i].keyup)) {
        eventHandler(event, asterisk[i], scope);
      }
    }
  } // key 不在 _handlers 中返回


  if (!(key in _handlers)) return;

  for (var _i = 0; _i < _handlers[key].length; _i++) {
    if (event.type === 'keydown' && _handlers[key][_i].keydown || event.type === 'keyup' && _handlers[key][_i].keyup) {
      if (_handlers[key][_i].key) {
        var record = _handlers[key][_i];
        var splitKey = record.splitKey;
        var keyShortcut = record.key.split(splitKey);
        var _downKeysCurrent = []; // 记录当前按键键值

        for (var a = 0; a < keyShortcut.length; a++) {
          _downKeysCurrent.push(code(keyShortcut[a]));
        }

        if (_downKeysCurrent.sort().join('') === _downKeys.sort().join('')) {
          // 找到处理内容
          eventHandler(event, record, scope);
        }
      }
    }
  }
} // 判断 element 是否已经绑定事件


function isElementBind(element) {
  return elementHasBindEvent.indexOf(element) > -1;
}

function hotkeys(key, option, method) {
  _downKeys = [];
  var keys = getKeys(key); // 需要处理的快捷键列表

  var mods = [];
  var scope = 'all'; // scope默认为all，所有范围都有效

  var element = document; // 快捷键事件绑定节点

  var i = 0;
  var keyup = false;
  var keydown = true;
  var splitKey = '+'; // 对为设定范围的判断

  if (method === undefined && typeof option === 'function') {
    method = option;
  }

  if (Object.prototype.toString.call(option) === '[object Object]') {
    if (option.scope) scope = option.scope; // eslint-disable-line

    if (option.element) element = option.element; // eslint-disable-line

    if (option.keyup) keyup = option.keyup; // eslint-disable-line

    if (option.keydown !== undefined) keydown = option.keydown; // eslint-disable-line

    if (typeof option.splitKey === 'string') splitKey = option.splitKey; // eslint-disable-line
  }

  if (typeof option === 'string') scope = option; // 对于每个快捷键进行处理

  for (; i < keys.length; i++) {
    key = keys[i].split(splitKey); // 按键列表

    mods = []; // 如果是组合快捷键取得组合快捷键

    if (key.length > 1) mods = getMods(_modifier, key); // 将非修饰键转化为键码

    key = key[key.length - 1];
    key = key === '*' ? '*' : code(key); // *表示匹配所有快捷键
    // 判断key是否在_handlers中，不在就赋一个空数组

    if (!(key in _handlers)) _handlers[key] = [];

    _handlers[key].push({
      keyup: keyup,
      keydown: keydown,
      scope: scope,
      mods: mods,
      shortcut: keys[i],
      method: method,
      key: keys[i],
      splitKey: splitKey
    });
  } // 在全局document上设置快捷键


  if (typeof element !== 'undefined' && !isElementBind(element) && window) {
    elementHasBindEvent.push(element);
    addEvent(element, 'keydown', function (e) {
      dispatch(e);
    });
    addEvent(window, 'focus', function () {
      _downKeys = [];
    });
    addEvent(element, 'keyup', function (e) {
      dispatch(e);
      clearModifier(e);
    });
  }
}

var _api = {
  setScope: setScope,
  getScope: getScope,
  deleteScope: deleteScope,
  getPressedKeyCodes: getPressedKeyCodes,
  isPressed: isPressed,
  filter: filter,
  unbind: unbind
};

for (var a in _api) {
  if (Object.prototype.hasOwnProperty.call(_api, a)) {
    hotkeys[a] = _api[a];
  }
}

if (typeof window !== 'undefined') {
  var _hotkeys = window.hotkeys;

  hotkeys.noConflict = function (deep) {
    if (deep && window.hotkeys === hotkeys) {
      window.hotkeys = _hotkeys;
    }

    return hotkeys;
  };

  window.hotkeys = hotkeys;
}

var _default = hotkeys;
exports.default = _default;
},{}],"../node_modules/@popperjs/core/lib/enums.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifierPhases = exports.afterWrite = exports.write = exports.beforeWrite = exports.afterMain = exports.main = exports.beforeMain = exports.afterRead = exports.read = exports.beforeRead = exports.placements = exports.variationPlacements = exports.reference = exports.popper = exports.viewport = exports.clippingParents = exports.end = exports.start = exports.basePlacements = exports.auto = exports.left = exports.right = exports.bottom = exports.top = void 0;
var top = 'top';
exports.top = top;
var bottom = 'bottom';
exports.bottom = bottom;
var right = 'right';
exports.right = right;
var left = 'left';
exports.left = left;
var auto = 'auto';
exports.auto = auto;
var basePlacements = [top, bottom, right, left];
exports.basePlacements = basePlacements;
var start = 'start';
exports.start = start;
var end = 'end';
exports.end = end;
var clippingParents = 'clippingParents';
exports.clippingParents = clippingParents;
var viewport = 'viewport';
exports.viewport = viewport;
var popper = 'popper';
exports.popper = popper;
var reference = 'reference';
exports.reference = reference;
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
exports.variationPlacements = variationPlacements;
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

exports.placements = placements;
var beforeRead = 'beforeRead';
exports.beforeRead = beforeRead;
var read = 'read';
exports.read = read;
var afterRead = 'afterRead'; // pure-logic modifiers

exports.afterRead = afterRead;
var beforeMain = 'beforeMain';
exports.beforeMain = beforeMain;
var main = 'main';
exports.main = main;
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

exports.afterMain = afterMain;
var beforeWrite = 'beforeWrite';
exports.beforeWrite = beforeWrite;
var write = 'write';
exports.write = write;
var afterWrite = 'afterWrite';
exports.afterWrite = afterWrite;
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
exports.modifierPhases = modifierPhases;
},{}],"../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNodeName;

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}
},{}],"../node_modules/@popperjs/core/lib/dom-utils/getWindow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWindow;

/*:: import type { Window } from '../types'; */

/*:: declare function getWindow(node: Node | Window): Window; */
function getWindow(node) {
  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}
},{}],"../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isElement = isElement;
exports.isHTMLElement = isHTMLElement;
exports.isShadowRoot = isShadowRoot;

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*:: declare function isElement(node: mixed): boolean %checks(node instanceof
  Element); */
function isElement(node) {
  var OwnElement = (0, _getWindow.default)(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
/*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
  HTMLElement); */


function isHTMLElement(node) {
  var OwnElement = (0, _getWindow.default)(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
/*:: declare function isShadowRoot(node: mixed): boolean %checks(node instanceof
  ShadowRoot); */


function isShadowRoot(node) {
  var OwnElement = (0, _getWindow.default)(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
},{"./getWindow.js":"../node_modules/@popperjs/core/lib/dom-utils/getWindow.js"}],"../node_modules/@popperjs/core/lib/modifiers/applyStyles.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getNodeName = _interopRequireDefault(require("../dom-utils/getNodeName.js"));

var _instanceOf = require("../dom-utils/instanceOf.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0, _instanceOf.isHTMLElement)(element) || !(0, _getNodeName.default)(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0, _instanceOf.isHTMLElement)(element) || !(0, _getNodeName.default)(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
};
exports.default = _default;
},{"../dom-utils/getNodeName.js":"../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js","../dom-utils/instanceOf.js":"../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js"}],"../node_modules/@popperjs/core/lib/utils/getBasePlacement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBasePlacement;

var _enums = require("../enums.js");

function getBasePlacement(placement) {
  return placement.split('-')[0];
}
},{"../enums.js":"../node_modules/@popperjs/core/lib/enums.js"}],"../node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLayoutRect;

// Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.
function getLayoutRect(element) {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}
},{}],"../node_modules/@popperjs/core/lib/dom-utils/contains.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contains;

var _instanceOf = require("./instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0, _instanceOf.isShadowRoot)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}
},{"./instanceOf.js":"../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js"}],"../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getComputedStyle;

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getComputedStyle(element) {
  return (0, _getWindow.default)(element).getComputedStyle(element);
}
},{"./getWindow.js":"../node_modules/@popperjs/core/lib/dom-utils/getWindow.js"}],"../node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTableElement;

var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0, _getNodeName.default)(element)) >= 0;
}
},{"./getNodeName.js":"../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js"}],"../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDocumentElement;

var _instanceOf = require("./instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0, _instanceOf.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}
},{"./instanceOf.js":"../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js"}],"../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getParentNode;

var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));

var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getParentNode(element) {
  if ((0, _getNodeName.default)(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    // $FlowFixMe[incompatible-return]: need a better way to handle this...
    element.host || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0, _getDocumentElement.default)(element) // fallback

  );
}
},{"./getNodeName.js":"../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js","./getDocumentElement.js":"../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js"}],"../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOffsetParent;

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));

var _getComputedStyle = _interopRequireDefault(require("./getComputedStyle.js"));

var _instanceOf = require("./instanceOf.js");

var _isTableElement = _interopRequireDefault(require("./isTableElement.js"));

var _getParentNode = _interopRequireDefault(require("./getParentNode.js"));

var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTrueOffsetParent(element) {
  if (!(0, _instanceOf.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0, _getComputedStyle.default)(element).position === 'fixed') {
    return null;
  }

  var offsetParent = element.offsetParent;

  if (offsetParent) {
    var html = (0, _getDocumentElement.default)(offsetParent);

    if ((0, _getNodeName.default)(offsetParent) === 'body' && (0, _getComputedStyle.default)(offsetParent).position === 'static' && (0, _getComputedStyle.default)(html).position !== 'static') {
      return html;
    }
  }

  return offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var currentNode = (0, _getParentNode.default)(element);

  while ((0, _instanceOf.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0, _getNodeName.default)(currentNode)) < 0) {
    var css = (0, _getComputedStyle.default)(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.

    if (css.transform !== 'none' || css.perspective !== 'none' || css.willChange && css.willChange !== 'auto') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0, _getWindow.default)(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0, _isTableElement.default)(offsetParent) && (0, _getComputedStyle.default)(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (0, _getNodeName.default)(offsetParent) === 'body' && (0, _getComputedStyle.default)(offsetParent).position === 'static') {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}
},{"./getWindow.js":"../node_modules/@popperjs/core/lib/dom-utils/getWindow.js","./getNodeName.js":"../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js","./getComputedStyle.js":"../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js","./instanceOf.js":"../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js","./isTableElement.js":"../node_modules/@popperjs/core/lib/dom-utils/isTableElement.js","./getParentNode.js":"../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js","./getDocumentElement.js":"../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js"}],"../node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMainAxisFromPlacement;

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}
},{}],"../node_modules/@popperjs/core/lib/utils/within.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = within;

function within(min, value, max) {
  return Math.max(min, Math.min(value, max));
}
},{}],"../node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFreshSideObject;

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
},{}],"../node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergePaddingObject;

var _getFreshSideObject = _interopRequireDefault(require("./getFreshSideObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mergePaddingObject(paddingObject) {
  return Object.assign(Object.assign({}, (0, _getFreshSideObject.default)()), paddingObject);
}
},{"./getFreshSideObject.js":"../node_modules/@popperjs/core/lib/utils/getFreshSideObject.js"}],"../node_modules/@popperjs/core/lib/utils/expandToHashMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = expandToHashMap;

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
},{}],"../node_modules/@popperjs/core/lib/modifiers/arrow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));

var _getLayoutRect = _interopRequireDefault(require("../dom-utils/getLayoutRect.js"));

var _contains = _interopRequireDefault(require("../dom-utils/contains.js"));

var _getOffsetParent = _interopRequireDefault(require("../dom-utils/getOffsetParent.js"));

var _getMainAxisFromPlacement = _interopRequireDefault(require("../utils/getMainAxisFromPlacement.js"));

var _within = _interopRequireDefault(require("../utils/within.js"));

var _mergePaddingObject = _interopRequireDefault(require("../utils/mergePaddingObject.js"));

var _expandToHashMap = _interopRequireDefault(require("../utils/expandToHashMap.js"));

var _enums = require("../enums.js");

var _instanceOf = require("../dom-utils/instanceOf.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-unused-modules
function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0, _getBasePlacement.default)(state.placement);
  var axis = (0, _getMainAxisFromPlacement.default)(basePlacement);
  var isVertical = [_enums.left, _enums.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = state.modifiersData[name + "#persistent"].padding;
  var arrowRect = (0, _getLayoutRect.default)(arrowElement);
  var minProp = axis === 'y' ? _enums.top : _enums.left;
  var maxProp = axis === 'y' ? _enums.bottom : _enums.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0, _getOffsetParent.default)(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0, _within.default)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
      _options$padding = options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if ("development" !== "production") {
    if (!(0, _instanceOf.isHTMLElement)(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!(0, _contains.default)(state.elements.popper, arrowElement)) {
    if ("development" !== "production") {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
  state.modifiersData[name + "#persistent"] = {
    padding: (0, _mergePaddingObject.default)(typeof padding !== 'number' ? padding : (0, _expandToHashMap.default)(padding, _enums.basePlacements))
  };
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};
exports.default = _default;
},{"../utils/getBasePlacement.js":"../node_modules/@popperjs/core/lib/utils/getBasePlacement.js","../dom-utils/getLayoutRect.js":"../node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js","../dom-utils/contains.js":"../node_modules/@popperjs/core/lib/dom-utils/contains.js","../dom-utils/getOffsetParent.js":"../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js","../utils/getMainAxisFromPlacement.js":"../node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js","../utils/within.js":"../node_modules/@popperjs/core/lib/utils/within.js","../utils/mergePaddingObject.js":"../node_modules/@popperjs/core/lib/utils/mergePaddingObject.js","../utils/expandToHashMap.js":"../node_modules/@popperjs/core/lib/utils/expandToHashMap.js","../enums.js":"../node_modules/@popperjs/core/lib/enums.js","../dom-utils/instanceOf.js":"../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js"}],"../node_modules/@popperjs/core/lib/modifiers/computeStyles.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToStyles = mapToStyles;
exports.default = void 0;

var _enums = require("../enums.js");

var _getOffsetParent = _interopRequireDefault(require("../dom-utils/getOffsetParent.js"));

var _getWindow = _interopRequireDefault(require("../dom-utils/getWindow.js"));

var _getDocumentElement = _interopRequireDefault(require("../dom-utils/getDocumentElement.js"));

var _getComputedStyle = _interopRequireDefault(require("../dom-utils/getComputedStyle.js"));

var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-unused-modules
var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: Math.round(x * dpr) / dpr || 0,
    y: Math.round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets;

  var _ref3 = roundOffsets ? roundOffsetsByDPR(offsets) : offsets,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums.left;
  var sideY = _enums.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0, _getOffsetParent.default)(popper);

    if (offsetParent === (0, _getWindow.default)(popper)) {
      offsetParent = (0, _getDocumentElement.default)(popper);
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

    /*:: offsetParent = (offsetParent: Element); */


    if (placement === _enums.top) {
      sideY = _enums.bottom;
      y -= offsetParent.clientHeight - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums.left) {
      sideX = _enums.right;
      x -= offsetParent.clientWidth - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref4) {
  var state = _ref4.state,
      options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if ("development" !== "production") {
    var transitionProperty = (0, _getComputedStyle.default)(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: (0, _getBasePlacement.default)(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign(Object.assign({}, state.styles.popper), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign(Object.assign({}, state.styles.arrow), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};
exports.default = _default;
},{"../enums.js":"../node_modules/@popperjs/core/lib/enums.js","../dom-utils/getOffsetParent.js":"../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js","../dom-utils/getWindow.js":"../node_modules/@popperjs/core/lib/dom-utils/getWindow.js","../dom-utils/getDocumentElement.js":"../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js","../dom-utils/getComputedStyle.js":"../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js","../utils/getBasePlacement.js":"../node_modules/@popperjs/core/lib/utils/getBasePlacement.js"}],"../node_modules/@popperjs/core/lib/modifiers/eventListeners.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getWindow = _interopRequireDefault(require("../dom-utils/getWindow.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-unused-modules
var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0, _getWindow.default)(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};
exports.default = _default;
},{"../dom-utils/getWindow.js":"../node_modules/@popperjs/core/lib/dom-utils/getWindow.js"}],"../node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOppositePlacement;
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};

function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
},{}],"../node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOppositeVariationPlacement;
var hash = {
  start: 'end',
  end: 'start'
};

function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}
},{}],"../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBoundingClientRect;

function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}
},{}],"../node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWindowScroll;

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getWindowScroll(node) {
  var win = (0, _getWindow.default)(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}
},{"./getWindow.js":"../node_modules/@popperjs/core/lib/dom-utils/getWindow.js"}],"../node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWindowScrollBarX;

var _getBoundingClientRect = _interopRequireDefault(require("./getBoundingClientRect.js"));

var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));

var _getWindowScroll = _interopRequireDefault(require("./getWindowScroll.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0, _getBoundingClientRect.default)((0, _getDocumentElement.default)(element)).left + (0, _getWindowScroll.default)(element).scrollLeft;
}
},{"./getBoundingClientRect.js":"../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js","./getDocumentElement.js":"../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js","./getWindowScroll.js":"../node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js"}],"../node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getViewportRect;

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));

var _getWindowScrollBarX = _interopRequireDefault(require("./getWindowScrollBarX.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getViewportRect(element) {
  var win = (0, _getWindow.default)(element);
  var html = (0, _getDocumentElement.default)(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0, _getWindowScrollBarX.default)(element),
    y: y
  };
}
},{"./getWindow.js":"../node_modules/@popperjs/core/lib/dom-utils/getWindow.js","./getDocumentElement.js":"../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js","./getWindowScrollBarX.js":"../node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js"}],"../node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDocumentRect;

var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));

var _getComputedStyle = _interopRequireDefault(require("./getComputedStyle.js"));

var _getWindowScrollBarX = _interopRequireDefault(require("./getWindowScrollBarX.js"));

var _getWindowScroll = _interopRequireDefault(require("./getWindowScroll.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable
function getDocumentRect(element) {
  var html = (0, _getDocumentElement.default)(element);
  var winScroll = (0, _getWindowScroll.default)(element);
  var body = element.ownerDocument.body;
  var width = Math.max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = Math.max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0, _getWindowScrollBarX.default)(element);
  var y = -winScroll.scrollTop;

  if ((0, _getComputedStyle.default)(body || html).direction === 'rtl') {
    x += Math.max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}
},{"./getDocumentElement.js":"../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js","./getComputedStyle.js":"../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js","./getWindowScrollBarX.js":"../node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js","./getWindowScroll.js":"../node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js"}],"../node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isScrollParent;

var _getComputedStyle2 = _interopRequireDefault(require("./getComputedStyle.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0, _getComputedStyle2.default)(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
},{"./getComputedStyle.js":"../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js"}],"../node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getScrollParent;

var _getParentNode = _interopRequireDefault(require("./getParentNode.js"));

var _isScrollParent = _interopRequireDefault(require("./isScrollParent.js"));

var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));

var _instanceOf = require("./instanceOf.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0, _getNodeName.default)(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0, _instanceOf.isHTMLElement)(node) && (0, _isScrollParent.default)(node)) {
    return node;
  }

  return getScrollParent((0, _getParentNode.default)(node));
}
},{"./getParentNode.js":"../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js","./isScrollParent.js":"../node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js","./getNodeName.js":"../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js","./instanceOf.js":"../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js"}],"../node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = listScrollParents;

var _getScrollParent = _interopRequireDefault(require("./getScrollParent.js"));

var _getParentNode = _interopRequireDefault(require("./getParentNode.js"));

var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

var _isScrollParent = _interopRequireDefault(require("./isScrollParent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/
function listScrollParents(element, list) {
  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0, _getScrollParent.default)(element);
  var isBody = (0, _getNodeName.default)(scrollParent) === 'body';
  var win = (0, _getWindow.default)(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0, _isScrollParent.default)(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0, _getParentNode.default)(target)));
}
},{"./getScrollParent.js":"../node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js","./getParentNode.js":"../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js","./getNodeName.js":"../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js","./getWindow.js":"../node_modules/@popperjs/core/lib/dom-utils/getWindow.js","./isScrollParent.js":"../node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js"}],"../node_modules/@popperjs/core/lib/utils/rectToClientRect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rectToClientRect;

function rectToClientRect(rect) {
  return Object.assign(Object.assign({}, rect), {}, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
},{}],"../node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getClippingRect;

var _enums = require("../enums.js");

var _getViewportRect = _interopRequireDefault(require("./getViewportRect.js"));

var _getDocumentRect = _interopRequireDefault(require("./getDocumentRect.js"));

var _listScrollParents = _interopRequireDefault(require("./listScrollParents.js"));

var _getOffsetParent = _interopRequireDefault(require("./getOffsetParent.js"));

var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));

var _getComputedStyle = _interopRequireDefault(require("./getComputedStyle.js"));

var _instanceOf = require("./instanceOf.js");

var _getBoundingClientRect = _interopRequireDefault(require("./getBoundingClientRect.js"));

var _getParentNode = _interopRequireDefault(require("./getParentNode.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));

var _rectToClientRect = _interopRequireDefault(require("../utils/rectToClientRect.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getInnerBoundingClientRect(element) {
  var rect = (0, _getBoundingClientRect.default)(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === _enums.viewport ? (0, _rectToClientRect.default)((0, _getViewportRect.default)(element)) : (0, _instanceOf.isHTMLElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent) : (0, _rectToClientRect.default)((0, _getDocumentRect.default)((0, _getDocumentElement.default)(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0, _listScrollParents.default)((0, _getParentNode.default)(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0, _getComputedStyle.default)(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0, _instanceOf.isHTMLElement)(element) ? (0, _getOffsetParent.default)(element) : element;

  if (!(0, _instanceOf.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0, _instanceOf.isElement)(clippingParent) && (0, _contains.default)(clippingParent, clipperElement) && (0, _getNodeName.default)(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = Math.max(rect.top, accRect.top);
    accRect.right = Math.min(rect.right, accRect.right);
    accRect.bottom = Math.min(rect.bottom, accRect.bottom);
    accRect.left = Math.max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
},{"../enums.js":"../node_modules/@popperjs/core/lib/enums.js","./getViewportRect.js":"../node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js","./getDocumentRect.js":"../node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js","./listScrollParents.js":"../node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js","./getOffsetParent.js":"../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js","./getDocumentElement.js":"../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js","./getComputedStyle.js":"../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js","./instanceOf.js":"../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js","./getBoundingClientRect.js":"../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js","./getParentNode.js":"../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js","./contains.js":"../node_modules/@popperjs/core/lib/dom-utils/contains.js","./getNodeName.js":"../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js","../utils/rectToClientRect.js":"../node_modules/@popperjs/core/lib/utils/rectToClientRect.js"}],"../node_modules/@popperjs/core/lib/utils/getVariation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getVariation;

function getVariation(placement) {
  return placement.split('-')[1];
}
},{}],"../node_modules/@popperjs/core/lib/utils/computeOffsets.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeOffsets;

var _getBasePlacement = _interopRequireDefault(require("./getBasePlacement.js"));

var _getVariation = _interopRequireDefault(require("./getVariation.js"));

var _getMainAxisFromPlacement = _interopRequireDefault(require("./getMainAxisFromPlacement.js"));

var _enums = require("../enums.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0, _getBasePlacement.default)(placement) : null;
  var variation = placement ? (0, _getVariation.default)(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0, _getMainAxisFromPlacement.default)(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}
},{"./getBasePlacement.js":"../node_modules/@popperjs/core/lib/utils/getBasePlacement.js","./getVariation.js":"../node_modules/@popperjs/core/lib/utils/getVariation.js","./getMainAxisFromPlacement.js":"../node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js","../enums.js":"../node_modules/@popperjs/core/lib/enums.js"}],"../node_modules/@popperjs/core/lib/utils/detectOverflow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = detectOverflow;

var _getBoundingClientRect = _interopRequireDefault(require("../dom-utils/getBoundingClientRect.js"));

var _getClippingRect = _interopRequireDefault(require("../dom-utils/getClippingRect.js"));

var _getDocumentElement = _interopRequireDefault(require("../dom-utils/getDocumentElement.js"));

var _computeOffsets = _interopRequireDefault(require("./computeOffsets.js"));

var _rectToClientRect = _interopRequireDefault(require("./rectToClientRect.js"));

var _enums = require("../enums.js");

var _instanceOf = require("../dom-utils/instanceOf.js");

var _mergePaddingObject = _interopRequireDefault(require("./mergePaddingObject.js"));

var _expandToHashMap = _interopRequireDefault(require("./expandToHashMap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-unused-modules
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0, _mergePaddingObject.default)(typeof padding !== 'number' ? padding : (0, _expandToHashMap.default)(padding, _enums.basePlacements));
  var altContext = elementContext === _enums.popper ? _enums.reference : _enums.popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0, _getClippingRect.default)((0, _instanceOf.isElement)(element) ? element : element.contextElement || (0, _getDocumentElement.default)(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = (0, _getBoundingClientRect.default)(referenceElement);
  var popperOffsets = (0, _computeOffsets.default)({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0, _rectToClientRect.default)(Object.assign(Object.assign({}, popperRect), popperOffsets));
  var elementClientRect = elementContext === _enums.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums.right, _enums.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums.top, _enums.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}
},{"../dom-utils/getBoundingClientRect.js":"../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js","../dom-utils/getClippingRect.js":"../node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js","../dom-utils/getDocumentElement.js":"../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js","./computeOffsets.js":"../node_modules/@popperjs/core/lib/utils/computeOffsets.js","./rectToClientRect.js":"../node_modules/@popperjs/core/lib/utils/rectToClientRect.js","../enums.js":"../node_modules/@popperjs/core/lib/enums.js","../dom-utils/instanceOf.js":"../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js","./mergePaddingObject.js":"../node_modules/@popperjs/core/lib/utils/mergePaddingObject.js","./expandToHashMap.js":"../node_modules/@popperjs/core/lib/utils/expandToHashMap.js"}],"../node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeAutoPlacement;

var _getVariation = _interopRequireDefault(require("./getVariation.js"));

var _enums = require("../enums.js");

var _detectOverflow = _interopRequireDefault(require("./detectOverflow.js"));

var _getBasePlacement = _interopRequireDefault(require("./getBasePlacement.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*:: type OverflowsMap = { [ComputedPlacement]: number }; */

/*;; type OverflowsMap = { [key in ComputedPlacement]: number }; */
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums.placements : _options$allowedAutoP;
  var variation = (0, _getVariation.default)(placement);
  var placements = variation ? flipVariations ? _enums.variationPlacements : _enums.variationPlacements.filter(function (placement) {
    return (0, _getVariation.default)(placement) === variation;
  }) : _enums.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if ("development" !== "production") {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0, _detectOverflow.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0, _getBasePlacement.default)(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}
},{"./getVariation.js":"../node_modules/@popperjs/core/lib/utils/getVariation.js","../enums.js":"../node_modules/@popperjs/core/lib/enums.js","./detectOverflow.js":"../node_modules/@popperjs/core/lib/utils/detectOverflow.js","./getBasePlacement.js":"../node_modules/@popperjs/core/lib/utils/getBasePlacement.js"}],"../node_modules/@popperjs/core/lib/modifiers/flip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getOppositePlacement = _interopRequireDefault(require("../utils/getOppositePlacement.js"));

var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));

var _getOppositeVariationPlacement = _interopRequireDefault(require("../utils/getOppositeVariationPlacement.js"));

var _detectOverflow = _interopRequireDefault(require("../utils/detectOverflow.js"));

var _computeAutoPlacement = _interopRequireDefault(require("../utils/computeAutoPlacement.js"));

var _enums = require("../enums.js");

var _getVariation = _interopRequireDefault(require("../utils/getVariation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-unused-modules
function getExpandedFallbackPlacements(placement) {
  if ((0, _getBasePlacement.default)(placement) === _enums.auto) {
    return [];
  }

  var oppositePlacement = (0, _getOppositePlacement.default)(placement);
  return [(0, _getOppositeVariationPlacement.default)(placement), oppositePlacement, (0, _getOppositeVariationPlacement.default)(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0, _getBasePlacement.default)(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0, _getOppositePlacement.default)(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0, _getBasePlacement.default)(placement) === _enums.auto ? (0, _computeAutoPlacement.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0, _getBasePlacement.default)(placement);

    var isStartVariation = (0, _getVariation.default)(placement) === _enums.start;

    var isVertical = [_enums.top, _enums.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0, _detectOverflow.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums.right : _enums.left : isStartVariation ? _enums.bottom : _enums.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0, _getOppositePlacement.default)(mainVariationSide);
    }

    var altVariationSide = (0, _getOppositePlacement.default)(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};
exports.default = _default;
},{"../utils/getOppositePlacement.js":"../node_modules/@popperjs/core/lib/utils/getOppositePlacement.js","../utils/getBasePlacement.js":"../node_modules/@popperjs/core/lib/utils/getBasePlacement.js","../utils/getOppositeVariationPlacement.js":"../node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js","../utils/detectOverflow.js":"../node_modules/@popperjs/core/lib/utils/detectOverflow.js","../utils/computeAutoPlacement.js":"../node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js","../enums.js":"../node_modules/@popperjs/core/lib/enums.js","../utils/getVariation.js":"../node_modules/@popperjs/core/lib/utils/getVariation.js"}],"../node_modules/@popperjs/core/lib/modifiers/hide.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _enums = require("../enums.js");

var _detectOverflow = _interopRequireDefault(require("../utils/detectOverflow.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums.top, _enums.right, _enums.bottom, _enums.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0, _detectOverflow.default)(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0, _detectOverflow.default)(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};
exports.default = _default;
},{"../enums.js":"../node_modules/@popperjs/core/lib/enums.js","../utils/detectOverflow.js":"../node_modules/@popperjs/core/lib/utils/detectOverflow.js"}],"../node_modules/@popperjs/core/lib/modifiers/offset.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distanceAndSkiddingToXY = distanceAndSkiddingToXY;
exports.default = void 0;

var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));

var _enums = require("../enums.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0, _getBasePlacement.default)(placement);
  var invertDistance = [_enums.left, _enums.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign(Object.assign({}, rects), {}, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums.left, _enums.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;

  var data = _enums.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});

  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};
exports.default = _default;
},{"../utils/getBasePlacement.js":"../node_modules/@popperjs/core/lib/utils/getBasePlacement.js","../enums.js":"../node_modules/@popperjs/core/lib/enums.js"}],"../node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _computeOffsets = _interopRequireDefault(require("../utils/computeOffsets.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name; // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step

  state.modifiersData[name] = (0, _computeOffsets.default)({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};
exports.default = _default;
},{"../utils/computeOffsets.js":"../node_modules/@popperjs/core/lib/utils/computeOffsets.js"}],"../node_modules/@popperjs/core/lib/utils/getAltAxis.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAltAxis;

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
},{}],"../node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _enums = require("../enums.js");

var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));

var _getMainAxisFromPlacement = _interopRequireDefault(require("../utils/getMainAxisFromPlacement.js"));

var _getAltAxis = _interopRequireDefault(require("../utils/getAltAxis.js"));

var _within = _interopRequireDefault(require("../utils/within.js"));

var _getLayoutRect = _interopRequireDefault(require("../dom-utils/getLayoutRect.js"));

var _getOffsetParent = _interopRequireDefault(require("../dom-utils/getOffsetParent.js"));

var _detectOverflow = _interopRequireDefault(require("../utils/detectOverflow.js"));

var _getVariation = _interopRequireDefault(require("../utils/getVariation.js"));

var _getFreshSideObject = _interopRequireDefault(require("../utils/getFreshSideObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0, _detectOverflow.default)(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0, _getBasePlacement.default)(state.placement);
  var variation = (0, _getVariation.default)(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0, _getMainAxisFromPlacement.default)(basePlacement);
  var altAxis = (0, _getAltAxis.default)(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign(Object.assign({}, state.rects), {}, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var mainSide = mainAxis === 'y' ? _enums.top : _enums.left;
    var altSide = mainAxis === 'y' ? _enums.bottom : _enums.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = popperOffsets[mainAxis] + overflow[mainSide];
    var max = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0, _getLayoutRect.default)(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0, _getFreshSideObject.default)();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0, _within.default)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && (0, _getOffsetParent.default)(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
    var preventedOffset = (0, _within.default)(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _mainSide = mainAxis === 'x' ? _enums.top : _enums.left;

    var _altSide = mainAxis === 'x' ? _enums.bottom : _enums.right;

    var _offset = popperOffsets[altAxis];

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var _preventedOffset = (0, _within.default)(_min, _offset, _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};
exports.default = _default;
},{"../enums.js":"../node_modules/@popperjs/core/lib/enums.js","../utils/getBasePlacement.js":"../node_modules/@popperjs/core/lib/utils/getBasePlacement.js","../utils/getMainAxisFromPlacement.js":"../node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js","../utils/getAltAxis.js":"../node_modules/@popperjs/core/lib/utils/getAltAxis.js","../utils/within.js":"../node_modules/@popperjs/core/lib/utils/within.js","../dom-utils/getLayoutRect.js":"../node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js","../dom-utils/getOffsetParent.js":"../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js","../utils/detectOverflow.js":"../node_modules/@popperjs/core/lib/utils/detectOverflow.js","../utils/getVariation.js":"../node_modules/@popperjs/core/lib/utils/getVariation.js","../utils/getFreshSideObject.js":"../node_modules/@popperjs/core/lib/utils/getFreshSideObject.js"}],"../node_modules/@popperjs/core/lib/modifiers/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "applyStyles", {
  enumerable: true,
  get: function () {
    return _applyStyles.default;
  }
});
Object.defineProperty(exports, "arrow", {
  enumerable: true,
  get: function () {
    return _arrow.default;
  }
});
Object.defineProperty(exports, "computeStyles", {
  enumerable: true,
  get: function () {
    return _computeStyles.default;
  }
});
Object.defineProperty(exports, "eventListeners", {
  enumerable: true,
  get: function () {
    return _eventListeners.default;
  }
});
Object.defineProperty(exports, "flip", {
  enumerable: true,
  get: function () {
    return _flip.default;
  }
});
Object.defineProperty(exports, "hide", {
  enumerable: true,
  get: function () {
    return _hide.default;
  }
});
Object.defineProperty(exports, "offset", {
  enumerable: true,
  get: function () {
    return _offset.default;
  }
});
Object.defineProperty(exports, "popperOffsets", {
  enumerable: true,
  get: function () {
    return _popperOffsets.default;
  }
});
Object.defineProperty(exports, "preventOverflow", {
  enumerable: true,
  get: function () {
    return _preventOverflow.default;
  }
});

var _applyStyles = _interopRequireDefault(require("./applyStyles.js"));

var _arrow = _interopRequireDefault(require("./arrow.js"));

var _computeStyles = _interopRequireDefault(require("./computeStyles.js"));

var _eventListeners = _interopRequireDefault(require("./eventListeners.js"));

var _flip = _interopRequireDefault(require("./flip.js"));

var _hide = _interopRequireDefault(require("./hide.js"));

var _offset = _interopRequireDefault(require("./offset.js"));

var _popperOffsets = _interopRequireDefault(require("./popperOffsets.js"));

var _preventOverflow = _interopRequireDefault(require("./preventOverflow.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./applyStyles.js":"../node_modules/@popperjs/core/lib/modifiers/applyStyles.js","./arrow.js":"../node_modules/@popperjs/core/lib/modifiers/arrow.js","./computeStyles.js":"../node_modules/@popperjs/core/lib/modifiers/computeStyles.js","./eventListeners.js":"../node_modules/@popperjs/core/lib/modifiers/eventListeners.js","./flip.js":"../node_modules/@popperjs/core/lib/modifiers/flip.js","./hide.js":"../node_modules/@popperjs/core/lib/modifiers/hide.js","./offset.js":"../node_modules/@popperjs/core/lib/modifiers/offset.js","./popperOffsets.js":"../node_modules/@popperjs/core/lib/modifiers/popperOffsets.js","./preventOverflow.js":"../node_modules/@popperjs/core/lib/modifiers/preventOverflow.js"}],"../node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHTMLElementScroll;

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
},{}],"../node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNodeScroll;

var _getWindowScroll = _interopRequireDefault(require("./getWindowScroll.js"));

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

var _instanceOf = require("./instanceOf.js");

var _getHTMLElementScroll = _interopRequireDefault(require("./getHTMLElementScroll.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getNodeScroll(node) {
  if (node === (0, _getWindow.default)(node) || !(0, _instanceOf.isHTMLElement)(node)) {
    return (0, _getWindowScroll.default)(node);
  } else {
    return (0, _getHTMLElementScroll.default)(node);
  }
}
},{"./getWindowScroll.js":"../node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js","./getWindow.js":"../node_modules/@popperjs/core/lib/dom-utils/getWindow.js","./instanceOf.js":"../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js","./getHTMLElementScroll.js":"../node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js"}],"../node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCompositeRect;

var _getBoundingClientRect = _interopRequireDefault(require("./getBoundingClientRect.js"));

var _getNodeScroll = _interopRequireDefault(require("./getNodeScroll.js"));

var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));

var _instanceOf = require("./instanceOf.js");

var _getWindowScrollBarX = _interopRequireDefault(require("./getWindowScrollBarX.js"));

var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));

var _isScrollParent = _interopRequireDefault(require("./isScrollParent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = (0, _getDocumentElement.default)(offsetParent);
  var rect = (0, _getBoundingClientRect.default)(elementOrVirtualElement);
  var isOffsetParentAnElement = (0, _instanceOf.isHTMLElement)(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0, _getNodeName.default)(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0, _isScrollParent.default)(documentElement)) {
      scroll = (0, _getNodeScroll.default)(offsetParent);
    }

    if ((0, _instanceOf.isHTMLElement)(offsetParent)) {
      offsets = (0, _getBoundingClientRect.default)(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0, _getWindowScrollBarX.default)(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
},{"./getBoundingClientRect.js":"../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js","./getNodeScroll.js":"../node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js","./getNodeName.js":"../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js","./instanceOf.js":"../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js","./getWindowScrollBarX.js":"../node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js","./getDocumentElement.js":"../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js","./isScrollParent.js":"../node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js"}],"../node_modules/@popperjs/core/lib/utils/orderModifiers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = orderModifiers;

var _enums = require("../enums.js");

// source: https://stackoverflow.com/questions/49875255
function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
},{"../enums.js":"../node_modules/@popperjs/core/lib/enums.js"}],"../node_modules/@popperjs/core/lib/utils/debounce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}
},{}],"../node_modules/@popperjs/core/lib/utils/format.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = format;

function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}
},{}],"../node_modules/@popperjs/core/lib/utils/validateModifiers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateModifiers;

var _format = _interopRequireDefault(require("./format.js"));

var _enums = require("../enums.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];

function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    Object.keys(modifier).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error((0, _format.default)(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error((0, _format.default)(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

        case 'phase':
          if (_enums.modifierPhases.indexOf(modifier.phase) < 0) {
            console.error((0, _format.default)(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error((0, _format.default)(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (typeof modifier.effect !== 'function') {
            console.error((0, _format.default)(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (!Array.isArray(modifier.requires)) {
            console.error((0, _format.default)(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error((0, _format.default)(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error((0, _format.default)(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}
},{"./format.js":"../node_modules/@popperjs/core/lib/utils/format.js","../enums.js":"../node_modules/@popperjs/core/lib/enums.js"}],"../node_modules/@popperjs/core/lib/utils/uniqueBy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uniqueBy;

function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}
},{}],"../node_modules/@popperjs/core/lib/utils/mergeByName.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeByName;

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign(Object.assign(Object.assign({}, existing), current), {}, {
      options: Object.assign(Object.assign({}, existing.options), current.options),
      data: Object.assign(Object.assign({}, existing.data), current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}
},{}],"../node_modules/@popperjs/core/lib/createPopper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popperGenerator = popperGenerator;
Object.defineProperty(exports, "detectOverflow", {
  enumerable: true,
  get: function () {
    return _detectOverflow.default;
  }
});
exports.createPopper = void 0;

var _getCompositeRect = _interopRequireDefault(require("./dom-utils/getCompositeRect.js"));

var _getLayoutRect = _interopRequireDefault(require("./dom-utils/getLayoutRect.js"));

var _listScrollParents = _interopRequireDefault(require("./dom-utils/listScrollParents.js"));

var _getOffsetParent = _interopRequireDefault(require("./dom-utils/getOffsetParent.js"));

var _getComputedStyle2 = _interopRequireDefault(require("./dom-utils/getComputedStyle.js"));

var _orderModifiers = _interopRequireDefault(require("./utils/orderModifiers.js"));

var _debounce = _interopRequireDefault(require("./utils/debounce.js"));

var _validateModifiers = _interopRequireDefault(require("./utils/validateModifiers.js"));

var _uniqueBy = _interopRequireDefault(require("./utils/uniqueBy.js"));

var _getBasePlacement = _interopRequireDefault(require("./utils/getBasePlacement.js"));

var _mergeByName = _interopRequireDefault(require("./utils/mergeByName.js"));

var _detectOverflow = _interopRequireDefault(require("./utils/detectOverflow.js"));

var _instanceOf = require("./dom-utils/instanceOf.js");

var _enums = require("./enums.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign(Object.assign({}, DEFAULT_OPTIONS), defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign(Object.assign(Object.assign({}, defaultOptions), state.options), options);
        state.scrollParents = {
          reference: (0, _instanceOf.isElement)(reference) ? (0, _listScrollParents.default)(reference) : reference.contextElement ? (0, _listScrollParents.default)(reference.contextElement) : [],
          popper: (0, _listScrollParents.default)(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0, _orderModifiers.default)((0, _mergeByName.default)([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if ("development" !== "production") {
          var modifiers = (0, _uniqueBy.default)([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          (0, _validateModifiers.default)(modifiers);

          if ((0, _getBasePlacement.default)(state.options.placement) === _enums.auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = (0, _getComputedStyle2.default)(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if ("development" !== "production") {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0, _getCompositeRect.default)(reference, (0, _getOffsetParent.default)(popper), state.options.strategy === 'fixed'),
          popper: (0, _getLayoutRect.default)(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if ("development" !== "production") {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0, _debounce.default)(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if ("development" !== "production") {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

exports.createPopper = createPopper;
},{"./dom-utils/getCompositeRect.js":"../node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js","./dom-utils/getLayoutRect.js":"../node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js","./dom-utils/listScrollParents.js":"../node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js","./dom-utils/getOffsetParent.js":"../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js","./dom-utils/getComputedStyle.js":"../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js","./utils/orderModifiers.js":"../node_modules/@popperjs/core/lib/utils/orderModifiers.js","./utils/debounce.js":"../node_modules/@popperjs/core/lib/utils/debounce.js","./utils/validateModifiers.js":"../node_modules/@popperjs/core/lib/utils/validateModifiers.js","./utils/uniqueBy.js":"../node_modules/@popperjs/core/lib/utils/uniqueBy.js","./utils/getBasePlacement.js":"../node_modules/@popperjs/core/lib/utils/getBasePlacement.js","./utils/mergeByName.js":"../node_modules/@popperjs/core/lib/utils/mergeByName.js","./utils/detectOverflow.js":"../node_modules/@popperjs/core/lib/utils/detectOverflow.js","./dom-utils/instanceOf.js":"../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js","./enums.js":"../node_modules/@popperjs/core/lib/enums.js"}],"../node_modules/@popperjs/core/lib/popper-lite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "popperGenerator", {
  enumerable: true,
  get: function () {
    return _createPopper.popperGenerator;
  }
});
Object.defineProperty(exports, "detectOverflow", {
  enumerable: true,
  get: function () {
    return _createPopper.detectOverflow;
  }
});
exports.defaultModifiers = exports.createPopper = void 0;

var _createPopper = require("./createPopper.js");

var _eventListeners = _interopRequireDefault(require("./modifiers/eventListeners.js"));

var _popperOffsets = _interopRequireDefault(require("./modifiers/popperOffsets.js"));

var _computeStyles = _interopRequireDefault(require("./modifiers/computeStyles.js"));

var _applyStyles = _interopRequireDefault(require("./modifiers/applyStyles.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultModifiers = [_eventListeners.default, _popperOffsets.default, _computeStyles.default, _applyStyles.default];
exports.defaultModifiers = defaultModifiers;
var createPopper = /*#__PURE__*/(0, _createPopper.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

exports.createPopper = createPopper;
},{"./createPopper.js":"../node_modules/@popperjs/core/lib/createPopper.js","./modifiers/eventListeners.js":"../node_modules/@popperjs/core/lib/modifiers/eventListeners.js","./modifiers/popperOffsets.js":"../node_modules/@popperjs/core/lib/modifiers/popperOffsets.js","./modifiers/computeStyles.js":"../node_modules/@popperjs/core/lib/modifiers/computeStyles.js","./modifiers/applyStyles.js":"../node_modules/@popperjs/core/lib/modifiers/applyStyles.js"}],"../node_modules/@popperjs/core/lib/popper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createPopper: true,
  defaultModifiers: true,
  popperGenerator: true,
  detectOverflow: true,
  createPopperLite: true
};
Object.defineProperty(exports, "popperGenerator", {
  enumerable: true,
  get: function () {
    return _createPopper.popperGenerator;
  }
});
Object.defineProperty(exports, "detectOverflow", {
  enumerable: true,
  get: function () {
    return _createPopper.detectOverflow;
  }
});
Object.defineProperty(exports, "createPopperLite", {
  enumerable: true,
  get: function () {
    return _popperLite.createPopper;
  }
});
exports.defaultModifiers = exports.createPopper = void 0;

var _createPopper = require("./createPopper.js");

var _eventListeners = _interopRequireDefault(require("./modifiers/eventListeners.js"));

var _popperOffsets = _interopRequireDefault(require("./modifiers/popperOffsets.js"));

var _computeStyles = _interopRequireDefault(require("./modifiers/computeStyles.js"));

var _applyStyles = _interopRequireDefault(require("./modifiers/applyStyles.js"));

var _offset = _interopRequireDefault(require("./modifiers/offset.js"));

var _flip = _interopRequireDefault(require("./modifiers/flip.js"));

var _preventOverflow = _interopRequireDefault(require("./modifiers/preventOverflow.js"));

var _arrow = _interopRequireDefault(require("./modifiers/arrow.js"));

var _hide = _interopRequireDefault(require("./modifiers/hide.js"));

var _popperLite = require("./popper-lite.js");

var _index = require("./modifiers/index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultModifiers = [_eventListeners.default, _popperOffsets.default, _computeStyles.default, _applyStyles.default, _offset.default, _flip.default, _preventOverflow.default, _arrow.default, _hide.default];
exports.defaultModifiers = defaultModifiers;
var createPopper = /*#__PURE__*/(0, _createPopper.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

exports.createPopper = createPopper;
},{"./createPopper.js":"../node_modules/@popperjs/core/lib/createPopper.js","./modifiers/eventListeners.js":"../node_modules/@popperjs/core/lib/modifiers/eventListeners.js","./modifiers/popperOffsets.js":"../node_modules/@popperjs/core/lib/modifiers/popperOffsets.js","./modifiers/computeStyles.js":"../node_modules/@popperjs/core/lib/modifiers/computeStyles.js","./modifiers/applyStyles.js":"../node_modules/@popperjs/core/lib/modifiers/applyStyles.js","./modifiers/offset.js":"../node_modules/@popperjs/core/lib/modifiers/offset.js","./modifiers/flip.js":"../node_modules/@popperjs/core/lib/modifiers/flip.js","./modifiers/preventOverflow.js":"../node_modules/@popperjs/core/lib/modifiers/preventOverflow.js","./modifiers/arrow.js":"../node_modules/@popperjs/core/lib/modifiers/arrow.js","./modifiers/hide.js":"../node_modules/@popperjs/core/lib/modifiers/hide.js","./popper-lite.js":"../node_modules/@popperjs/core/lib/popper-lite.js","./modifiers/index.js":"../node_modules/@popperjs/core/lib/modifiers/index.js"}],"../node_modules/@popperjs/core/lib/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  popperGenerator: true,
  detectOverflow: true,
  createPopperBase: true,
  createPopper: true,
  createPopperLite: true
};
Object.defineProperty(exports, "popperGenerator", {
  enumerable: true,
  get: function () {
    return _createPopper.popperGenerator;
  }
});
Object.defineProperty(exports, "detectOverflow", {
  enumerable: true,
  get: function () {
    return _createPopper.detectOverflow;
  }
});
Object.defineProperty(exports, "createPopperBase", {
  enumerable: true,
  get: function () {
    return _createPopper.createPopper;
  }
});
Object.defineProperty(exports, "createPopper", {
  enumerable: true,
  get: function () {
    return _popper.createPopper;
  }
});
Object.defineProperty(exports, "createPopperLite", {
  enumerable: true,
  get: function () {
    return _popperLite.createPopper;
  }
});

var _enums = require("./enums.js");

Object.keys(_enums).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _enums[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _enums[key];
    }
  });
});

var _index = require("./modifiers/index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

var _createPopper = require("./createPopper.js");

var _popper = require("./popper.js");

var _popperLite = require("./popper-lite.js");
},{"./enums.js":"../node_modules/@popperjs/core/lib/enums.js","./modifiers/index.js":"../node_modules/@popperjs/core/lib/modifiers/index.js","./createPopper.js":"../node_modules/@popperjs/core/lib/createPopper.js","./popper.js":"../node_modules/@popperjs/core/lib/popper.js","./popper-lite.js":"../node_modules/@popperjs/core/lib/popper-lite.js"}],"../node_modules/tippy.js/dist/tippy.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delegate = delegate;
exports.sticky = exports.roundArrow = exports.inlinePositioning = exports.hideAll = exports.followCursor = exports.createSingleton = exports.animateFill = exports.default = void 0;

var _core = require("@popperjs/core");

/**!
* tippy.js v6.2.7
* (c) 2017-2020 atomiks
* MIT License
*/
var ROUND_ARROW = '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>';
exports.roundArrow = ROUND_ARROW;
var BOX_CLASS = "tippy-box";
var CONTENT_CLASS = "tippy-content";
var BACKDROP_CLASS = "tippy-backdrop";
var ARROW_CLASS = "tippy-arrow";
var SVG_ARROW_CLASS = "tippy-svg-arrow";
var TOUCH_OPTIONS = {
  passive: true,
  capture: true
};

function hasOwnProperty(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}

function getValueAtIndexOrReturn(value, index, defaultValue) {
  if (Array.isArray(value)) {
    var v = value[index];
    return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
  }

  return value;
}

function isType(value, type) {
  var str = {}.toString.call(value);
  return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
}

function invokeWithArgsOrReturn(value, args) {
  return typeof value === 'function' ? value.apply(void 0, args) : value;
}

function debounce(fn, ms) {
  // Avoid wrapping in `setTimeout` if ms is 0 anyway
  if (ms === 0) {
    return fn;
  }

  var timeout;
  return function (arg) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn(arg);
    }, ms);
  };
}

function removeProperties(obj, keys) {
  var clone = Object.assign({}, obj);
  keys.forEach(function (key) {
    delete clone[key];
  });
  return clone;
}

function splitBySpaces(value) {
  return value.split(/\s+/).filter(Boolean);
}

function normalizeToArray(value) {
  return [].concat(value);
}

function pushIfUnique(arr, value) {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
}

function unique(arr) {
  return arr.filter(function (item, index) {
    return arr.indexOf(item) === index;
  });
}

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

function arrayFrom(value) {
  return [].slice.call(value);
}

function removeUndefinedProps(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    if (obj[key] !== undefined) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
}

function div() {
  return document.createElement('div');
}

function isElement(value) {
  return ['Element', 'Fragment'].some(function (type) {
    return isType(value, type);
  });
}

function isNodeList(value) {
  return isType(value, 'NodeList');
}

function isMouseEvent(value) {
  return isType(value, 'MouseEvent');
}

function isReferenceElement(value) {
  return !!(value && value._tippy && value._tippy.reference === value);
}

function getArrayOfElements(value) {
  if (isElement(value)) {
    return [value];
  }

  if (isNodeList(value)) {
    return arrayFrom(value);
  }

  if (Array.isArray(value)) {
    return value;
  }

  return arrayFrom(document.querySelectorAll(value));
}

function setTransitionDuration(els, value) {
  els.forEach(function (el) {
    if (el) {
      el.style.transitionDuration = value + "ms";
    }
  });
}

function setVisibilityState(els, state) {
  els.forEach(function (el) {
    if (el) {
      el.setAttribute('data-state', state);
    }
  });
}

function getOwnerDocument(elementOrElements) {
  var _normalizeToArray = normalizeToArray(elementOrElements),
      element = _normalizeToArray[0];

  return element ? element.ownerDocument || document : document;
}

function isCursorOutsideInteractiveBorder(popperTreeData, event) {
  var clientX = event.clientX,
      clientY = event.clientY;
  return popperTreeData.every(function (_ref) {
    var popperRect = _ref.popperRect,
        popperState = _ref.popperState,
        props = _ref.props;
    var interactiveBorder = props.interactiveBorder;
    var basePlacement = getBasePlacement(popperState.placement);
    var offsetData = popperState.modifiersData.offset;

    if (!offsetData) {
      return true;
    }

    var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
    var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
    var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
    var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
    var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
    var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
    var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
    var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
    return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
  });
}

function updateTransitionEndListener(box, action, listener) {
  var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
  // `webkitTransitionEnd`...

  ['transitionend', 'webkitTransitionEnd'].forEach(function (event) {
    box[method](event, listener);
  });
}

var currentInput = {
  isTouch: false
};
var lastMouseMoveTime = 0;
/**
 * When a `touchstart` event is fired, it's assumed the user is using touch
 * input. We'll bind a `mousemove` event listener to listen for mouse input in
 * the future. This way, the `isTouch` property is fully dynamic and will handle
 * hybrid devices that use a mix of touch + mouse input.
 */

function onDocumentTouchStart() {
  if (currentInput.isTouch) {
    return;
  }

  currentInput.isTouch = true;

  if (window.performance) {
    document.addEventListener('mousemove', onDocumentMouseMove);
  }
}
/**
 * When two `mousemove` event are fired consecutively within 20ms, it's assumed
 * the user is using mouse input again. `mousemove` can fire on touch devices as
 * well, but very rarely that quickly.
 */


function onDocumentMouseMove() {
  var now = performance.now();

  if (now - lastMouseMoveTime < 20) {
    currentInput.isTouch = false;
    document.removeEventListener('mousemove', onDocumentMouseMove);
  }

  lastMouseMoveTime = now;
}
/**
 * When an element is in focus and has a tippy, leaving the tab/window and
 * returning causes it to show again. For mouse users this is unexpected, but
 * for keyboard use it makes sense.
 * TODO: find a better technique to solve this problem
 */


function onWindowBlur() {
  var activeElement = document.activeElement;

  if (isReferenceElement(activeElement)) {
    var instance = activeElement._tippy;

    if (activeElement.blur && !instance.state.isVisible) {
      activeElement.blur();
    }
  }
}

function bindGlobalEventListeners() {
  document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
  window.addEventListener('blur', onWindowBlur);
}

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var ua = isBrowser ? navigator.userAgent : '';
var isIE = /MSIE |Trident\//.test(ua);

function createMemoryLeakWarning(method) {
  var txt = method === 'destroy' ? 'n already-' : ' ';
  return [method + "() was called on a" + txt + "destroyed instance. This is a no-op but", 'indicates a potential memory leak.'].join(' ');
}

function clean(value) {
  var spacesAndTabs = /[ \t]{2,}/g;
  var lineStartWithSpaces = /^[ \t]*/gm;
  return value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
}

function getDevMessage(message) {
  return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c\uD83D\uDC77\u200D This is a development-only message. It will be removed in production.\n  ");
}

function getFormattedMessage(message) {
  return [getDevMessage(message), // title
  'color: #00C584; font-size: 1.3em; font-weight: bold;', // message
  'line-height: 1.5', // footer
  'color: #a6a095;'];
} // Assume warnings and errors never have the same message


var visitedMessages;

if ("development" !== "production") {
  resetVisitedMessages();
}

function resetVisitedMessages() {
  visitedMessages = new Set();
}

function warnWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console;

    visitedMessages.add(message);

    (_console = console).warn.apply(_console, getFormattedMessage(message));
  }
}

function errorWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console2;

    visitedMessages.add(message);

    (_console2 = console).error.apply(_console2, getFormattedMessage(message));
  }
}

function validateTargets(targets) {
  var didPassFalsyValue = !targets;
  var didPassPlainObject = Object.prototype.toString.call(targets) === '[object Object]' && !targets.addEventListener;
  errorWhen(didPassFalsyValue, ['tippy() was passed', '`' + String(targets) + '`', 'as its targets (first) argument. Valid types are: String, Element,', 'Element[], or NodeList.'].join(' '));
  errorWhen(didPassPlainObject, ['tippy() was passed a plain object which is not supported as an argument', 'for virtual positioning. Use props.getReferenceClientRect instead.'].join(' '));
}

var pluginProps = {
  animateFill: false,
  followCursor: false,
  inlinePositioning: false,
  sticky: false
};
var renderProps = {
  allowHTML: false,
  animation: 'fade',
  arrow: true,
  content: '',
  inertia: false,
  maxWidth: 350,
  role: 'tooltip',
  theme: '',
  zIndex: 9999
};
var defaultProps = Object.assign({
  appendTo: function appendTo() {
    return document.body;
  },
  aria: {
    content: 'auto',
    expanded: 'auto'
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: true,
  ignoreAttributes: false,
  interactive: false,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: '',
  offset: [0, 10],
  onAfterUpdate: function onAfterUpdate() {},
  onBeforeUpdate: function onBeforeUpdate() {},
  onCreate: function onCreate() {},
  onDestroy: function onDestroy() {},
  onHidden: function onHidden() {},
  onHide: function onHide() {},
  onMount: function onMount() {},
  onShow: function onShow() {},
  onShown: function onShown() {},
  onTrigger: function onTrigger() {},
  onUntrigger: function onUntrigger() {},
  onClickOutside: function onClickOutside() {},
  placement: 'top',
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: false,
  touch: true,
  trigger: 'mouseenter focus',
  triggerTarget: null
}, pluginProps, {}, renderProps);
var defaultKeys = Object.keys(defaultProps);

var setDefaultProps = function setDefaultProps(partialProps) {
  /* istanbul ignore else */
  if ("development" !== "production") {
    validateProps(partialProps, []);
  }

  var keys = Object.keys(partialProps);
  keys.forEach(function (key) {
    defaultProps[key] = partialProps[key];
  });
};

function getExtendedPassedProps(passedProps) {
  var plugins = passedProps.plugins || [];
  var pluginProps = plugins.reduce(function (acc, plugin) {
    var name = plugin.name,
        defaultValue = plugin.defaultValue;

    if (name) {
      acc[name] = passedProps[name] !== undefined ? passedProps[name] : defaultValue;
    }

    return acc;
  }, {});
  return Object.assign({}, passedProps, {}, pluginProps);
}

function getDataAttributeProps(reference, plugins) {
  var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
    plugins: plugins
  }))) : defaultKeys;
  var props = propKeys.reduce(function (acc, key) {
    var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

    if (!valueAsString) {
      return acc;
    }

    if (key === 'content') {
      acc[key] = valueAsString;
    } else {
      try {
        acc[key] = JSON.parse(valueAsString);
      } catch (e) {
        acc[key] = valueAsString;
      }
    }

    return acc;
  }, {});
  return props;
}

function evaluateProps(reference, props) {
  var out = Object.assign({}, props, {
    content: invokeWithArgsOrReturn(props.content, [reference])
  }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
  out.aria = Object.assign({}, defaultProps.aria, {}, out.aria);
  out.aria = {
    expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
    content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
  };
  return out;
}

function validateProps(partialProps, plugins) {
  if (partialProps === void 0) {
    partialProps = {};
  }

  if (plugins === void 0) {
    plugins = [];
  }

  var keys = Object.keys(partialProps);
  keys.forEach(function (prop) {
    var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
    var didPassUnknownProp = !hasOwnProperty(nonPluginProps, prop); // Check if the prop exists in `plugins`

    if (didPassUnknownProp) {
      didPassUnknownProp = plugins.filter(function (plugin) {
        return plugin.name === prop;
      }).length === 0;
    }

    warnWhen(didPassUnknownProp, ["`" + prop + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", 'a plugin, forgot to pass it in an array as props.plugins.', '\n\n', 'All props: https://atomiks.github.io/tippyjs/v6/all-props/\n', 'Plugins: https://atomiks.github.io/tippyjs/v6/plugins/'].join(' '));
  });
}

var innerHTML = function innerHTML() {
  return 'innerHTML';
};

function dangerouslySetInnerHTML(element, html) {
  element[innerHTML()] = html;
}

function createArrowElement(value) {
  var arrow = div();

  if (value === true) {
    arrow.className = ARROW_CLASS;
  } else {
    arrow.className = SVG_ARROW_CLASS;

    if (isElement(value)) {
      arrow.appendChild(value);
    } else {
      dangerouslySetInnerHTML(arrow, value);
    }
  }

  return arrow;
}

function setContent(content, props) {
  if (isElement(props.content)) {
    dangerouslySetInnerHTML(content, '');
    content.appendChild(props.content);
  } else if (typeof props.content !== 'function') {
    if (props.allowHTML) {
      dangerouslySetInnerHTML(content, props.content);
    } else {
      content.textContent = props.content;
    }
  }
}

function getChildren(popper) {
  var box = popper.firstElementChild;
  var boxChildren = arrayFrom(box.children);
  return {
    box: box,
    content: boxChildren.find(function (node) {
      return node.classList.contains(CONTENT_CLASS);
    }),
    arrow: boxChildren.find(function (node) {
      return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
    }),
    backdrop: boxChildren.find(function (node) {
      return node.classList.contains(BACKDROP_CLASS);
    })
  };
}

function render(instance) {
  var popper = div();
  var box = div();
  box.className = BOX_CLASS;
  box.setAttribute('data-state', 'hidden');
  box.setAttribute('tabindex', '-1');
  var content = div();
  content.className = CONTENT_CLASS;
  content.setAttribute('data-state', 'hidden');
  setContent(content, instance.props);
  popper.appendChild(box);
  box.appendChild(content);
  onUpdate(instance.props, instance.props);

  function onUpdate(prevProps, nextProps) {
    var _getChildren = getChildren(popper),
        box = _getChildren.box,
        content = _getChildren.content,
        arrow = _getChildren.arrow;

    if (nextProps.theme) {
      box.setAttribute('data-theme', nextProps.theme);
    } else {
      box.removeAttribute('data-theme');
    }

    if (typeof nextProps.animation === 'string') {
      box.setAttribute('data-animation', nextProps.animation);
    } else {
      box.removeAttribute('data-animation');
    }

    if (nextProps.inertia) {
      box.setAttribute('data-inertia', '');
    } else {
      box.removeAttribute('data-inertia');
    }

    box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;

    if (nextProps.role) {
      box.setAttribute('role', nextProps.role);
    } else {
      box.removeAttribute('role');
    }

    if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
      setContent(content, instance.props);
    }

    if (nextProps.arrow) {
      if (!arrow) {
        box.appendChild(createArrowElement(nextProps.arrow));
      } else if (prevProps.arrow !== nextProps.arrow) {
        box.removeChild(arrow);
        box.appendChild(createArrowElement(nextProps.arrow));
      }
    } else if (arrow) {
      box.removeChild(arrow);
    }
  }

  return {
    popper: popper,
    onUpdate: onUpdate
  };
} // Runtime check to identify if the render function is the default one; this
// way we can apply default CSS transitions logic and it can be tree-shaken away


render.$$tippy = true;
var idCounter = 1;
var mouseMoveListeners = []; // Used by `hideAll()`

var mountedInstances = [];

function createTippy(reference, passedProps) {
  var props = evaluateProps(reference, Object.assign({}, defaultProps, {}, getExtendedPassedProps(removeUndefinedProps(passedProps)))); // ===========================================================================
  // 🔒 Private members
  // ===========================================================================

  var showTimeout;
  var hideTimeout;
  var scheduleHideAnimationFrame;
  var isVisibleFromClick = false;
  var didHideDueToDocumentMouseDown = false;
  var didTouchMove = false;
  var ignoreOnFirstUpdate = false;
  var lastTriggerEvent;
  var currentTransitionEndListener;
  var onFirstUpdate;
  var listeners = [];
  var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
  var currentTarget; // ===========================================================================
  // 🔑 Public members
  // ===========================================================================

  var id = idCounter++;
  var popperInstance = null;
  var plugins = unique(props.plugins);
  var state = {
    // Is the instance currently enabled?
    isEnabled: true,
    // Is the tippy currently showing and not transitioning out?
    isVisible: false,
    // Has the instance been destroyed?
    isDestroyed: false,
    // Is the tippy currently mounted to the DOM?
    isMounted: false,
    // Has the tippy finished transitioning in?
    isShown: false
  };
  var instance = {
    // properties
    id: id,
    reference: reference,
    popper: div(),
    popperInstance: popperInstance,
    props: props,
    state: state,
    plugins: plugins,
    // methods
    clearDelayTimeouts: clearDelayTimeouts,
    setProps: setProps,
    setContent: setContent,
    show: show,
    hide: hide,
    hideWithInteractivity: hideWithInteractivity,
    enable: enable,
    disable: disable,
    unmount: unmount,
    destroy: destroy
  }; // TODO: Investigate why this early return causes a TDZ error in the tests —
  // it doesn't seem to happen in the browser

  /* istanbul ignore if */

  if (!props.render) {
    if ("development" !== "production") {
      errorWhen(true, 'render() function has not been supplied.');
    }

    return instance;
  } // ===========================================================================
  // Initial mutations
  // ===========================================================================


  var _props$render = props.render(instance),
      popper = _props$render.popper,
      onUpdate = _props$render.onUpdate;

  popper.setAttribute('data-tippy-root', '');
  popper.id = "tippy-" + instance.id;
  instance.popper = popper;
  reference._tippy = instance;
  popper._tippy = instance;
  var pluginsHooks = plugins.map(function (plugin) {
    return plugin.fn(instance);
  });
  var hasAriaExpanded = reference.hasAttribute('aria-expanded');
  addListeners();
  handleAriaExpandedAttribute();
  handleStyles();
  invokeHook('onCreate', [instance]);

  if (props.showOnCreate) {
    scheduleShow();
  } // Prevent a tippy with a delay from hiding if the cursor left then returned
  // before it started hiding


  popper.addEventListener('mouseenter', function () {
    if (instance.props.interactive && instance.state.isVisible) {
      instance.clearDelayTimeouts();
    }
  });
  popper.addEventListener('mouseleave', function (event) {
    if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
      getDocument().addEventListener('mousemove', debouncedOnMouseMove);
      debouncedOnMouseMove(event);
    }
  });
  return instance; // ===========================================================================
  // 🔒 Private methods
  // ===========================================================================

  function getNormalizedTouchSettings() {
    var touch = instance.props.touch;
    return Array.isArray(touch) ? touch : [touch, 0];
  }

  function getIsCustomTouchBehavior() {
    return getNormalizedTouchSettings()[0] === 'hold';
  }

  function getIsDefaultRenderFn() {
    var _instance$props$rende; // @ts-ignore


    return !!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy);
  }

  function getCurrentTarget() {
    return currentTarget || reference;
  }

  function getDocument() {
    var parent = getCurrentTarget().parentNode;
    return parent ? getOwnerDocument(parent) : document;
  }

  function getDefaultTemplateChildren() {
    return getChildren(popper);
  }

  function getDelay(isShow) {
    // For touch or keyboard input, force `0` delay for UX reasons
    // Also if the instance is mounted but not visible (transitioning out),
    // ignore delay
    if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
      return 0;
    }

    return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
  }

  function handleStyles() {
    popper.style.pointerEvents = instance.props.interactive && instance.state.isVisible ? '' : 'none';
    popper.style.zIndex = "" + instance.props.zIndex;
  }

  function invokeHook(hook, args, shouldInvokePropsHook) {
    if (shouldInvokePropsHook === void 0) {
      shouldInvokePropsHook = true;
    }

    pluginsHooks.forEach(function (pluginHooks) {
      if (pluginHooks[hook]) {
        pluginHooks[hook].apply(void 0, args);
      }
    });

    if (shouldInvokePropsHook) {
      var _instance$props;

      (_instance$props = instance.props)[hook].apply(_instance$props, args);
    }
  }

  function handleAriaContentAttribute() {
    var aria = instance.props.aria;

    if (!aria.content) {
      return;
    }

    var attr = "aria-" + aria.content;
    var id = popper.id;
    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      var currentValue = node.getAttribute(attr);

      if (instance.state.isVisible) {
        node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
      } else {
        var nextValue = currentValue && currentValue.replace(id, '').trim();

        if (nextValue) {
          node.setAttribute(attr, nextValue);
        } else {
          node.removeAttribute(attr);
        }
      }
    });
  }

  function handleAriaExpandedAttribute() {
    if (hasAriaExpanded || !instance.props.aria.expanded) {
      return;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      if (instance.props.interactive) {
        node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
      } else {
        node.removeAttribute('aria-expanded');
      }
    });
  }

  function cleanupInteractiveMouseListeners() {
    getDocument().removeEventListener('mousemove', debouncedOnMouseMove);
    mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
      return listener !== debouncedOnMouseMove;
    });
  }

  function onDocumentPress(event) {
    // Moved finger to scroll instead of an intentional tap outside
    if (currentInput.isTouch) {
      if (didTouchMove || event.type === 'mousedown') {
        return;
      }
    } // Clicked on interactive popper


    if (instance.props.interactive && popper.contains(event.target)) {
      return;
    } // Clicked on the event listeners target


    if (getCurrentTarget().contains(event.target)) {
      if (currentInput.isTouch) {
        return;
      }

      if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
        return;
      }
    } else {
      invokeHook('onClickOutside', [instance, event]);
    }

    if (instance.props.hideOnClick === true) {
      instance.clearDelayTimeouts();
      instance.hide(); // `mousedown` event is fired right before `focus` if pressing the
      // currentTarget. This lets a tippy with `focus` trigger know that it
      // should not show

      didHideDueToDocumentMouseDown = true;
      setTimeout(function () {
        didHideDueToDocumentMouseDown = false;
      }); // The listener gets added in `scheduleShow()`, but this may be hiding it
      // before it shows, and hide()'s early bail-out behavior can prevent it
      // from being cleaned up

      if (!instance.state.isMounted) {
        removeDocumentPress();
      }
    }
  }

  function onTouchMove() {
    didTouchMove = true;
  }

  function onTouchStart() {
    didTouchMove = false;
  }

  function addDocumentPress() {
    var doc = getDocument();
    doc.addEventListener('mousedown', onDocumentPress, true);
    doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function removeDocumentPress() {
    var doc = getDocument();
    doc.removeEventListener('mousedown', onDocumentPress, true);
    doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function onTransitionedOut(duration, callback) {
    onTransitionEnd(duration, function () {
      if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
        callback();
      }
    });
  }

  function onTransitionedIn(duration, callback) {
    onTransitionEnd(duration, callback);
  }

  function onTransitionEnd(duration, callback) {
    var box = getDefaultTemplateChildren().box;

    function listener(event) {
      if (event.target === box) {
        updateTransitionEndListener(box, 'remove', listener);
        callback();
      }
    } // Make callback synchronous if duration is 0
    // `transitionend` won't fire otherwise


    if (duration === 0) {
      return callback();
    }

    updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
    updateTransitionEndListener(box, 'add', listener);
    currentTransitionEndListener = listener;
  }

  function on(eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      node.addEventListener(eventType, handler, options);
      listeners.push({
        node: node,
        eventType: eventType,
        handler: handler,
        options: options
      });
    });
  }

  function addListeners() {
    if (getIsCustomTouchBehavior()) {
      on('touchstart', onTrigger, {
        passive: true
      });
      on('touchend', onMouseLeave, {
        passive: true
      });
    }

    splitBySpaces(instance.props.trigger).forEach(function (eventType) {
      if (eventType === 'manual') {
        return;
      }

      on(eventType, onTrigger);

      switch (eventType) {
        case 'mouseenter':
          on('mouseleave', onMouseLeave);
          break;

        case 'focus':
          on(isIE ? 'focusout' : 'blur', onBlurOrFocusOut);
          break;

        case 'focusin':
          on('focusout', onBlurOrFocusOut);
          break;
      }
    });
  }

  function removeListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function onTrigger(event) {
    var _lastTriggerEvent;

    var shouldScheduleClickHide = false;

    if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
      return;
    }

    var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
    lastTriggerEvent = event;
    currentTarget = event.currentTarget;
    handleAriaExpandedAttribute();

    if (!instance.state.isVisible && isMouseEvent(event)) {
      // If scrolling, `mouseenter` events can be fired if the cursor lands
      // over a new target, but `mousemove` events don't get fired. This
      // causes interactive tooltips to get stuck open until the cursor is
      // moved
      mouseMoveListeners.forEach(function (listener) {
        return listener(event);
      });
    } // Toggle show/hide when clicking click-triggered tooltips


    if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
      shouldScheduleClickHide = true;
    } else {
      scheduleShow(event);
    }

    if (event.type === 'click') {
      isVisibleFromClick = !shouldScheduleClickHide;
    }

    if (shouldScheduleClickHide && !wasFocused) {
      scheduleHide(event);
    }
  }

  function onMouseMove(event) {
    var target = event.target;
    var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);

    if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
      return;
    }

    var popperTreeData = getNestedPopperTree().concat(popper).map(function (popper) {
      var _instance$popperInsta;

      var instance = popper._tippy;
      var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;

      if (state) {
        return {
          popperRect: popper.getBoundingClientRect(),
          popperState: state,
          props: props
        };
      }

      return null;
    }).filter(Boolean);

    if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
      cleanupInteractiveMouseListeners();
      scheduleHide(event);
    }
  }

  function onMouseLeave(event) {
    var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;

    if (shouldBail) {
      return;
    }

    if (instance.props.interactive) {
      instance.hideWithInteractivity(event);
      return;
    }

    scheduleHide(event);
  }

  function onBlurOrFocusOut(event) {
    if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
      return;
    } // If focus was moved to within the popper


    if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
      return;
    }

    scheduleHide(event);
  }

  function isEventListenerStopped(event) {
    return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
  }

  function createPopperInstance() {
    destroyPopperInstance();
    var _instance$props2 = instance.props,
        popperOptions = _instance$props2.popperOptions,
        placement = _instance$props2.placement,
        offset = _instance$props2.offset,
        getReferenceClientRect = _instance$props2.getReferenceClientRect,
        moveTransition = _instance$props2.moveTransition;
    var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
    var computedReference = getReferenceClientRect ? {
      getBoundingClientRect: getReferenceClientRect,
      contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
    } : reference;
    var tippyModifier = {
      name: '$$tippy',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn: function fn(_ref2) {
        var state = _ref2.state;

        if (getIsDefaultRenderFn()) {
          var _getDefaultTemplateCh = getDefaultTemplateChildren(),
              box = _getDefaultTemplateCh.box;

          ['placement', 'reference-hidden', 'escaped'].forEach(function (attr) {
            if (attr === 'placement') {
              box.setAttribute('data-placement', state.placement);
            } else {
              if (state.attributes.popper["data-popper-" + attr]) {
                box.setAttribute("data-" + attr, '');
              } else {
                box.removeAttribute("data-" + attr);
              }
            }
          });
          state.attributes.popper = {};
        }
      }
    };
    var modifiers = [{
      name: 'offset',
      options: {
        offset: offset
      }
    }, {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: 'flip',
      options: {
        padding: 5
      }
    }, {
      name: 'computeStyles',
      options: {
        adaptive: !moveTransition
      }
    }, tippyModifier];

    if (getIsDefaultRenderFn() && arrow) {
      modifiers.push({
        name: 'arrow',
        options: {
          element: arrow,
          padding: 3
        }
      });
    }

    modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
    instance.popperInstance = (0, _core.createPopper)(computedReference, popper, Object.assign({}, popperOptions, {
      placement: placement,
      onFirstUpdate: onFirstUpdate,
      modifiers: modifiers
    }));
  }

  function destroyPopperInstance() {
    if (instance.popperInstance) {
      instance.popperInstance.destroy();
      instance.popperInstance = null;
    }
  }

  function mount() {
    var appendTo = instance.props.appendTo;
    var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
    // it's directly after the reference element so the elements inside the
    // tippy can be tabbed to
    // If there are clipping issues, the user can specify a different appendTo
    // and ensure focus management is handled correctly manually

    var node = getCurrentTarget();

    if (instance.props.interactive && appendTo === defaultProps.appendTo || appendTo === 'parent') {
      parentNode = node.parentNode;
    } else {
      parentNode = invokeWithArgsOrReturn(appendTo, [node]);
    } // The popper element needs to exist on the DOM before its position can be
    // updated as Popper needs to read its dimensions


    if (!parentNode.contains(popper)) {
      parentNode.appendChild(popper);
    }

    createPopperInstance();
    /* istanbul ignore else */

    if ("development" !== "production") {
      // Accessibility check
      warnWhen(instance.props.interactive && appendTo === defaultProps.appendTo && node.nextElementSibling !== popper, ['Interactive tippy element may not be accessible via keyboard', 'navigation because it is not directly after the reference element', 'in the DOM source order.', '\n\n', 'Using a wrapper <div> or <span> tag around the reference element', 'solves this by creating a new parentNode context.', '\n\n', 'Specifying `appendTo: document.body` silences this warning, but it', 'assumes you are using a focus management solution to handle', 'keyboard navigation.', '\n\n', 'See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity'].join(' '));
    }
  }

  function getNestedPopperTree() {
    return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
  }

  function scheduleShow(event) {
    instance.clearDelayTimeouts();

    if (event) {
      invokeHook('onTrigger', [instance, event]);
    }

    addDocumentPress();
    var delay = getDelay(true);

    var _getNormalizedTouchSe = getNormalizedTouchSettings(),
        touchValue = _getNormalizedTouchSe[0],
        touchDelay = _getNormalizedTouchSe[1];

    if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
      delay = touchDelay;
    }

    if (delay) {
      showTimeout = setTimeout(function () {
        instance.show();
      }, delay);
    } else {
      instance.show();
    }
  }

  function scheduleHide(event) {
    instance.clearDelayTimeouts();
    invokeHook('onUntrigger', [instance, event]);

    if (!instance.state.isVisible) {
      removeDocumentPress();
      return;
    } // For interactive tippies, scheduleHide is added to a document.body handler
    // from onMouseLeave so must intercept scheduled hides from mousemove/leave
    // events when trigger contains mouseenter and click, and the tip is
    // currently shown as a result of a click.


    if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && ['mouseleave', 'mousemove'].indexOf(event.type) >= 0 && isVisibleFromClick) {
      return;
    }

    var delay = getDelay(false);

    if (delay) {
      hideTimeout = setTimeout(function () {
        if (instance.state.isVisible) {
          instance.hide();
        }
      }, delay);
    } else {
      // Fixes a `transitionend` problem when it fires 1 frame too
      // late sometimes, we don't want hide() to be called.
      scheduleHideAnimationFrame = requestAnimationFrame(function () {
        instance.hide();
      });
    }
  } // ===========================================================================
  // 🔑 Public methods
  // ===========================================================================


  function enable() {
    instance.state.isEnabled = true;
  }

  function disable() {
    // Disabling the instance should also hide it
    // https://github.com/atomiks/tippy.js-react/issues/106
    instance.hide();
    instance.state.isEnabled = false;
  }

  function clearDelayTimeouts() {
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);
    cancelAnimationFrame(scheduleHideAnimationFrame);
  }

  function setProps(partialProps) {
    /* istanbul ignore else */
    if ("development" !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('setProps'));
    }

    if (instance.state.isDestroyed) {
      return;
    }

    invokeHook('onBeforeUpdate', [instance, partialProps]);
    removeListeners();
    var prevProps = instance.props;
    var nextProps = evaluateProps(reference, Object.assign({}, instance.props, {}, partialProps, {
      ignoreAttributes: true
    }));
    instance.props = nextProps;
    addListeners();

    if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
      cleanupInteractiveMouseListeners();
      debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
    } // Ensure stale aria-expanded attributes are removed


    if (prevProps.triggerTarget && !nextProps.triggerTarget) {
      normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
        node.removeAttribute('aria-expanded');
      });
    } else if (nextProps.triggerTarget) {
      reference.removeAttribute('aria-expanded');
    }

    handleAriaExpandedAttribute();
    handleStyles();

    if (onUpdate) {
      onUpdate(prevProps, nextProps);
    }

    if (instance.popperInstance) {
      createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
      // and the nested ones get re-rendered first.
      // https://github.com/atomiks/tippyjs-react/issues/177
      // TODO: find a cleaner / more efficient solution(!)

      getNestedPopperTree().forEach(function (nestedPopper) {
        // React (and other UI libs likely) requires a rAF wrapper as it flushes
        // its work in one
        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
      });
    }

    invokeHook('onAfterUpdate', [instance, partialProps]);
  }

  function setContent(content) {
    instance.setProps({
      content: content
    });
  }

  function show() {
    /* istanbul ignore else */
    if ("development" !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('show'));
    } // Early bail-out


    var isAlreadyVisible = instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);

    if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
      return;
    } // Normalize `disabled` behavior across browsers.
    // Firefox allows events on disabled elements, but Chrome doesn't.
    // Using a wrapper element (i.e. <span>) is recommended.


    if (getCurrentTarget().hasAttribute('disabled')) {
      return;
    }

    invokeHook('onShow', [instance], false);

    if (instance.props.onShow(instance) === false) {
      return;
    }

    instance.state.isVisible = true;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'visible';
    }

    handleStyles();
    addDocumentPress();

    if (!instance.state.isMounted) {
      popper.style.transition = 'none';
    } // If flipping to the opposite side after hiding at least once, the
    // animation will use the wrong placement without resetting the duration


    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh2.box,
          content = _getDefaultTemplateCh2.content;

      setTransitionDuration([box, content], 0);
    }

    onFirstUpdate = function onFirstUpdate() {
      if (!instance.state.isVisible || ignoreOnFirstUpdate) {
        return;
      }

      ignoreOnFirstUpdate = true; // reflow

      void popper.offsetHeight;
      popper.style.transition = instance.props.moveTransition;

      if (getIsDefaultRenderFn() && instance.props.animation) {
        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
            _box = _getDefaultTemplateCh3.box,
            _content = _getDefaultTemplateCh3.content;

        setTransitionDuration([_box, _content], duration);
        setVisibilityState([_box, _content], 'visible');
      }

      handleAriaContentAttribute();
      handleAriaExpandedAttribute();
      pushIfUnique(mountedInstances, instance);
      instance.state.isMounted = true;
      invokeHook('onMount', [instance]);

      if (instance.props.animation && getIsDefaultRenderFn()) {
        onTransitionedIn(duration, function () {
          instance.state.isShown = true;
          invokeHook('onShown', [instance]);
        });
      }
    };

    mount();
  }

  function hide() {
    /* istanbul ignore else */
    if ("development" !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hide'));
    } // Early bail-out


    var isAlreadyHidden = !instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);

    if (isAlreadyHidden || isDestroyed || isDisabled) {
      return;
    }

    invokeHook('onHide', [instance], false);

    if (instance.props.onHide(instance) === false) {
      return;
    }

    instance.state.isVisible = false;
    instance.state.isShown = false;
    ignoreOnFirstUpdate = false;
    isVisibleFromClick = false;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'hidden';
    }

    cleanupInteractiveMouseListeners();
    removeDocumentPress();
    handleStyles();

    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh4.box,
          content = _getDefaultTemplateCh4.content;

      if (instance.props.animation) {
        setTransitionDuration([box, content], duration);
        setVisibilityState([box, content], 'hidden');
      }
    }

    handleAriaContentAttribute();
    handleAriaExpandedAttribute();

    if (instance.props.animation) {
      if (getIsDefaultRenderFn()) {
        onTransitionedOut(duration, instance.unmount);
      }
    } else {
      instance.unmount();
    }
  }

  function hideWithInteractivity(event) {
    /* istanbul ignore else */
    if ("development" !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hideWithInteractivity'));
    }

    getDocument().addEventListener('mousemove', debouncedOnMouseMove);
    pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
    debouncedOnMouseMove(event);
  }

  function unmount() {
    /* istanbul ignore else */
    if ("development" !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('unmount'));
    }

    if (instance.state.isVisible) {
      instance.hide();
    }

    if (!instance.state.isMounted) {
      return;
    }

    destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
    // tree by default. This seems mainly for interactive tippies, but we should
    // find a workaround if possible

    getNestedPopperTree().forEach(function (nestedPopper) {
      nestedPopper._tippy.unmount();
    });

    if (popper.parentNode) {
      popper.parentNode.removeChild(popper);
    }

    mountedInstances = mountedInstances.filter(function (i) {
      return i !== instance;
    });
    instance.state.isMounted = false;
    invokeHook('onHidden', [instance]);
  }

  function destroy() {
    /* istanbul ignore else */
    if ("development" !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('destroy'));
    }

    if (instance.state.isDestroyed) {
      return;
    }

    instance.clearDelayTimeouts();
    instance.unmount();
    removeListeners();
    delete reference._tippy;
    instance.state.isDestroyed = true;
    invokeHook('onDestroy', [instance]);
  }
}

function tippy(targets, optionalProps) {
  if (optionalProps === void 0) {
    optionalProps = {};
  }

  var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
  /* istanbul ignore else */

  if ("development" !== "production") {
    validateTargets(targets);
    validateProps(optionalProps, plugins);
  }

  bindGlobalEventListeners();
  var passedProps = Object.assign({}, optionalProps, {
    plugins: plugins
  });
  var elements = getArrayOfElements(targets);
  /* istanbul ignore else */

  if ("development" !== "production") {
    var isSingleContentElement = isElement(passedProps.content);
    var isMoreThanOneReferenceElement = elements.length > 1;
    warnWhen(isSingleContentElement && isMoreThanOneReferenceElement, ['tippy() was passed an Element as the `content` prop, but more than', 'one tippy instance was created by this invocation. This means the', 'content element will only be appended to the last tippy instance.', '\n\n', 'Instead, pass the .innerHTML of the element, or use a function that', 'returns a cloned version of the element instead.', '\n\n', '1) content: element.innerHTML\n', '2) content: () => element.cloneNode(true)'].join(' '));
  }

  var instances = elements.reduce(function (acc, reference) {
    var instance = reference && createTippy(reference, passedProps);

    if (instance) {
      acc.push(instance);
    }

    return acc;
  }, []);
  return isElement(targets) ? instances[0] : instances;
}

tippy.defaultProps = defaultProps;
tippy.setDefaultProps = setDefaultProps;
tippy.currentInput = currentInput;

var hideAll = function hideAll(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      excludedReferenceOrInstance = _ref.exclude,
      duration = _ref.duration;

  mountedInstances.forEach(function (instance) {
    var isExcluded = false;

    if (excludedReferenceOrInstance) {
      isExcluded = isReferenceElement(excludedReferenceOrInstance) ? instance.reference === excludedReferenceOrInstance : instance.popper === excludedReferenceOrInstance.popper;
    }

    if (!isExcluded) {
      var originalDuration = instance.props.duration;
      instance.setProps({
        duration: duration
      });
      instance.hide();

      if (!instance.state.isDestroyed) {
        instance.setProps({
          duration: originalDuration
        });
      }
    }
  });
};

exports.hideAll = hideAll;

var createSingleton = function createSingleton(tippyInstances, optionalProps) {
  if (optionalProps === void 0) {
    optionalProps = {};
  }
  /* istanbul ignore else */


  if ("development" !== "production") {
    errorWhen(!Array.isArray(tippyInstances), ['The first argument passed to createSingleton() must be an array of', 'tippy instances. The passed value was', String(tippyInstances)].join(' '));
  }

  var individualInstances = tippyInstances;
  var references = [];
  var currentTarget;
  var overrides = optionalProps.overrides;
  var interceptSetPropsCleanups = [];

  function setReferences() {
    references = individualInstances.map(function (instance) {
      return instance.reference;
    });
  }

  function enableInstances(isEnabled) {
    individualInstances.forEach(function (instance) {
      if (isEnabled) {
        instance.enable();
      } else {
        instance.disable();
      }
    });
  }

  function interceptSetProps(singleton) {
    return individualInstances.map(function (instance) {
      var originalSetProps = instance.setProps;

      instance.setProps = function (props) {
        originalSetProps(props);

        if (instance.reference === currentTarget) {
          singleton.setProps(props);
        }
      };

      return function () {
        instance.setProps = originalSetProps;
      };
    });
  }

  enableInstances(false);
  setReferences();
  var plugin = {
    fn: function fn() {
      return {
        onDestroy: function onDestroy() {
          enableInstances(true);
        },
        onTrigger: function onTrigger(instance, event) {
          var target = event.currentTarget;
          var index = references.indexOf(target); // bail-out

          if (target === currentTarget) {
            return;
          }

          currentTarget = target;
          var overrideProps = (overrides || []).concat('content').reduce(function (acc, prop) {
            acc[prop] = individualInstances[index].props[prop];
            return acc;
          }, {});
          instance.setProps(Object.assign({}, overrideProps, {
            getReferenceClientRect: typeof overrideProps.getReferenceClientRect === 'function' ? overrideProps.getReferenceClientRect : function () {
              return target.getBoundingClientRect();
            }
          }));
        }
      };
    }
  };
  var singleton = tippy(div(), Object.assign({}, removeProperties(optionalProps, ['overrides']), {
    plugins: [plugin].concat(optionalProps.plugins || []),
    triggerTarget: references
  }));
  var originalSetProps = singleton.setProps;

  singleton.setProps = function (props) {
    overrides = props.overrides || overrides;
    originalSetProps(props);
  };

  singleton.setInstances = function (nextInstances) {
    enableInstances(true);
    interceptSetPropsCleanups.forEach(function (fn) {
      return fn();
    });
    individualInstances = nextInstances;
    enableInstances(false);
    setReferences();
    interceptSetProps(singleton);
    singleton.setProps({
      triggerTarget: references
    });
  };

  interceptSetPropsCleanups = interceptSetProps(singleton);
  return singleton;
};

exports.createSingleton = createSingleton;
var BUBBLING_EVENTS_MAP = {
  mouseover: 'mouseenter',
  focusin: 'focus',
  click: 'click'
};
/**
 * Creates a delegate instance that controls the creation of tippy instances
 * for child elements (`target` CSS selector).
 */

function delegate(targets, props) {
  /* istanbul ignore else */
  if ("development" !== "production") {
    errorWhen(!(props && props.target), ['You must specity a `target` prop indicating a CSS selector string matching', 'the target elements that should receive a tippy.'].join(' '));
  }

  var listeners = [];
  var childTippyInstances = [];
  var disabled = false;
  var target = props.target;
  var nativeProps = removeProperties(props, ['target']);
  var parentProps = Object.assign({}, nativeProps, {
    trigger: 'manual',
    touch: false
  });
  var childProps = Object.assign({}, nativeProps, {
    showOnCreate: true
  });
  var returnValue = tippy(targets, parentProps);
  var normalizedReturnValue = normalizeToArray(returnValue);

  function onTrigger(event) {
    if (!event.target || disabled) {
      return;
    }

    var targetNode = event.target.closest(target);

    if (!targetNode) {
      return;
    } // Get relevant trigger with fallbacks:
    // 1. Check `data-tippy-trigger` attribute on target node
    // 2. Fallback to `trigger` passed to `delegate()`
    // 3. Fallback to `defaultProps.trigger`


    var trigger = targetNode.getAttribute('data-tippy-trigger') || props.trigger || defaultProps.trigger; // @ts-ignore

    if (targetNode._tippy) {
      return;
    }

    if (event.type === 'touchstart' && typeof childProps.touch === 'boolean') {
      return;
    }

    if (event.type !== 'touchstart' && trigger.indexOf(BUBBLING_EVENTS_MAP[event.type]) < 0) {
      return;
    }

    var instance = tippy(targetNode, childProps);

    if (instance) {
      childTippyInstances = childTippyInstances.concat(instance);
    }
  }

  function on(node, eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    node.addEventListener(eventType, handler, options);
    listeners.push({
      node: node,
      eventType: eventType,
      handler: handler,
      options: options
    });
  }

  function addEventListeners(instance) {
    var reference = instance.reference;
    on(reference, 'touchstart', onTrigger);
    on(reference, 'mouseover', onTrigger);
    on(reference, 'focusin', onTrigger);
    on(reference, 'click', onTrigger);
  }

  function removeEventListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function applyMutations(instance) {
    var originalDestroy = instance.destroy;
    var originalEnable = instance.enable;
    var originalDisable = instance.disable;

    instance.destroy = function (shouldDestroyChildInstances) {
      if (shouldDestroyChildInstances === void 0) {
        shouldDestroyChildInstances = true;
      }

      if (shouldDestroyChildInstances) {
        childTippyInstances.forEach(function (instance) {
          instance.destroy();
        });
      }

      childTippyInstances = [];
      removeEventListeners();
      originalDestroy();
    };

    instance.enable = function () {
      originalEnable();
      childTippyInstances.forEach(function (instance) {
        return instance.enable();
      });
      disabled = false;
    };

    instance.disable = function () {
      originalDisable();
      childTippyInstances.forEach(function (instance) {
        return instance.disable();
      });
      disabled = true;
    };

    addEventListeners(instance);
  }

  normalizedReturnValue.forEach(applyMutations);
  return returnValue;
}

var animateFill = {
  name: 'animateFill',
  defaultValue: false,
  fn: function fn(instance) {
    var _instance$props$rende; // @ts-ignore


    if (!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy)) {
      if ("development" !== "production") {
        errorWhen(instance.props.animateFill, 'The `animateFill` plugin requires the default render function.');
      }

      return {};
    }

    var _getChildren = getChildren(instance.popper),
        box = _getChildren.box,
        content = _getChildren.content;

    var backdrop = instance.props.animateFill ? createBackdropElement() : null;
    return {
      onCreate: function onCreate() {
        if (backdrop) {
          box.insertBefore(backdrop, box.firstElementChild);
          box.setAttribute('data-animatefill', '');
          box.style.overflow = 'hidden';
          instance.setProps({
            arrow: false,
            animation: 'shift-away'
          });
        }
      },
      onMount: function onMount() {
        if (backdrop) {
          var transitionDuration = box.style.transitionDuration;
          var duration = Number(transitionDuration.replace('ms', '')); // The content should fade in after the backdrop has mostly filled the
          // tooltip element. `clip-path` is the other alternative but is not
          // well-supported and is buggy on some devices.

          content.style.transitionDelay = Math.round(duration / 10) + "ms";
          backdrop.style.transitionDuration = transitionDuration;
          setVisibilityState([backdrop], 'visible');
        }
      },
      onShow: function onShow() {
        if (backdrop) {
          backdrop.style.transitionDuration = '0ms';
        }
      },
      onHide: function onHide() {
        if (backdrop) {
          setVisibilityState([backdrop], 'hidden');
        }
      }
    };
  }
};
exports.animateFill = animateFill;

function createBackdropElement() {
  var backdrop = div();
  backdrop.className = BACKDROP_CLASS;
  setVisibilityState([backdrop], 'hidden');
  return backdrop;
}

var mouseCoords = {
  clientX: 0,
  clientY: 0
};
var activeInstances = [];

function storeMouseCoords(_ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;
  mouseCoords = {
    clientX: clientX,
    clientY: clientY
  };
}

function addMouseCoordsListener(doc) {
  doc.addEventListener('mousemove', storeMouseCoords);
}

function removeMouseCoordsListener(doc) {
  doc.removeEventListener('mousemove', storeMouseCoords);
}

var followCursor = {
  name: 'followCursor',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference;
    var doc = getOwnerDocument(instance.props.triggerTarget || reference);
    var isInternalUpdate = false;
    var wasFocusEvent = false;
    var isUnmounted = true;
    var prevProps = instance.props;

    function getIsInitialBehavior() {
      return instance.props.followCursor === 'initial' && instance.state.isVisible;
    }

    function addListener() {
      doc.addEventListener('mousemove', onMouseMove);
    }

    function removeListener() {
      doc.removeEventListener('mousemove', onMouseMove);
    }

    function unsetGetReferenceClientRect() {
      isInternalUpdate = true;
      instance.setProps({
        getReferenceClientRect: null
      });
      isInternalUpdate = false;
    }

    function onMouseMove(event) {
      // If the instance is interactive, avoid updating the position unless it's
      // over the reference element
      var isCursorOverReference = event.target ? reference.contains(event.target) : true;
      var followCursor = instance.props.followCursor;
      var clientX = event.clientX,
          clientY = event.clientY;
      var rect = reference.getBoundingClientRect();
      var relativeX = clientX - rect.left;
      var relativeY = clientY - rect.top;

      if (isCursorOverReference || !instance.props.interactive) {
        instance.setProps({
          getReferenceClientRect: function getReferenceClientRect() {
            var rect = reference.getBoundingClientRect();
            var x = clientX;
            var y = clientY;

            if (followCursor === 'initial') {
              x = rect.left + relativeX;
              y = rect.top + relativeY;
            }

            var top = followCursor === 'horizontal' ? rect.top : y;
            var right = followCursor === 'vertical' ? rect.right : x;
            var bottom = followCursor === 'horizontal' ? rect.bottom : y;
            var left = followCursor === 'vertical' ? rect.left : x;
            return {
              width: right - left,
              height: bottom - top,
              top: top,
              right: right,
              bottom: bottom,
              left: left
            };
          }
        });
      }
    }

    function create() {
      if (instance.props.followCursor) {
        activeInstances.push({
          instance: instance,
          doc: doc
        });
        addMouseCoordsListener(doc);
      }
    }

    function destroy() {
      activeInstances = activeInstances.filter(function (data) {
        return data.instance !== instance;
      });

      if (activeInstances.filter(function (data) {
        return data.doc === doc;
      }).length === 0) {
        removeMouseCoordsListener(doc);
      }
    }

    return {
      onCreate: create,
      onDestroy: destroy,
      onBeforeUpdate: function onBeforeUpdate() {
        prevProps = instance.props;
      },
      onAfterUpdate: function onAfterUpdate(_, _ref2) {
        var followCursor = _ref2.followCursor;

        if (isInternalUpdate) {
          return;
        }

        if (followCursor !== undefined && prevProps.followCursor !== followCursor) {
          destroy();

          if (followCursor) {
            create();

            if (instance.state.isMounted && !wasFocusEvent && !getIsInitialBehavior()) {
              addListener();
            }
          } else {
            removeListener();
            unsetGetReferenceClientRect();
          }
        }
      },
      onMount: function onMount() {
        if (instance.props.followCursor && !wasFocusEvent) {
          if (isUnmounted) {
            onMouseMove(mouseCoords);
            isUnmounted = false;
          }

          if (!getIsInitialBehavior()) {
            addListener();
          }
        }
      },
      onTrigger: function onTrigger(_, event) {
        if (isMouseEvent(event)) {
          mouseCoords = {
            clientX: event.clientX,
            clientY: event.clientY
          };
        }

        wasFocusEvent = event.type === 'focus';
      },
      onHidden: function onHidden() {
        if (instance.props.followCursor) {
          unsetGetReferenceClientRect();
          removeListener();
          isUnmounted = true;
        }
      }
    };
  }
};
exports.followCursor = followCursor;

function getProps(props, modifier) {
  var _props$popperOptions;

  return {
    popperOptions: Object.assign({}, props.popperOptions, {
      modifiers: [].concat((((_props$popperOptions = props.popperOptions) == null ? void 0 : _props$popperOptions.modifiers) || []).filter(function (_ref) {
        var name = _ref.name;
        return name !== modifier.name;
      }), [modifier])
    })
  };
}

var inlinePositioning = {
  name: 'inlinePositioning',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference;

    function isEnabled() {
      return !!instance.props.inlinePositioning;
    }

    var placement;
    var cursorRectIndex = -1;
    var isInternalUpdate = false;
    var modifier = {
      name: 'tippyInlinePositioning',
      enabled: true,
      phase: 'afterWrite',
      fn: function fn(_ref2) {
        var state = _ref2.state;

        if (isEnabled()) {
          if (placement !== state.placement) {
            instance.setProps({
              getReferenceClientRect: function getReferenceClientRect() {
                return _getReferenceClientRect(state.placement);
              }
            });
          }

          placement = state.placement;
        }
      }
    };

    function _getReferenceClientRect(placement) {
      return getInlineBoundingClientRect(getBasePlacement(placement), reference.getBoundingClientRect(), arrayFrom(reference.getClientRects()), cursorRectIndex);
    }

    function setInternalProps(partialProps) {
      isInternalUpdate = true;
      instance.setProps(partialProps);
      isInternalUpdate = false;
    }

    function addModifier() {
      if (!isInternalUpdate) {
        setInternalProps(getProps(instance.props, modifier));
      }
    }

    return {
      onCreate: addModifier,
      onAfterUpdate: addModifier,
      onTrigger: function onTrigger(_, event) {
        if (isMouseEvent(event)) {
          var rects = arrayFrom(instance.reference.getClientRects());
          var cursorRect = rects.find(function (rect) {
            return rect.left - 2 <= event.clientX && rect.right + 2 >= event.clientX && rect.top - 2 <= event.clientY && rect.bottom + 2 >= event.clientY;
          });
          cursorRectIndex = rects.indexOf(cursorRect);
        }
      },
      onUntrigger: function onUntrigger() {
        cursorRectIndex = -1;
      }
    };
  }
};
exports.inlinePositioning = inlinePositioning;

function getInlineBoundingClientRect(currentBasePlacement, boundingRect, clientRects, cursorRectIndex) {
  // Not an inline element, or placement is not yet known
  if (clientRects.length < 2 || currentBasePlacement === null) {
    return boundingRect;
  } // There are two rects and they are disjoined


  if (clientRects.length === 2 && cursorRectIndex >= 0 && clientRects[0].left > clientRects[1].right) {
    return clientRects[cursorRectIndex] || boundingRect;
  }

  switch (currentBasePlacement) {
    case 'top':
    case 'bottom':
      {
        var firstRect = clientRects[0];
        var lastRect = clientRects[clientRects.length - 1];
        var isTop = currentBasePlacement === 'top';
        var top = firstRect.top;
        var bottom = lastRect.bottom;
        var left = isTop ? firstRect.left : lastRect.left;
        var right = isTop ? firstRect.right : lastRect.right;
        var width = right - left;
        var height = bottom - top;
        return {
          top: top,
          bottom: bottom,
          left: left,
          right: right,
          width: width,
          height: height
        };
      }

    case 'left':
    case 'right':
      {
        var minLeft = Math.min.apply(Math, clientRects.map(function (rects) {
          return rects.left;
        }));
        var maxRight = Math.max.apply(Math, clientRects.map(function (rects) {
          return rects.right;
        }));
        var measureRects = clientRects.filter(function (rect) {
          return currentBasePlacement === 'left' ? rect.left === minLeft : rect.right === maxRight;
        });
        var _top = measureRects[0].top;
        var _bottom = measureRects[measureRects.length - 1].bottom;
        var _left = minLeft;
        var _right = maxRight;

        var _width = _right - _left;

        var _height = _bottom - _top;

        return {
          top: _top,
          bottom: _bottom,
          left: _left,
          right: _right,
          width: _width,
          height: _height
        };
      }

    default:
      {
        return boundingRect;
      }
  }
}

var sticky = {
  name: 'sticky',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference,
        popper = instance.popper;

    function getReference() {
      return instance.popperInstance ? instance.popperInstance.state.elements.reference : reference;
    }

    function shouldCheck(value) {
      return instance.props.sticky === true || instance.props.sticky === value;
    }

    var prevRefRect = null;
    var prevPopRect = null;

    function updatePosition() {
      var currentRefRect = shouldCheck('reference') ? getReference().getBoundingClientRect() : null;
      var currentPopRect = shouldCheck('popper') ? popper.getBoundingClientRect() : null;

      if (currentRefRect && areRectsDifferent(prevRefRect, currentRefRect) || currentPopRect && areRectsDifferent(prevPopRect, currentPopRect)) {
        if (instance.popperInstance) {
          instance.popperInstance.update();
        }
      }

      prevRefRect = currentRefRect;
      prevPopRect = currentPopRect;

      if (instance.state.isMounted) {
        requestAnimationFrame(updatePosition);
      }
    }

    return {
      onMount: function onMount() {
        if (instance.props.sticky) {
          updatePosition();
        }
      }
    };
  }
};
exports.sticky = sticky;

function areRectsDifferent(rectA, rectB) {
  if (rectA && rectB) {
    return rectA.top !== rectB.top || rectA.right !== rectB.right || rectA.bottom !== rectB.bottom || rectA.left !== rectB.left;
  }

  return true;
}

tippy.setDefaultProps({
  render: render
});
var _default = tippy;
exports.default = _default;
},{"@popperjs/core":"../node_modules/@popperjs/core/lib/index.js"}],"../node_modules/dayjs/dayjs.min.js":[function(require,module,exports) {
var define;
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.dayjs=e()}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,c=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else{var i=t.name;M[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t)}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return g},$.isValid=function(){return!("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),v.extend=function(t,e){return t.$i||(t(e,S,v),t.$i=!0),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});

},{}],"../node_modules/dayjs/plugin/customParseFormat.js":[function(require,module,exports) {
var define;
var t;!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof t&&t.amd?t(n):e.dayjs_plugin_customParseFormat=n()}(this,function(){"use strict";var t,e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},n=function(t,n){return t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(t,r,o){var i=o&&o.toUpperCase();return r||n[o]||e[o]||n[i].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(t,e,n){return e||n.slice(1)})})},r=/(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,o=/\d\d/,i=/\d\d?/,s=/\d*[^\s\d-:/()]+/,a=function(t){return function(e){this[t]=+e}},f=[/[+-]\d\d:?(\d\d)?/,function(t){(this.zone||(this.zone={})).offset=function(t){if(!t)return 0;var e=t.match(/([+-]|\d\d)/g),n=60*e[1]+(+e[2]||0);return 0===n?0:"+"===e[0]?-n:n}(t)}],u=function(e){var n=t[e];return n&&(n.indexOf?n:n.s.concat(n.f))},h=function(e,n){var r,o=t.meridiem;if(o){for(var i=1;i<=24;i+=1)if(e.indexOf(o(i,0,n))>-1){r=i>12;break}}else r=e===(n?"pm":"PM");return r},c={A:[s,function(t){this.afternoon=h(t,!1)}],a:[s,function(t){this.afternoon=h(t,!0)}],S:[/\d/,function(t){this.milliseconds=100*+t}],SS:[o,function(t){this.milliseconds=10*+t}],SSS:[/\d{3}/,function(t){this.milliseconds=+t}],s:[i,a("seconds")],ss:[i,a("seconds")],m:[i,a("minutes")],mm:[i,a("minutes")],H:[i,a("hours")],h:[i,a("hours")],HH:[i,a("hours")],hh:[i,a("hours")],D:[i,a("day")],DD:[o,a("day")],Do:[s,function(e){var n=t.ordinal,r=e.match(/\d+/);if(this.day=r[0],n)for(var o=1;o<=31;o+=1)n(o).replace(/\[|\]/g,"")===e&&(this.day=o)}],M:[i,a("month")],MM:[o,a("month")],MMM:[s,function(t){var e=u("months"),n=(u("monthsShort")||e.map(function(t){return t.substr(0,3)})).indexOf(t)+1;if(n<1)throw new Error;this.month=n%12||n}],MMMM:[s,function(t){var e=u("months").indexOf(t)+1;if(e<1)throw new Error;this.month=e%12||e}],Y:[/[+-]?\d+/,a("year")],YY:[o,function(t){t=+t,this.year=t+(t>68?1900:2e3)}],YYYY:[/\d{4}/,a("year")],Z:f,ZZ:f},d=function(e,o,i){try{var s=function(e){for(var o=(e=n(e,t&&t.formats)).match(r),i=o.length,s=0;s<i;s+=1){var a=o[s],f=c[a],u=f&&f[0],h=f&&f[1];o[s]=h?{regex:u,parser:h}:a.replace(/^\[|\]$/g,"")}return function(t){for(var e={},n=0,r=0;n<i;n+=1){var s=o[n];if("string"==typeof s)r+=s.length;else{var a=s.regex,f=s.parser,u=t.substr(r),h=a.exec(u)[0];f.call(e,h),t=t.replace(h,"")}}return function(t){var e=t.afternoon;if(void 0!==e){var n=t.hours;e?n<12&&(t.hours+=12):12===n&&(t.hours=0),delete t.afternoon}}(e),e}}(o)(e),a=s.year,f=s.month,u=s.day,h=s.hours,d=s.minutes,m=s.seconds,l=s.milliseconds,M=s.zone,Y=new Date,v=u||(a||f?1:Y.getDate()),p=a||Y.getFullYear(),D=0;a&&!f||(D=f>0?f-1:Y.getMonth());var y=h||0,L=d||0,g=m||0,$=l||0;return M?new Date(Date.UTC(p,D,v,y,L,g,$+60*M.offset*1e3)):i?new Date(Date.UTC(p,D,v,y,L,g,$)):new Date(p,D,v,y,L,g,$)}catch(t){return new Date("")}};return function(e,n,r){r.p.customParseFormat=!0;var o=n.prototype,i=o.parse;o.parse=function(e){var n=e.date,o=e.utc,s=e.args;this.$u=o;var a=s[1];if("string"==typeof a){var f=!0===s[2],u=!0===s[3],h=f||u,c=s[2];u&&(c=s[2]),f||(t=c?r.Ls[c]:this.$locale()),this.$d=d(n,a,o),this.init(),c&&!0!==c&&(this.$L=this.locale(c).$L),h&&n!==this.format(a)&&(this.$d=new Date("")),t=void 0}else if(a instanceof Array)for(var m=a.length,l=1;l<=m;l+=1){s[1]=a[l-1];var M=r.apply(this,s);if(M.isValid()){this.$d=M.$d,this.$L=M.$L,this.init();break}l===m&&(this.$d=new Date(""))}else i.call(this,e)}}});
},{}],"J4Nk":[function(require,module,exports) {
"use strict";var r=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,e=Object.prototype.propertyIsEnumerable;function n(r){if(null==r)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(r)}function o(){try{if(!Object.assign)return!1;var r=new String("abc");if(r[5]="de","5"===Object.getOwnPropertyNames(r)[0])return!1;for(var t={},e=0;e<10;e++)t["_"+String.fromCharCode(e)]=e;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(r){return t[r]}).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(r){n[r]=r}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}}module.exports=o()?Object.assign:function(o,c){for(var a,i,s=n(o),f=1;f<arguments.length;f++){for(var u in a=Object(arguments[f]))t.call(a,u)&&(s[u]=a[u]);if(r){i=r(a);for(var b=0;b<i.length;b++)e.call(a,i[b])&&(s[i[b]]=a[i[b]])}}return s};
},{}],"awqi":[function(require,module,exports) {
"use strict";var e=require("object-assign"),t=60103,r=60106;exports.Fragment=60107,exports.StrictMode=60108,exports.Profiler=60114;var n=60109,o=60110,u=60112;exports.Suspense=60113;var s=60115,i=60116;if("function"==typeof Symbol&&Symbol.for){var f=Symbol.for;t=f("react.element"),r=f("react.portal"),exports.Fragment=f("react.fragment"),exports.StrictMode=f("react.strict_mode"),exports.Profiler=f("react.profiler"),n=f("react.provider"),o=f("react.context"),u=f("react.forward_ref"),exports.Suspense=f("react.suspense"),s=f("react.memo"),i=f("react.lazy")}var a="function"==typeof Symbol&&Symbol.iterator;function c(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=a&&e[a]||e["@@iterator"])?e:null}function p(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var l={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},y={};function d(e,t,r){this.props=e,this.context=t,this.refs=y,this.updater=r||l}function v(){}function h(e,t,r){this.props=e,this.context=t,this.refs=y,this.updater=r||l}d.prototype.isReactComponent={},d.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(p(85));this.updater.enqueueSetState(this,e,t,"setState")},d.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},v.prototype=d.prototype;var _=h.prototype=new v;_.constructor=h,e(_,d.prototype),_.isPureReactComponent=!0;var x={current:null},m=Object.prototype.hasOwnProperty,b={key:!0,ref:!0,__self:!0,__source:!0};function S(e,r,n){var o,u={},s=null,i=null;if(null!=r)for(o in void 0!==r.ref&&(i=r.ref),void 0!==r.key&&(s=""+r.key),r)m.call(r,o)&&!b.hasOwnProperty(o)&&(u[o]=r[o]);var f=arguments.length-2;if(1===f)u.children=n;else if(1<f){for(var a=Array(f),c=0;c<f;c++)a[c]=arguments[c+2];u.children=a}if(e&&e.defaultProps)for(o in f=e.defaultProps)void 0===u[o]&&(u[o]=f[o]);return{$$typeof:t,type:e,key:s,ref:i,props:u,_owner:x.current}}function $(e,r){return{$$typeof:t,type:e.type,key:r,ref:e.ref,props:e.props,_owner:e._owner}}function w(e){return"object"==typeof e&&null!==e&&e.$$typeof===t}function g(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return t[e]})}var k=/\/+/g;function C(e,t){return"object"==typeof e&&null!==e&&null!=e.key?g(""+e.key):t.toString(36)}function E(e,n,o,u,s){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var f=!1;if(null===e)f=!0;else switch(i){case"string":case"number":f=!0;break;case"object":switch(e.$$typeof){case t:case r:f=!0}}if(f)return s=s(f=e),e=""===u?"."+C(f,0):u,Array.isArray(s)?(o="",null!=e&&(o=e.replace(k,"$&/")+"/"),E(s,n,o,"",function(e){return e})):null!=s&&(w(s)&&(s=$(s,o+(!s.key||f&&f.key===s.key?"":(""+s.key).replace(k,"$&/")+"/")+e)),n.push(s)),1;if(f=0,u=""===u?".":u+":",Array.isArray(e))for(var a=0;a<e.length;a++){var l=u+C(i=e[a],a);f+=E(i,n,o,l,s)}else if("function"==typeof(l=c(e)))for(e=l.call(e),a=0;!(i=e.next()).done;)f+=E(i=i.value,n,o,l=u+C(i,a++),s);else if("object"===i)throw n=""+e,Error(p(31,"[object Object]"===n?"object with keys {"+Object.keys(e).join(", ")+"}":n));return f}function R(e,t,r){if(null==e)return e;var n=[],o=0;return E(e,n,"","",function(e){return t.call(r,e,o++)}),n}function j(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then(function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)},function(t){0===e._status&&(e._status=2,e._result=t)})}if(1===e._status)return e._result;throw e._result}var P={current:null};function O(){var e=P.current;if(null===e)throw Error(p(321));return e}var A={ReactCurrentDispatcher:P,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:x,IsSomeRendererActing:{current:!1},assign:e};exports.Children={map:R,forEach:function(e,t,r){R(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return R(e,function(){t++}),t},toArray:function(e){return R(e,function(e){return e})||[]},only:function(e){if(!w(e))throw Error(p(143));return e}},exports.Component=d,exports.PureComponent=h,exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=A,exports.cloneElement=function(r,n,o){if(null==r)throw Error(p(267,r));var u=e({},r.props),s=r.key,i=r.ref,f=r._owner;if(null!=n){if(void 0!==n.ref&&(i=n.ref,f=x.current),void 0!==n.key&&(s=""+n.key),r.type&&r.type.defaultProps)var a=r.type.defaultProps;for(c in n)m.call(n,c)&&!b.hasOwnProperty(c)&&(u[c]=void 0===n[c]&&void 0!==a?a[c]:n[c])}var c=arguments.length-2;if(1===c)u.children=o;else if(1<c){a=Array(c);for(var l=0;l<c;l++)a[l]=arguments[l+2];u.children=a}return{$$typeof:t,type:r.type,key:s,ref:i,props:u,_owner:f}},exports.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:o,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:n,_context:e},e.Consumer=e},exports.createElement=S,exports.createFactory=function(e){var t=S.bind(null,e);return t.type=e,t},exports.createRef=function(){return{current:null}},exports.forwardRef=function(e){return{$$typeof:u,render:e}},exports.isValidElement=w,exports.lazy=function(e){return{$$typeof:i,_payload:{_status:-1,_result:e},_init:j}},exports.memo=function(e,t){return{$$typeof:s,type:e,compare:void 0===t?null:t}},exports.useCallback=function(e,t){return O().useCallback(e,t)},exports.useContext=function(e,t){return O().useContext(e,t)},exports.useDebugValue=function(){},exports.useEffect=function(e,t){return O().useEffect(e,t)},exports.useImperativeHandle=function(e,t,r){return O().useImperativeHandle(e,t,r)},exports.useLayoutEffect=function(e,t){return O().useLayoutEffect(e,t)},exports.useMemo=function(e,t){return O().useMemo(e,t)},exports.useReducer=function(e,t,r){return O().useReducer(e,t,r)},exports.useRef=function(e){return O().useRef(e)},exports.useState=function(e){return O().useState(e)},exports.version="17.0.1";
},{"object-assign":"J4Nk"}],"n8MK":[function(require,module,exports) {
"use strict";module.exports=require("./cjs/react.production.min.js");
},{"./cjs/react.production.min.js":"awqi"}],"rXjq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=s;var e=function(t,s,n,r){var u;s[0]=0;for(var p=1;p<s.length;p++){var h=s[p++],a=s[p]?(s[0]|=h?1:2,n[s[p++]]):s[++p];3===h?r[0]=a:4===h?r[1]=Object.assign(r[1]||{},a):5===h?(r[1]=r[1]||{})[s[++p]]=a:6===h?r[1][s[++p]]+=a+"":h?(u=t.apply(a,e(t,a,n,["",null])),r.push(u),a[0]?s[0]|=2:(s[p-2]=0,s[p]=u)):r.push(a)}return r},t=new Map;function s(s){var n=t.get(this);return n||(n=new Map,t.set(this,n)),(n=e(this,n.get(s)||(n.set(s,n=function(e){for(var t,s,n=1,r="",u="",p=[0],h=function(e){1===n&&(e||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?p.push(0,e,r):3===n&&(e||r)?(p.push(3,e,r),n=2):2===n&&"..."===r&&e?p.push(4,e,0):2===n&&r&&!e?p.push(5,0,!0,r):n>=5&&((r||!e&&5===n)&&(p.push(n,0,r,s),n=6),e&&(p.push(n,e,0,s),n=6)),r=""},a=0;a<e.length;a++){a&&(1===n&&h(),h(a));for(var l=0;l<e[a].length;l++)t=e[a][l],1===n?"<"===t?(h(),p=[p],n=3):r+=t:4===n?"--"===r&&">"===t?(n=1,r=""):r=t+r[0]:u?t===u?u="":r+=t:'"'===t||"'"===t?u=t:">"===t?(h(),n=1):n&&("="===t?(n=5,s=r,r=""):"/"===t&&(n<5||">"===e[a][l+1])?(h(),3===n&&(p=p[0]),n=p,(p=p[0]).push(2,0,n),n=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(h(),n=2):r+=t),3===n&&"!--"===r&&(n=4,p=p[0])}return h(),p}(s)),n),arguments,[])).length>1?n:n[0]}
},{}],"DaDa":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.html=void 0;var e=require("react"),t=r(require("htm"));function r(e){return e&&e.__esModule?e:{default:e}}var u=t.default.bind(e.createElement);exports.html=u;
},{"react":"n8MK","htm":"rXjq"}],"IvPb":[function(require,module,exports) {
"use strict";var e,t,n,r;if("object"==typeof performance&&"function"==typeof performance.now){var o=performance;exports.unstable_now=function(){return o.now()}}else{var a=Date,l=a.now();exports.unstable_now=function(){return a.now()-l}}if("undefined"==typeof window||"function"!=typeof MessageChannel){var i=null,s=null,u=function(){if(null!==i)try{var e=exports.unstable_now();i(!0,e),i=null}catch(t){throw setTimeout(u,0),t}};e=function(t){null!==i?setTimeout(e,0,t):(i=t,setTimeout(u,0))},t=function(e,t){s=setTimeout(e,t)},n=function(){clearTimeout(s)},exports.unstable_shouldYield=function(){return!1},r=exports.unstable_forceFrameRate=function(){}}else{var c=window.setTimeout,f=window.clearTimeout;if("undefined"!=typeof console){var p=window.cancelAnimationFrame;"function"!=typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),"function"!=typeof p&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var b=!1,d=null,v=-1,x=5,y=0;exports.unstable_shouldYield=function(){return exports.unstable_now()>=y},r=function(){},exports.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):x=0<e?Math.floor(1e3/e):5};var m=new MessageChannel,w=m.port2;m.port1.onmessage=function(){if(null!==d){var e=exports.unstable_now();y=e+x;try{d(!0,e)?w.postMessage(null):(b=!1,d=null)}catch(t){throw w.postMessage(null),t}}else b=!1},e=function(e){d=e,b||(b=!0,w.postMessage(null))},t=function(e,t){v=c(function(){e(exports.unstable_now())},t)},n=function(){f(v),v=-1}}function _(e,t){var n=e.length;e.push(t);e:for(;;){var r=n-1>>>1,o=e[r];if(!(void 0!==o&&0<T(o,t)))break e;e[r]=t,e[n]=o,n=r}}function h(e){return void 0===(e=e[0])?null:e}function k(e){var t=e[0];if(void 0!==t){var n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,o=e.length;r<o;){var a=2*(r+1)-1,l=e[a],i=a+1,s=e[i];if(void 0!==l&&0>T(l,n))void 0!==s&&0>T(s,l)?(e[r]=s,e[i]=n,r=i):(e[r]=l,e[a]=n,r=a);else{if(!(void 0!==s&&0>T(s,n)))break e;e[r]=s,e[i]=n,r=i}}}return t}return null}function T(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}var g=[],P=[],F=1,I=null,M=3,C=!1,j=!1,A=!1;function L(e){for(var t=h(P);null!==t;){if(null===t.callback)k(P);else{if(!(t.startTime<=e))break;k(P),t.sortIndex=t.expirationTime,_(g,t)}t=h(P)}}function q(n){if(A=!1,L(n),!j)if(null!==h(g))j=!0,e(R);else{var r=h(P);null!==r&&t(q,r.startTime-n)}}function R(e,r){j=!1,A&&(A=!1,n()),C=!0;var o=M;try{for(L(r),I=h(g);null!==I&&(!(I.expirationTime>r)||e&&!exports.unstable_shouldYield());){var a=I.callback;if("function"==typeof a){I.callback=null,M=I.priorityLevel;var l=a(I.expirationTime<=r);r=exports.unstable_now(),"function"==typeof l?I.callback=l:I===h(g)&&k(g),L(r)}else k(g);I=h(g)}if(null!==I)var i=!0;else{var s=h(P);null!==s&&t(q,s.startTime-r),i=!1}return i}finally{I=null,M=o,C=!1}}var Y=r;exports.unstable_IdlePriority=5,exports.unstable_ImmediatePriority=1,exports.unstable_LowPriority=4,exports.unstable_NormalPriority=3,exports.unstable_Profiling=null,exports.unstable_UserBlockingPriority=2,exports.unstable_cancelCallback=function(e){e.callback=null},exports.unstable_continueExecution=function(){j||C||(j=!0,e(R))},exports.unstable_getCurrentPriorityLevel=function(){return M},exports.unstable_getFirstCallbackNode=function(){return h(g)},exports.unstable_next=function(e){switch(M){case 1:case 2:case 3:var t=3;break;default:t=M}var n=M;M=t;try{return e()}finally{M=n}},exports.unstable_pauseExecution=function(){},exports.unstable_requestPaint=Y,exports.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=M;M=e;try{return t()}finally{M=n}},exports.unstable_scheduleCallback=function(r,o,a){var l=exports.unstable_now();switch("object"==typeof a&&null!==a?a="number"==typeof(a=a.delay)&&0<a?l+a:l:a=l,r){case 1:var i=-1;break;case 2:i=250;break;case 5:i=1073741823;break;case 4:i=1e4;break;default:i=5e3}return r={id:F++,callback:o,priorityLevel:r,startTime:a,expirationTime:i=a+i,sortIndex:-1},a>l?(r.sortIndex=a,_(P,r),null===h(g)&&r===h(P)&&(A?n():A=!0,t(q,a-l))):(r.sortIndex=i,_(g,r),j||C||(j=!0,e(R))),r},exports.unstable_wrapCallback=function(e){var t=M;return function(){var n=M;M=t;try{return e.apply(this,arguments)}finally{M=n}}};
},{}],"MDSO":[function(require,module,exports) {
"use strict";module.exports=require("./cjs/scheduler.production.min.js");
},{"./cjs/scheduler.production.min.js":"IvPb"}],"i17t":[function(require,module,exports) {
"use strict";var e=require("react"),t=require("object-assign"),n=require("scheduler");function r(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!e)throw Error(r(227));var l=new Set,a={};function o(e,t){u(e,t),u(e+"Capture",t)}function u(e,t){for(a[e]=t,e=0;e<t.length;e++)l.add(t[e])}var i=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement),s=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,c=Object.prototype.hasOwnProperty,f={},d={};function p(e){return!!c.call(d,e)||!c.call(f,e)&&(s.test(e)?d[e]=!0:(f[e]=!0,!1))}function h(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}function m(e,t,n,r){if(null==t||h(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function g(e,t,n,r,l,a,o){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var v={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){v[e]=new g(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];v[t]=new g(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){v[e]=new g(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){v[e]=new g(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){v[e]=new g(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){v[e]=new g(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){v[e]=new g(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){v[e]=new g(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){v[e]=new g(e,5,!1,e.toLowerCase(),null,!1,!1)});var y=/[\-:]([a-z])/g;function b(e){return e[1].toUpperCase()}function w(e,t,n,r){var l=v.hasOwnProperty(t)?v[t]:null;(null!==l?0===l.type:!r&&(2<t.length&&("o"===t[0]||"O"===t[0])&&("n"===t[1]||"N"===t[1])))||(m(t,n,l,r)&&(n=null),r||null===l?p(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=null===n?3!==l.type&&"":n:(t=l.attributeName,r=l.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(l=l.type)||4===l&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(y,b);v[t]=new g(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(y,b);v[t]=new g(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(y,b);v[t]=new g(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){v[e]=new g(e,1,!1,e.toLowerCase(),null,!1,!1)}),v.xlinkHref=new g("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){v[e]=new g(e,1,!1,e.toLowerCase(),null,!0,!0)});var k=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,S=60103,E=60106,x=60107,C=60108,_=60114,N=60109,P=60110,z=60112,L=60113,T=60120,M=60115,O=60116,R=60121,D=60128,F=60129,I=60130,U=60131;if("function"==typeof Symbol&&Symbol.for){var V=Symbol.for;S=V("react.element"),E=V("react.portal"),x=V("react.fragment"),C=V("react.strict_mode"),_=V("react.profiler"),N=V("react.provider"),P=V("react.context"),z=V("react.forward_ref"),L=V("react.suspense"),T=V("react.suspense_list"),M=V("react.memo"),O=V("react.lazy"),R=V("react.block"),V("react.scope"),D=V("react.opaque.id"),F=V("react.debug_trace_mode"),I=V("react.offscreen"),U=V("react.legacy_hidden")}var A,B="function"==typeof Symbol&&Symbol.iterator;function W(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=B&&e[B]||e["@@iterator"])?e:null}function Q(e){if(void 0===A)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);A=t&&t[1]||""}return"\n"+A+e}var H=!1;function j(e,t){if(!e||H)return"";H=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(i){var r=i}Reflect.construct(e,[],t)}else{try{t.call()}catch(i){r=i}e.call(t.prototype)}else{try{throw Error()}catch(i){r=i}e()}}catch(i){if(i&&r&&"string"==typeof i.stack){for(var l=i.stack.split("\n"),a=r.stack.split("\n"),o=l.length-1,u=a.length-1;1<=o&&0<=u&&l[o]!==a[u];)u--;for(;1<=o&&0<=u;o--,u--)if(l[o]!==a[u]){if(1!==o||1!==u)do{if(o--,0>--u||l[o]!==a[u])return"\n"+l[o].replace(" at new "," at ")}while(1<=o&&0<=u);break}}}finally{H=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Q(e):""}function $(e){switch(e.tag){case 5:return Q(e.type);case 16:return Q("Lazy");case 13:return Q("Suspense");case 19:return Q("SuspenseList");case 0:case 2:case 15:return e=j(e.type,!1);case 11:return e=j(e.type.render,!1);case 22:return e=j(e.type._render,!1);case 1:return e=j(e.type,!0);default:return""}}function q(e){if(null==e)return null;if("function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case x:return"Fragment";case E:return"Portal";case _:return"Profiler";case C:return"StrictMode";case L:return"Suspense";case T:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case P:return(e.displayName||"Context")+".Consumer";case N:return(e._context.displayName||"Context")+".Provider";case z:var t=e.render;return t=t.displayName||t.name||"",e.displayName||(""!==t?"ForwardRef("+t+")":"ForwardRef");case M:return q(e.type);case R:return q(e._render);case O:t=e._payload,e=e._init;try{return q(e(t))}catch(n){}}return null}function K(e){switch(typeof e){case"boolean":case"number":case"object":case"string":case"undefined":return e;default:return""}}function Y(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function X(e){var t=Y(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&void 0!==n&&"function"==typeof n.get&&"function"==typeof n.set){var l=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(e){r=""+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function G(e){e._valueTracker||(e._valueTracker=X(e))}function Z(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Y(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function J(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function ee(e,n){var r=n.checked;return t({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=r?r:e._wrapperState.initialChecked})}function te(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=K(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function ne(e,t){null!=(t=t.checked)&&w(e,"checked",t,!1)}function re(e,t){ne(e,t);var n=K(t.value),r=t.type;if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if("submit"===r||"reset"===r)return void e.removeAttribute("value");t.hasOwnProperty("value")?ae(e,t.type,n):t.hasOwnProperty("defaultValue")&&ae(e,t.type,K(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function le(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,""!==n&&(e.name=n)}function ae(e,t,n){"number"===t&&J(e.ownerDocument)===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}function oe(t){var n="";return e.Children.forEach(t,function(e){null!=e&&(n+=e)}),n}function ue(e,n){return e=t({children:void 0},n),(n=oe(n.children))&&(e.children=n),e}function ie(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+K(n),t=null,l=0;l<e.length;l++){if(e[l].value===n)return e[l].selected=!0,void(r&&(e[l].defaultSelected=!0));null!==t||e[l].disabled||(t=e[l])}null!==t&&(t.selected=!0)}}function se(e,n){if(null!=n.dangerouslySetInnerHTML)throw Error(r(91));return t({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ce(e,t){var n=t.value;if(null==n){if(n=t.children,t=t.defaultValue,null!=n){if(null!=t)throw Error(r(92));if(Array.isArray(n)){if(!(1>=n.length))throw Error(r(93));n=n[0]}t=n}null==t&&(t=""),n=t}e._wrapperState={initialValue:K(n)}}function fe(e,t){var n=K(t.value),r=K(t.defaultValue);null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function de(e){var t=e.textContent;t===e._wrapperState.initialValue&&""!==t&&null!==t&&(e.value=t)}var pe={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};function he(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function me(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?he(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var ge,ve=function(e){return"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n)})}:e}(function(e,t){if(e.namespaceURI!==pe.svg||"innerHTML"in e)e.innerHTML=t;else{for((ge=ge||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ge.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function ye(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var be={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},we=["Webkit","ms","Moz","O"];function ke(e,t,n){return null==t||"boolean"==typeof t||""===t?"":n||"number"!=typeof t||0===t||be.hasOwnProperty(e)&&be[e]?(""+t).trim():t+"px"}function Se(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),l=ke(n,t[n],r);"float"===n&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}Object.keys(be).forEach(function(e){we.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),be[t]=be[e]})});var Ee=t({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function xe(e,t){if(t){if(Ee[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(r(137,e));if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(r(60));if(!("object"==typeof t.dangerouslySetInnerHTML&&"__html"in t.dangerouslySetInnerHTML))throw Error(r(61))}if(null!=t.style&&"object"!=typeof t.style)throw Error(r(62))}}function Ce(e,t){if(-1===e.indexOf("-"))return"string"==typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}function _e(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Ne=null,Pe=null,ze=null;function Le(e){if(e=Sl(e)){if("function"!=typeof Ne)throw Error(r(280));var t=e.stateNode;t&&(t=xl(t),Ne(e.stateNode,e.type,t))}}function Te(e){Pe?ze?ze.push(e):ze=[e]:Pe=e}function Me(){if(Pe){var e=Pe,t=ze;if(ze=Pe=null,Le(e),t)for(e=0;e<t.length;e++)Le(t[e])}}function Oe(e,t){return e(t)}function Re(e,t,n,r,l){return e(t,n,r,l)}function De(){}var Fe=Oe,Ie=!1,Ue=!1;function Ve(){null===Pe&&null===ze||(De(),Me())}function Ae(e,t,n){if(Ue)return e(t,n);Ue=!0;try{return Fe(e,t,n)}finally{Ue=!1,Ve()}}function Be(e,t){var n=e.stateNode;if(null===n)return null;var l=xl(n);if(null===l)return null;n=l[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(l=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!l;break e;default:e=!1}if(e)return null;if(n&&"function"!=typeof n)throw Error(r(231,t,typeof n));return n}var We=!1;if(i)try{var Qe={};Object.defineProperty(Qe,"passive",{get:function(){We=!0}}),window.addEventListener("test",Qe,Qe),window.removeEventListener("test",Qe,Qe)}catch(Fs){We=!1}function He(e,t,n,r,l,a,o,u,i){var s=Array.prototype.slice.call(arguments,3);try{t.apply(n,s)}catch(c){this.onError(c)}}var je=!1,$e=null,qe=!1,Ke=null,Ye={onError:function(e){je=!0,$e=e}};function Xe(e,t,n,r,l,a,o,u,i){je=!1,$e=null,He.apply(Ye,arguments)}function Ge(e,t,n,l,a,o,u,i,s){if(Xe.apply(this,arguments),je){if(!je)throw Error(r(198));var c=$e;je=!1,$e=null,qe||(qe=!0,Ke=c)}}function Ze(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!=(1026&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function Je(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function et(e){if(Ze(e)!==e)throw Error(r(188))}function tt(e){var t=e.alternate;if(!t){if(null===(t=Ze(e)))throw Error(r(188));return t!==e?null:e}for(var n=e,l=t;;){var a=n.return;if(null===a)break;var o=a.alternate;if(null===o){if(null!==(l=a.return)){n=l;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===n)return et(a),e;if(o===l)return et(a),t;o=o.sibling}throw Error(r(188))}if(n.return!==l.return)n=a,l=o;else{for(var u=!1,i=a.child;i;){if(i===n){u=!0,n=a,l=o;break}if(i===l){u=!0,l=a,n=o;break}i=i.sibling}if(!u){for(i=o.child;i;){if(i===n){u=!0,n=o,l=a;break}if(i===l){u=!0,l=o,n=a;break}i=i.sibling}if(!u)throw Error(r(189))}}if(n.alternate!==l)throw Error(r(190))}if(3!==n.tag)throw Error(r(188));return n.stateNode.current===n?e:t}function nt(e){if(!(e=tt(e)))return null;for(var t=e;;){if(5===t.tag||6===t.tag)return t;if(t.child)t.child.return=t,t=t.child;else{if(t===e)break;for(;!t.sibling;){if(!t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}}return null}function rt(e,t){for(var n=e.alternate;null!==t;){if(t===e||t===n)return!0;t=t.return}return!1}var lt,at,ot,ut,it=!1,st=[],ct=null,ft=null,dt=null,pt=new Map,ht=new Map,mt=[],gt="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function vt(e,t,n,r,l){return{blockedOn:e,domEventName:t,eventSystemFlags:16|n,nativeEvent:l,targetContainers:[r]}}function yt(e,t){switch(e){case"focusin":case"focusout":ct=null;break;case"dragenter":case"dragleave":ft=null;break;case"mouseover":case"mouseout":dt=null;break;case"pointerover":case"pointerout":pt.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ht.delete(t.pointerId)}}function bt(e,t,n,r,l,a){return null===e||e.nativeEvent!==a?(e=vt(t,n,r,l,a),null!==t&&(null!==(t=Sl(t))&&at(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==l&&-1===t.indexOf(l)&&t.push(l),e)}function wt(e,t,n,r,l){switch(t){case"focusin":return ct=bt(ct,e,t,n,r,l),!0;case"dragenter":return ft=bt(ft,e,t,n,r,l),!0;case"mouseover":return dt=bt(dt,e,t,n,r,l),!0;case"pointerover":var a=l.pointerId;return pt.set(a,bt(pt.get(a)||null,e,t,n,r,l)),!0;case"gotpointercapture":return a=l.pointerId,ht.set(a,bt(ht.get(a)||null,e,t,n,r,l)),!0}return!1}function kt(e){var t=kl(e.target);if(null!==t){var r=Ze(t);if(null!==r)if(13===(t=r.tag)){if(null!==(t=Je(r)))return e.blockedOn=t,void ut(e.lanePriority,function(){n.unstable_runWithPriority(e.priority,function(){ot(r)})})}else if(3===t&&r.stateNode.hydrate)return void(e.blockedOn=3===r.tag?r.stateNode.containerInfo:null)}e.blockedOn=null}function St(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=un(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n)return null!==(t=Sl(n))&&at(t),e.blockedOn=n,!1;t.shift()}return!0}function Et(e,t,n){St(e)&&n.delete(t)}function xt(){for(it=!1;0<st.length;){var e=st[0];if(null!==e.blockedOn){null!==(e=Sl(e.blockedOn))&&lt(e);break}for(var t=e.targetContainers;0<t.length;){var n=un(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n){e.blockedOn=n;break}t.shift()}null===e.blockedOn&&st.shift()}null!==ct&&St(ct)&&(ct=null),null!==ft&&St(ft)&&(ft=null),null!==dt&&St(dt)&&(dt=null),pt.forEach(Et),ht.forEach(Et)}function Ct(e,t){e.blockedOn===t&&(e.blockedOn=null,it||(it=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,xt)))}function _t(e){function t(t){return Ct(t,e)}if(0<st.length){Ct(st[0],e);for(var n=1;n<st.length;n++){var r=st[n];r.blockedOn===e&&(r.blockedOn=null)}}for(null!==ct&&Ct(ct,e),null!==ft&&Ct(ft,e),null!==dt&&Ct(dt,e),pt.forEach(t),ht.forEach(t),n=0;n<mt.length;n++)(r=mt[n]).blockedOn===e&&(r.blockedOn=null);for(;0<mt.length&&null===(n=mt[0]).blockedOn;)kt(n),null===n.blockedOn&&mt.shift()}function Nt(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Pt={animationend:Nt("Animation","AnimationEnd"),animationiteration:Nt("Animation","AnimationIteration"),animationstart:Nt("Animation","AnimationStart"),transitionend:Nt("Transition","TransitionEnd")},zt={},Lt={};function Tt(e){if(zt[e])return zt[e];if(!Pt[e])return e;var t,n=Pt[e];for(t in n)if(n.hasOwnProperty(t)&&t in Lt)return zt[e]=n[t];return e}i&&(Lt=document.createElement("div").style,"AnimationEvent"in window||(delete Pt.animationend.animation,delete Pt.animationiteration.animation,delete Pt.animationstart.animation),"TransitionEvent"in window||delete Pt.transitionend.transition);var Mt=Tt("animationend"),Ot=Tt("animationiteration"),Rt=Tt("animationstart"),Dt=Tt("transitionend"),Ft=new Map,It=new Map,Ut=["abort","abort",Mt,"animationEnd",Ot,"animationIteration",Rt,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart","lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",Dt,"transitionEnd","waiting","waiting"];function Vt(e,t){for(var n=0;n<e.length;n+=2){var r=e[n],l=e[n+1];l="on"+(l[0].toUpperCase()+l.slice(1)),It.set(r,t),Ft.set(r,l),o(l,[r])}}var At=n.unstable_now;At();var Bt=8;function Wt(e){if(0!=(1&e))return Bt=15,1;if(0!=(2&e))return Bt=14,2;if(0!=(4&e))return Bt=13,4;var t=24&e;return 0!==t?(Bt=12,t):0!=(32&e)?(Bt=11,32):0!==(t=192&e)?(Bt=10,t):0!=(256&e)?(Bt=9,256):0!==(t=3584&e)?(Bt=8,t):0!=(4096&e)?(Bt=7,4096):0!==(t=4186112&e)?(Bt=6,t):0!==(t=62914560&e)?(Bt=5,t):67108864&e?(Bt=4,67108864):0!=(134217728&e)?(Bt=3,134217728):0!==(t=805306368&e)?(Bt=2,t):0!=(1073741824&e)?(Bt=1,1073741824):(Bt=8,e)}function Qt(e){switch(e){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}function Ht(e){switch(e){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(r(358,e))}}function jt(e,t){var n=e.pendingLanes;if(0===n)return Bt=0;var r=0,l=0,a=e.expiredLanes,o=e.suspendedLanes,u=e.pingedLanes;if(0!==a)r=a,l=Bt=15;else if(0!==(a=134217727&n)){var i=a&~o;0!==i?(r=Wt(i),l=Bt):0!==(u&=a)&&(r=Wt(u),l=Bt)}else 0!==(a=n&~o)?(r=Wt(a),l=Bt):0!==u&&(r=Wt(u),l=Bt);if(0===r)return 0;if(r=n&((0>(r=31-Gt(r))?0:1<<r)<<1)-1,0!==t&&t!==r&&0==(t&o)){if(Wt(t),l<=Bt)return t;Bt=l}if(0!==(t=e.entangledLanes))for(e=e.entanglements,t&=r;0<t;)l=1<<(n=31-Gt(t)),r|=e[n],t&=~l;return r}function $t(e){return 0!==(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function qt(e,t){switch(e){case 15:return 1;case 14:return 2;case 12:return 0===(e=Kt(24&~t))?qt(10,t):e;case 10:return 0===(e=Kt(192&~t))?qt(8,t):e;case 8:return 0===(e=Kt(3584&~t))&&(0===(e=Kt(4186112&~t))&&(e=512)),e;case 2:return 0===(t=Kt(805306368&~t))&&(t=268435456),t}throw Error(r(358,e))}function Kt(e){return e&-e}function Yt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Xt(e,t,n){e.pendingLanes|=t;var r=t-1;e.suspendedLanes&=r,e.pingedLanes&=r,(e=e.eventTimes)[t=31-Gt(t)]=n}var Gt=Math.clz32?Math.clz32:en,Zt=Math.log,Jt=Math.LN2;function en(e){return 0===e?32:31-(Zt(e)/Jt|0)|0}var tn=n.unstable_UserBlockingPriority,nn=n.unstable_runWithPriority,rn=!0;function ln(e,t,n,r){Ie||De();var l=on,a=Ie;Ie=!0;try{Re(l,e,t,n,r)}finally{(Ie=a)||Ve()}}function an(e,t,n,r){nn(tn,on.bind(null,e,t,n,r))}function on(e,t,n,r){var l;if(rn)if((l=0==(4&t))&&0<st.length&&-1<gt.indexOf(e))e=vt(null,e,t,n,r),st.push(e);else{var a=un(e,t,n,r);if(null===a)l&&yt(e,r);else{if(l){if(-1<gt.indexOf(e))return e=vt(a,e,t,n,r),void st.push(e);if(wt(a,e,t,n,r))return;yt(e,r)}Jr(e,t,r,null,n)}}}function un(e,t,n,r){var l=_e(r);if(null!==(l=kl(l))){var a=Ze(l);if(null===a)l=null;else{var o=a.tag;if(13===o){if(null!==(l=Je(a)))return l;l=null}else if(3===o){if(a.stateNode.hydrate)return 3===a.tag?a.stateNode.containerInfo:null;l=null}else a!==l&&(l=null)}}return Jr(e,t,r,l,n),null}var sn=null,cn=null,fn=null;function dn(){if(fn)return fn;var e,t,n=cn,r=n.length,l="value"in sn?sn.value:sn.textContent,a=l.length;for(e=0;e<r&&n[e]===l[e];e++);var o=r-e;for(t=1;t<=o&&n[r-t]===l[a-t];t++);return fn=l.slice(e,1<t?1-t:void 0)}function pn(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function hn(){return!0}function mn(){return!1}function gn(e){function n(t,n,r,l,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=l,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(l):l[o]);return this.isDefaultPrevented=(null!=l.defaultPrevented?l.defaultPrevented:!1===l.returnValue)?hn:mn,this.isPropagationStopped=mn,this}return t(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=hn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=hn)},persist:function(){},isPersistent:hn}),n}var vn,yn,bn,wn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},kn=gn(wn),Sn=t({},wn,{view:0,detail:0}),En=gn(Sn),xn=t({},Sn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:An,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==bn&&(bn&&"mousemove"===e.type?(vn=e.screenX-bn.screenX,yn=e.screenY-bn.screenY):yn=vn=0,bn=e),vn)},movementY:function(e){return"movementY"in e?e.movementY:yn}}),Cn=gn(xn),_n=t({},xn,{dataTransfer:0}),Nn=gn(_n),Pn=t({},Sn,{relatedTarget:0}),zn=gn(Pn),Ln=t({},wn,{animationName:0,elapsedTime:0,pseudoElement:0}),Tn=gn(Ln),Mn=t({},wn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),On=gn(Mn),Rn=t({},wn,{data:0}),Dn=gn(Rn),Fn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},In={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Un={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Vn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=Un[e])&&!!t[e]}function An(){return Vn}var Bn=t({},Sn,{key:function(e){if(e.key){var t=Fn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=pn(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?In[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:An,charCode:function(e){return"keypress"===e.type?pn(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?pn(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),Wn=gn(Bn),Qn=t({},xn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Hn=gn(Qn),jn=t({},Sn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:An}),$n=gn(jn),qn=t({},wn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Kn=gn(qn),Yn=t({},xn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Xn=gn(Yn),Gn=[9,13,27,32],Zn=i&&"CompositionEvent"in window,Jn=null;i&&"documentMode"in document&&(Jn=document.documentMode);var er=i&&"TextEvent"in window&&!Jn,tr=i&&(!Zn||Jn&&8<Jn&&11>=Jn),nr=String.fromCharCode(32),rr=!1;function lr(e,t){switch(e){case"keyup":return-1!==Gn.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ar(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}var or=!1;function ur(e,t){switch(e){case"compositionend":return ar(t);case"keypress":return 32!==t.which?null:(rr=!0,nr);case"textInput":return(e=t.data)===nr&&rr?null:e;default:return null}}function ir(e,t){if(or)return"compositionend"===e||!Zn&&lr(e,t)?(e=dn(),fn=cn=sn=null,or=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return tr&&"ko"!==t.locale?null:t.data;default:return null}}var sr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function cr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!sr[e.type]:"textarea"===t}function fr(e,t,n,r){Te(r),0<(t=tl(t,"onChange")).length&&(n=new kn("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var dr=null,pr=null;function hr(e){qr(e,0)}function mr(e){if(Z(El(e)))return e}function gr(e,t){if("change"===e)return t}var vr=!1;if(i){var yr;if(i){var br="oninput"in document;if(!br){var wr=document.createElement("div");wr.setAttribute("oninput","return;"),br="function"==typeof wr.oninput}yr=br}else yr=!1;vr=yr&&(!document.documentMode||9<document.documentMode)}function kr(){dr&&(dr.detachEvent("onpropertychange",Sr),pr=dr=null)}function Sr(e){if("value"===e.propertyName&&mr(pr)){var t=[];if(fr(t,pr,e,_e(e)),e=hr,Ie)e(t);else{Ie=!0;try{Oe(e,t)}finally{Ie=!1,Ve()}}}}function Er(e,t,n){"focusin"===e?(kr(),pr=n,(dr=t).attachEvent("onpropertychange",Sr)):"focusout"===e&&kr()}function xr(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return mr(pr)}function Cr(e,t){if("click"===e)return mr(t)}function _r(e,t){if("input"===e||"change"===e)return mr(t)}function Nr(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t}var Pr="function"==typeof Object.is?Object.is:Nr,zr=Object.prototype.hasOwnProperty;function Lr(e,t){if(Pr(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++)if(!zr.call(t,n[r])||!Pr(e[n[r]],t[n[r]]))return!1;return!0}function Tr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Mr(e,t){var n,r=Tr(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Tr(r)}}function Or(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?Or(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function Rr(){for(var e=window,t=J();t instanceof e.HTMLIFrameElement;){try{var n="string"==typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break;t=J((e=t.contentWindow).document)}return t}function Dr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var Fr=i&&"documentMode"in document&&11>=document.documentMode,Ir=null,Ur=null,Vr=null,Ar=!1;function Br(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;Ar||null==Ir||Ir!==J(r)||("selectionStart"in(r=Ir)&&Dr(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},Vr&&Lr(Vr,r)||(Vr=r,0<(r=tl(Ur,"onSelect")).length&&(t=new kn("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Ir)))}Vt("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),0),Vt("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1),Vt(Ut,2);for(var Wr="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),Qr=0;Qr<Wr.length;Qr++)It.set(Wr[Qr],0);u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),o("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),o("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),o("onBeforeInput",["compositionend","keypress","textInput","paste"]),o("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),o("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),o("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Hr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),jr=new Set("cancel close invalid load scroll toggle".split(" ").concat(Hr));function $r(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Ge(r,t,void 0,e),e.currentTarget=null}function qr(e,t){t=0!=(4&t);for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var u=r[o],i=u.instance,s=u.currentTarget;if(u=u.listener,i!==a&&l.isPropagationStopped())break e;$r(l,u,s),a=i}else for(o=0;o<r.length;o++){if(i=(u=r[o]).instance,s=u.currentTarget,u=u.listener,i!==a&&l.isPropagationStopped())break e;$r(l,u,s),a=i}}}if(qe)throw e=Ke,qe=!1,Ke=null,e}function Kr(e,t){var n=Cl(t),r=e+"__bubble";n.has(r)||(Zr(t,e,2,!1),n.add(r))}var Yr="_reactListening"+Math.random().toString(36).slice(2);function Xr(e){e[Yr]||(e[Yr]=!0,l.forEach(function(t){jr.has(t)||Gr(t,!1,e,null),Gr(t,!0,e,null)}))}function Gr(e,t,n,r){var l=4<arguments.length&&void 0!==arguments[4]?arguments[4]:0,a=n;if("selectionchange"===e&&9!==n.nodeType&&(a=n.ownerDocument),null!==r&&!t&&jr.has(e)){if("scroll"!==e)return;l|=2,a=r}var o=Cl(a),u=e+"__"+(t?"capture":"bubble");o.has(u)||(t&&(l|=4),Zr(a,e,l,t),o.add(u))}function Zr(e,t,n,r){var l=It.get(t);switch(void 0===l?2:l){case 0:l=ln;break;case 1:l=an;break;default:l=on}n=l.bind(null,t,n,e),l=void 0,!We||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(l=!0),r?void 0!==l?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):void 0!==l?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function Jr(e,t,n,r,l){var a=r;if(0==(1&t)&&0==(2&t)&&null!==r)e:for(;;){if(null===r)return;var o=r.tag;if(3===o||4===o){var u=r.stateNode.containerInfo;if(u===l||8===u.nodeType&&u.parentNode===l)break;if(4===o)for(o=r.return;null!==o;){var i=o.tag;if((3===i||4===i)&&((i=o.stateNode.containerInfo)===l||8===i.nodeType&&i.parentNode===l))return;o=o.return}for(;null!==u;){if(null===(o=kl(u)))return;if(5===(i=o.tag)||6===i){r=a=o;continue e}u=u.parentNode}}r=r.return}Ae(function(){var r=a,l=_e(n),o=[];e:{var u=Ft.get(e);if(void 0!==u){var i=kn,s=e;switch(e){case"keypress":if(0===pn(n))break e;case"keydown":case"keyup":i=Wn;break;case"focusin":s="focus",i=zn;break;case"focusout":s="blur",i=zn;break;case"beforeblur":case"afterblur":i=zn;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":i=Cn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":i=Nn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":i=$n;break;case Mt:case Ot:case Rt:i=Tn;break;case Dt:i=Kn;break;case"scroll":i=En;break;case"wheel":i=Xn;break;case"copy":case"cut":case"paste":i=On;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":i=Hn}var c=0!=(4&t),f=!c&&"scroll"===e,d=c?null!==u?u+"Capture":null:u;c=[];for(var p,h=r;null!==h;){var m=(p=h).stateNode;if(5===p.tag&&null!==m&&(p=m,null!==d&&(null!=(m=Be(h,d))&&c.push(el(h,m,p)))),f)break;h=h.return}0<c.length&&(u=new i(u,s,null,n,l),o.push({event:u,listeners:c}))}}if(0==(7&t)){if(i="mouseout"===e||"pointerout"===e,(!(u="mouseover"===e||"pointerover"===e)||0!=(16&t)||!(s=n.relatedTarget||n.fromElement)||!kl(s)&&!s[bl])&&(i||u)&&(u=l.window===l?l:(u=l.ownerDocument)?u.defaultView||u.parentWindow:window,i?(i=r,null!==(s=(s=n.relatedTarget||n.toElement)?kl(s):null)&&(s!==(f=Ze(s))||5!==s.tag&&6!==s.tag)&&(s=null)):(i=null,s=r),i!==s)){if(c=Cn,m="onMouseLeave",d="onMouseEnter",h="mouse","pointerout"!==e&&"pointerover"!==e||(c=Hn,m="onPointerLeave",d="onPointerEnter",h="pointer"),f=null==i?u:El(i),p=null==s?u:El(s),(u=new c(m,h+"leave",i,n,l)).target=f,u.relatedTarget=p,m=null,kl(l)===r&&((c=new c(d,h+"enter",s,n,l)).target=p,c.relatedTarget=f,m=c),f=m,i&&s)e:{for(d=s,h=0,p=c=i;p;p=nl(p))h++;for(p=0,m=d;m;m=nl(m))p++;for(;0<h-p;)c=nl(c),h--;for(;0<p-h;)d=nl(d),p--;for(;h--;){if(c===d||null!==d&&c===d.alternate)break e;c=nl(c),d=nl(d)}c=null}else c=null;null!==i&&rl(o,u,i,c,!1),null!==s&&null!==f&&rl(o,f,s,c,!0)}if("select"===(i=(u=r?El(r):window).nodeName&&u.nodeName.toLowerCase())||"input"===i&&"file"===u.type)var g=gr;else if(cr(u))if(vr)g=_r;else{g=xr;var v=Er}else(i=u.nodeName)&&"input"===i.toLowerCase()&&("checkbox"===u.type||"radio"===u.type)&&(g=Cr);switch(g&&(g=g(e,r))?fr(o,g,n,l):(v&&v(e,u,r),"focusout"===e&&(v=u._wrapperState)&&v.controlled&&"number"===u.type&&ae(u,"number",u.value)),v=r?El(r):window,e){case"focusin":(cr(v)||"true"===v.contentEditable)&&(Ir=v,Ur=r,Vr=null);break;case"focusout":Vr=Ur=Ir=null;break;case"mousedown":Ar=!0;break;case"contextmenu":case"mouseup":case"dragend":Ar=!1,Br(o,n,l);break;case"selectionchange":if(Fr)break;case"keydown":case"keyup":Br(o,n,l)}var y;if(Zn)e:{switch(e){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else or?lr(e,n)&&(b="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(b="onCompositionStart");b&&(tr&&"ko"!==n.locale&&(or||"onCompositionStart"!==b?"onCompositionEnd"===b&&or&&(y=dn()):(cn="value"in(sn=l)?sn.value:sn.textContent,or=!0)),0<(v=tl(r,b)).length&&(b=new Dn(b,e,null,n,l),o.push({event:b,listeners:v}),y?b.data=y:null!==(y=ar(n))&&(b.data=y))),(y=er?ur(e,n):ir(e,n))&&(0<(r=tl(r,"onBeforeInput")).length&&(l=new Dn("onBeforeInput","beforeinput",null,n,l),o.push({event:l,listeners:r}),l.data=y))}qr(o,t)})}function el(e,t,n){return{instance:e,listener:t,currentTarget:n}}function tl(e,t){for(var n=t+"Capture",r=[];null!==e;){var l=e,a=l.stateNode;5===l.tag&&null!==a&&(l=a,null!=(a=Be(e,n))&&r.unshift(el(e,a,l)),null!=(a=Be(e,t))&&r.push(el(e,a,l))),e=e.return}return r}function nl(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag);return e||null}function rl(e,t,n,r,l){for(var a=t._reactName,o=[];null!==n&&n!==r;){var u=n,i=u.alternate,s=u.stateNode;if(null!==i&&i===r)break;5===u.tag&&null!==s&&(u=s,l?null!=(i=Be(n,a))&&o.unshift(el(n,i,u)):l||null!=(i=Be(n,a))&&o.push(el(n,i,u))),n=n.return}0!==o.length&&e.push({event:t,listeners:o})}function ll(){}var al=null,ol=null;function ul(e,t){switch(e){case"button":case"input":case"select":case"textarea":return!!t.autoFocus}return!1}function il(e,t){return"textarea"===e||"option"===e||"noscript"===e||"string"==typeof t.children||"number"==typeof t.children||"object"==typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var sl="function"==typeof setTimeout?setTimeout:void 0,cl="function"==typeof clearTimeout?clearTimeout:void 0;function fl(e){1===e.nodeType?e.textContent="":9===e.nodeType&&(null!=(e=e.body)&&(e.textContent=""))}function dl(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break}return e}function pl(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}var hl=0;function ml(e){return{$$typeof:D,toString:e,valueOf:e}}var gl=Math.random().toString(36).slice(2),vl="__reactFiber$"+gl,yl="__reactProps$"+gl,bl="__reactContainer$"+gl,wl="__reactEvents$"+gl;function kl(e){var t=e[vl];if(t)return t;for(var n=e.parentNode;n;){if(t=n[bl]||n[vl]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=pl(e);null!==e;){if(n=e[vl])return n;e=pl(e)}return t}n=(e=n).parentNode}return null}function Sl(e){return!(e=e[vl]||e[bl])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function El(e){if(5===e.tag||6===e.tag)return e.stateNode;throw Error(r(33))}function xl(e){return e[yl]||null}function Cl(e){var t=e[wl];return void 0===t&&(t=e[wl]=new Set),t}var _l=[],Nl=-1;function Pl(e){return{current:e}}function zl(e){0>Nl||(e.current=_l[Nl],_l[Nl]=null,Nl--)}function Ll(e,t){_l[++Nl]=e.current,e.current=t}var Tl={},Ml=Pl(Tl),Ol=Pl(!1),Rl=Tl;function Dl(e,t){var n=e.type.contextTypes;if(!n)return Tl;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l,a={};for(l in n)a[l]=t[l];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function Fl(e){return null!=(e=e.childContextTypes)}function Il(){zl(Ol),zl(Ml)}function Ul(e,t,n){if(Ml.current!==Tl)throw Error(r(168));Ll(Ml,t),Ll(Ol,n)}function Vl(e,n,l){var a=e.stateNode;if(e=n.childContextTypes,"function"!=typeof a.getChildContext)return l;for(var o in a=a.getChildContext())if(!(o in e))throw Error(r(108,q(n)||"Unknown",o));return t({},l,a)}function Al(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Tl,Rl=Ml.current,Ll(Ml,e),Ll(Ol,Ol.current),!0}function Bl(e,t,n){var l=e.stateNode;if(!l)throw Error(r(169));n?(e=Vl(e,t,Rl),l.__reactInternalMemoizedMergedChildContext=e,zl(Ol),zl(Ml),Ll(Ml,e)):zl(Ol),Ll(Ol,n)}var Wl=null,Ql=null,Hl=n.unstable_runWithPriority,jl=n.unstable_scheduleCallback,$l=n.unstable_cancelCallback,ql=n.unstable_shouldYield,Kl=n.unstable_requestPaint,Yl=n.unstable_now,Xl=n.unstable_getCurrentPriorityLevel,Gl=n.unstable_ImmediatePriority,Zl=n.unstable_UserBlockingPriority,Jl=n.unstable_NormalPriority,ea=n.unstable_LowPriority,ta=n.unstable_IdlePriority,na={},ra=void 0!==Kl?Kl:function(){},la=null,aa=null,oa=!1,ua=Yl(),ia=1e4>ua?Yl:function(){return Yl()-ua};function sa(){switch(Xl()){case Gl:return 99;case Zl:return 98;case Jl:return 97;case ea:return 96;case ta:return 95;default:throw Error(r(332))}}function ca(e){switch(e){case 99:return Gl;case 98:return Zl;case 97:return Jl;case 96:return ea;case 95:return ta;default:throw Error(r(332))}}function fa(e,t){return e=ca(e),Hl(e,t)}function da(e,t,n){return e=ca(e),jl(e,t,n)}function pa(){if(null!==aa){var e=aa;aa=null,$l(e)}ha()}function ha(){if(!oa&&null!==la){oa=!0;var e=0;try{var t=la;fa(99,function(){for(;e<t.length;e++){var n=t[e];do{n=n(!0)}while(null!==n)}}),la=null}catch(n){throw null!==la&&(la=la.slice(e+1)),jl(Gl,pa),n}finally{oa=!1}}}var ma=k.ReactCurrentBatchConfig;function ga(e,n){if(e&&e.defaultProps){for(var r in n=t({},n),e=e.defaultProps)void 0===n[r]&&(n[r]=e[r]);return n}return n}var va=Pl(null),ya=null,ba=null,wa=null;function ka(){wa=ba=ya=null}function Sa(e){var t=va.current;zl(va),e.type._context._currentValue=t}function Ea(e,t){for(;null!==e;){var n=e.alternate;if((e.childLanes&t)===t){if(null===n||(n.childLanes&t)===t)break;n.childLanes|=t}else e.childLanes|=t,null!==n&&(n.childLanes|=t);e=e.return}}function xa(e,t){ya=e,wa=ba=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!=(e.lanes&t)&&(nu=!0),e.firstContext=null)}function Ca(e,t){if(wa!==e&&!1!==t&&0!==t)if("number"==typeof t&&1073741823!==t||(wa=e,t=1073741823),t={context:e,observedBits:t,next:null},null===ba){if(null===ya)throw Error(r(308));ba=t,ya.dependencies={lanes:0,firstContext:t,responders:null}}else ba=ba.next=t;return e._currentValue}var _a=!1;function Na(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null}}function Pa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function za(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function La(e,t){if(null!==(e=e.updateQueue)){var n=(e=e.shared).pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}}function Ta(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var l=null,a=null;if(null!==(n=n.firstBaseUpdate)){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};null===a?l=a=o:a=a.next=o,n=n.next}while(null!==n);null===a?l=a=t:a=a.next=t}else l=a=t;return n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:a,shared:r.shared,effects:r.effects},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Ma(e,n,r,l){var a=e.updateQueue;_a=!1;var o=a.firstBaseUpdate,u=a.lastBaseUpdate,i=a.shared.pending;if(null!==i){a.shared.pending=null;var s=i,c=s.next;s.next=null,null===u?o=c:u.next=c,u=s;var f=e.alternate;if(null!==f){var d=(f=f.updateQueue).lastBaseUpdate;d!==u&&(null===d?f.firstBaseUpdate=c:d.next=c,f.lastBaseUpdate=s)}}if(null!==o){for(d=a.baseState,u=0,f=c=s=null;;){i=o.lane;var p=o.eventTime;if((l&i)===i){null!==f&&(f=f.next={eventTime:p,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var h=e,m=o;switch(i=n,p=r,m.tag){case 1:if("function"==typeof(h=m.payload)){d=h.call(p,d,i);break e}d=h;break e;case 3:h.flags=-4097&h.flags|64;case 0:if(null==(i="function"==typeof(h=m.payload)?h.call(p,d,i):h))break e;d=t({},d,i);break e;case 2:_a=!0}}null!==o.callback&&(e.flags|=32,null===(i=a.effects)?a.effects=[o]:i.push(o))}else p={eventTime:p,lane:i,tag:o.tag,payload:o.payload,callback:o.callback,next:null},null===f?(c=f=p,s=d):f=f.next=p,u|=i;if(null===(o=o.next)){if(null===(i=a.shared.pending))break;o=i.next,i.next=null,a.lastBaseUpdate=i,a.shared.pending=null}}null===f&&(s=d),a.baseState=s,a.firstBaseUpdate=c,a.lastBaseUpdate=f,ui|=u,e.lanes=u,e.memoizedState=d}}function Oa(e,t,n){if(e=t.effects,t.effects=null,null!==e)for(t=0;t<e.length;t++){var l=e[t],a=l.callback;if(null!==a){if(l.callback=null,l=n,"function"!=typeof a)throw Error(r(191,a));a.call(l)}}}var Ra=(new e.Component).refs;function Da(e,n,r,l){r=null==(r=r(l,n=e.memoizedState))?n:t({},n,r),e.memoizedState=r,0===e.lanes&&(e.updateQueue.baseState=r)}var Fa={isMounted:function(e){return!!(e=e._reactInternals)&&Ze(e)===e},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Mi(),l=Oi(e),a=za(r,l);a.payload=t,null!=n&&(a.callback=n),La(e,a),Ri(e,l,r)},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Mi(),l=Oi(e),a=za(r,l);a.tag=1,a.payload=t,null!=n&&(a.callback=n),La(e,a),Ri(e,l,r)},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Mi(),r=Oi(e),l=za(n,r);l.tag=2,null!=t&&(l.callback=t),La(e,l),Ri(e,r,n)}};function Ia(e,t,n,r,l,a,o){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,a,o):!t.prototype||!t.prototype.isPureReactComponent||(!Lr(n,r)||!Lr(l,a))}function Ua(e,t,n){var r=!1,l=Tl,a=t.contextType;return"object"==typeof a&&null!==a?a=Ca(a):(l=Fl(t)?Rl:Ml.current,a=(r=null!=(r=t.contextTypes))?Dl(e,l):Tl),t=new t(n,a),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=Fa,e.stateNode=t,t._reactInternals=e,r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=a),t}function Va(e,t,n,r){e=t.state,"function"==typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"==typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Fa.enqueueReplaceState(t,t.state,null)}function Aa(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs=Ra,Na(e);var a=t.contextType;"object"==typeof a&&null!==a?l.context=Ca(a):(a=Fl(t)?Rl:Ml.current,l.context=Dl(e,a)),Ma(e,n,l,r),l.state=e.memoizedState,"function"==typeof(a=t.getDerivedStateFromProps)&&(Da(e,t,a,n),l.state=e.memoizedState),"function"==typeof t.getDerivedStateFromProps||"function"==typeof l.getSnapshotBeforeUpdate||"function"!=typeof l.UNSAFE_componentWillMount&&"function"!=typeof l.componentWillMount||(t=l.state,"function"==typeof l.componentWillMount&&l.componentWillMount(),"function"==typeof l.UNSAFE_componentWillMount&&l.UNSAFE_componentWillMount(),t!==l.state&&Fa.enqueueReplaceState(l,l.state,null),Ma(e,n,l,r),l.state=e.memoizedState),"function"==typeof l.componentDidMount&&(e.flags|=4)}var Ba=Array.isArray;function Wa(e,t,n){if(null!==(e=n.ref)&&"function"!=typeof e&&"object"!=typeof e){if(n._owner){if(n=n._owner){if(1!==n.tag)throw Error(r(309));var l=n.stateNode}if(!l)throw Error(r(147,e));var a=""+e;return null!==t&&null!==t.ref&&"function"==typeof t.ref&&t.ref._stringRef===a?t.ref:((t=function(e){var t=l.refs;t===Ra&&(t=l.refs={}),null===e?delete t[a]:t[a]=e})._stringRef=a,t)}if("string"!=typeof e)throw Error(r(284));if(!n._owner)throw Error(r(290,e))}return e}function Qa(e,t){if("textarea"!==e.type)throw Error(r(31,"[object Object]"===Object.prototype.toString.call(t)?"object with keys {"+Object.keys(t).join(", ")+"}":t))}function Ha(e){function t(t,n){if(e){var r=t.lastEffect;null!==r?(r.nextEffect=n,t.lastEffect=n):t.firstEffect=t.lastEffect=n,n.nextEffect=null,n.flags=8}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function l(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function a(e,t){return(e=hs(e,t)).index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags=2,n):r:(t.flags=2,n):n}function u(t){return e&&null===t.alternate&&(t.flags=2),t}function i(e,t,n,r){return null===t||6!==t.tag?((t=ys(n,e.mode,r)).return=e,t):((t=a(t,n)).return=e,t)}function s(e,t,n,r){return null!==t&&t.elementType===n.type?((r=a(t,n.props)).ref=Wa(e,t,n),r.return=e,r):((r=ms(n.type,n.key,n.props,null,e.mode,r)).ref=Wa(e,t,n),r.return=e,r)}function c(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=bs(n,e.mode,r)).return=e,t):((t=a(t,n.children||[])).return=e,t)}function f(e,t,n,r,l){return null===t||7!==t.tag?((t=gs(n,e.mode,r,l)).return=e,t):((t=a(t,n)).return=e,t)}function d(e,t,n){if("string"==typeof t||"number"==typeof t)return(t=ys(""+t,e.mode,n)).return=e,t;if("object"==typeof t&&null!==t){switch(t.$$typeof){case S:return(n=ms(t.type,t.key,t.props,null,e.mode,n)).ref=Wa(e,null,t),n.return=e,n;case E:return(t=bs(t,e.mode,n)).return=e,t}if(Ba(t)||W(t))return(t=gs(t,e.mode,n,null)).return=e,t;Qa(e,t)}return null}function p(e,t,n,r){var l=null!==t?t.key:null;if("string"==typeof n||"number"==typeof n)return null!==l?null:i(e,t,""+n,r);if("object"==typeof n&&null!==n){switch(n.$$typeof){case S:return n.key===l?n.type===x?f(e,t,n.props.children,r,l):s(e,t,n,r):null;case E:return n.key===l?c(e,t,n,r):null}if(Ba(n)||W(n))return null!==l?null:f(e,t,n,r,null);Qa(e,n)}return null}function h(e,t,n,r,l){if("string"==typeof r||"number"==typeof r)return i(t,e=e.get(n)||null,""+r,l);if("object"==typeof r&&null!==r){switch(r.$$typeof){case S:return e=e.get(null===r.key?n:r.key)||null,r.type===x?f(t,e,r.props.children,l,r.key):s(t,e,r,l);case E:return c(t,e=e.get(null===r.key?n:r.key)||null,r,l)}if(Ba(r)||W(r))return f(t,e=e.get(n)||null,r,l,null);Qa(t,r)}return null}function m(r,a,u,i){for(var s=null,c=null,f=a,m=a=0,g=null;null!==f&&m<u.length;m++){f.index>m?(g=f,f=null):g=f.sibling;var v=p(r,f,u[m],i);if(null===v){null===f&&(f=g);break}e&&f&&null===v.alternate&&t(r,f),a=o(v,a,m),null===c?s=v:c.sibling=v,c=v,f=g}if(m===u.length)return n(r,f),s;if(null===f){for(;m<u.length;m++)null!==(f=d(r,u[m],i))&&(a=o(f,a,m),null===c?s=f:c.sibling=f,c=f);return s}for(f=l(r,f);m<u.length;m++)null!==(g=h(f,r,m,u[m],i))&&(e&&null!==g.alternate&&f.delete(null===g.key?m:g.key),a=o(g,a,m),null===c?s=g:c.sibling=g,c=g);return e&&f.forEach(function(e){return t(r,e)}),s}function g(a,u,i,s){var c=W(i);if("function"!=typeof c)throw Error(r(150));if(null==(i=c.call(i)))throw Error(r(151));for(var f=c=null,m=u,g=u=0,v=null,y=i.next();null!==m&&!y.done;g++,y=i.next()){m.index>g?(v=m,m=null):v=m.sibling;var b=p(a,m,y.value,s);if(null===b){null===m&&(m=v);break}e&&m&&null===b.alternate&&t(a,m),u=o(b,u,g),null===f?c=b:f.sibling=b,f=b,m=v}if(y.done)return n(a,m),c;if(null===m){for(;!y.done;g++,y=i.next())null!==(y=d(a,y.value,s))&&(u=o(y,u,g),null===f?c=y:f.sibling=y,f=y);return c}for(m=l(a,m);!y.done;g++,y=i.next())null!==(y=h(m,a,g,y.value,s))&&(e&&null!==y.alternate&&m.delete(null===y.key?g:y.key),u=o(y,u,g),null===f?c=y:f.sibling=y,f=y);return e&&m.forEach(function(e){return t(a,e)}),c}return function(e,l,o,i){var s="object"==typeof o&&null!==o&&o.type===x&&null===o.key;s&&(o=o.props.children);var c="object"==typeof o&&null!==o;if(c)switch(o.$$typeof){case S:e:{for(c=o.key,s=l;null!==s;){if(s.key===c){switch(s.tag){case 7:if(o.type===x){n(e,s.sibling),(l=a(s,o.props.children)).return=e,e=l;break e}break;default:if(s.elementType===o.type){n(e,s.sibling),(l=a(s,o.props)).ref=Wa(e,s,o),l.return=e,e=l;break e}}n(e,s);break}t(e,s),s=s.sibling}o.type===x?((l=gs(o.props.children,e.mode,i,o.key)).return=e,e=l):((i=ms(o.type,o.key,o.props,null,e.mode,i)).ref=Wa(e,l,o),i.return=e,e=i)}return u(e);case E:e:{for(s=o.key;null!==l;){if(l.key===s){if(4===l.tag&&l.stateNode.containerInfo===o.containerInfo&&l.stateNode.implementation===o.implementation){n(e,l.sibling),(l=a(l,o.children||[])).return=e,e=l;break e}n(e,l);break}t(e,l),l=l.sibling}(l=bs(o,e.mode,i)).return=e,e=l}return u(e)}if("string"==typeof o||"number"==typeof o)return o=""+o,null!==l&&6===l.tag?(n(e,l.sibling),(l=a(l,o)).return=e,e=l):(n(e,l),(l=ys(o,e.mode,i)).return=e,e=l),u(e);if(Ba(o))return m(e,l,o,i);if(W(o))return g(e,l,o,i);if(c&&Qa(e,o),void 0===o&&!s)switch(e.tag){case 1:case 22:case 0:case 11:case 15:throw Error(r(152,q(e.type)||"Component"))}return n(e,l)}}var ja=Ha(!0),$a=Ha(!1),qa={},Ka=Pl(qa),Ya=Pl(qa),Xa=Pl(qa);function Ga(e){if(e===qa)throw Error(r(174));return e}function Za(e,t){switch(Ll(Xa,t),Ll(Ya,e),Ll(Ka,qa),e=t.nodeType){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:me(null,"");break;default:t=me(t=(e=8===e?t.parentNode:t).namespaceURI||null,e=e.tagName)}zl(Ka),Ll(Ka,t)}function Ja(){zl(Ka),zl(Ya),zl(Xa)}function eo(e){Ga(Xa.current);var t=Ga(Ka.current),n=me(t,e.type);t!==n&&(Ll(Ya,e),Ll(Ka,n))}function to(e){Ya.current===e&&(zl(Ka),zl(Ya))}var no=Pl(0);function ro(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||"$!"===n.data))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!=(64&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var lo=null,ao=null,oo=!1;function uo(e,t){var n=fs(5,null,null,0);n.elementType="DELETED",n.type="DELETED",n.stateNode=t,n.return=e,n.flags=8,null!==e.lastEffect?(e.lastEffect.nextEffect=n,e.lastEffect=n):e.firstEffect=e.lastEffect=n}function io(e,t){switch(e.tag){case 5:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,!0);case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,!0);case 13:default:return!1}}function so(e){if(oo){var t=ao;if(t){var n=t;if(!io(e,t)){if(!(t=dl(n.nextSibling))||!io(e,t))return e.flags=-1025&e.flags|2,oo=!1,void(lo=e);uo(lo,n)}lo=e,ao=dl(t.firstChild)}else e.flags=-1025&e.flags|2,oo=!1,lo=e}}function co(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;lo=e}function fo(e){if(e!==lo)return!1;if(!oo)return co(e),oo=!0,!1;var t=e.type;if(5!==e.tag||"head"!==t&&"body"!==t&&!il(t,e.memoizedProps))for(t=ao;t;)uo(e,t),t=dl(t.nextSibling);if(co(e),13===e.tag){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(r(317));e:{for(e=e.nextSibling,t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n){if(0===t){ao=dl(e.nextSibling);break e}t--}else"$"!==n&&"$!"!==n&&"$?"!==n||t++}e=e.nextSibling}ao=null}}else ao=lo?dl(e.stateNode.nextSibling):null;return!0}function po(){ao=lo=null,oo=!1}var ho=[];function mo(){for(var e=0;e<ho.length;e++)ho[e]._workInProgressVersionPrimary=null;ho.length=0}var go=k.ReactCurrentDispatcher,vo=k.ReactCurrentBatchConfig,yo=0,bo=null,wo=null,ko=null,So=!1,Eo=!1;function xo(){throw Error(r(321))}function Co(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Pr(e[n],t[n]))return!1;return!0}function _o(e,t,n,l,a,o){if(yo=o,bo=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,go.current=null===e||null===e.memoizedState?Zo:Jo,e=n(l,a),Eo){o=0;do{if(Eo=!1,!(25>o))throw Error(r(301));o+=1,ko=wo=null,t.updateQueue=null,go.current=eu,e=n(l,a)}while(Eo)}if(go.current=Go,t=null!==wo&&null!==wo.next,yo=0,ko=wo=bo=null,So=!1,t)throw Error(r(300));return e}function No(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===ko?bo.memoizedState=ko=e:ko=ko.next=e,ko}function Po(){if(null===wo){var e=bo.alternate;e=null!==e?e.memoizedState:null}else e=wo.next;var t=null===ko?bo.memoizedState:ko.next;if(null!==t)ko=t,wo=e;else{if(null===e)throw Error(r(310));e={memoizedState:(wo=e).memoizedState,baseState:wo.baseState,baseQueue:wo.baseQueue,queue:wo.queue,next:null},null===ko?bo.memoizedState=ko=e:ko=ko.next=e}return ko}function zo(e,t){return"function"==typeof t?t(e):t}function Lo(e){var t=Po(),n=t.queue;if(null===n)throw Error(r(311));n.lastRenderedReducer=e;var l=wo,a=l.baseQueue,o=n.pending;if(null!==o){if(null!==a){var u=a.next;a.next=o.next,o.next=u}l.baseQueue=a=o,n.pending=null}if(null!==a){a=a.next,l=l.baseState;var i=u=o=null,s=a;do{var c=s.lane;if((yo&c)===c)null!==i&&(i=i.next={lane:0,action:s.action,eagerReducer:s.eagerReducer,eagerState:s.eagerState,next:null}),l=s.eagerReducer===e?s.eagerState:e(l,s.action);else{var f={lane:c,action:s.action,eagerReducer:s.eagerReducer,eagerState:s.eagerState,next:null};null===i?(u=i=f,o=l):i=i.next=f,bo.lanes|=c,ui|=c}s=s.next}while(null!==s&&s!==a);null===i?o=l:i.next=u,Pr(l,t.memoizedState)||(nu=!0),t.memoizedState=l,t.baseState=o,t.baseQueue=i,n.lastRenderedState=l}return[t.memoizedState,n.dispatch]}function To(e){var t=Po(),n=t.queue;if(null===n)throw Error(r(311));n.lastRenderedReducer=e;var l=n.dispatch,a=n.pending,o=t.memoizedState;if(null!==a){n.pending=null;var u=a=a.next;do{o=e(o,u.action),u=u.next}while(u!==a);Pr(o,t.memoizedState)||(nu=!0),t.memoizedState=o,null===t.baseQueue&&(t.baseState=o),n.lastRenderedState=o}return[o,l]}function Mo(e,t,n){var l=t._getVersion;l=l(t._source);var a=t._workInProgressVersionPrimary;if(null!==a?e=a===l:(e=e.mutableReadLanes,(e=(yo&e)===e)&&(t._workInProgressVersionPrimary=l,ho.push(t))),e)return n(t._source);throw ho.push(t),Error(r(350))}function Oo(e,t,n,l){var a=Ju;if(null===a)throw Error(r(349));var o=t._getVersion,u=o(t._source),i=go.current,s=i.useState(function(){return Mo(a,t,n)}),c=s[1],f=s[0];s=ko;var d=e.memoizedState,p=d.refs,h=p.getSnapshot,m=d.source;d=d.subscribe;var g=bo;return e.memoizedState={refs:p,source:t,subscribe:l},i.useEffect(function(){p.getSnapshot=n,p.setSnapshot=c;var e=o(t._source);if(!Pr(u,e)){e=n(t._source),Pr(f,e)||(c(e),e=Oi(g),a.mutableReadLanes|=e&a.pendingLanes),e=a.mutableReadLanes,a.entangledLanes|=e;for(var r=a.entanglements,l=e;0<l;){var i=31-Gt(l),s=1<<i;r[i]|=e,l&=~s}}},[n,t,l]),i.useEffect(function(){return l(t._source,function(){var e=p.getSnapshot,n=p.setSnapshot;try{n(e(t._source));var r=Oi(g);a.mutableReadLanes|=r&a.pendingLanes}catch(l){n(function(){throw l})}})},[t,l]),Pr(h,n)&&Pr(m,t)&&Pr(d,l)||((e={pending:null,dispatch:null,lastRenderedReducer:zo,lastRenderedState:f}).dispatch=c=Xo.bind(null,bo,e),s.queue=e,s.baseQueue=null,f=Mo(a,t,n),s.memoizedState=s.baseState=f),f}function Ro(e,t,n){return Oo(Po(),e,t,n)}function Do(e){var t=No();return"function"==typeof e&&(e=e()),t.memoizedState=t.baseState=e,e=(e=t.queue={pending:null,dispatch:null,lastRenderedReducer:zo,lastRenderedState:e}).dispatch=Xo.bind(null,bo,e),[t.memoizedState,e]}function Fo(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=bo.updateQueue)?(t={lastEffect:null},bo.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Io(e){return e={current:e},No().memoizedState=e}function Uo(){return Po().memoizedState}function Vo(e,t,n,r){var l=No();bo.flags|=e,l.memoizedState=Fo(1|t,n,void 0,void 0===r?null:r)}function Ao(e,t,n,r){var l=Po();r=void 0===r?null:r;var a=void 0;if(null!==wo){var o=wo.memoizedState;if(a=o.destroy,null!==r&&Co(r,o.deps))return void Fo(t,n,a,r)}bo.flags|=e,l.memoizedState=Fo(1|t,n,a,r)}function Bo(e,t){return Vo(516,4,e,t)}function Wo(e,t){return Ao(516,4,e,t)}function Qo(e,t){return Ao(4,2,e,t)}function Ho(e,t){return"function"==typeof t?(e=e(),t(e),function(){t(null)}):null!=t?(e=e(),t.current=e,function(){t.current=null}):void 0}function jo(e,t,n){return n=null!=n?n.concat([e]):null,Ao(4,2,Ho.bind(null,t,e),n)}function $o(){}function qo(e,t){var n=Po();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&Co(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ko(e,t){var n=Po();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&Co(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Yo(e,t){var n=sa();fa(98>n?98:n,function(){e(!0)}),fa(97<n?97:n,function(){var n=vo.transition;vo.transition=1;try{e(!1),t()}finally{vo.transition=n}})}function Xo(e,t,n){var r=Mi(),l=Oi(e),a={lane:l,action:n,eagerReducer:null,eagerState:null,next:null},o=t.pending;if(null===o?a.next=a:(a.next=o.next,o.next=a),t.pending=a,o=e.alternate,e===bo||null!==o&&o===bo)Eo=So=!0;else{if(0===e.lanes&&(null===o||0===o.lanes)&&null!==(o=t.lastRenderedReducer))try{var u=t.lastRenderedState,i=o(u,n);if(a.eagerReducer=o,a.eagerState=i,Pr(i,u))return}catch(s){}Ri(e,l,r)}}var Go={readContext:Ca,useCallback:xo,useContext:xo,useEffect:xo,useImperativeHandle:xo,useLayoutEffect:xo,useMemo:xo,useReducer:xo,useRef:xo,useState:xo,useDebugValue:xo,useDeferredValue:xo,useTransition:xo,useMutableSource:xo,useOpaqueIdentifier:xo,unstable_isNewReconciler:!1},Zo={readContext:Ca,useCallback:function(e,t){return No().memoizedState=[e,void 0===t?null:t],e},useContext:Ca,useEffect:Bo,useImperativeHandle:function(e,t,n){return n=null!=n?n.concat([e]):null,Vo(4,2,Ho.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Vo(4,2,e,t)},useMemo:function(e,t){var n=No();return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=No();return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e=(e=r.queue={pending:null,dispatch:null,lastRenderedReducer:e,lastRenderedState:t}).dispatch=Xo.bind(null,bo,e),[r.memoizedState,e]},useRef:Io,useState:Do,useDebugValue:$o,useDeferredValue:function(e){var t=Do(e),n=t[0],r=t[1];return Bo(function(){var t=vo.transition;vo.transition=1;try{r(e)}finally{vo.transition=t}},[e]),n},useTransition:function(){var e=Do(!1),t=e[0];return Io(e=Yo.bind(null,e[1])),[e,t]},useMutableSource:function(e,t,n){var r=No();return r.memoizedState={refs:{getSnapshot:t,setSnapshot:null},source:e,subscribe:n},Oo(r,e,t,n)},useOpaqueIdentifier:function(){if(oo){var e=!1,t=ml(function(){throw e||(e=!0,n("r:"+(hl++).toString(36))),Error(r(355))}),n=Do(t)[1];return 0==(2&bo.mode)&&(bo.flags|=516,Fo(5,function(){n("r:"+(hl++).toString(36))},void 0,null)),t}return Do(t="r:"+(hl++).toString(36)),t},unstable_isNewReconciler:!1},Jo={readContext:Ca,useCallback:qo,useContext:Ca,useEffect:Wo,useImperativeHandle:jo,useLayoutEffect:Qo,useMemo:Ko,useReducer:Lo,useRef:Uo,useState:function(){return Lo(zo)},useDebugValue:$o,useDeferredValue:function(e){var t=Lo(zo),n=t[0],r=t[1];return Wo(function(){var t=vo.transition;vo.transition=1;try{r(e)}finally{vo.transition=t}},[e]),n},useTransition:function(){var e=Lo(zo)[0];return[Uo().current,e]},useMutableSource:Ro,useOpaqueIdentifier:function(){return Lo(zo)[0]},unstable_isNewReconciler:!1},eu={readContext:Ca,useCallback:qo,useContext:Ca,useEffect:Wo,useImperativeHandle:jo,useLayoutEffect:Qo,useMemo:Ko,useReducer:To,useRef:Uo,useState:function(){return To(zo)},useDebugValue:$o,useDeferredValue:function(e){var t=To(zo),n=t[0],r=t[1];return Wo(function(){var t=vo.transition;vo.transition=1;try{r(e)}finally{vo.transition=t}},[e]),n},useTransition:function(){var e=To(zo)[0];return[Uo().current,e]},useMutableSource:Ro,useOpaqueIdentifier:function(){return To(zo)[0]},unstable_isNewReconciler:!1},tu=k.ReactCurrentOwner,nu=!1;function ru(e,t,n,r){t.child=null===e?$a(t,null,n,r):ja(t,e.child,n,r)}function lu(e,t,n,r,l){n=n.render;var a=t.ref;return xa(t,l),r=_o(e,t,n,r,a,l),null===e||nu?(t.flags|=1,ru(e,t,r,l),t.child):(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~l,Cu(e,t,l))}function au(e,t,n,r,l,a){if(null===e){var o=n.type;return"function"!=typeof o||ds(o)||void 0!==o.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=ms(n.type,null,r,t,t.mode,a)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=o,ou(e,t,o,r,l,a))}return o=e.child,0==(l&a)&&(l=o.memoizedProps,(n=null!==(n=n.compare)?n:Lr)(l,r)&&e.ref===t.ref)?Cu(e,t,a):(t.flags|=1,(e=hs(o,r)).ref=t.ref,e.return=t,t.child=e)}function ou(e,t,n,r,l,a){if(null!==e&&Lr(e.memoizedProps,r)&&e.ref===t.ref){if(nu=!1,0==(a&l))return t.lanes=e.lanes,Cu(e,t,a);0!=(16384&e.flags)&&(nu=!0)}return su(e,t,n,r,a)}function uu(e,t,n){var r=t.pendingProps,l=r.children,a=null!==e?e.memoizedState:null;if("hidden"===r.mode||"unstable-defer-without-hiding"===r.mode)if(0==(4&t.mode))t.memoizedState={baseLanes:0},Qi(t,n);else{if(0==(1073741824&n))return e=null!==a?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e},Qi(t,e),null;t.memoizedState={baseLanes:0},Qi(t,null!==a?a.baseLanes:n)}else null!==a?(r=a.baseLanes|n,t.memoizedState=null):r=n,Qi(t,r);return ru(e,t,l,n),t.child}function iu(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.flags|=128)}function su(e,t,n,r,l){var a=Fl(n)?Rl:Ml.current;return a=Dl(t,a),xa(t,l),n=_o(e,t,n,r,a,l),null===e||nu?(t.flags|=1,ru(e,t,n,l),t.child):(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~l,Cu(e,t,l))}function cu(e,t,n,r,l){if(Fl(n)){var a=!0;Al(t)}else a=!1;if(xa(t,l),null===t.stateNode)null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),Ua(t,n,r),Aa(t,n,r,l),r=!0;else if(null===e){var o=t.stateNode,u=t.memoizedProps;o.props=u;var i=o.context,s=n.contextType;"object"==typeof s&&null!==s?s=Ca(s):s=Dl(t,s=Fl(n)?Rl:Ml.current);var c=n.getDerivedStateFromProps,f="function"==typeof c||"function"==typeof o.getSnapshotBeforeUpdate;f||"function"!=typeof o.UNSAFE_componentWillReceiveProps&&"function"!=typeof o.componentWillReceiveProps||(u!==r||i!==s)&&Va(t,o,r,s),_a=!1;var d=t.memoizedState;o.state=d,Ma(t,r,o,l),i=t.memoizedState,u!==r||d!==i||Ol.current||_a?("function"==typeof c&&(Da(t,n,c,r),i=t.memoizedState),(u=_a||Ia(t,n,u,r,d,i,s))?(f||"function"!=typeof o.UNSAFE_componentWillMount&&"function"!=typeof o.componentWillMount||("function"==typeof o.componentWillMount&&o.componentWillMount(),"function"==typeof o.UNSAFE_componentWillMount&&o.UNSAFE_componentWillMount()),"function"==typeof o.componentDidMount&&(t.flags|=4)):("function"==typeof o.componentDidMount&&(t.flags|=4),t.memoizedProps=r,t.memoizedState=i),o.props=r,o.state=i,o.context=s,r=u):("function"==typeof o.componentDidMount&&(t.flags|=4),r=!1)}else{o=t.stateNode,Pa(e,t),u=t.memoizedProps,s=t.type===t.elementType?u:ga(t.type,u),o.props=s,f=t.pendingProps,d=o.context,"object"==typeof(i=n.contextType)&&null!==i?i=Ca(i):i=Dl(t,i=Fl(n)?Rl:Ml.current);var p=n.getDerivedStateFromProps;(c="function"==typeof p||"function"==typeof o.getSnapshotBeforeUpdate)||"function"!=typeof o.UNSAFE_componentWillReceiveProps&&"function"!=typeof o.componentWillReceiveProps||(u!==f||d!==i)&&Va(t,o,r,i),_a=!1,d=t.memoizedState,o.state=d,Ma(t,r,o,l);var h=t.memoizedState;u!==f||d!==h||Ol.current||_a?("function"==typeof p&&(Da(t,n,p,r),h=t.memoizedState),(s=_a||Ia(t,n,s,r,d,h,i))?(c||"function"!=typeof o.UNSAFE_componentWillUpdate&&"function"!=typeof o.componentWillUpdate||("function"==typeof o.componentWillUpdate&&o.componentWillUpdate(r,h,i),"function"==typeof o.UNSAFE_componentWillUpdate&&o.UNSAFE_componentWillUpdate(r,h,i)),"function"==typeof o.componentDidUpdate&&(t.flags|=4),"function"==typeof o.getSnapshotBeforeUpdate&&(t.flags|=256)):("function"!=typeof o.componentDidUpdate||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),"function"!=typeof o.getSnapshotBeforeUpdate||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=256),t.memoizedProps=r,t.memoizedState=h),o.props=r,o.state=h,o.context=i,r=s):("function"!=typeof o.componentDidUpdate||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),"function"!=typeof o.getSnapshotBeforeUpdate||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=256),r=!1)}return fu(e,t,n,r,a,l)}function fu(e,t,n,r,l,a){iu(e,t);var o=0!=(64&t.flags);if(!r&&!o)return l&&Bl(t,n,!1),Cu(e,t,a);r=t.stateNode,tu.current=t;var u=o&&"function"!=typeof n.getDerivedStateFromError?null:r.render();return t.flags|=1,null!==e&&o?(t.child=ja(t,e.child,null,a),t.child=ja(t,null,u,a)):ru(e,t,u,a),t.memoizedState=r.state,l&&Bl(t,n,!0),t.child}function du(e){var t=e.stateNode;t.pendingContext?Ul(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ul(e,t.context,!1),Za(e,t.containerInfo)}var pu,hu,mu,gu,vu={dehydrated:null,retryLane:0};function yu(e,t,n){var r,l=t.pendingProps,a=no.current,o=!1;return(r=0!=(64&t.flags))||(r=(null===e||null!==e.memoizedState)&&0!=(2&a)),r?(o=!0,t.flags&=-65):null!==e&&null===e.memoizedState||void 0===l.fallback||!0===l.unstable_avoidThisFallback||(a|=1),Ll(no,1&a),null===e?(void 0!==l.fallback&&so(t),e=l.children,a=l.fallback,o?(e=bu(t,e,a,n),t.child.memoizedState={baseLanes:n},t.memoizedState=vu,e):"number"==typeof l.unstable_expectedLoadTime?(e=bu(t,e,a,n),t.child.memoizedState={baseLanes:n},t.memoizedState=vu,t.lanes=33554432,e):((n=vs({mode:"visible",children:e},t.mode,n,null)).return=t,t.child=n)):(e.memoizedState,o?(l=ku(e,t,l.children,l.fallback,n),o=t.child,a=e.child.memoizedState,o.memoizedState=null===a?{baseLanes:n}:{baseLanes:a.baseLanes|n},o.childLanes=e.childLanes&~n,t.memoizedState=vu,l):(n=wu(e,t,l.children,n),t.memoizedState=null,n))}function bu(e,t,n,r){var l=e.mode,a=e.child;return t={mode:"hidden",children:t},0==(2&l)&&null!==a?(a.childLanes=0,a.pendingProps=t):a=vs(t,l,0,null),n=gs(n,l,r,null),a.return=e,n.return=e,a.sibling=n,e.child=a,n}function wu(e,t,n,r){var l=e.child;return e=l.sibling,n=hs(l,{mode:"visible",children:n}),0==(2&t.mode)&&(n.lanes=r),n.return=t,n.sibling=null,null!==e&&(e.nextEffect=null,e.flags=8,t.firstEffect=t.lastEffect=e),t.child=n}function ku(e,t,n,r,l){var a=t.mode,o=e.child;e=o.sibling;var u={mode:"hidden",children:n};return 0==(2&a)&&t.child!==o?((n=t.child).childLanes=0,n.pendingProps=u,null!==(o=n.lastEffect)?(t.firstEffect=n.firstEffect,t.lastEffect=o,o.nextEffect=null):t.firstEffect=t.lastEffect=null):n=hs(o,u),null!==e?r=hs(e,r):(r=gs(r,a,l,null)).flags|=2,r.return=t,n.return=t,n.sibling=r,t.child=n,r}function Su(e,t){e.lanes|=t;var n=e.alternate;null!==n&&(n.lanes|=t),Ea(e.return,t)}function Eu(e,t,n,r,l,a){var o=e.memoizedState;null===o?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l,lastEffect:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=l,o.lastEffect=a)}function xu(e,t,n){var r=t.pendingProps,l=r.revealOrder,a=r.tail;if(ru(e,t,r.children,n),0!=(2&(r=no.current)))r=1&r|2,t.flags|=64;else{if(null!==e&&0!=(64&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Su(e,n);else if(19===e.tag)Su(e,n);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Ll(no,r),0==(2&t.mode))t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;null!==n;)null!==(e=n.alternate)&&null===ro(e)&&(l=n),n=n.sibling;null===(n=l)?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),Eu(t,!1,l,n,a,t.lastEffect);break;case"backwards":for(n=null,l=t.child,t.child=null;null!==l;){if(null!==(e=l.alternate)&&null===ro(e)){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}Eu(t,!0,n,null,a,t.lastEffect);break;case"together":Eu(t,!1,null,null,void 0,t.lastEffect);break;default:t.memoizedState=null}return t.child}function Cu(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),ui|=t.lanes,0!=(n&t.childLanes)){if(null!==e&&t.child!==e.child)throw Error(r(153));if(null!==t.child){for(n=hs(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=hs(e,e.pendingProps)).return=t;n.sibling=null}return t.child}return null}function _u(e,t){if(!oo)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Nu(e,n,l){var o=n.pendingProps;switch(n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return Fl(n.type)&&Il(),null;case 3:return Ja(),zl(Ol),zl(Ml),mo(),(o=n.stateNode).pendingContext&&(o.context=o.pendingContext,o.pendingContext=null),null!==e&&null!==e.child||(fo(n)?n.flags|=4:o.hydrate||(n.flags|=256)),hu(n),null;case 5:to(n);var u=Ga(Xa.current);if(l=n.type,null!==e&&null!=n.stateNode)mu(e,n,l,o,u),e.ref!==n.ref&&(n.flags|=128);else{if(!o){if(null===n.stateNode)throw Error(r(166));return null}if(e=Ga(Ka.current),fo(n)){o=n.stateNode,l=n.type;var i=n.memoizedProps;switch(o[vl]=n,o[yl]=i,l){case"dialog":Kr("cancel",o),Kr("close",o);break;case"iframe":case"object":case"embed":Kr("load",o);break;case"video":case"audio":for(e=0;e<Hr.length;e++)Kr(Hr[e],o);break;case"source":Kr("error",o);break;case"img":case"image":case"link":Kr("error",o),Kr("load",o);break;case"details":Kr("toggle",o);break;case"input":te(o,i),Kr("invalid",o);break;case"select":o._wrapperState={wasMultiple:!!i.multiple},Kr("invalid",o);break;case"textarea":ce(o,i),Kr("invalid",o)}for(var s in xe(l,i),e=null,i)i.hasOwnProperty(s)&&(u=i[s],"children"===s?"string"==typeof u?o.textContent!==u&&(e=["children",u]):"number"==typeof u&&o.textContent!==""+u&&(e=["children",""+u]):a.hasOwnProperty(s)&&null!=u&&"onScroll"===s&&Kr("scroll",o));switch(l){case"input":G(o),le(o,i,!0);break;case"textarea":G(o),de(o);break;case"select":case"option":break;default:"function"==typeof i.onClick&&(o.onclick=ll)}o=e,n.updateQueue=o,null!==o&&(n.flags|=4)}else{switch(s=9===u.nodeType?u:u.ownerDocument,e===pe.html&&(e=he(l)),e===pe.html?"script"===l?((e=s.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):"string"==typeof o.is?e=s.createElement(l,{is:o.is}):(e=s.createElement(l),"select"===l&&(s=e,o.multiple?s.multiple=!0:o.size&&(s.size=o.size))):e=s.createElementNS(e,l),e[vl]=n,e[yl]=o,pu(e,n,!1,!1),n.stateNode=e,s=Ce(l,o),l){case"dialog":Kr("cancel",e),Kr("close",e),u=o;break;case"iframe":case"object":case"embed":Kr("load",e),u=o;break;case"video":case"audio":for(u=0;u<Hr.length;u++)Kr(Hr[u],e);u=o;break;case"source":Kr("error",e),u=o;break;case"img":case"image":case"link":Kr("error",e),Kr("load",e),u=o;break;case"details":Kr("toggle",e),u=o;break;case"input":te(e,o),u=ee(e,o),Kr("invalid",e);break;case"option":u=ue(e,o);break;case"select":e._wrapperState={wasMultiple:!!o.multiple},u=t({},o,{value:void 0}),Kr("invalid",e);break;case"textarea":ce(e,o),u=se(e,o),Kr("invalid",e);break;default:u=o}xe(l,u);var c=u;for(i in c)if(c.hasOwnProperty(i)){var f=c[i];"style"===i?Se(e,f):"dangerouslySetInnerHTML"===i?null!=(f=f?f.__html:void 0)&&ve(e,f):"children"===i?"string"==typeof f?("textarea"!==l||""!==f)&&ye(e,f):"number"==typeof f&&ye(e,""+f):"suppressContentEditableWarning"!==i&&"suppressHydrationWarning"!==i&&"autoFocus"!==i&&(a.hasOwnProperty(i)?null!=f&&"onScroll"===i&&Kr("scroll",e):null!=f&&w(e,i,f,s))}switch(l){case"input":G(e),le(e,o,!1);break;case"textarea":G(e),de(e);break;case"option":null!=o.value&&e.setAttribute("value",""+K(o.value));break;case"select":e.multiple=!!o.multiple,null!=(i=o.value)?ie(e,!!o.multiple,i,!1):null!=o.defaultValue&&ie(e,!!o.multiple,o.defaultValue,!0);break;default:"function"==typeof u.onClick&&(e.onclick=ll)}ul(l,o)&&(n.flags|=4)}null!==n.ref&&(n.flags|=128)}return null;case 6:if(e&&null!=n.stateNode)gu(e,n,e.memoizedProps,o);else{if("string"!=typeof o&&null===n.stateNode)throw Error(r(166));l=Ga(Xa.current),Ga(Ka.current),fo(n)?(o=n.stateNode,l=n.memoizedProps,o[vl]=n,o.nodeValue!==l&&(n.flags|=4)):((o=(9===l.nodeType?l:l.ownerDocument).createTextNode(o))[vl]=n,n.stateNode=o)}return null;case 13:return zl(no),o=n.memoizedState,0!=(64&n.flags)?(n.lanes=l,n):(o=null!==o,l=!1,null===e?void 0!==n.memoizedProps.fallback&&fo(n):l=null!==e.memoizedState,o&&!l&&0!=(2&n.mode)&&(null===e&&!0!==n.memoizedProps.unstable_avoidThisFallback||0!=(1&no.current)?0===li&&(li=3):(0!==li&&3!==li||(li=4),null===Ju||0==(134217727&ui)&&0==(134217727&ii)||Ui(Ju,ti))),(o||l)&&(n.flags|=4),null);case 4:return Ja(),hu(n),null===e&&Xr(n.stateNode.containerInfo),null;case 10:return Sa(n),null;case 17:return Fl(n.type)&&Il(),null;case 19:if(zl(no),null===(o=n.memoizedState))return null;if(i=0!=(64&n.flags),null===(s=o.rendering))if(i)_u(o,!1);else{if(0!==li||null!==e&&0!=(64&e.flags))for(e=n.child;null!==e;){if(null!==(s=ro(e))){for(n.flags|=64,_u(o,!1),null!==(i=s.updateQueue)&&(n.updateQueue=i,n.flags|=4),null===o.lastEffect&&(n.firstEffect=null),n.lastEffect=o.lastEffect,o=l,l=n.child;null!==l;)e=o,(i=l).flags&=2,i.nextEffect=null,i.firstEffect=null,i.lastEffect=null,null===(s=i.alternate)?(i.childLanes=0,i.lanes=e,i.child=null,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=s.childLanes,i.lanes=s.lanes,i.child=s.child,i.memoizedProps=s.memoizedProps,i.memoizedState=s.memoizedState,i.updateQueue=s.updateQueue,i.type=s.type,e=s.dependencies,i.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),l=l.sibling;return Ll(no,1&no.current|2),n.child}e=e.sibling}null!==o.tail&&ia()>di&&(n.flags|=64,i=!0,_u(o,!1),n.lanes=33554432)}else{if(!i)if(null!==(e=ro(s))){if(n.flags|=64,i=!0,null!==(l=e.updateQueue)&&(n.updateQueue=l,n.flags|=4),_u(o,!0),null===o.tail&&"hidden"===o.tailMode&&!s.alternate&&!oo)return null!==(n=n.lastEffect=o.lastEffect)&&(n.nextEffect=null),null}else 2*ia()-o.renderingStartTime>di&&1073741824!==l&&(n.flags|=64,i=!0,_u(o,!1),n.lanes=33554432);o.isBackwards?(s.sibling=n.child,n.child=s):(null!==(l=o.last)?l.sibling=s:n.child=s,o.last=s)}return null!==o.tail?(l=o.tail,o.rendering=l,o.tail=l.sibling,o.lastEffect=n.lastEffect,o.renderingStartTime=ia(),l.sibling=null,n=no.current,Ll(no,i?1&n|2:1&n),l):null;case 23:case 24:return Hi(),null!==e&&null!==e.memoizedState!=(null!==n.memoizedState)&&"unstable-defer-without-hiding"!==o.mode&&(n.flags|=4),null}throw Error(r(156,n.tag))}function Pu(e){switch(e.tag){case 1:Fl(e.type)&&Il();var t=e.flags;return 4096&t?(e.flags=-4097&t|64,e):null;case 3:if(Ja(),zl(Ol),zl(Ml),mo(),0!=(64&(t=e.flags)))throw Error(r(285));return e.flags=-4097&t|64,e;case 5:return to(e),null;case 13:return zl(no),4096&(t=e.flags)?(e.flags=-4097&t|64,e):null;case 19:return zl(no),null;case 4:return Ja(),null;case 10:return Sa(e),null;case 23:case 24:return Hi(),null;default:return null}}function zu(e,t){try{var n="",r=t;do{n+=$(r),r=r.return}while(r);var l=n}catch(a){l="\nError generating stack: "+a.message+"\n"+a.stack}return{value:e,source:t,stack:l}}function Lu(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}pu=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)e.appendChild(n.stateNode);else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===t)break;for(;null===n.sibling;){if(null===n.return||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},hu=function(){},mu=function(e,n,r,l){var o=e.memoizedProps;if(o!==l){e=n.stateNode,Ga(Ka.current);var u,i=null;switch(r){case"input":o=ee(e,o),l=ee(e,l),i=[];break;case"option":o=ue(e,o),l=ue(e,l),i=[];break;case"select":o=t({},o,{value:void 0}),l=t({},l,{value:void 0}),i=[];break;case"textarea":o=se(e,o),l=se(e,l),i=[];break;default:"function"!=typeof o.onClick&&"function"==typeof l.onClick&&(e.onclick=ll)}for(f in xe(r,l),r=null,o)if(!l.hasOwnProperty(f)&&o.hasOwnProperty(f)&&null!=o[f])if("style"===f){var s=o[f];for(u in s)s.hasOwnProperty(u)&&(r||(r={}),r[u]="")}else"dangerouslySetInnerHTML"!==f&&"children"!==f&&"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(a.hasOwnProperty(f)?i||(i=[]):(i=i||[]).push(f,null));for(f in l){var c=l[f];if(s=null!=o?o[f]:void 0,l.hasOwnProperty(f)&&c!==s&&(null!=c||null!=s))if("style"===f)if(s){for(u in s)!s.hasOwnProperty(u)||c&&c.hasOwnProperty(u)||(r||(r={}),r[u]="");for(u in c)c.hasOwnProperty(u)&&s[u]!==c[u]&&(r||(r={}),r[u]=c[u])}else r||(i||(i=[]),i.push(f,r)),r=c;else"dangerouslySetInnerHTML"===f?(c=c?c.__html:void 0,s=s?s.__html:void 0,null!=c&&s!==c&&(i=i||[]).push(f,c)):"children"===f?"string"!=typeof c&&"number"!=typeof c||(i=i||[]).push(f,""+c):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&(a.hasOwnProperty(f)?(null!=c&&"onScroll"===f&&Kr("scroll",e),i||s===c||(i=[])):"object"==typeof c&&null!==c&&c.$$typeof===D?c.toString():(i=i||[]).push(f,c))}r&&(i=i||[]).push("style",r);var f=i;(n.updateQueue=f)&&(n.flags|=4)}},gu=function(e,t,n,r){n!==r&&(t.flags|=4)};var Tu="function"==typeof WeakMap?WeakMap:Map;function Mu(e,t,n){(n=za(-1,n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){gi||(gi=!0,vi=r),Lu(e,t)},n}function Ou(e,t,n){(n=za(-1,n)).tag=3;var r=e.type.getDerivedStateFromError;if("function"==typeof r){var l=t.value;n.payload=function(){return Lu(e,t),r(l)}}var a=e.stateNode;return null!==a&&"function"==typeof a.componentDidCatch&&(n.callback=function(){"function"!=typeof r&&(null===yi?yi=new Set([this]):yi.add(this),Lu(e,t));var n=t.stack;this.componentDidCatch(t.value,{componentStack:null!==n?n:""})}),n}var Ru="function"==typeof WeakSet?WeakSet:Set;function Du(e){var t=e.ref;if(null!==t)if("function"==typeof t)try{t(null)}catch(n){us(e,n)}else t.current=null}function Fu(e,t){switch(t.tag){case 0:case 11:case 15:case 22:return;case 1:if(256&t.flags&&null!==e){var n=e.memoizedProps,l=e.memoizedState;t=(e=t.stateNode).getSnapshotBeforeUpdate(t.elementType===t.type?n:ga(t.type,n),l),e.__reactInternalSnapshotBeforeUpdate=t}return;case 3:return void(256&t.flags&&fl(t.stateNode.containerInfo));case 5:case 6:case 4:case 17:return}throw Error(r(163))}function Iu(e,t,n){switch(n.tag){case 0:case 11:case 15:case 22:if(null!==(t=null!==(t=n.updateQueue)?t.lastEffect:null)){e=t=t.next;do{if(3==(3&e.tag)){var l=e.create;e.destroy=l()}e=e.next}while(e!==t)}if(null!==(t=null!==(t=n.updateQueue)?t.lastEffect:null)){e=t=t.next;do{var a=e;l=a.next,0!=(4&(a=a.tag))&&0!=(1&a)&&(ls(n,e),rs(n,e)),e=l}while(e!==t)}return;case 1:return e=n.stateNode,4&n.flags&&(null===t?e.componentDidMount():(l=n.elementType===n.type?t.memoizedProps:ga(n.type,t.memoizedProps),e.componentDidUpdate(l,t.memoizedState,e.__reactInternalSnapshotBeforeUpdate))),void(null!==(t=n.updateQueue)&&Oa(n,t,e));case 3:if(null!==(t=n.updateQueue)){if(e=null,null!==n.child)switch(n.child.tag){case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}Oa(n,t,e)}return;case 5:return e=n.stateNode,void(null===t&&4&n.flags&&ul(n.type,n.memoizedProps)&&e.focus());case 6:case 4:case 12:return;case 13:return void(null===n.memoizedState&&(n=n.alternate,null!==n&&(n=n.memoizedState,null!==n&&(n=n.dehydrated,null!==n&&_t(n)))));case 19:case 17:case 20:case 21:case 23:case 24:return}throw Error(r(163))}function Uu(e,t){for(var n=e;;){if(5===n.tag){var r=n.stateNode;if(t)"function"==typeof(r=r.style).setProperty?r.setProperty("display","none","important"):r.display="none";else{r=n.stateNode;var l=n.memoizedProps.style;l=null!=l&&l.hasOwnProperty("display")?l.display:null,r.style.display=ke("display",l)}}else if(6===n.tag)n.stateNode.nodeValue=t?"":n.memoizedProps;else if((23!==n.tag&&24!==n.tag||null===n.memoizedState||n===e)&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===e)break;for(;null===n.sibling;){if(null===n.return||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}}function Vu(e,t){if(Ql&&"function"==typeof Ql.onCommitFiberUnmount)try{Ql.onCommitFiberUnmount(Wl,t)}catch(a){}switch(t.tag){case 0:case 11:case 14:case 15:case 22:if(null!==(e=t.updateQueue)&&null!==(e=e.lastEffect)){var n=e=e.next;do{var r=n,l=r.destroy;if(r=r.tag,void 0!==l)if(0!=(4&r))ls(t,n);else{r=t;try{l()}catch(a){us(r,a)}}n=n.next}while(n!==e)}break;case 1:if(Du(t),"function"==typeof(e=t.stateNode).componentWillUnmount)try{e.props=t.memoizedProps,e.state=t.memoizedState,e.componentWillUnmount()}catch(a){us(t,a)}break;case 5:Du(t);break;case 4:ju(e,t)}}function Au(e){e.alternate=null,e.child=null,e.dependencies=null,e.firstEffect=null,e.lastEffect=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.return=null,e.updateQueue=null}function Bu(e){return 5===e.tag||3===e.tag||4===e.tag}function Wu(e){e:{for(var t=e.return;null!==t;){if(Bu(t))break e;t=t.return}throw Error(r(160))}var n=t;switch(t=n.stateNode,n.tag){case 5:var l=!1;break;case 3:case 4:t=t.containerInfo,l=!0;break;default:throw Error(r(161))}16&n.flags&&(ye(t,""),n.flags&=-17);e:t:for(n=e;;){for(;null===n.sibling;){if(null===n.return||Bu(n.return)){n=null;break e}n=n.return}for(n.sibling.return=n.return,n=n.sibling;5!==n.tag&&6!==n.tag&&18!==n.tag;){if(2&n.flags)continue t;if(null===n.child||4===n.tag)continue t;n.child.return=n,n=n.child}if(!(2&n.flags)){n=n.stateNode;break e}}l?Qu(e,n,t):Hu(e,n,t)}function Qu(e,t,n){var r=e.tag,l=5===r||6===r;if(l)e=l?e.stateNode:e.stateNode.instance,t?8===n.nodeType?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(8===n.nodeType?(t=n.parentNode).insertBefore(e,n):(t=n).appendChild(e),null!=(n=n._reactRootContainer)||null!==t.onclick||(t.onclick=ll));else if(4!==r&&null!==(e=e.child))for(Qu(e,t,n),e=e.sibling;null!==e;)Qu(e,t,n),e=e.sibling}function Hu(e,t,n){var r=e.tag,l=5===r||6===r;if(l)e=l?e.stateNode:e.stateNode.instance,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&null!==(e=e.child))for(Hu(e,t,n),e=e.sibling;null!==e;)Hu(e,t,n),e=e.sibling}function ju(e,t){for(var n,l,a=t,o=!1;;){if(!o){o=a.return;e:for(;;){if(null===o)throw Error(r(160));switch(n=o.stateNode,o.tag){case 5:l=!1;break e;case 3:case 4:n=n.containerInfo,l=!0;break e}o=o.return}o=!0}if(5===a.tag||6===a.tag){e:for(var u=e,i=a,s=i;;)if(Vu(u,s),null!==s.child&&4!==s.tag)s.child.return=s,s=s.child;else{if(s===i)break e;for(;null===s.sibling;){if(null===s.return||s.return===i)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}l?(u=n,i=a.stateNode,8===u.nodeType?u.parentNode.removeChild(i):u.removeChild(i)):n.removeChild(a.stateNode)}else if(4===a.tag){if(null!==a.child){n=a.stateNode.containerInfo,l=!0,a.child.return=a,a=a.child;continue}}else if(Vu(e,a),null!==a.child){a.child.return=a,a=a.child;continue}if(a===t)break;for(;null===a.sibling;){if(null===a.return||a.return===t)return;4===(a=a.return).tag&&(o=!1)}a.sibling.return=a.return,a=a.sibling}}function $u(e,t){switch(t.tag){case 0:case 11:case 14:case 15:case 22:var n=t.updateQueue;if(null!==(n=null!==n?n.lastEffect:null)){var l=n=n.next;do{3==(3&l.tag)&&(e=l.destroy,l.destroy=void 0,void 0!==e&&e()),l=l.next}while(l!==n)}return;case 1:return;case 5:if(null!=(n=t.stateNode)){l=t.memoizedProps;var a=null!==e?e.memoizedProps:l;e=t.type;var o=t.updateQueue;if(t.updateQueue=null,null!==o){for(n[yl]=l,"input"===e&&"radio"===l.type&&null!=l.name&&ne(n,l),Ce(e,a),t=Ce(e,l),a=0;a<o.length;a+=2){var u=o[a],i=o[a+1];"style"===u?Se(n,i):"dangerouslySetInnerHTML"===u?ve(n,i):"children"===u?ye(n,i):w(n,u,i,t)}switch(e){case"input":re(n,l);break;case"textarea":fe(n,l);break;case"select":e=n._wrapperState.wasMultiple,n._wrapperState.wasMultiple=!!l.multiple,null!=(o=l.value)?ie(n,!!l.multiple,o,!1):e!==!!l.multiple&&(null!=l.defaultValue?ie(n,!!l.multiple,l.defaultValue,!0):ie(n,!!l.multiple,l.multiple?[]:"",!1))}}}return;case 6:if(null===t.stateNode)throw Error(r(162));return void(t.stateNode.nodeValue=t.memoizedProps);case 3:return void((n=t.stateNode).hydrate&&(n.hydrate=!1,_t(n.containerInfo)));case 12:return;case 13:return null!==t.memoizedState&&(fi=ia(),Uu(t.child,!0)),void qu(t);case 19:return void qu(t);case 17:return;case 23:case 24:return void Uu(t,null!==t.memoizedState)}throw Error(r(163))}function qu(e){var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new Ru),t.forEach(function(t){var r=ss.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))})}}function Ku(e,t){return null!==e&&(null===(e=e.memoizedState)||null!==e.dehydrated)&&(null!==(t=t.memoizedState)&&null===t.dehydrated)}var Yu=Math.ceil,Xu=k.ReactCurrentDispatcher,Gu=k.ReactCurrentOwner,Zu=0,Ju=null,ei=null,ti=0,ni=0,ri=Pl(0),li=0,ai=null,oi=0,ui=0,ii=0,si=0,ci=null,fi=0,di=1/0;function pi(){di=ia()+500}var hi,mi=null,gi=!1,vi=null,yi=null,bi=!1,wi=null,ki=90,Si=[],Ei=[],xi=null,Ci=0,_i=null,Ni=-1,Pi=0,zi=0,Li=null,Ti=!1;function Mi(){return 0!=(48&Zu)?ia():-1!==Ni?Ni:Ni=ia()}function Oi(e){if(0==(2&(e=e.mode)))return 1;if(0==(4&e))return 99===sa()?1:2;if(0===Pi&&(Pi=oi),0!==ma.transition){0!==zi&&(zi=null!==ci?ci.pendingLanes:0),e=Pi;var t=4186112&~zi;return 0===(t&=-t)&&(0===(t=(e=4186112&~e)&-e)&&(t=8192)),t}return e=sa(),0!=(4&Zu)&&98===e?e=qt(12,Pi):e=qt(e=Qt(e),Pi),e}function Ri(e,t,n){if(50<Ci)throw Ci=0,_i=null,Error(r(185));if(null===(e=Di(e,t)))return null;Xt(e,t,n),e===Ju&&(ii|=t,4===li&&Ui(e,ti));var l=sa();1===t?0!=(8&Zu)&&0==(48&Zu)?Vi(e):(Fi(e,n),0===Zu&&(pi(),pa())):(0==(4&Zu)||98!==l&&99!==l||(null===xi?xi=new Set([e]):xi.add(e)),Fi(e,n)),ci=e}function Di(e,t){e.lanes|=t;var n=e.alternate;for(null!==n&&(n.lanes|=t),n=e,e=e.return;null!==e;)e.childLanes|=t,null!==(n=e.alternate)&&(n.childLanes|=t),n=e,e=e.return;return 3===n.tag?n.stateNode:null}function Fi(e,t){for(var n=e.callbackNode,r=e.suspendedLanes,l=e.pingedLanes,a=e.expirationTimes,o=e.pendingLanes;0<o;){var u=31-Gt(o),i=1<<u,s=a[u];if(-1===s){if(0==(i&r)||0!=(i&l)){s=t,Wt(i);var c=Bt;a[u]=10<=c?s+250:6<=c?s+5e3:-1}}else s<=t&&(e.expiredLanes|=i);o&=~i}if(r=jt(e,e===Ju?ti:0),t=Bt,0===r)null!==n&&(n!==na&&$l(n),e.callbackNode=null,e.callbackPriority=0);else{if(null!==n){if(e.callbackPriority===t)return;n!==na&&$l(n)}15===t?(n=Vi.bind(null,e),null===la?(la=[n],aa=jl(Gl,ha)):la.push(n),n=na):14===t?n=da(99,Vi.bind(null,e)):n=da(n=Ht(t),Ii.bind(null,e)),e.callbackPriority=t,e.callbackNode=n}}function Ii(e){if(Ni=-1,zi=Pi=0,0!=(48&Zu))throw Error(r(327));var t=e.callbackNode;if(ns()&&e.callbackNode!==t)return null;var n=jt(e,e===Ju?ti:0);if(0===n)return null;var l=n,a=Zu;Zu|=16;var o=qi();for(Ju===e&&ti===l||(pi(),ji(e,l));;)try{Xi();break}catch(i){$i(e,i)}if(ka(),Xu.current=o,Zu=a,null!==ei?l=0:(Ju=null,ti=0,l=li),0!=(oi&ii))ji(e,0);else if(0!==l){if(2===l&&(Zu|=64,e.hydrate&&(e.hydrate=!1,fl(e.containerInfo)),0!==(n=$t(e))&&(l=Ki(e,n))),1===l)throw t=ai,ji(e,0),Ui(e,n),Fi(e,ia()),t;switch(e.finishedWork=e.current.alternate,e.finishedLanes=n,l){case 0:case 1:throw Error(r(345));case 2:Ji(e);break;case 3:if(Ui(e,n),(62914560&n)===n&&10<(l=fi+500-ia())){if(0!==jt(e,0))break;if(((a=e.suspendedLanes)&n)!==n){Mi(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=sl(Ji.bind(null,e),l);break}Ji(e);break;case 4:if(Ui(e,n),(4186112&n)===n)break;for(l=e.eventTimes,a=-1;0<n;){var u=31-Gt(n);o=1<<u,(u=l[u])>a&&(a=u),n&=~o}if(n=a,10<(n=(120>(n=ia()-n)?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*Yu(n/1960))-n)){e.timeoutHandle=sl(Ji.bind(null,e),n);break}Ji(e);break;case 5:Ji(e);break;default:throw Error(r(329))}}return Fi(e,ia()),e.callbackNode===t?Ii.bind(null,e):null}function Ui(e,t){for(t&=~si,t&=~ii,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Gt(t),r=1<<n;e[n]=-1,t&=~r}}function Vi(e){if(0!=(48&Zu))throw Error(r(327));if(ns(),e===Ju&&0!=(e.expiredLanes&ti)){var t=ti,n=Ki(e,t);0!=(oi&ii)&&(n=Ki(e,t=jt(e,t)))}else n=Ki(e,t=jt(e,0));if(0!==e.tag&&2===n&&(Zu|=64,e.hydrate&&(e.hydrate=!1,fl(e.containerInfo)),0!==(t=$t(e))&&(n=Ki(e,t))),1===n)throw n=ai,ji(e,0),Ui(e,t),Fi(e,ia()),n;return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ji(e),Fi(e,ia()),null}function Ai(){if(null!==xi){var e=xi;xi=null,e.forEach(function(e){e.expiredLanes|=24&e.pendingLanes,Fi(e,ia())})}pa()}function Bi(e,t){var n=Zu;Zu|=1;try{return e(t)}finally{0===(Zu=n)&&(pi(),pa())}}function Wi(e,t){var n=Zu;Zu&=-2,Zu|=8;try{return e(t)}finally{0===(Zu=n)&&(pi(),pa())}}function Qi(e,t){Ll(ri,ni),ni|=t,oi|=t}function Hi(){ni=ri.current,zl(ri)}function ji(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(e.timeoutHandle=-1,cl(n)),null!==ei)for(n=ei.return;null!==n;){var r=n;switch(r.tag){case 1:null!=(r=r.type.childContextTypes)&&Il();break;case 3:Ja(),zl(Ol),zl(Ml),mo();break;case 5:to(r);break;case 4:Ja();break;case 13:case 19:zl(no);break;case 10:Sa(r);break;case 23:case 24:Hi()}n=n.return}Ju=e,ei=hs(e.current,null),ti=ni=oi=t,li=0,ai=null,si=ii=ui=0}function $i(e,t){for(;;){var n=ei;try{if(ka(),go.current=Go,So){for(var r=bo.memoizedState;null!==r;){var l=r.queue;null!==l&&(l.pending=null),r=r.next}So=!1}if(yo=0,ko=wo=bo=null,Eo=!1,Gu.current=null,null===n||null===n.return){li=1,ai=t,ei=null;break}e:{var a=e,o=n.return,u=n,i=t;if(t=ti,u.flags|=2048,u.firstEffect=u.lastEffect=null,null!==i&&"object"==typeof i&&"function"==typeof i.then){var s=i;if(0==(2&u.mode)){var c=u.alternate;c?(u.updateQueue=c.updateQueue,u.memoizedState=c.memoizedState,u.lanes=c.lanes):(u.updateQueue=null,u.memoizedState=null)}var f=0!=(1&no.current),d=o;do{var p;if(p=13===d.tag){var h=d.memoizedState;if(null!==h)p=null!==h.dehydrated;else{var m=d.memoizedProps;p=void 0!==m.fallback&&(!0!==m.unstable_avoidThisFallback||!f)}}if(p){var g=d.updateQueue;if(null===g){var v=new Set;v.add(s),d.updateQueue=v}else g.add(s);if(0==(2&d.mode)){if(d.flags|=64,u.flags|=16384,u.flags&=-2981,1===u.tag)if(null===u.alternate)u.tag=17;else{var y=za(-1,1);y.tag=2,La(u,y)}u.lanes|=1;break e}i=void 0,u=t;var b=a.pingCache;if(null===b?(b=a.pingCache=new Tu,i=new Set,b.set(s,i)):void 0===(i=b.get(s))&&(i=new Set,b.set(s,i)),!i.has(u)){i.add(u);var w=is.bind(null,a,s,u);s.then(w,w)}d.flags|=4096,d.lanes=t;break e}d=d.return}while(null!==d);i=Error((q(u.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")}5!==li&&(li=2),i=zu(i,u),d=o;do{switch(d.tag){case 3:a=i,d.flags|=4096,t&=-t,d.lanes|=t,Ta(d,Mu(d,a,t));break e;case 1:a=i;var k=d.type,S=d.stateNode;if(0==(64&d.flags)&&("function"==typeof k.getDerivedStateFromError||null!==S&&"function"==typeof S.componentDidCatch&&(null===yi||!yi.has(S)))){d.flags|=4096,t&=-t,d.lanes|=t,Ta(d,Ou(d,a,t));break e}}d=d.return}while(null!==d)}Zi(n)}catch(E){t=E,ei===n&&null!==n&&(ei=n=n.return);continue}break}}function qi(){var e=Xu.current;return Xu.current=Go,null===e?Go:e}function Ki(e,t){var n=Zu;Zu|=16;var l=qi();for(Ju===e&&ti===t||ji(e,t);;)try{Yi();break}catch(a){$i(e,a)}if(ka(),Zu=n,Xu.current=l,null!==ei)throw Error(r(261));return Ju=null,ti=0,li}function Yi(){for(;null!==ei;)Gi(ei)}function Xi(){for(;null!==ei&&!ql();)Gi(ei)}function Gi(e){var t=hi(e.alternate,e,ni);e.memoizedProps=e.pendingProps,null===t?Zi(e):ei=t,Gu.current=null}function Zi(e){var t=e;do{var n=t.alternate;if(e=t.return,0==(2048&t.flags)){if(null!==(n=Nu(n,t,ni)))return void(ei=n);if(24!==(n=t).tag&&23!==n.tag||null===n.memoizedState||0!=(1073741824&ni)||0==(4&n.mode)){for(var r=0,l=n.child;null!==l;)r|=l.lanes|l.childLanes,l=l.sibling;n.childLanes=r}null!==e&&0==(2048&e.flags)&&(null===e.firstEffect&&(e.firstEffect=t.firstEffect),null!==t.lastEffect&&(null!==e.lastEffect&&(e.lastEffect.nextEffect=t.firstEffect),e.lastEffect=t.lastEffect),1<t.flags&&(null!==e.lastEffect?e.lastEffect.nextEffect=t:e.firstEffect=t,e.lastEffect=t))}else{if(null!==(n=Pu(t)))return n.flags&=2047,void(ei=n);null!==e&&(e.firstEffect=e.lastEffect=null,e.flags|=2048)}if(null!==(t=t.sibling))return void(ei=t);ei=t=e}while(null!==t);0===li&&(li=5)}function Ji(e){var t=sa();return fa(99,es.bind(null,e,t)),null}function es(e,t){do{ns()}while(null!==wi);if(0!=(48&Zu))throw Error(r(327));var n=e.finishedWork;if(null===n)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(r(177));e.callbackNode=null;var l=n.lanes|n.childLanes,a=l,o=e.pendingLanes&~a;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=a,e.mutableReadLanes&=a,e.entangledLanes&=a,a=e.entanglements;for(var u=e.eventTimes,i=e.expirationTimes;0<o;){var s=31-Gt(o),c=1<<s;a[s]=0,u[s]=-1,i[s]=-1,o&=~c}if(null!==xi&&0==(24&l)&&xi.has(e)&&xi.delete(e),e===Ju&&(ei=Ju=null,ti=0),1<n.flags?null!==n.lastEffect?(n.lastEffect.nextEffect=n,l=n.firstEffect):l=n:l=n.firstEffect,null!==l){if(a=Zu,Zu|=32,Gu.current=null,al=rn,Dr(u=Rr())){if("selectionStart"in u)i={start:u.selectionStart,end:u.selectionEnd};else e:if(i=(i=u.ownerDocument)&&i.defaultView||window,(c=i.getSelection&&i.getSelection())&&0!==c.rangeCount){i=c.anchorNode,o=c.anchorOffset,s=c.focusNode,c=c.focusOffset;try{i.nodeType,s.nodeType}catch(_){i=null;break e}var f=0,d=-1,p=-1,h=0,m=0,g=u,v=null;t:for(;;){for(var y;g!==i||0!==o&&3!==g.nodeType||(d=f+o),g!==s||0!==c&&3!==g.nodeType||(p=f+c),3===g.nodeType&&(f+=g.nodeValue.length),null!==(y=g.firstChild);)v=g,g=y;for(;;){if(g===u)break t;if(v===i&&++h===o&&(d=f),v===s&&++m===c&&(p=f),null!==(y=g.nextSibling))break;v=(g=v).parentNode}g=y}i=-1===d||-1===p?null:{start:d,end:p}}else i=null;i=i||{start:0,end:0}}else i=null;ol={focusedElem:u,selectionRange:i},rn=!1,Li=null,Ti=!1,mi=l;do{try{ts()}catch(_){if(null===mi)throw Error(r(330));us(mi,_),mi=mi.nextEffect}}while(null!==mi);Li=null,mi=l;do{try{for(u=e;null!==mi;){var b=mi.flags;if(16&b&&ye(mi.stateNode,""),128&b){var w=mi.alternate;if(null!==w){var k=w.ref;null!==k&&("function"==typeof k?k(null):k.current=null)}}switch(1038&b){case 2:Wu(mi),mi.flags&=-3;break;case 6:Wu(mi),mi.flags&=-3,$u(mi.alternate,mi);break;case 1024:mi.flags&=-1025;break;case 1028:mi.flags&=-1025,$u(mi.alternate,mi);break;case 4:$u(mi.alternate,mi);break;case 8:ju(u,i=mi);var S=i.alternate;Au(i),null!==S&&Au(S)}mi=mi.nextEffect}}catch(_){if(null===mi)throw Error(r(330));us(mi,_),mi=mi.nextEffect}}while(null!==mi);if(k=ol,w=Rr(),b=k.focusedElem,u=k.selectionRange,w!==b&&b&&b.ownerDocument&&Or(b.ownerDocument.documentElement,b)){null!==u&&Dr(b)&&(w=u.start,void 0===(k=u.end)&&(k=w),"selectionStart"in b?(b.selectionStart=w,b.selectionEnd=Math.min(k,b.value.length)):(k=(w=b.ownerDocument||document)&&w.defaultView||window).getSelection&&(k=k.getSelection(),i=b.textContent.length,S=Math.min(u.start,i),u=void 0===u.end?S:Math.min(u.end,i),!k.extend&&S>u&&(i=u,u=S,S=i),i=Mr(b,S),o=Mr(b,u),i&&o&&(1!==k.rangeCount||k.anchorNode!==i.node||k.anchorOffset!==i.offset||k.focusNode!==o.node||k.focusOffset!==o.offset)&&((w=w.createRange()).setStart(i.node,i.offset),k.removeAllRanges(),S>u?(k.addRange(w),k.extend(o.node,o.offset)):(w.setEnd(o.node,o.offset),k.addRange(w))))),w=[];for(k=b;k=k.parentNode;)1===k.nodeType&&w.push({element:k,left:k.scrollLeft,top:k.scrollTop});for("function"==typeof b.focus&&b.focus(),b=0;b<w.length;b++)(k=w[b]).element.scrollLeft=k.left,k.element.scrollTop=k.top}rn=!!al,ol=al=null,e.current=n,mi=l;do{try{for(b=e;null!==mi;){var E=mi.flags;if(36&E&&Iu(b,mi.alternate,mi),128&E){w=void 0;var x=mi.ref;if(null!==x){var C=mi.stateNode;switch(mi.tag){case 5:w=C;break;default:w=C}"function"==typeof x?x(w):x.current=w}}mi=mi.nextEffect}}catch(_){if(null===mi)throw Error(r(330));us(mi,_),mi=mi.nextEffect}}while(null!==mi);mi=null,ra(),Zu=a}else e.current=n;if(bi)bi=!1,wi=e,ki=t;else for(mi=l;null!==mi;)t=mi.nextEffect,mi.nextEffect=null,8&mi.flags&&((E=mi).sibling=null,E.stateNode=null),mi=t;if(0===(l=e.pendingLanes)&&(yi=null),1===l?e===_i?Ci++:(Ci=0,_i=e):Ci=0,n=n.stateNode,Ql&&"function"==typeof Ql.onCommitFiberRoot)try{Ql.onCommitFiberRoot(Wl,n,void 0,64==(64&n.current.flags))}catch(_){}if(Fi(e,ia()),gi)throw gi=!1,e=vi,vi=null,e;return 0!=(8&Zu)?null:(pa(),null)}function ts(){for(;null!==mi;){var e=mi.alternate;Ti||null===Li||(0!=(8&mi.flags)?rt(mi,Li)&&(Ti=!0):13===mi.tag&&Ku(e,mi)&&rt(mi,Li)&&(Ti=!0));var t=mi.flags;0!=(256&t)&&Fu(e,mi),0==(512&t)||bi||(bi=!0,da(97,function(){return ns(),null})),mi=mi.nextEffect}}function ns(){if(90!==ki){var e=97<ki?97:ki;return ki=90,fa(e,as)}return!1}function rs(e,t){Si.push(t,e),bi||(bi=!0,da(97,function(){return ns(),null}))}function ls(e,t){Ei.push(t,e),bi||(bi=!0,da(97,function(){return ns(),null}))}function as(){if(null===wi)return!1;var e=wi;if(wi=null,0!=(48&Zu))throw Error(r(331));var t=Zu;Zu|=32;var n=Ei;Ei=[];for(var l=0;l<n.length;l+=2){var a=n[l],o=n[l+1],u=a.destroy;if(a.destroy=void 0,"function"==typeof u)try{u()}catch(s){if(null===o)throw Error(r(330));us(o,s)}}for(n=Si,Si=[],l=0;l<n.length;l+=2){a=n[l],o=n[l+1];try{var i=a.create;a.destroy=i()}catch(s){if(null===o)throw Error(r(330));us(o,s)}}for(i=e.current.firstEffect;null!==i;)e=i.nextEffect,i.nextEffect=null,8&i.flags&&(i.sibling=null,i.stateNode=null),i=e;return Zu=t,pa(),!0}function os(e,t,n){La(e,t=Mu(e,t=zu(n,t),1)),t=Mi(),null!==(e=Di(e,1))&&(Xt(e,1,t),Fi(e,t))}function us(e,t){if(3===e.tag)os(e,e,t);else for(var n=e.return;null!==n;){if(3===n.tag){os(n,e,t);break}if(1===n.tag){var r=n.stateNode;if("function"==typeof n.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===yi||!yi.has(r))){var l=Ou(n,e=zu(t,e),1);if(La(n,l),l=Mi(),null!==(n=Di(n,1)))Xt(n,1,l),Fi(n,l);else if("function"==typeof r.componentDidCatch&&(null===yi||!yi.has(r)))try{r.componentDidCatch(t,e)}catch(a){}break}}n=n.return}}function is(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),t=Mi(),e.pingedLanes|=e.suspendedLanes&n,Ju===e&&(ti&n)===n&&(4===li||3===li&&(62914560&ti)===ti&&500>ia()-fi?ji(e,0):si|=n),Fi(e,t)}function ss(e,t){var n=e.stateNode;null!==n&&n.delete(t),0===(t=0)&&(0==(2&(t=e.mode))?t=1:0==(4&t)?t=99===sa()?1:2:(0===Pi&&(Pi=oi),0===(t=Kt(62914560&~Pi))&&(t=4194304))),n=Mi(),null!==(e=Di(e,t))&&(Xt(e,t,n),Fi(e,n))}function cs(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.flags=0,this.lastEffect=this.firstEffect=this.nextEffect=null,this.childLanes=this.lanes=0,this.alternate=null}function fs(e,t,n,r){return new cs(e,t,n,r)}function ds(e){return!(!(e=e.prototype)||!e.isReactComponent)}function ps(e){if("function"==typeof e)return ds(e)?1:0;if(null!=e){if((e=e.$$typeof)===z)return 11;if(e===M)return 14}return 2}function hs(e,t){var n=e.alternate;return null===n?((n=fs(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.nextEffect=null,n.firstEffect=null,n.lastEffect=null),n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ms(e,t,n,l,a,o){var u=2;if(l=e,"function"==typeof e)ds(e)&&(u=1);else if("string"==typeof e)u=5;else e:switch(e){case x:return gs(n.children,a,o,t);case F:u=8,a|=16;break;case C:u=8,a|=1;break;case _:return(e=fs(12,n,t,8|a)).elementType=_,e.type=_,e.lanes=o,e;case L:return(e=fs(13,n,t,a)).type=L,e.elementType=L,e.lanes=o,e;case T:return(e=fs(19,n,t,a)).elementType=T,e.lanes=o,e;case I:return vs(n,a,o,t);case U:return(e=fs(24,n,t,a)).elementType=U,e.lanes=o,e;default:if("object"==typeof e&&null!==e)switch(e.$$typeof){case N:u=10;break e;case P:u=9;break e;case z:u=11;break e;case M:u=14;break e;case O:u=16,l=null;break e;case R:u=22;break e}throw Error(r(130,null==e?e:typeof e,""))}return(t=fs(u,n,t,a)).elementType=e,t.type=l,t.lanes=o,t}function gs(e,t,n,r){return(e=fs(7,e,r,t)).lanes=n,e}function vs(e,t,n,r){return(e=fs(23,e,r,t)).elementType=I,e.lanes=n,e}function ys(e,t,n){return(e=fs(6,e,null,t)).lanes=n,e}function bs(e,t,n){return(t=fs(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function ws(e,t,n){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.pendingContext=this.context=null,this.hydrate=n,this.callbackNode=null,this.callbackPriority=0,this.eventTimes=Yt(0),this.expirationTimes=Yt(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Yt(0),this.mutableSourceEagerHydrationData=null}function ks(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:E,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}function Ss(e,t,n,l){var a=t.current,o=Mi(),u=Oi(a);e:if(n){t:{if(Ze(n=n._reactInternals)!==n||1!==n.tag)throw Error(r(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break t;case 1:if(Fl(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break t}}i=i.return}while(null!==i);throw Error(r(171))}if(1===n.tag){var s=n.type;if(Fl(s)){n=Vl(n,s,i);break e}}n=i}else n=Tl;return null===t.context?t.context=n:t.pendingContext=n,(t=za(o,u)).payload={element:e},null!==(l=void 0===l?null:l)&&(t.callback=l),La(a,t),Ri(a,u,o),u}function Es(e){if(!(e=e.current).child)return null;switch(e.child.tag){case 5:default:return e.child.stateNode}}function xs(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function Cs(e,t){xs(e,t),(e=e.alternate)&&xs(e,t)}function _s(){return null}function Ns(e,t,n){var r=null!=n&&null!=n.hydrationOptions&&n.hydrationOptions.mutableSources||null;if(n=new ws(e,t,null!=n&&!0===n.hydrate),t=fs(3,null,null,2===t?7:1===t?3:0),n.current=t,t.stateNode=n,Na(t),e[bl]=n.current,Xr(8===e.nodeType?e.parentNode:e),r)for(e=0;e<r.length;e++){var l=(t=r[e])._getVersion;l=l(t._source),null==n.mutableSourceEagerHydrationData?n.mutableSourceEagerHydrationData=[t,l]:n.mutableSourceEagerHydrationData.push(t,l)}this._internalRoot=n}function Ps(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function zs(e,t){if(t||(t=!(!(t=e?9===e.nodeType?e.documentElement:e.firstChild:null)||1!==t.nodeType||!t.hasAttribute("data-reactroot"))),!t)for(var n;n=e.lastChild;)e.removeChild(n);return new Ns(e,0,t?{hydrate:!0}:void 0)}function Ls(e,t,n,r,l){var a=n._reactRootContainer;if(a){var o=a._internalRoot;if("function"==typeof l){var u=l;l=function(){var e=Es(o);u.call(e)}}Ss(t,o,e,l)}else{if(a=n._reactRootContainer=zs(n,r),o=a._internalRoot,"function"==typeof l){var i=l;l=function(){var e=Es(o);i.call(e)}}Wi(function(){Ss(t,o,e,l)})}return Es(o)}function Ts(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Ps(t))throw Error(r(200));return ks(e,t,null,n)}hi=function(e,t,n){var l=t.lanes;if(null!==e)if(e.memoizedProps!==t.pendingProps||Ol.current)nu=!0;else{if(0==(n&l)){switch(nu=!1,t.tag){case 3:du(t),po();break;case 5:eo(t);break;case 1:Fl(t.type)&&Al(t);break;case 4:Za(t,t.stateNode.containerInfo);break;case 10:l=t.memoizedProps.value;var a=t.type._context;Ll(va,a._currentValue),a._currentValue=l;break;case 13:if(null!==t.memoizedState)return 0!=(n&t.child.childLanes)?yu(e,t,n):(Ll(no,1&no.current),null!==(t=Cu(e,t,n))?t.sibling:null);Ll(no,1&no.current);break;case 19:if(l=0!=(n&t.childLanes),0!=(64&e.flags)){if(l)return xu(e,t,n);t.flags|=64}if(null!==(a=t.memoizedState)&&(a.rendering=null,a.tail=null,a.lastEffect=null),Ll(no,no.current),l)break;return null;case 23:case 24:return t.lanes=0,uu(e,t,n)}return Cu(e,t,n)}nu=0!=(16384&e.flags)}else nu=!1;switch(t.lanes=0,t.tag){case 2:if(l=t.type,null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,a=Dl(t,Ml.current),xa(t,n),a=_o(null,t,l,e,a,n),t.flags|=1,"object"==typeof a&&null!==a&&"function"==typeof a.render&&void 0===a.$$typeof){if(t.tag=1,t.memoizedState=null,t.updateQueue=null,Fl(l)){var o=!0;Al(t)}else o=!1;t.memoizedState=null!==a.state&&void 0!==a.state?a.state:null,Na(t);var u=l.getDerivedStateFromProps;"function"==typeof u&&Da(t,l,u,e),a.updater=Fa,t.stateNode=a,a._reactInternals=t,Aa(t,l,e,n),t=fu(null,t,l,!0,o,n)}else t.tag=0,ru(null,t,a,n),t=t.child;return t;case 16:a=t.elementType;e:{switch(null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,a=(o=a._init)(a._payload),t.type=a,o=t.tag=ps(a),e=ga(a,e),o){case 0:t=su(null,t,a,e,n);break e;case 1:t=cu(null,t,a,e,n);break e;case 11:t=lu(null,t,a,e,n);break e;case 14:t=au(null,t,a,ga(a.type,e),l,n);break e}throw Error(r(306,a,""))}return t;case 0:return l=t.type,a=t.pendingProps,su(e,t,l,a=t.elementType===l?a:ga(l,a),n);case 1:return l=t.type,a=t.pendingProps,cu(e,t,l,a=t.elementType===l?a:ga(l,a),n);case 3:if(du(t),l=t.updateQueue,null===e||null===l)throw Error(r(282));if(l=t.pendingProps,a=null!==(a=t.memoizedState)?a.element:null,Pa(e,t),Ma(t,l,null,n),(l=t.memoizedState.element)===a)po(),t=Cu(e,t,n);else{if((o=(a=t.stateNode).hydrate)&&(ao=dl(t.stateNode.containerInfo.firstChild),lo=t,o=oo=!0),o){if(null!=(e=a.mutableSourceEagerHydrationData))for(a=0;a<e.length;a+=2)(o=e[a])._workInProgressVersionPrimary=e[a+1],ho.push(o);for(n=$a(t,null,l,n),t.child=n;n;)n.flags=-3&n.flags|1024,n=n.sibling}else ru(e,t,l,n),po();t=t.child}return t;case 5:return eo(t),null===e&&so(t),l=t.type,a=t.pendingProps,o=null!==e?e.memoizedProps:null,u=a.children,il(l,a)?u=null:null!==o&&il(l,o)&&(t.flags|=16),iu(e,t),ru(e,t,u,n),t.child;case 6:return null===e&&so(t),null;case 13:return yu(e,t,n);case 4:return Za(t,t.stateNode.containerInfo),l=t.pendingProps,null===e?t.child=ja(t,null,l,n):ru(e,t,l,n),t.child;case 11:return l=t.type,a=t.pendingProps,lu(e,t,l,a=t.elementType===l?a:ga(l,a),n);case 7:return ru(e,t,t.pendingProps,n),t.child;case 8:case 12:return ru(e,t,t.pendingProps.children,n),t.child;case 10:e:{l=t.type._context,a=t.pendingProps,u=t.memoizedProps,o=a.value;var i=t.type._context;if(Ll(va,i._currentValue),i._currentValue=o,null!==u)if(i=u.value,0===(o=Pr(i,o)?0:0|("function"==typeof l._calculateChangedBits?l._calculateChangedBits(i,o):1073741823))){if(u.children===a.children&&!Ol.current){t=Cu(e,t,n);break e}}else for(null!==(i=t.child)&&(i.return=t);null!==i;){var s=i.dependencies;if(null!==s){u=i.child;for(var c=s.firstContext;null!==c;){if(c.context===l&&0!=(c.observedBits&o)){1===i.tag&&((c=za(-1,n&-n)).tag=2,La(i,c)),i.lanes|=n,null!==(c=i.alternate)&&(c.lanes|=n),Ea(i.return,n),s.lanes|=n;break}c=c.next}}else u=10===i.tag&&i.type===t.type?null:i.child;if(null!==u)u.return=i;else for(u=i;null!==u;){if(u===t){u=null;break}if(null!==(i=u.sibling)){i.return=u.return,u=i;break}u=u.return}i=u}ru(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,l=(o=t.pendingProps).children,xa(t,n),l=l(a=Ca(a,o.unstable_observedBits)),t.flags|=1,ru(e,t,l,n),t.child;case 14:return o=ga(a=t.type,t.pendingProps),au(e,t,a,o=ga(a.type,o),l,n);case 15:return ou(e,t,t.type,t.pendingProps,l,n);case 17:return l=t.type,a=t.pendingProps,a=t.elementType===l?a:ga(l,a),null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),t.tag=1,Fl(l)?(e=!0,Al(t)):e=!1,xa(t,n),Ua(t,l,a),Aa(t,l,a,n),fu(null,t,l,!0,e,n);case 19:return xu(e,t,n);case 23:case 24:return uu(e,t,n)}throw Error(r(156,t.tag))},Ns.prototype.render=function(e){Ss(e,this._internalRoot,null,null)},Ns.prototype.unmount=function(){var e=this._internalRoot,t=e.containerInfo;Ss(null,e,null,function(){t[bl]=null})},lt=function(e){13===e.tag&&(Ri(e,4,Mi()),Cs(e,4))},at=function(e){13===e.tag&&(Ri(e,67108864,Mi()),Cs(e,67108864))},ot=function(e){if(13===e.tag){var t=Mi(),n=Oi(e);Ri(e,n,t),Cs(e,n)}},ut=function(e,t){return t()},Ne=function(e,t,n){switch(t){case"input":if(re(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var l=n[t];if(l!==e&&l.form===e.form){var a=xl(l);if(!a)throw Error(r(90));Z(l),re(l,a)}}}break;case"textarea":fe(e,n);break;case"select":null!=(t=n.value)&&ie(e,!!n.multiple,t,!1)}},Oe=Bi,Re=function(e,t,n,r,l){var a=Zu;Zu|=4;try{return fa(98,e.bind(null,t,n,r,l))}finally{0===(Zu=a)&&(pi(),pa())}},De=function(){0==(49&Zu)&&(Ai(),ns())},Fe=function(e,t){var n=Zu;Zu|=2;try{return e(t)}finally{0===(Zu=n)&&(pi(),pa())}};var Ms={Events:[Sl,El,xl,Te,Me,ns,{current:!1}]},Os={findFiberByHostInstance:kl,bundleType:0,version:"17.0.1",rendererPackageName:"react-dom"},Rs={bundleType:Os.bundleType,version:Os.version,rendererPackageName:Os.rendererPackageName,rendererConfig:Os.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:k.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=nt(e))?null:e.stateNode},findFiberByHostInstance:Os.findFiberByHostInstance||_s,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var Ds=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ds.isDisabled&&Ds.supportsFiber)try{Wl=Ds.inject(Rs),Ql=Ds}catch(Fs){}}exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ms,exports.createPortal=Ts,exports.findDOMNode=function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=e._reactInternals;if(void 0===t){if("function"==typeof e.render)throw Error(r(188));throw Error(r(268,Object.keys(e)))}return e=null===(e=nt(t))?null:e.stateNode},exports.flushSync=function(e,t){var n=Zu;if(0!=(48&n))return e(t);Zu|=1;try{if(e)return fa(99,e.bind(null,t))}finally{Zu=n,pa()}},exports.hydrate=function(e,t,n){if(!Ps(t))throw Error(r(200));return Ls(null,e,t,!0,n)},exports.render=function(e,t,n){if(!Ps(t))throw Error(r(200));return Ls(null,e,t,!1,n)},exports.unmountComponentAtNode=function(e){if(!Ps(e))throw Error(r(40));return!!e._reactRootContainer&&(Wi(function(){Ls(null,null,e,!1,function(){e._reactRootContainer=null,e[bl]=null})}),!0)},exports.unstable_batchedUpdates=Bi,exports.unstable_createPortal=function(e,t){return Ts(e,t,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)},exports.unstable_renderSubtreeIntoContainer=function(e,t,n,l){if(!Ps(n))throw Error(r(200));if(null==e||void 0===e._reactInternals)throw Error(r(38));return Ls(e,t,n,!1,l)},exports.version="17.0.1";
},{"react":"n8MK","object-assign":"J4Nk","scheduler":"MDSO"}],"NKHc":[function(require,module,exports) {
"use strict";function _(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE){0;try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_)}catch(O){console.error(O)}}}_(),module.exports=require("./cjs/react-dom.production.min.js");
},{"./cjs/react-dom.production.min.js":"i17t"}],"VKqU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Counter=void 0;var t=e(require("react")),r=require("htm/react");function e(t){return t&&t.__esModule?t:{default:t}}function n(){var t=o(["\n    <div>\n      <h1>","</h1>\n      <button onClick=",">Decrement</button>\n      <button onClick=",">Increment</button>\n    </div>\n  "]);return n=function(){return t},t}function o(t,r){return r||(r=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(r)}}))}function u(t,r){return f(t)||l(t,r)||a(t,r)||i()}function i(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(t,r){if(t){if("string"==typeof t)return c(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?c(t,r):void 0}}function c(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function l(t,r){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var e=[],n=!0,o=!1,u=void 0;try{for(var i,a=t[Symbol.iterator]();!(n=(i=a.next()).done)&&(e.push(i.value),!r||e.length!==r);n=!0);}catch(c){o=!0,u=c}finally{try{n||null==a.return||a.return()}finally{if(o)throw u}}return e}}function f(t){if(Array.isArray(t))return t}var s=function(e){var o=u(t.default.useState(parseInt(e.count)),2),i=o[0],a=o[1];return(0,r.html)(n(),i,function(t){return a(i-1)},function(t){return a(i+1)})};exports.Counter=s;
},{"react":"n8MK","htm/react":"DaDa"}],"ykl7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getRelativeDuration=void 0;var t=r(require("dayjs"));function r(t){return t&&t.__esModule?t:{default:t}}function e(t,r){return u(t)||a(t,r)||o(t,r)||n()}function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(t,r){if(t){if("string"==typeof t)return i(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?i(t,r):void 0}}function i(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function a(t,r){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var e=[],n=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done)&&(e.push(a.value),!r||e.length!==r);n=!0);}catch(l){o=!0,i=l}finally{try{n||null==u.return||u.return()}finally{if(o)throw i}}return e}}function u(t){if(Array.isArray(t))return t}var l=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,n=(0,t.default)(r).format("HH:MM"),o=e(n.split(":"),2),i=o[0],a=o[1];return[n,60*Number(i)+Number(a)]};exports.getRelativeDuration=l;
},{"dayjs":"dZYI"}],"YWaU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=p;var i=require("htm/react"),n=t(require("react")),a=t(require("tippy.js")),e=require("../utils/datetime");function t(i){return i&&i.__esModule?i:{default:i}}function s(){var i=l(['<div className="timings">\n    <div\n      className="timing-current"\n      data-tippy-content=','\n      data-tippy-arrow="false"\n      data-tippy-theme="light-border"\n      style="','"\n    ></div>\n    <div><span className="timing-whole"> 00:00 </span> AM</div>\n    <div className="timing-half">00:30</div>\n    <div><span className="timing-whole"> 01:00 </span> AM</div>\n    <div className="timing-half">01:30</div>\n    <div><span className="timing-whole"> 02:00 </span> AM</div>\n    <div className="timing-half">02:30</div>\n    <div><span className="timing-whole"> 03:00 </span> AM</div>\n    <div className="timing-half">03:30</div>\n    <div><span className="timing-whole"> 04:00 </span> AM</div>\n    <div className="timing-half">04:30</div>\n    <div><span className="timing-whole"> 05:00 </span> AM</div>\n    <div className="timing-half">05:30</div>\n    <div><span className="timing-whole"> 06:00 </span> AM</div>\n    <div className="timing-half">06:30</div>\n    <div><span className="timing-whole"> 07:00 </span> AM</div>\n    <div className="timing-half">07:30</div>\n    <div><span className="timing-whole"> 08:00 </span> AM</div>\n    <div className="timing-half">08:30</div>\n    <div><span className="timing-whole"> 09:00 </span> AM</div>\n    <div className="timing-half">09:30</div>\n    <div><span className="timing-whole"> 10:00 </span> AM</div>\n    <div className="timing-half">10:30</div>\n    <div><span className="timing-whole"> 11:00 </span> AM</div>\n    <div className="timing-half">11:30</div>\n    <div><span className="timing-whole"> 12:00 </span> AM</div>\n    <div className="timing-half">12:30</div>\n    <div><span className="timing-whole"> 13:00 </span> PM</div>\n    <div className="timing-half">13:30</div>\n    <div><span className="timing-whole"> 14:00 </span> PM</div>\n    <div className="timing-half">14:30</div>\n    <div><span className="timing-whole"> 15:00 </span> PM</div>\n    <div className="timing-half">15:30</div>\n    <div><span className="timing-whole"> 16:00 </span> PM</div>\n    <div className="timing-half">16:30</div>\n    <div><span className="timing-whole"> 17:00 </span> PM</div>\n    <div className="timing-half">17:30</div>\n    <div><span className="timing-whole"> 18:00 </span> PM</div>\n    <div className="timing-half">18:30</div>\n    <div><span className="timing-whole"> 19:00 </span> PM</div>\n    <div className="timing-half">19:30</div>\n    <div><span className="timing-whole"> 20:00 </span> PM</div>\n    <div className="timing-half">20:30</div>\n    <div><span className="timing-whole"> 21:00 </span> PM</div>\n    <div className="timing-half">21:30</div>\n    <div><span className="timing-whole"> 22:00 </span> PM</div>\n    <div className="timing-half">22:30</div>\n    <div><span className="timing-whole"> 23:00 </span> PM</div>\n    <div className="timing-half">23:30</div>\n  </div> ']);return s=function(){return i},i}function l(i,n){return n||(n=i.slice(0)),Object.freeze(Object.defineProperties(i,{raw:{value:Object.freeze(n)}}))}function d(i,n){return o(i)||c(i,n)||m(i,n)||v()}function v(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function m(i,n){if(i){if("string"==typeof i)return r(i,n);var a=Object.prototype.toString.call(i).slice(8,-1);return"Object"===a&&i.constructor&&(a=i.constructor.name),"Map"===a||"Set"===a?Array.from(i):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?r(i,n):void 0}}function r(i,n){(null==n||n>i.length)&&(n=i.length);for(var a=0,e=new Array(n);a<n;a++)e[a]=i[a];return e}function c(i,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(i)){var a=[],e=!0,t=!1,s=void 0;try{for(var l,d=i[Symbol.iterator]();!(e=(l=d.next()).done)&&(a.push(l.value),!n||a.length!==n);e=!0);}catch(v){t=!0,s=v}finally{try{e||null==d.return||d.return()}finally{if(t)throw s}}return a}}function o(i){if(Array.isArray(i))return i}function p(){var t=(0,e.getRelativeDuration)(),l=d(n.default.useState(t[0]),2),v=l[0],m=l[1],r=d(n.default.useState(t[1]),2),c=r[0],o=r[1];return n.default.useEffect(function(){var i=setInterval(function(){var i=(0,e.getRelativeDuration)();m(i[0]),o(i[1]),(0,a.default)("[data-tippy-content]")},6e3);return function(){return clearInterval(i)}},[]),(0,i.html)(s(),v,{marginTop:c})}
},{"htm/react":"DaDa","react":"n8MK","tippy.js":"fSQx","../utils/datetime":"ykl7"}],"Pft5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.renderReact=a;var e=require("htm/react"),r=o(require("react")),t=o(require("react-dom")),n=require("./count"),u=o(require("./timings"));function o(e){return e&&e.__esModule?e:{default:e}}function c(){var e=i([" <"," /> "]);return c=function(){return e},e}function i(e,r){return r||(r=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(r)}}))}function a(){var r=document.getElementsByTagName("timings-root")[0]||document.createElement("timings-root");document.querySelector(".flex-v-box.roam-log-container").prepend(r),t.default.render((0,e.html)(c(),u.default),r)}
},{"htm/react":"DaDa","react":"n8MK","react-dom":"NKHc","./count":"VKqU","./timings":"YWaU"}],"Dic7":[function(require,module,exports) {
"use strict";function t(){var t=document.createElement("div");return t.setAttribute("style","flex: 0 0 3px"),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.createSpacer=t,exports.appendIcon=o,exports.switchTo=c,exports.generateStyleScript=r;var e={cardList:{text:"Card List",icon:"bp3-icon-full-stacked-chart"},cardFlow:{text:"Card Flow",icon:"bp3-icon-heat-grid"},document:{text:"Document",icon:"bp3-icon-horizontal-bar-chart"}};function o(o,n){var c=e[o],r=document.createElement("div");r.id="mode-button-".concat(o),r.className="bp3-button bp3-minimal bp3-small ".concat(c.icon," mode-button"),r.setAttribute("style","position:relative;left:2px"),r.onclick=n,document.querySelector(".roam-topbar .flex-h-box").appendChild(r);var a=t();document.querySelector(".roam-topbar .flex-h-box").appendChild(a)}var n=function(t,o){var n=e[t],c=document.querySelector(".roam-topbar > .flex-h-box"),r=c.firstChild.classList.contains("bp3-icon-menu")?c.childNodes[1]:c.firstChild;r.style.display="flex",r.style.justifyContent="center";var a=document.createElement("button");a.name=n.text,a.className="mode-button bp3-button bp3-minimal bp3-small ".concat(n.icon," ").concat(t),a.onclick=o,r.appendChild(a)};function c(t){document.querySelector("html").classList=t,localStorage.setItem("INIT_MODE",t)}function r(t){var e=document.createElement("style");return e.innerHTML=t,e}
},{}],"UZLb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.addToggleMode=n;var e=require("./utils/helper");function n(n){var t=n.id,o=void 0===t?"mode-toggle-focus":t,i=n.on,a=void 0===i?"eye-on":i,c=n.turnOn,l=n.off,d=void 0===l?"eye-open":l,r=n.turnOff,p=n.styleContent,s=void 0===p?"":p,u=(0,e.generateStyleScript)(s),m=document.createElement("div");function b(){[].find.call(m.classList,function(e){return e==="bp3-icon-"+a})?(m.className="bp3-button bp3-minimal bp3-icon-".concat(d," bp3-small"),document.head.removeChild(u),r&&r()):(m.className="bp3-button bp3-minimal bp3-icon-".concat(a," bp3-small"),document.head.appendChild(u),c&&c())}return m.id=o,m.className="bp3-button bp3-minimal bp3-icon-".concat(d," bp3-small"),document.querySelector(".roam-topbar .flex-h-box").appendChild(m),m.addEventListener("click",b),b}
},{"./utils/helper":"Dic7"}],"eqHu":[function(require,module,exports) {

},{}],"Mh2O":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=f;var e=a(require("dayjs")),t=a(require("dayjs/plugin/customParseFormat")),r=require("./components/render"),n=require("./focus");require("./css/timings.less");var o=require("./utils/helper");function a(e){return e&&e.__esModule?e:{default:e}}function c(e){return s(e)||l(e)||u(e)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(e,t){if(e){if("string"==typeof e)return d(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?d(e,t):void 0}}function l(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function s(e){if(Array.isArray(e))return d(e)}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function f(){return(0,n.addToggleMode)({id:"mode-toggle-calendar",on:"cube-add",off:"cube",styleContent:"",turnOn:function(){(0,o.switchTo)("calendar-mode"),(0,r.renderReact)(),c(document.querySelectorAll(".roam-log-page")).forEach(function(t){var r=t.querySelector("h1"),n=r&&r.textContent||"";if(console.log("currentDateStr",n),n.includes(", 2020")){var o=(0,e.default)().format("YYYY-MM-DD");console.log("currentDay",o);var a="00:00",i=0;c(t.querySelectorAll(".rm-level-0 > div.roam-block-container")).forEach(function(r){var n=r.textContent&&r.textContent.substring(0,5);if(!new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).test(n)){var c=t.querySelector("[data-create-time]").dataset.createTime;n=new Date(c).toTimeString().substring(0,5)}console.log("timestamp",n),r.setAttribute("data-timestamp",n);var u=(0,e.default)("".concat(o," ").concat(n)).diff((0,e.default)("".concat(o," ").concat(a)),"minute");console.log("duration",u);var l=r.clientHeight,s=u-i>=0?u-i:0;r.style.marginTop="".concat(s,"px"),a=n,i=l})}})},turnOff:function(){(0,o.switchTo)("document-mode")}})}e.default.extend(t.default);
},{"dayjs":"dZYI","dayjs/plugin/customParseFormat":"RZP1","./components/render":"Pft5","./focus":"UZLb","./css/timings.less":"eqHu","./utils/helper":"Dic7"}],"XdYG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=u;var e=a(require("hotkeys-js")),t=a(require("tippy.js")),o=a(require("./calendar"));require("./css/card.less"),require("./css/gingko.less"),require("./css/calendar.less");var n=require("./focus"),l=require("./utils/helper");function a(e){return e&&e.__esModule?e:{default:e}}var s=localStorage.getItem("INIT_MODE")||"document";document.querySelector("html").classList.add(s);var r=function(){(0,l.switchTo)("card-mode"),document.querySelector(".zoom-path-view.rm-zoom")&&document.querySelector(".zoom-path-view.rm-zoom").firstChild.click()};(0,l.appendIcon)("cardList",r),(0,l.appendIcon)("cardFlow",function(){(0,l.switchTo)("flow-mode")}),(0,l.appendIcon)("document",function(){(0,l.switchTo)("document-mode")});var d=(0,n.addToggleMode)({id:"mode-toggle-focus",on:"eye-on",off:"eye-open",styleContent:"\n\t.roam-block-container div[id]{\n  \t\topacity: 0.2;\n    }\n\t.roam-block-container div[id]:hover{\n \t \topacity: 1;\n\t}\n  .roam-toolkit-block-mode--highlight {\n    opacity: 1 !important;\n  }\n"}),i=(0,o.default)();function u(){(0,e.default)("alt+shift+1",function(e,t){e.preventDefault(),r()}),(0,e.default)("alt+shift+2",function(e,t){e.preventDefault(),(0,l.switchTo)("flow-mode")}),(0,e.default)("alt+shift+3",function(e,t){e.preventDefault(),(0,l.switchTo)("document-mode")}),(0,e.default)("alt+shift+f",function(e,t){e.preventDefault(),d()}),(0,e.default)("alt+shift+c",function(e,t){e.preventDefault(),i()}),(0,t.default)("#mode-button-cardList",{content:'Card List<sup>mode</sup> <span style="font-size:7pt">(Alt-Shift-1)</span>',allowHTML:!0,theme:"light-border"}),(0,t.default)("#mode-button-cardFlow",{content:'Card Flow<sup>mode</sup> <span style="font-size:7pt">(Alt-Shift-2)</span>',allowHTML:!0,theme:"light-border"}),(0,t.default)("#mode-button-document",{content:'Outliner<sup>mode</sup> <span style="font-size:7pt">(Alt-Shift-3)</span>',allowHTML:!0,theme:"light-border"}),(0,t.default)("#mode-toggle-focus",{content:'Focus<sup>mode</sup> <span style="font-size:7pt">(Alt-Shift-f)</span>',allowHTML:!0,theme:"light-border"}),(0,t.default)("#mode-toggle-calendar",{content:'Calendar<sup>mode</sup> <span style="font-size:7pt">(Alt-Shift-c)</span>',allowHTML:!0,theme:"light-border"}),console.log("started styled-roam")}
},{"hotkeys-js":"M1ol","tippy.js":"fSQx","./calendar":"Mh2O","./css/card.less":"eqHu","./css/gingko.less":"eqHu","./css/calendar.less":"eqHu","./focus":"UZLb","./utils/helper":"Dic7"}],"Focm":[function(require,module,exports) {
"use strict";var e=t(require("./switch"));function t(e){return e&&e.__esModule?e:{default:e}}function n(e,t){o(Object.assign(document.createElement("link"),{href:t,rel:"stylesheet"}),e,"text/css")}function o(e,t,n){try{document.getElementById(t).remove()}catch(o){}Object.assign(e,{type:n,async:!1,tagId:t}),document.getElementsByTagName("head")[0].appendChild(e)}setTimeout(function(){(0,e.default)()},3e3),module.hot&&(module.hot.dispose(function(){console.log("模块即将被替换时")}),module.hot.accept(function(){console.log("模块或其依赖项之一刚刚更新时")}));
},{"./switch":"XdYG"}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map