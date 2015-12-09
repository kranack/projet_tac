module("userView", {

});

test("test_userViewAppendDefault", 1, function() {
    var user = new User({
        username: "John"
    });

    var userView = new UserView({
        model: user
    });
    document.getElementById("qunit-fixture").innerHTML = '<div id="user">'+userView.render().$el.html()+'</div>';

    var userElement = document.getElementById("user");

    strictEqual(userElement.innerHTML, '<li style="color: '+userElement.childNodes[0].style.color+';">John</li>');
});

test("test_userViewAppendDiv", 1, function() {
    var user = new User({
        username: "John"
    });

    var userView = new UserView({
        model: user,
        tagName: 'div'
    });
    document.getElementById("qunit-fixture").innerHTML = '<div id="user">'+userView.render().$el.html()+'</div>';

    var userElement = document.getElementById("user");

    strictEqual(userElement.innerHTML, '<div style="color: '+userElement.childNodes[0].style.color+';">John</div>');
});