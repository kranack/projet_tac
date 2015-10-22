"use strict";

var UserListView = (function(View, UserView) {
    function UserListView(element) {
        this.tagName = (element === undefined) ? 'ul' : element.tagName;
        this.users = (element === undefined) ? [] : element.users;
        View.call(this);
    };

    UserListView.prototype = new View();
    UserListView.prototype.constructor = UserListView;

    UserListView.prototype.render = function() {
        this.$el.empty();

        this.users.forEach(function(user) {
            var userView = new UserView(user);
            this.$el.append(userView.render().$el.html());
        });

        return this;
    };

    return UserListView;
})(View, UserView);