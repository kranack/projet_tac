"use strict";

var DOMObject = (function() {

  function DOMObject() {
    this.element = "";
    this.attr = {};
    this.attr.name = "";
    this.attr.value = "";
  };

  DOMObject.__defineGetter__('value', function() {return this.toString();});

  DOMObject.prototype.toString = function() {
    return {element: this.element, attr: {name: this.attr.name, value: this.attr.value}};
  }

  DOMObject.prototype.isNull = function() {
    if (this.attr[Object.keys(this.attr)[0]].trim() === "") {
      return true;
    }

    if (this.element === null) {
      return true;
    }

    return false;
  };

  DOMObject.prototype.getElement = function() {
    switch(this.attr.name) {
      case 'id':
        this.element = document.getElementById(this.attr.value);
      default:
        break;
    }
  };

  DOMObject.prototype.html = function(html) {
    if (html == undefined) {
      return this.element.innerHTML;
    }

    return this.element.innerHTML += html;
  };

  DOMObject.prototype.append = function(DomObject) {
    this.html(DomObject.html());
  }


  return DOMObject;
})();
