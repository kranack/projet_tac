"use strict";

var DOMObject = (function() {

  function DOMObject(element) {
    this.element = "";
    this.attr = {};
    this.attr.name = "";
    this.attr.value = "";

    if (element !== undefined) {
      this.element = element;
    }
  };

  DOMObject.__defineGetter__('value', function() {return this.toString();});

  DOMObject.prototype.toString = function() {
    return {element: this.element, attr: {name: this.attr.name, value: this.attr.value}};
  };

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
    if (this.attr.name === 'id') {
      this.element = document.getElementById(this.attr.value);
    }
  };

  DOMObject.prototype.find = function(obj) {
    var referer = this.element;

    if (obj === null || obj.element === null) {
      return null;
    }

    if (referer === null || referer === undefined) {
      referer = this.container;
    }

    return this.checkAttributes(referer, obj);
  };

  DOMObject.prototype.checkAttributes = function(attribute1, attribute2) {
    var i, j;

    for (i=0; i<attribute1.children.length; i++) {
      if (attribute1.children[i].localName === attribute2.element) {
        if (attribute2.isNull()) {
          return new DOMObject(attribute1.children[i]);
        }
        var attr = attribute1.children[i].attributes;
        for (j=0; j<attr.length; j++) {
          if (attr[j].name === attribute2.attr.name
              && attr[j].value === attribute2.attr.value) {
            return new DOMObject(attribute1.children[i]);
          }
        }
      }
    }

    return null;
  };

  DOMObject.prototype.html = function(html) {
    if (html === undefined) {
      return this.element.innerHTML;
    }
    return this.element.innerHTML = html;
  };

  DOMObject.prototype.append = function(DomObject) {
    this.element.innerHTML += DomObject.html();
  };

  DOMObject.prototype.css = function(css) {
    var styles = css.split(';');

    for (var i=0; i<styles.length; i++) {
      var style = styles[i].split(':');
      this.element.style[style[0].trim()] = style[1].trim();
    }

  };


  return DOMObject;
})();
