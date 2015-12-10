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

        this.$el.append('<br><div class="message">[' + this.model.get('date') + '] <span class="user">');
        this.$el.append(userElement);
        this.$el.append('</div>: <span class="content">' + this.model.get('content') + '</span></div>');

        return this;
    };

    return MessageView;
})(View);