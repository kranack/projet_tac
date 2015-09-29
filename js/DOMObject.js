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



  return DOMObject;
})();
