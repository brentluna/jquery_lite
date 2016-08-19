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

	const DOMNodeCollection = __webpack_require__(1);

	// document.addEventListener('DOMcontentloaded', () => {
	//   function
	// });
	//
	// function $l(selector, func) {
	//   let queue = [];
	//
	//   function _curry() {
	//     queue.push(func);
	//     if (document.readyState === 'complete') {
	//       queue.forEach((e) => {
	//         return e();
	//       });
	//     } else {
	//       return _curry;
	//     }
	//     return _curry;
	//   }
	//
	//
	//   // let nodeList = [];
	//   // if (typeof selector === 'string') {
	//   //    nodeList = document.querySelectorAll(selector);
	//   //    nodeList = Array.from(nodeList);
	//   // } else {
	//   //   nodeList.push(selector);
	//   // }
	//   //
	//   // return new DOMNodeCollection(nodeList);
	// }
	//
	// window.$l = function(selector, func) {
	//   let docReady = false;
	//   let funcArr = [];
	//   funcArr.push(getEls(selector))
	//   document.addEventListener('DOMcontentloaded', callFuncs);
	//
	//   let nodeList = [];
	//   if (typeof selector === 'string') {
	//      nodeList = document.querySelectorAll(selector);
	//      nodeList = Array.from(nodeList);
	//   } else {
	//     nodeList.push(selector);
	//   }
	//
	//   return new DOMNodeCollection(nodeList);
	//
	//   function callFuncs() {
	//     docReady = true;
	//     funcArr.forEach((el) => {
	//       return el();
	//     });
	//   }
	//
	//   function getEls(selector) {
	//     let nodeList = [];
	//     if (typeof selector === 'string') {
	//        nodeList = document.querySelectorAll(selector);
	//        nodeList = Array.from(nodeList);
	//     } else {
	//       nodeList.push(selector);
	//     }
	//     return new DOMNodeCollection(nodeList);
	//   }
	//
	// }

	let docReady = false;
	let funcArr = [];
	document.addEventListener('DOMContentLoaded', callFuncs);

	window.$l = function(arg) {
	  let nodeList = [];
	  debugger
	  if (typeof arg === 'string') {
	     nodeList = document.querySelectorAll(arg);
	     nodeList = Array.from(nodeList);
	     return new DOMNodeCollection(nodeList);
	  } else if (arg instanceof Function) {
	      if (docReady) {
	        arg();
	      } else {
	        funcArr.push(arg);
	      }
	  } else if (arg instanceof HTMLElement) {
	    nodeList.push(arg);
	    return new DOMNodeCollection(nodeList);
	  }
	};

	 function callFuncs() {
	   debugger
	  docReady = true;
	  funcArr.forEach((el) => {
	    return el();
	  });
	}

	$l.extend = function(first, ...opts) {
	  for (let i = 0; i < opts.length; i++) {
	    for (let key in opts[i]) {
	      first[key]= opts[i][key];
	    }
	  }
	  return first;
	};

	$l.ajax = function(opts) {
	  const defaults = {
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    method: "GET",
	    url: "",
	    success: () => {},
	    error: () => {},
	    data: {},
	  };

	  opts = $l.extend(defaults, opts);

	  if (opts.method.toUpperCase() === 'GET') {
	    opts.url += `?${toQueryString(opts.data)}`;
	  }
	  const xhr = new XMLHttpRequest();
	  xhr.open(`${opts.method}, ${opts.url}`);
	  xhr.onload = e => {
	    if (xhr.status === 200) {
	      opts.success(xhr.response);
	    } else {
	      opts.error(xhr.response);
	    }
	  };
	};

	function toQueryString(obj){
	  let result = "";
	  for(let prop in obj){
	    if (obj.hasOwnProperty(prop)){
	      result += prop + "=" + obj[prop] + "&";
	    }
	  }
	  return result.substring(0, result.length - 1);
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(htmlArr) {
	    this.htmlArr = htmlArr;
	  }

	  html (string) {
	    if (!(string === undefined)) {
	      this.htmlArr.forEach((node) => {
	        node.innerHTML = string;
	      });
	    } else {
	      return this.htmlArr[0].innerHTML;
	    }
	  }

	  empty() {
	    this.htmlArr.forEach( (node) => {
	      node.innerHTML = '';
	    });
	  }

	  append(arg) {
	    this.htmlArr.forEach((el) => {
	      el.innerHTML.append(el.outerHTML);
	    });
	  }

	  attr(arg) {
	    return this.htmlArr[0].getAttribute(arg);
	  }

	  addClass(inputClass) {
	    this.htmlArr.forEach((el) => {
	      el.className = inputClass;
	    });
	  }

	  removeClass() {
	    this.htmlArr.forEach((el) => {
	      el.className = "";
	    });
	  }

	  children(){
	    return this.htmlArr[0].childNodes;
	  }

	  parent(){
	    return this.htmlArr[0].parentNode;
	  }

	  find(attr){
	    this.htmlArr.querySelectorAll(attr);
	  }

	  remove(){
	    this.htmlArr.forEach((el) =>{
	      el.parentNode.removeChild(el);
	    });
	  }

	  on(selectedEvent, callback){
	    this.htmlArr.addEventListener(selectedEvent, callback);
	  }

	  off(selectedEvent, callback){
	    this.htmlArr.removeEventListener(selectedEvent, callback);
	  }
	}



	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);