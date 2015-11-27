"use strict";

var ListeCourseView = (function(View, CourseElementView) {
    function ListeCourseView(element) {
        this.tagName = (element === undefined) ? 'ul' : (element.tagName === undefined) ? 'ul' : element.tagName;
        this.courses = (element === undefined) ? [] : (element.courses === undefined) ? [] : element.courses;
        this.domElement = DOMHelper.getElement("#courses_list");
        View.call(this);
    };

    ListeCourseView.prototype = new View();
    ListeCourseView.prototype.constructor = ListeCourseView;

    ListeCourseView.prototype.render = function() {
        this.$el.empty();

        (function(self){
            self.courses.forEach(function(course) {
                self.appendCourse(course);
            });
        })(this);

        return this;
    };

    ListeCourseView.prototype.appendCourse = function(course) {
        var courseView = new CourseElementView({model: course});
        this.$el.append(courseView.render().$el.html());
    };

    return ListeCourseView;
})(View, CourseElementView);