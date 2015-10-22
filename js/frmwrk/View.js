

var View = (function(Element) {

    function View () {
        this.tagName = (this.tagName === undefined) ? 'div' : this.tagName;
        this.$el = new Element(this.tagName);
    };

    View.prototype.render = function() {
        this.$el.empty();

        return this;
    };

    return View;
})(Element);