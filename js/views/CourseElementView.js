"use strict";

var CourseElementView = (function(View) {
    function CourseElementView(element) {
        this.tagName = (element === undefined) ? 'li' : element.tagName;
        this.model = (element === undefined) ? null : element.model;
        View.call(this, arguments);
    };

    CourseElementView.prototype = new View();
    CourseElementView.prototype.constructor = CourseElementView;

    CourseElementView.prototype.render = function() {
        this.$el.empty();

        return this;
    };

    return CourseElementView;
})(View);