# Projet Javascript (TAC) réalisé en Master 2 e-Services à Lille 1

## Description
Le but était de réaliser une application web type chat en utilisant socket.io & Cobra (un framework basé sur socket.io) et sans aucun autre framework (jQuery y compris).

## Architecture

	css  
	 |-- style.css  
	js  
	 |-- frmwrk  
	 |--  |-- Element.js  
	 |--  |-- Model.js  
	 |--  |-- View.js  
	 |-- models
	 |--  |-- Message.js
	 |--  |-- User.js
	 |-- views
	 |--  |-- CourseElementView.js
	 |--  |-- ListeCourseView.js
	 |--  |-- MessageListView.js
	 |--  |-- MessageView.js
	 |--  |-- UserListView.js
	 |--  |-- UserView.js
	 |-- libs  
	 |--  |-- cobra.js  
	 |--  |-- socket.io.js  
	 |-- app.js  
	 |-- AppHandler.js  
	 |-- CobraHandler.js  
	 |-- DOMHandler.js  
	 |-- DOMObject.js  
	 |-- Messages.js  
	 |-- Users.js  
	index.html  

* Un mini-framework (basé sur la structure de [Backbone.js](http://backbonejs.org/)) se trouve dans le dossier `frmwrk`.
* Un gestionnaire de DOM a été également développé pour remplacer [jQuery](https://jquery.com/) et faciliter l'insertion des éléments :
	* `DOMHandler` sert à sérialiser et effectuer les modification dans le DOM (show, hide, append, etc...)
	* `DOMObject` est une surcouche aux noeuds HTML et contient des fonctions de contrôle et de modification d'un élément (css, html, append, ...)