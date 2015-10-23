"use strict";

var MessageView = (function(View) {
    function MessageView(element) {
        this.tagName = (element === undefined) ? 'li' : element.tagName;
        this.model = (element === undefined) ? null : element.model;
        View.call(this);
    };

    MessageView.prototype = new View();
    MessageView.prototype.constructor = MessageView;

    MessageView.prototype.render = function() {
        this.$el.empty();

        this.$el.append('<br>' + this.model.get('date') + ' ' + this.model.get('user').username + ' : ' + this.model.get('content'));

        return this;
    };

    return MessageView;
})(View);