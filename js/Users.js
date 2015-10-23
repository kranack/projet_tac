"use strict";

var Users = (function(User) {
    function Users() {
        this.events = {};
        Array.call(this);
    };

    Users.prototype = new Array();
    Users.prototype.constructor = Users;

    Users.prototype.push = function(user) {
        if (user instanceof User
            && !this.contains(user)) {
            this.events['add'].func.call(this.events['add'].ctx, user);
            Array.prototype.push.call(this, user);
        }
    };

    Users.prototype.contains = function(user) {
        this.forEach(function(u) {
            if (u.equals(user)) {
                return 1;
            }
        });

        return 0;
    };

    Users.prototype.on = function(event, ctx, callback) {
        this.events[event] = {ctx: ctx, func: callback};
    };

    return Users;
})(User);