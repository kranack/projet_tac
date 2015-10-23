"use strict";

var MessageListView = (function(View, Messages, MessageView, DOMHelper) {
    function MessageListView(element) {
        this.tagName = (element === undefined) ? 'div' : element.tagName;
        this.messages = (element === undefined) ? new Messages() : element.messages;
        this.domElement = DOMHelper.getElement("#list_body");
        View.call(this);
        this.initialize();
    };

    MessageListView.prototype = new View();
    MessageListView.prototype.constructor = MessageListView;

    MessageListView.prototype.initialize = function() {
        this.messages.on('add', this, this.appendMessage);
    };

    MessageListView.prototype.render = function() {
        this.$el.empty();

        (function(self){
            self.messages.forEach(function(message) {
                self.appendMessage(message);
            });
        })(this);

        return this;
    };

    MessageListView.prototype.appendMessage = function(message) {
        var messageView = new MessageView({model: message});
        this.$el.append(messageView.render().$el.html());
    };

    return MessageListView;
})(View, Messages, MessageView, DOMHelper);