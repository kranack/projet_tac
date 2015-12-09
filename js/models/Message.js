"use strict";

var Message = (function(Model) {
    function Message(datas) {
        if (datas === undefined)
            Model.call(this, {content: null, user: null});
        else
            Model.call(this, datas);
    };

    Message.prototype = new Model();
    Message.prototype.constructor = Message;

    Message.prototype.equals = function(message) {
        var key = null;
        if (message instanceof Message && Object.size(message) === Object.size(this)) {
            for(key in message) {
                if (this[key] === undefined
                    || message[key] !== this[key]) {
                    return 0;
                }
            }
            return 1;
        }
        return 0;
    };

    return Message;
})(Model);