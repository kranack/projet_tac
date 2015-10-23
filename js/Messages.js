"use strict";

var Messages = (function(Message) {
    function Messages() {
        this.events = {};
        Array.call(this);
    };

    Messages.prototype = new Array();
    Messages.prototype.constructor = Messages;

    Messages.prototype.push = function(message) {
        if (message instanceof Message
            && !this.contains(message)) {
            this.events['add'].func.call(this.events['add'].ctx, message);
            Array.prototype.push.call(this, message);
        }
    };

    Messages.prototype.contains = function(message) {
        this.forEach(function(m) {
            if (m.equals(message)) {
                return 1;
            }
        });

        return 0;
    };

    Messages.prototype.on = function(event, ctx, callback) {
        this.events[event] = {ctx: ctx, func: callback};
    };

    return Messages;
})(Message);