module("user", {

});

test("test_userGetter", 1, function() {
    var user = new User({
        username: "John"
    });

    strictEqual(user.get("username"), "John");
});

test("test_userSetter", 1, function() {
    var user = new User();
    user.set("username", "Jack");

    strictEqual(user.get("username"), "Jack");
});

test("test_usersEquals", 1, function() {
    var user1 = new User({
        username: "John",
        socketId: 1
    });

    var user2 = new User({
        username: "John",
        socketId: 1
    });

    ok(user1.equals(user2));
});

test("test_usersNotEquals", 1, function() {
    var user1 = new User({
        username: "John"
    });

    var user2 = new User({
        username: "Jack",
        socketId: 1
    });

    ok(!user1.equals(user2));
});