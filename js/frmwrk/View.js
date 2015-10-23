

var View = (function(Element, DOMHelper) {

    function View () {
        this.tagName = (this.tagName === undefined) ? 'div' : this.tagName;
        this.domElement = (this.domElement === undefined) ? null : this.domElement;
        this.$el = new Element(this.tagName);

        View.prototype.initialize.call(this);
    };

    View.prototype.initialize = function() {
        this.$el.on('append', this, this.appendToDOM);
    };

    View.prototype.render = function() {
        this.$el.empty();

        return this;
    };

    View.prototype.appendToDOM = function() {
        if (this.domElement !== null)
            this.domElement.html(this.$el.html());
    };

    return View;
})(Element, DOMHelper);