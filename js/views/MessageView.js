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

        var userElement = new Element('span');
        userElement.append(this.model.get('user').username);
        userElement.css('color', this.getRandomColor());
        userElement.attr('class', 'user');

        this.$el.append('<br>[' + this.model.get('date') + ']');
        this.$el.append(userElement);
        this.$el.append(': <span class="content">' + this.model.get('content') + '</span>');
        this.$el.attr('class', 'message');

        return this;
    };

    return MessageView;
})(View);