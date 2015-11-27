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

        var date = new Element('span');
        date.append(this.model.get('user').username);
        date.css('color', this.getRandomColor());

        this.$el.append('<br>' + this.model.get('date'));
        this.$el.append(date);
        this.$el.append(this.model.get('content'));

        return this;
    };

    return MessageView;
})(View);