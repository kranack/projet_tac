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
        if (message instanceof Message) {
            for(var key in message) {
                var value = message[key];
                if (this[key] === undefined
                    || value !== this[key]) {
                    return 0;
                }
            }
            for(var key in this) {
                var value = this[key];
                if (message[key] === undefined
                    || value !== message[key]) {
                    return 0;
                }
            }
            return 1;
        }
        return 0;
    };

    return Message;
})(Model);