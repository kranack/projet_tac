"use strict";

var ListeCourseView = (function(View, CourseElementView) {
    function ListeCourseView(element) {
        this.tagName = (element === undefined) ? 'ul' : element.tagName;
        this.model = (element === undefined) ? null : element.model;
        View.call(this);
    };

    ListeCourseView.prototype = new View();
    ListeCourseView.prototype.constructor = ListeCourseView;

    ListeCourseView.prototype.render = function() {
        this.$el.empty();

        this.$el.append(new CourseElementView().render().$el);

        return this;
    };

    return ListeCourseView;
})(View, CourseElementView);