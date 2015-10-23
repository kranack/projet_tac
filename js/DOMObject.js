"use strict";

var DOMObject = (function() {

  function DOMObject(element) {
    this.element = "";
    this.attr = {};
    this.attr.name = "";
    this.attr.value = "";

    if (element != undefined) {
      this.element = element;
    }
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

  DOMObject.prototype.find = function(obj) {
    var i = 0,
        j = 0,
        referer = this.element;

    if (obj === null || obj.element === null) {
      return null;
    }

    if (referer === null || referer === undefined) {
      referer = this.container;
    }

    for (i=0; i<referer.children.length; i++) {
      if (referer.children[i].localName == obj.element) {
        if (obj.isNull()) {
          return new DOMObject(referer.children[i]);
        }
        var attr = referer.children[i].attributes;
        for (j=0; j<attr.length; j++) {
          if (attr[j].name == obj.attr.name
              && attr[j].value == obj.attr.value) {
            return new DOMObject(referer.children[i]);
          }
        }
      }
    }

    return null;
  }

  DOMObject.prototype.html = function(html) {
    if (html == undefined) {
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

  }


  return DOMObject;
})();
