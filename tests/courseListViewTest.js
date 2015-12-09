module("courseListView", {
    beforeEach: function() {
        document.getElementById("qunit-fixture").innerHTML = '<div id="courses-list"></div>';
    }
});

test("test_courseListViewRender", 1, function() {
    var item = new Model({
        id: "1",
        label: 'potatoes'
    });
    var item2 = new Model({
        id: "2",
        label: 'tomatoes'
    });

    var courses = new Array();
    courses.push(item);
    courses.push(item2);
    var courseListView = new ListeCourseView({
        courses: courses
    });
    // Fix pour qunit
    courseListView.$el.events['append'] = undefined;

    var courseListElement = document.getElementById("courses-list");
    if (courseListElement === null) {
        document.getElementById("qunit-fixture").innerHTML = '<div id="courses-list"></div>';
        courseListElement = document.getElementById("courses-list");
    }

    courseListElement.innerHTML = courseListView.render().$el.html();
    var list = courseListElement.childNodes[0];

    strictEqual(courseListElement.innerHTML,
        '<ul><li id="1">potatoes</li><li id="2">tomatoes</li></ul>');
});

test("test_courseListViewAppendDefault", 1, function() {
    var item = new Model({
        id: "1",
        label: 'potatoes'
    });
    var item2 = new Model({
        id: "2",
        label: 'tomatoes'
    });

    var courseListView = new ListeCourseView();
    // Fix pour qunit
    courseListView.$el.events['append'] = undefined;
    courseListView.appendCourse(item);
    courseListView.appendCourse(item2);

    var courseListElement = document.getElementById("courses-list");
    if (courseListElement === null) {
        document.getElementById("qunit-fixture").innerHTML = '<div id="courses-list"></div>';
        courseListElement = document.getElementById("courses-list");
    }

    courseListElement.innerHTML = courseListView.$el.html();
    var list = courseListElement.childNodes[0];

    strictEqual(courseListElement.innerHTML,
        '<ul><li id="1">potatoes</li><li id="2">tomatoes</li></ul>');
});