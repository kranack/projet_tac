"use strict";

var Element = (function() {
    function Element(tagName) {
        this.tagName = (tagName === undefined) ? 'div' : tagName;
        this.element = document.createElement(this.tagName);

        this.events = {};
    };

    Element.prototype.html = function() {
        return this.element.outerHTML;
    };

    Element.prototype.empty = function() {
        this.element.innerHTML = "";
    };

    Element.prototype.attr = function(attr, value) {
        this.element.setAttribute(attr, value);
    };

    Element.prototype.append = function(element) {
        var el = element;
        if (element instanceof Element) {
            el = element.html();
        }
        this.element.innerHTML += el;
        this.events['append'].func.call(this.events['append'].ctx, el);
    };

    Element.prototype.on = function(event, ctx, callback) {
        this.events[event] = {ctx: ctx, func: callback};
    };

    return Element;
})();