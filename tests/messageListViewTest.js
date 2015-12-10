module("messageListView", {
    beforeEach: function() {
        document.getElementById("qunit-fixture").innerHTML = '<div id="messages-list"></div>';
    }
});

test("test_messageListViewAppend", 1, function() {
    var john = new User({
        username: "John"
    });
    var jack = new User({
       username: "Jack"
    });
    var message = new Message({
        user: john,
        content: "hello",
        date: "07-12-2015 08:08:01"
    });
    var message2 = new Message({
        user: jack,
        content: "hello! What's up?",
        date: "07-12-2015 08:09:26"
    });

    var messages = new Messages();
    messages.push(message);
    messages.push(message2);

    var messageListView = new MessageListView({
        messages: messages
    });

    // Fix pour qunit
    messageListView.$el.events['append'] = undefined;
    var messageListElement = document.getElementById("messages-list");
    if (messageListElement === null) {
        document.getElementById("qunit-fixture").innerHTML = '<div id="messages-list"></div>';
        messageListElement = document.getElementById("messages-list");
    }

    messageListElement.innerHTML = messageListView.render().$el.html();
    var list = messageListElement.childNodes[0];

    strictEqual(messageListElement.innerHTML,
        '<div><div class="message"><br>[07-12-2015 08:08:01]<span class="user" style="color: '+list.childNodes[0].childNodes[2].style.color+';">John</span>: <span class="content">hello</span></div>' +
        '<div class="message"><br>[07-12-2015 08:09:26]<span class="user" style="color: '+list.childNodes[1].childNodes[2].style.color+';">Jack</span>: <span class="content">hello! What\'s up?</span></div></div>');
});