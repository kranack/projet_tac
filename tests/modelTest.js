module("model", {
    beforeEach: function() {
        window.alert = function(message) {
            document.getElementById("qunit-fixture").innerHTML = message;
        };
    }
});

test("test_modelInitialize", 1, function() {
    // jsTestDriver Fix
    window.alert = function(message) {
        document.getElementById("qunit-fixture").innerHTML = message;
    };

    var model = new Model({
        username: "John",
        initialize: function() {
            window.alert(this.username);
        }
    });

    strictEqual(document.getElementById("qunit-fixture").innerHTML, "John");
});