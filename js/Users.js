"use strict";

var Users = (function(User) {
    function Users() {
        this.events = {};
        Array.call(this);
    };

    Users.prototype = new Array;
    Users.prototype.constructor = Users;

    Users.prototype.push = function(user) {
        if (user instanceof User
            && !this.contains(user)) {
            var u = this.findById(user.get('socketId'));
            if (u !== null && u.get('username') === "") {
                u.set('username', user.get('username'));
                if (this.events['add'] !== undefined) {
                    this.events['add'].func.call(this.events['add'].ctx, u);
                }
            } else {
                if (this.events['add'] !== undefined) {
                    this.events['add'].func.call(this.events['add'].ctx, user);
                }
                Array.prototype.push.call(this, user);
            }
        }
    };

    Users.prototype.contains = function(user) {
        var result = 0;
        (function(self) {
            self.forEach(function (u) {
                if (u.equals(user)) {
                    result = 1;
                    return;
                }
            });
        })(this);

        return result;
    };

    Users.prototype.on = function(event, ctx, callback) {
        this.events[event] = {ctx: ctx, func: callback};
    };

    Users.prototype.findById = function(id) {
        var user = undefined;
        (function(self){
            self.forEach(function(u) {
                if (id === u.get('socketId')) {
                    user = u;
                    return ;
                }
            });
        })(this);

        return (user !== undefined) ? user : null;
    };

    return Users;
})(User);