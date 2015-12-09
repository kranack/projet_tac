"use strict";

var UserView = (function(View) {
    function UserView(element) {
        this.tagName = (element === undefined || element.tagName === undefined) ? 'li' : element.tagName;
        this.model = (element === undefined || element.model === undefined) ? null : element.model;
        View.call(this);
    };

    UserView.prototype = new View();
    UserView.prototype.constructor = UserView;

    UserView.prototype.render = function() {
        this.$el.empty();

        this.$el.css('color', this.getRandomColor());
        this.$el.append(this.model.get('username'));

        return this;
    };

    return UserView;
})(View);