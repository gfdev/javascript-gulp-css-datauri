module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return _through2.default.obj(function (file, encoding, callback) {
	        if (file.isNull()) return callback(null, file);
	        var content = file.contents.toString(),
	            i = 0,
	            promises = [];

	        var _loop = function _loop() {
	            i = content.indexOf('url(', i);
	            if (i == -1) return 'break';
	            var end = content.indexOf(')', i + 1),
	                url = content.substring(i + 4, end),
	                trimmed = (0, _lodash2.default)(url.replace(/['"]/g, '')).replace(/[?#].*/, '');
	            if (!RE_DATA_URI.test(trimmed)) {
	                if (cache.has(trimmed)) {
	                    if (!index.has(url)) index.set(url, trimmed);
	                    i = end;
	                    return 'continue';
	                }
	                index.set(url, trimmed);
	                promises.push(new Promise(function (resolve, reject) {
	                    var filename = _path2.default.join(_path2.default.dirname(file.path), trimmed);
	                    if (_fs2.default.existsSync(filename)) {
	                        var binary = _fs2.default.readFileSync(filename);
	                        cache.set(trimmed, packToDataURI(_mime2.default.lookup(filename), binary));
	                        resolve();
	                    } else {
	                        _gulpUtil2.default.log(_gulpUtil2.default.colors.cyan(PLUGIN_NAME), 'can\'t open file', _gulpUtil2.default.colors.red(filename));
	                        resolve();
	                    }
	                }));
	            }
	            i = end;
	        };

	        _loop2: while (true) {
	            var _ret = _loop();

	            switch (_ret) {
	                case 'break':
	                    break _loop2;

	                case 'continue':
	                    continue;}
	        }

	        Promise.all(promises).then(function (result) {
	            //file.contents = new Buffer(content);
	            //content = content.split(url).join(packToDataURI(mime.lookup(filename), binary));
	            callback(null, file);
	        });
	    });
	};

	var _through = __webpack_require__(1);

	var _through2 = _interopRequireDefault(_through);

	var _lodash = __webpack_require__(2);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _path = __webpack_require__(3);

	var _path2 = _interopRequireDefault(_path);

	var _fs = __webpack_require__(4);

	var _fs2 = _interopRequireDefault(_fs);

	var _mime = __webpack_require__(5);

	var _mime2 = _interopRequireDefault(_mime);

	var _gulpUtil = __webpack_require__(6);

	var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import * as es6 from 'es6-promise';
	//
	// es6.polyfill();
	var PLUGIN_NAME = 'gulp-css-datauri',
	    RE_DATA_URI = /^data:(?:[a-z0-9-\.]+\/[a-z0-9-\.]+;base64)?,/,
	    RE_EXTERNAL = /^(?:https?:)?\/\//;
	var cache = new Map(),
	    index = new Map();

	function packToDataURI(mimetype, binary) {
	    return ['"', 'data:', mimetype, ';base64,', binary.toString('base64'), '"'].join('');
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("through2");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("lodash.trim");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("mime");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("gulp-util");

/***/ }
/******/ ]);