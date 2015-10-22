"use strict";

var app = new AppHandler();

var listeCollection = [
  new Model({
      id: 0,
      label: "liste 1"
  }),
    new Model({
        id: 1,
        label: "liste 2"
    })
];
var liste = new ListeCourseView({courses: listeCollection});
console.log(liste.render().$el.html());