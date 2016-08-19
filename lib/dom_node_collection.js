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
