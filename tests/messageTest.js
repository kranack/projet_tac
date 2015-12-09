module("message", {

});

test("test_messageGetter", 1, function() {
    var message1 = new Message({
        data: "data"
    });

    strictEqual(message1.get("data"), "data");
});

test("test_messageSetter", 1, function() {
    var message1 = new Message();
    message1.set("data", "data");

    strictEqual(message1.get("data"), "data");
});

test("test_messageEquals", 1, function() {
    var message1 = new Message({
        data: "data"
    });

    var message2 = new Message({
        data: "data"
    });
    console.log(message1.equals(message2));
    ok(message1.equals(message2));
});

test("test_messageNotEquals", 1, function() {
    var message1 = new Message({
        data: "data"
    });

    var message2 = new Message({
        data: "data",
        data2: "data2"
    });

    ok(!message1.equals(message2));
});