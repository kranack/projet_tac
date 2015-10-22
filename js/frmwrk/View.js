var View = (function(Element) {
    function View () {
        this.tagName = (this.tagName === undefined) ? 'div' : this.tagName;
        this.$el = new Element(this.tagName);
        console.log(this.$el);
    };

    View.prototype.render = function() {
        this.$el.html();
    };

    return View;
})(Element);