module("users", {

});

test("test_usersAdd", 1, function() {
    var user = new User({
        username: "John"
    });
    var users = new Users();
    users.push(user);

    strictEqual(users.contains(user), 1);
});

test("test_usersFindById", 1, function() {
    var user = new User({
        username: "Jack",
        socketId: 10
    });
    var users = new Users();
    users.push(user);

    strictEqual(user.equals(users.findById(10)), 1);
});

/*test("test_usersAddCallback", 1, function(assert) {
    var user = new User({
        username: "Jack",
        socketId: 10
    });

    var done = assert.async();
    var users = new Users();
    users.on("add", this, function(user) {
        assert.strictEqual(user.get('username'), "Jack");
        done();
    });
    users.push(user);
});*/