/*Mise à jour des fonctionalités via les données reçues par cobra*/
"use strict";

var CobraHandler = (function(Cobra, DOMHelper){

	function CobraHandler() {
		this.url = "http://cobra-framework.com:8080";
		this.apiUrl = "http://cobra-framework.com:3000/api/events/";
		this.socketId = null;
	}

	/*Héritage de Cobra*/
	CobraHandler.prototype = Cobra.prototype;
	CobraHandler.prototype.constructor = CobraHandler;

	/*Lors de l'ouverture de la liste de courses collaborative, gestion de l'entrée du pseudo choisi*/
	/*mettre dans une variable pouvant être réutilisée par la suite*/
	CobraHandler.prototype.updateNickNames = function(){

	};

	/*à chaque nouvelle entrée dans la liste, cette fonction devra prendre en compte le pseudo pour identifier qui a fait la nouvelle entrée*/
	/*gère l'affichage d'une room précise avec un paramètre*/
	CobraHandler.prototype.updateList_body = function(){

	};

	CobraHandler.prototype.sendAnEntry = function(user, message){

		Cobra.prototype.sendMessage.call(this, user, message, this.roomName, true);

	};
	/*Utilisation de la classe cobra pour se connecter à la room*/
	CobraHandler.prototype.connection = function(room){
		this.roomName = room;
		Cobra.prototype.connect.call(this, this.url);
	};

	CobraHandler.prototype.connectionCallback = function () {
        console.log(this.socket);
		this.socket.emit("clients", {user: "test", toAll: true});
		Cobra.prototype.joinRoom.call(this, this.roomName);
	};

	CobraHandler.prototype.joinRoomCallback = function (roomName) {
		 // appel à l'API pour récupérer tous les messages de la room roomName
      var xhr = new XMLHttpRequest();
      xhr.open('GET', this.apiUrl + roomName, true);
      xhr.send(null);

     xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            console.log("complete");
            var result = JSON.parse(xhr.response);
            console.log(result);
            for (var i = 0; i < result.Events.length; i++) {
               var content = JSON.parse(result.Events[i].content);

               var displayList = document.getElementById("list_body");
               displayList.innerHTML += "<br>" + content.user + " : " + content.message;

               //console.log(content);
            }
        }
      }
	}

	CobraHandler.prototype.messageReceivedCallback = function (message) {
		// Lors de l'arrivée dans une room donne la liste des utilisateurs contenus dans la room
		if(message.type == "infos"){
			for(var i = 0; i < message.clients.length; i++)
			{
				// Contient l'id du client
				var client = message.clients[i];
			}
			// Mon id attribué par la room
			this.socketId = message.socketId;
		}
		else if (message.message) {
		 // Message reçu, je le traite
		 //console.log(message.message);
			var displayList = document.getElementById("list_body");
            displayList.innerHTML += "<br>" + message.user + " : " + message.message;
	 	}
	}

	return CobraHandler;
})(Cobra, DOMHelper);

var CobraHelper = new CobraHandler();
