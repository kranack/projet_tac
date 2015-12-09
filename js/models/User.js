"use strict";

if (!Object.is) {
    Object.is = function(x, y) {
        if (x === y) {
            return x !== 0 || 1 / x === 1 / y;
        } else {
            return x !== x && y !== y;
        }
    };
}

var User = (function(Model) {
    function User(datas) {
        if (datas === undefined)
            Model.call(this, {username: null, socketId: null});
        else
            Model.call(this, datas);
    };

    User.prototype = new Model();
    User.prototype.constructor = User;

    User.prototype.equals = function(user) {
        if (user instanceof User && user.get('username') === this.get('username')) {
            return 1;
        }
        return 0;
    };

    return User;
})(Model);