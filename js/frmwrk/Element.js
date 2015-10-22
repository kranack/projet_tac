var Element = (function() {
    function Element(element) {
        this.element = document.createElement(element);
    };

    Element.prototype.html = function() {
        return this.element.html();
    };

    return Element;
});