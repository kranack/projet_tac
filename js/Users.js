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
            var u = this.findById(user.get('socketId'));
            if (u !== null && u.get('username') === "") {
                u.set('username', user.get('username'));
                this.events['add'].func.call(this.events['add'].ctx, u);
            } else {
                this.events['add'].func.call(this.events['add'].ctx, user);
                Array.prototype.push.call(this, user);
            }
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

    Users.prototype.findById = function(id) {
        var user = this.forEach(function(u) {
            if (id === u.get('socketId')) {
                return u;
            }
        });
        return (user !== undefined) ? user : null;
    };

    return Users;
})(User);