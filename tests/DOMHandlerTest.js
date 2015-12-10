module("DOMHandler", {
    beforeEach: function() {
        document.getElementById("qunit-fixture").innerHTML = '<div id="container"><div id="element1"></div><div id="element2"></div></div>';
    }
});

test("test_DOMHandlerGetElement", 1, function() {
    // jsTestDriver Fix
    document.getElementById("qunit-fixture").innerHTML = '<div id="container"></div>';

    var containerObject = DOMHelper.getElement("#container");
    containerObject.element.innerHTML = "Phoenix";

    strictEqual(document.getElementById("container").innerHTML, "Phoenix");
});

test("test_DOMHandlerHideElement", 1, function() {
    // jsTestDriver Fix
    document.getElementById("qunit-fixture").innerHTML = '<div id="container"></div>';

    var containerObject = DOMHelper.getElement("#container");
    containerObject.element.innerHTML = "Chewie";
    DOMHelper.hide(containerObject.element);

    strictEqual(document.getElementById("container").style.display, "none");
});

test("test_DOMHandlerShowElement", 1, function() {
    // jsTestDriver Fix
    document.getElementById("qunit-fixture").innerHTML = '<div id="container"></div>';

    var containerObject = DOMHelper.getElement("#container");
    containerObject.element.innerHTML = "Raza";
    DOMHelper.hide(containerObject.element);
    DOMHelper.show(containerObject.element);

    strictEqual(document.getElementById("container").style.display, "block");
});