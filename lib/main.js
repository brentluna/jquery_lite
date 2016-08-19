const DOMNodeCollection = require('./dom_node_collection.js');

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
