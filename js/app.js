"use strict";

var app = new AppHandler();

var liste = new ListeCourseView();
console.log(liste.render().$el.html());