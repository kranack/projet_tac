"use strict";

var Element = (function() {
    function Element(tagName) {
        this.tagName = (tagName === undefined) ? 'div' : tagName;
        this.element = document.createElement(this.tagName);
    };

    Element.prototype.html = function() {
        return this.element.outerHTML;
    };

    Element.prototype.empty = function() {
        this.element.innerHTML = "";
    };

    Element.prototype.append = function(element) {
        var el = element;
        if (element instanceof Element) {
            el = element.html();
        }
        this.element.innerHTML += el;
    };

    return Element;
})();