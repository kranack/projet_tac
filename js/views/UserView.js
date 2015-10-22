"use strict";

var UserView = (function(View) {
    function UserView(element) {
        this.tagName = (element === undefined) ? 'li' : element.tagName;
        this.model = (element === undefined) ? null : element.model;
        View.call(this);
    };

    UserView.prototype = new View();
    UserView.prototype.constructor = UserView;

    UserView.prototype.render = function() {
        this.$el.empty();

        this.$el.append(this.model.get('username'));

        return this;
    };

    return UserView;
})(View);