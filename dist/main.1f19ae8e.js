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
})({"main.js":[function(require,module,exports) {
var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: {
    preload: function preload() {
      // Load assets here if needed
    },
    create: function create() {
      var _this = this;
      // Create a green outline for the CRT effect
      var graphics = this.add.graphics();
      graphics.lineStyle(10, 0x00ff00); // Green color with a thickness of 10
      graphics.strokeRect(50, 50, this.cameras.main.width - 100, this.cameras.main.height - 100); // Draw rectangle

      // Text variables
      var titleText = "Welcome to N.S. Portfolio!"; // h1 text
      var pressStartText = "Press ENTER or Tap to start"; // h2 text

      // Separate displayed text for the title and press start text
      this.titleDisplayedText = ""; // Holds the current part of h1 being displayed
      this.pressStartDisplayedText = ""; // Holds the current part of h2 being displayed

      // Create h1 and h2 text objects (initially empty)
      this.titleTextObject = this.add.text(100, 100, '', {
        fill: '#00ff00',
        fontSize: '48px',
        fontFamily: 'Montserrat'
      });
      this.pressStartTextObject = this.add.text(100, 160, '', {
        fill: '#00ff00',
        fontSize: '32px',
        fontFamily: 'Montserrat'
      });

      // Typing effect for h1 (title text)
      this.time.addEvent({
        delay: 100,
        // Delay between each character
        callback: function callback() {
          if (_this.titleDisplayedText.length < titleText.length) {
            // Add one character at a time to titleDisplayedText
            _this.titleDisplayedText += titleText[_this.titleDisplayedText.length];
            _this.titleTextObject.setText(_this.titleDisplayedText);
          } else {
            // Once h1 is fully typed, proceed to h2
            _this.showPressStartText();
          }
        },
        loop: true
      });
    },
    // Function to display typing effect for h2 (Press ENTER or Tap to start)
    showPressStartText: function showPressStartText() {
      var _this2 = this;
      var pressStartText = "Press ENTER or Tap to start";

      // Typing effect for h2 (press start text)
      this.time.addEvent({
        delay: 100,
        // Delay between each character
        callback: function callback() {
          if (_this2.pressStartDisplayedText.length < pressStartText.length) {
            // Add one character at a time to pressStartDisplayedText
            _this2.pressStartDisplayedText += pressStartText[_this2.pressStartDisplayedText.length];
            _this2.pressStartTextObject.setText(_this2.pressStartDisplayedText);
          } else {
            _this2.startBlinkingCursor(); // Once typed, show blinking cursor
            _this2.addInputListeners(); // Add input listeners after both texts have been typed
          }
        },
        loop: true
      });
    },
    // Function to display blinking cursor after h2 is fully typed
    startBlinkingCursor: function startBlinkingCursor() {
      var _this3 = this;
      // Create a blinking underscore cursor
      this.cursor = this.add.text(100 + this.pressStartTextObject.width, 160, '_', {
        fill: '#00ff00',
        fontSize: '32px',
        fontFamily: 'Montserrat'
      });

      // Set up the blinking effect
      this.time.addEvent({
        delay: 500,
        callback: function callback() {
          _this3.cursor.visible = !_this3.cursor.visible; // Toggle visibility to create blinking effect
        },
        loop: true
      });
    },
    // Add event listeners for ENTER and screen tap
    addInputListeners: function addInputListeners() {
      var _this4 = this;
      // Add listener for the Enter key
      this.input.keyboard.on('keydown-ENTER', function () {
        _this4.scene.start('gameScene'); // Change to the actual game scene
      });

      // Add listener for tap/click
      this.input.on('pointerdown', function () {
        _this4.scene.start('gameScene'); // Tap to switch scenes
      });
    },
    update: function update() {
      // Update logic here if needed
    }
  }
};

// Define game scene before initializing the game to ensure it’s available
var gameScene = {
  preload: function preload() {
    // Load game assets here if needed
  },
  create: function create() {
    this.add.text(100, 100, 'Game Scene', {
      fill: '#00ff00',
      fontSize: '48px',
      fontFamily: 'Montserrat'
    });
    // Add game logic here
  },
  update: function update() {
    // Game update logic here
  }
};

// Create the game
var game = new Phaser.Game(config);

// Add the game scene immediately so it is available when we want to switch to it
game.scene.add('gameScene', gameScene);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62404" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map