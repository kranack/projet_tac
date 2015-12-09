"use strict";

var UserListView = (function(View, Users, UserView) {
    function UserListView(element) {
        this.tagName = (element === undefined || element.tagName === undefined) ? 'ul' : element.tagName;
        this.users = (element === undefined || element.users === undefined) ? new Users() : element.users;
        this.domElement = DOMHelper.getElement("#users_list");
        View.call(this);
        this.initialize();
    };

    UserListView.prototype = new View();
    UserListView.prototype.constructor = UserListView;

    UserListView.prototype.initialize = function() {
        this.users.on('add', this, this.appendUser);
    };

    UserListView.prototype.render = function() {
        this.$el.empty();

        (function(self) {
            self.users.forEach(function(user) {
                self.appendUser(user);
            });
        })(this);

        return this;
    };

    UserListView.prototype.appendUser = function(user) {
        var userView = new UserView({model: user});
        this.$el.append(userView.render().$el.html());
    };

    return UserListView;
})(View, Users, UserView);