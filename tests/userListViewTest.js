module("userListView", {
    beforeEach: function() {
        document.getElementById("qunit-fixture").innerHTML = '<div id="users-list"></div>';
    }
});

test("test_userListViewAppendDefault", 1, function() {
    var user = new User({
        username: "John"
    });
    var user2 = new User({
        username: "Jack"
    });
    var user3 = new User({
        username: "Brandon"
    });

    var users = new Users();
    users.push(user);
    users.push(user2);
    users.push(user3);

    var userListView = new UserListView({
        users: users
    });

    // Fix pour qunit
    userListView.$el.events['append'] = undefined;
    var userListElement = document.getElementById("users-list");
    if (userListElement === null) {
        document.getElementById("qunit-fixture").innerHTML = '<div id="users-list"></div>';
        userListElement = document.getElementById("users-list");
    }

    userListElement.innerHTML = userListView.render().$el.html();
    var list = userListElement.childNodes[0];

    strictEqual(userListElement.innerHTML,
        '<ul><li style="color: '+list.childNodes[0].style.color+';">John</li>' +
        '<li style="color: '+list.childNodes[1].style.color+';">Jack</li>' +
        '<li style="color: '+list.childNodes[2].style.color+';">Brandon</li></ul>');
});