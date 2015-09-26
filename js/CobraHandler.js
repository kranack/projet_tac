/*Mise à jour des fonctionalités via les données reçues par cobra*/
"use strict";

var CobraHandler = (function(){
	
	function CobraHandler() {

	};

	/*Héritage de Cobra*/
	CobraHandler.prototype = Cobra.prototype;
	CobraHandler.prototype.constructor = CobraHandler;

	/*Lors de l'ouverture de la liste de courses collaborative, gestion de l'entrée du pseudo choisi*/
	/*mettre dans une variable pouvant être réutilisée par la suite*/
	CobraHandler.prototype.updateNickNames = function(){

	}

	/*à chaque nouvelle entrée dans la liste, cette fonction devra prendre en compte le pseudo pour identifier qui a fait la nouvelle entrée*/
	/*gère l'affichage d'une room précise avec un paramètre*/
	CobraHandler.prototype.updateList_body = function(){

	}

	/*Utilisation de la classe cobra pour se connecter à la room*/
	CobraHandler.prototype.connection = function(){

	}




	return CobraHandler;
});

var CobraHelper = new CobraHandler();
