var ListeCourse = (function(DOMObject, View) {
    function ListeCourse(element) {
        this.tagName = element;
        View.call(this, null);
    };

    ListeCourse.prototype = View.prototype;
    ListeCourse.prototype.constructor = ListeCourse;

    return ListeCourse;
})(DOMObject, View);