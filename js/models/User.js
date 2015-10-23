"use strict";

if (!Object.is) {
    Object.is = function(x, y) {
        // SameValue algorithm
        if (x === y) { // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return x !== 0 || 1 / x === 1 / y;
        } else {
            // Step 6.a: NaN == NaN
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
        if (user instanceof User) {
            if (user.get('username') == this.get('username')) {
                return 1;
            }
        }
        return 0;
    };

    return User;
})(Model);